'use client';

/**
 * DopaLive Firebase Auth Client
 * 
 * Handles all Firebase Authentication operations:
 * - Google/Apple OAuth
 * - Phone OTP
 * - Email Magic Link
 * - Account Linking
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  RecaptchaVerifier,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  linkWithCredential,
  unlink,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  ConfirmationResult,
  UserCredential,
  AuthCredential,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { AuthMethod, AuthError } from './types';
import { normalizePhone, normalizeEmail, parseAuthError } from './utils';

// ============================================
// FIREBASE INITIALIZATION
// ============================================

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase is properly configured
const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.appId
);

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

function getFirebaseAuth(): Auth {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth is only available on the client');
  }
  
  if (!isFirebaseConfigured) {
    console.warn('[DopaLive Auth] Firebase not configured. Auth features disabled.');
    throw new Error('Firebase not configured');
  }
  
  if (!auth) {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    auth = getAuth(app);
    // Set Turkish language for Firebase Auth UI
    auth.languageCode = 'tr';
  }
  
  return auth;
}

/**
 * Check if Firebase Auth is available
 */
export function isAuthAvailable(): boolean {
  return typeof window !== 'undefined' && isFirebaseConfigured;
}

/**
 * Safely get Firebase Auth, returns null if not configured
 */
function getFirebaseAuthSafe(): Auth | null {
  try {
    return getFirebaseAuth();
  } catch {
    return null;
  }
}

// ============================================
// RECAPTCHA VERIFIER
// ============================================

let recaptchaVerifier: RecaptchaVerifier | null = null;

/**
 * Initialize invisible reCAPTCHA for phone auth
 */
export function initRecaptcha(containerId: string = 'recaptcha-container'): RecaptchaVerifier {
  const auth = getFirebaseAuth();
  
  if (recaptchaVerifier) {
    recaptchaVerifier.clear();
  }
  
  recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved
    },
    'expired-callback': () => {
      // Reset reCAPTCHA
      recaptchaVerifier?.render();
    },
  });
  
  return recaptchaVerifier;
}

/**
 * Clear reCAPTCHA verifier
 */
export function clearRecaptcha(): void {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear();
    recaptchaVerifier = null;
  }
}

// ============================================
// OAUTH PROVIDERS
// ============================================

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account',
});


// ============================================
// GOOGLE SIGN IN
// ============================================

export async function signInWithGoogle(): Promise<UserCredential> {
  const auth = getFirebaseAuth();
  
  try {
    // Try popup first (better UX)
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error: unknown) {
    const authError = error as { code?: string };
    // If popup blocked, try redirect
    if (authError.code === 'auth/popup-blocked') {
      await signInWithRedirect(auth, googleProvider);
      // This will redirect, so we won't reach here
      throw new Error('Redirecting...');
    }
    throw error;
  }
}

/**
 * Handle redirect result (call on page load)
 */
export async function handleRedirectResult(): Promise<UserCredential | null> {
  const auth = getFirebaseAuthSafe();
  if (!auth) return null;
  return getRedirectResult(auth);
}


// ============================================
// PHONE OTP
// ============================================

let confirmationResult: ConfirmationResult | null = null;

/**
 * Send OTP to phone number
 */
export async function sendOTP(
  phone: string,
  recaptchaContainerId: string = 'recaptcha-container'
): Promise<string> {
  const auth = getFirebaseAuth();
  const normalizedPhone = normalizePhone(phone);
  
  // Initialize reCAPTCHA if needed
  const verifier = initRecaptcha(recaptchaContainerId);
  
  try {
    confirmationResult = await signInWithPhoneNumber(auth, normalizedPhone, verifier);
    return confirmationResult.verificationId;
  } catch (error) {
    clearRecaptcha();
    throw error;
  }
}

/**
 * Verify OTP code
 */
export async function verifyOTP(code: string): Promise<UserCredential> {
  if (!confirmationResult) {
    throw new Error('No pending OTP verification');
  }
  
  const result = await confirmationResult.confirm(code);
  confirmationResult = null;
  clearRecaptcha();
  
  return result;
}

/**
 * Get phone credential for account linking
 */
export function getPhoneCredential(verificationId: string, code: string): AuthCredential {
  return PhoneAuthProvider.credential(verificationId, code);
}

// ============================================
// EMAIL MAGIC LINK
// ============================================

const actionCodeSettings = {
  url: typeof window !== 'undefined' 
    ? `${window.location.origin}/auth/email-callback`
    : 'https://dopalive.app/auth/email-callback',
  handleCodeInApp: true,
};

/**
 * Send magic link to email
 */
export async function sendMagicLink(email: string): Promise<void> {
  const auth = getFirebaseAuth();
  const normalizedEmail = normalizeEmail(email);
  
  await sendSignInLinkToEmail(auth, normalizedEmail, actionCodeSettings);
  
  // Save email to localStorage for verification
  if (typeof window !== 'undefined') {
    localStorage.setItem('emailForSignIn', normalizedEmail);
  }
}

/**
 * Check if current URL is a magic link
 */
export function isMagicLinkUrl(url: string): boolean {
  const auth = getFirebaseAuthSafe();
  if (!auth) return false;
  return isSignInWithEmailLink(auth, url);
}

/**
 * Complete magic link sign in
 */
export async function completeMagicLinkSignIn(
  email?: string,
  url?: string
): Promise<UserCredential> {
  const auth = getFirebaseAuth();
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Get email from localStorage or parameter
  let signInEmail = email;
  if (!signInEmail && typeof window !== 'undefined') {
    signInEmail = localStorage.getItem('emailForSignIn') || undefined;
  }
  
  if (!signInEmail) {
    throw new Error('Email not found. Please enter your email again.');
  }
  
  const result = await signInWithEmailLink(auth, signInEmail, currentUrl);
  
  // Clear stored email
  if (typeof window !== 'undefined') {
    localStorage.removeItem('emailForSignIn');
  }
  
  return result;
}

// ============================================
// ACCOUNT LINKING
// ============================================

/**
 * Check if email is already registered and with which providers
 */
export async function getExistingProviders(email: string): Promise<string[]> {
  const auth = getFirebaseAuth();
  return fetchSignInMethodsForEmail(auth, normalizeEmail(email));
}

/**
 * Link new credential to current user
 */
export async function linkCredential(credential: AuthCredential): Promise<UserCredential> {
  const auth = getFirebaseAuth();
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    throw new Error('No user signed in');
  }
  
  return linkWithCredential(currentUser, credential);
}

/**
 * Unlink a provider from current user
 */
export async function unlinkProvider(providerId: string): Promise<FirebaseUser> {
  const auth = getFirebaseAuth();
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    throw new Error('No user signed in');
  }
  
  return unlink(currentUser, providerId);
}

/**
 * Get credential for linking based on provider
 */
export function getOAuthCredential(
  provider: 'google',
  accessToken: string
): AuthCredential {
  return GoogleAuthProvider.credential(null, accessToken);
}

// ============================================
// SESSION MANAGEMENT
// ============================================

/**
 * Sign out user
 */
export async function firebaseSignOut(): Promise<void> {
  const auth = getFirebaseAuthSafe();
  if (auth) {
    await signOut(auth);
  }
  clearRecaptcha();
  confirmationResult = null;
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(
  callback: (user: FirebaseUser | null) => void
): () => void {
  const auth = getFirebaseAuthSafe();
  if (!auth) {
    // If Firebase not configured, immediately call with null and return noop
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Get current user
 */
export function getCurrentUser(): FirebaseUser | null {
  const auth = getFirebaseAuthSafe();
  if (!auth) return null;
  return auth.currentUser;
}

/**
 * Get current user's ID token
 */
export async function getIdToken(forceRefresh: boolean = false): Promise<string | null> {
  const auth = getFirebaseAuthSafe();
  if (!auth) return null;
  const user = auth.currentUser;
  
  if (!user) {
    return null;
  }
  
  return user.getIdToken(forceRefresh);
}

/**
 * Refresh the current user's token
 */
export async function refreshToken(): Promise<string | null> {
  return getIdToken(true);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Convert Firebase provider ID to our AuthMethod
 */
export function providerIdToAuthMethod(providerId: string): AuthMethod {
  switch (providerId) {
    case 'google.com':
      return 'google';
    case 'phone':
      return 'phone';
    case 'password':
    case 'emailLink':
      return 'email';
    default:
      return 'email';
  }
}

/**
 * Convert our AuthMethod to Firebase provider ID
 */
export function authMethodToProviderId(method: AuthMethod): string {
  switch (method) {
    case 'google':
      return 'google.com';
    case 'phone':
      return 'phone';
    case 'email':
      return 'emailLink';
  }
}

/**
 * Determine the signup method from Firebase user
 */
export function getSignupMethod(user: FirebaseUser): AuthMethod {
  const providerData = user.providerData;
  
  if (!providerData.length) {
    return 'email';
  }
  
  // Return the first (original) provider
  return providerIdToAuthMethod(providerData[0].providerId);
}

/**
 * Check if user has a specific provider linked
 */
export function hasProvider(user: FirebaseUser, method: AuthMethod): boolean {
  const providerId = authMethodToProviderId(method);
  return user.providerData.some(p => p.providerId === providerId);
}

