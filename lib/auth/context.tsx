'use client';

/**
 * DopaLive Auth Context
 * 
 * Provides authentication state and methods throughout the app.
 * Handles:
 * - Auth state management
 * - User session persistence
 * - Silent token refresh
 * - Account linking
 */

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { User as FirebaseUser, UserCredential } from 'firebase/auth';
import {
  onAuthStateChange,
  firebaseSignOut,
  signInWithGoogle,
  sendOTP,
  verifyOTP,
  sendMagicLink,
  completeMagicLinkSignIn,
  isMagicLinkUrl,
  getIdToken,
  refreshToken,
  handleRedirectResult,
  getSignupMethod,
  hasProvider,
  isAuthAvailable,
} from './firebase-auth';
import {
  User,
  AuthState,
  AuthMethod,
  AuthError,
  UserGoal,
  NotificationPreferences,
} from './types';
import {
  parseAuthError,
  secureStorage,
  STORAGE_KEYS,
  normalizePhone,
  normalizeEmail,
  parseUserAgent,
  generateDeviceFingerprint,
} from './utils';
import {
  trackMethodSelected,
  trackOtpSent,
  trackOtpVerified,
  trackMagicLinkSent,
  trackMagicLinkVerified,
  trackOAuthStarted,
  trackOAuthCompleted,
  trackUserCreated,
  trackUserLogin,
  trackLogout,
  trackOnboardingCompleted,
  startAuthFunnel,
  completeAuthFunnel,
  abortAuthFunnel,
} from './analytics';

// ============================================
// CONTEXT TYPES
// ============================================

interface AuthContextValue extends AuthState {
  // Auth methods
  signInWithGoogle: () => Promise<void>;
  sendPhoneOTP: (phone: string) => Promise<string>;
  verifyPhoneOTP: (code: string) => Promise<void>;
  sendEmailMagicLink: (email: string) => Promise<void>;
  verifyEmailMagicLink: (email?: string) => Promise<void>;
  logout: () => Promise<void>;
  
  // User updates
  updateDisplayName: (name: string) => Promise<void>;
  updateGoals: (goals: UserGoal[]) => Promise<void>;
  updateNotificationPreferences: (prefs: Partial<NotificationPreferences>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  
  // State helpers
  clearError: () => void;
  refreshSession: () => Promise<void>;
  
  // Pending verification state
  pendingVerification: PendingVerification | null;
  setPendingVerification: (pv: PendingVerification | null) => void;
}

interface PendingVerification {
  type: 'phone' | 'email';
  identifier: string;
  verificationId?: string;
  expiresAt: Date;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ============================================
// AUTH PROVIDER
// ============================================

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [pendingVerification, setPendingVerification] = useState<PendingVerification | null>(null);
  
  // Refs for cleanup
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const onboardingStartTimeRef = useRef<number | null>(null);
  
  // ============================================
  // FIREBASE USER TO APP USER CONVERSION
  // ============================================
  
  const firebaseUserToUser = useCallback(async (firebaseUser: FirebaseUser): Promise<User> => {
    // Get device info
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const deviceInfo = parseUserAgent(userAgent);
    const fingerprint = generateDeviceFingerprint(
      userAgent,
      typeof screen !== 'undefined' ? screen.width : undefined,
      typeof screen !== 'undefined' ? screen.height : undefined
    );
    
    // Build provider links
    const providers = firebaseUser.providerData.map(p => ({
      providerId: p.providerId as AuthMethod,
      providerUserId: p.uid,
      email: p.email || undefined,
      phone: p.phoneNumber || undefined,
      linkedAt: new Date(),
      verified: true,
    }));
    
    // Check if this is a new user by looking at Firestore
    // For now, use metadata
    const isNewUser = firebaseUser.metadata.creationTime === firebaseUser.metadata.lastSignInTime;
    
    const user: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email ? normalizeEmail(firebaseUser.email) : null,
      emailVerified: firebaseUser.emailVerified,
      phone: firebaseUser.phoneNumber ? normalizePhone(firebaseUser.phoneNumber) : null,
      phoneVerified: !!firebaseUser.phoneNumber,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      providers,
      signupMethod: getSignupMethod(firebaseUser),
      onboardingCompleted: !isNewUser, // Will be overwritten by Firestore data
      goals: [],
      notificationPreferences: {
        pushEnabled: false,
        emailEnabled: false,
        smsEnabled: false,
        decidedAt: null,
      },
      status: 'active',
      createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
      updatedAt: new Date(),
      lastLoginAt: new Date(firebaseUser.metadata.lastSignInTime || Date.now()),
      lastDevice: {
        fingerprint,
        userAgent,
        ip: '', // Will be set server-side
        platform: deviceInfo.platform || 'web',
        browserName: deviceInfo.browserName || 'Unknown',
        osName: deviceInfo.osName || 'Unknown',
        isKnown: true, // Will be checked server-side
      },
    };
    
    return user;
  }, []);
  
  // ============================================
  // AUTH STATE LISTENER
  // ============================================
  
  useEffect(() => {
    // Check if Firebase Auth is available
    if (!isAuthAvailable()) {
      // Firebase not configured, set as initialized without user
      setLoading(false);
      setInitialized(true);
      console.warn('Firebase Auth not available - running in demo mode');
      return;
    }
    
    // Check for redirect result first
    handleRedirectResult().then(result => {
      if (result) {
        // Handle redirect sign in
        const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
        if (isNewUser) {
          trackUserCreated(getSignupMethod(result.user), result.user.uid);
        } else {
          trackUserLogin(getSignupMethod(result.user), result.user.uid, false);
        }
      }
    }).catch(err => {
      console.error('Redirect result error:', err);
    });
    
    // Check for magic link
    if (typeof window !== 'undefined') {
      try {
        if (isMagicLinkUrl(window.location.href)) {
          const email = localStorage.getItem('emailForSignIn');
          if (email) {
            completeMagicLinkSignIn(email).then(result => {
              const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
              trackMagicLinkVerified(true, email);
              if (isNewUser) {
                trackUserCreated('email', result.user.uid);
              } else {
                trackUserLogin('email', result.user.uid, false);
              }
              
              // Clean up URL
              window.history.replaceState({}, '', '/');
            }).catch(err => {
              setError(parseAuthError(err));
              trackMagicLinkVerified(false, email);
              window.history.replaceState({}, '', '/');
            });
          }
        }
      } catch (err) {
        // Magic link check failed - not critical
        console.warn('Magic link check failed:', err);
      }
    }
    
    // Listen to auth state
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const appUser = await firebaseUserToUser(firebaseUser);
          setUser(appUser);
          
          // Store minimal user data
          secureStorage.setPersistent(
            STORAGE_KEYS.USER,
            JSON.stringify({ uid: appUser.uid, displayName: appUser.displayName })
          );
        } catch (err) {
          console.error('Error converting user:', err);
          setError(parseAuthError(err));
        }
      } else {
        setUser(null);
        secureStorage.removePersistent(STORAGE_KEYS.USER);
      }
      
      setLoading(false);
      setInitialized(true);
    });
    
    return () => {
      unsubscribe();
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [firebaseUserToUser]);
  
  // ============================================
  // TOKEN REFRESH
  // ============================================
  
  useEffect(() => {
    if (!user) {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
      return;
    }
    
    // Refresh token every 50 minutes (tokens expire in 1 hour)
    refreshIntervalRef.current = setInterval(async () => {
      try {
        const token = await refreshToken();
        if (token) {
          secureStorage.setToken(STORAGE_KEYS.ACCESS_TOKEN, token);
        }
      } catch (err) {
        console.error('Token refresh failed:', err);
      }
    }, 50 * 60 * 1000);
    
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [user]);
  
  // ============================================
  // AUTH METHODS
  // ============================================
  
  const handleSignInWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);
    trackMethodSelected('google');
    startAuthFunnel('google');
    trackOAuthStarted('google');
    
    try {
      const result = await signInWithGoogle();
      const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
      
      trackOAuthCompleted('google', true);
      completeAuthFunnel(result.user.uid, isNewUser);
      
      const appUser = await firebaseUserToUser(result.user);
      setUser(appUser);
    } catch (err) {
      const authError = parseAuthError(err);
      setError(authError);
      trackOAuthCompleted('google', false);
      abortAuthFunnel(authError.code);
    } finally {
      setLoading(false);
    }
  }, [firebaseUserToUser]);
  
  const handleSendPhoneOTP = useCallback(async (phone: string): Promise<string> => {
    setLoading(true);
    setError(null);
    trackMethodSelected('phone');
    startAuthFunnel('phone');
    
    try {
      const normalizedPhone = normalizePhone(phone);
      const verificationId = await sendOTP(normalizedPhone);
      
      trackOtpSent(normalizedPhone);
      
      setPendingVerification({
        type: 'phone',
        identifier: normalizedPhone,
        verificationId,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      });
      
      return verificationId;
    } catch (err) {
      const authError = parseAuthError(err);
      setError(authError);
      abortAuthFunnel(authError.code);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const handleVerifyPhoneOTP = useCallback(async (code: string) => {
    if (!pendingVerification || pendingVerification.type !== 'phone') {
      throw new Error('No pending phone verification');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await verifyOTP(code);
      const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
      
      trackOtpVerified(true, pendingVerification.identifier);
      completeAuthFunnel(result.user.uid, isNewUser);
      
      const appUser = await firebaseUserToUser(result.user);
      setUser(appUser);
      setPendingVerification(null);
    } catch (err) {
      const authError = parseAuthError(err);
      setError(authError);
      trackOtpVerified(false, pendingVerification.identifier);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [pendingVerification, firebaseUserToUser]);
  
  const handleSendEmailMagicLink = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    trackMethodSelected('email');
    startAuthFunnel('email');
    
    try {
      const normalizedEmail = normalizeEmail(email);
      await sendMagicLink(normalizedEmail);
      
      trackMagicLinkSent(normalizedEmail);
      
      setPendingVerification({
        type: 'email',
        identifier: normalizedEmail,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      });
    } catch (err) {
      const authError = parseAuthError(err);
      setError(authError);
      abortAuthFunnel(authError.code);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const handleVerifyEmailMagicLink = useCallback(async (email?: string) => {
    setLoading(true);
    setError(null);
    
    const emailToUse = email || pendingVerification?.identifier;
    
    try {
      const result = await completeMagicLinkSignIn(emailToUse);
      const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
      
      trackMagicLinkVerified(true, emailToUse || '');
      completeAuthFunnel(result.user.uid, isNewUser);
      
      const appUser = await firebaseUserToUser(result.user);
      setUser(appUser);
      setPendingVerification(null);
    } catch (err) {
      const authError = parseAuthError(err);
      setError(authError);
      trackMagicLinkVerified(false, emailToUse || '');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [pendingVerification, firebaseUserToUser]);
  
  const handleLogout = useCallback(async () => {
    setLoading(true);
    
    try {
      if (user) {
        trackLogout(user.uid);
      }
      
      await firebaseSignOut();
      secureStorage.clearAll();
      setUser(null);
      setError(null);
      setPendingVerification(null);
    } catch (err) {
      setError(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  // ============================================
  // USER UPDATE METHODS
  // ============================================
  
  const updateDisplayName = useCallback(async (name: string) => {
    if (!user) return;
    
    // TODO: Update in Firebase and Firestore
    setUser(prev => prev ? { ...prev, displayName: name, updatedAt: new Date() } : null);
  }, [user]);
  
  const updateGoals = useCallback(async (goals: UserGoal[]) => {
    if (!user) return;
    
    // TODO: Update in Firestore
    setUser(prev => prev ? { ...prev, goals, updatedAt: new Date() } : null);
  }, [user]);
  
  const updateNotificationPreferences = useCallback(async (prefs: Partial<NotificationPreferences>) => {
    if (!user) return;
    
    // TODO: Update in Firestore
    setUser(prev => prev ? {
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        ...prefs,
        decidedAt: new Date(),
      },
      updatedAt: new Date(),
    } : null);
  }, [user]);
  
  const completeOnboarding = useCallback(async () => {
    if (!user) return;
    
    const durationMs = onboardingStartTimeRef.current
      ? Date.now() - onboardingStartTimeRef.current
      : 0;
    
    trackOnboardingCompleted(user.uid, durationMs);
    
    // TODO: Update in Firestore
    setUser(prev => prev ? { ...prev, onboardingCompleted: true, updatedAt: new Date() } : null);
    onboardingStartTimeRef.current = null;
  }, [user]);
  
  // ============================================
  // HELPER METHODS
  // ============================================
  
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  const refreshSession = useCallback(async () => {
    try {
      const token = await refreshToken();
      if (token) {
        secureStorage.setToken(STORAGE_KEYS.ACCESS_TOKEN, token);
      }
    } catch (err) {
      setError(parseAuthError(err));
    }
  }, []);
  
  // ============================================
  // CONTEXT VALUE
  // ============================================
  
  const value: AuthContextValue = {
    user,
    loading,
    error,
    initialized,
    signInWithGoogle: handleSignInWithGoogle,
    sendPhoneOTP: handleSendPhoneOTP,
    verifyPhoneOTP: handleVerifyPhoneOTP,
    sendEmailMagicLink: handleSendEmailMagicLink,
    verifyEmailMagicLink: handleVerifyEmailMagicLink,
    logout: handleLogout,
    updateDisplayName,
    updateGoals,
    updateNotificationPreferences,
    completeOnboarding,
    clearError,
    refreshSession,
    pendingVerification,
    setPendingVerification,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================
// HOOKS
// ============================================

/**
 * Use auth context
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

/**
 * Use current user (convenience hook)
 */
export function useUser(): User | null {
  const { user } = useAuth();
  return user;
}

/**
 * Check if user is authenticated
 */
export function useIsAuthenticated(): boolean {
  const { user, initialized } = useAuth();
  return initialized && user !== null;
}

/**
 * Check if user needs onboarding
 */
export function useNeedsOnboarding(): boolean {
  const { user, initialized } = useAuth();
  return initialized && user !== null && !user.onboardingCompleted;
}

/**
 * Get auth loading state
 */
export function useAuthLoading(): boolean {
  const { loading, initialized } = useAuth();
  return loading || !initialized;
}

