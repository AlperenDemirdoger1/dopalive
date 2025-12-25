/**
 * DopaLive Auth Module
 * 
 * Complete authentication system with:
 * - Multiple auth methods (Google, Apple, Phone, Email)
 * - Account linking
 * - Session management
 * - ADHD-friendly UX
 */

// Types
export * from './types';

// Utilities
export * from './utils';

// Firebase Auth
export {
  signInWithGoogle,
  signInWithApple,
  sendOTP,
  verifyOTP,
  sendMagicLink,
  completeMagicLinkSignIn,
  isMagicLinkUrl,
  firebaseSignOut,
  getIdToken,
  refreshToken,
  getCurrentUser,
  onAuthStateChange,
  linkCredential,
  unlinkProvider,
  getExistingProviders,
  initRecaptcha,
  clearRecaptcha,
  isAuthAvailable,
  handleRedirectResult,
} from './firebase-auth';

// Context & Hooks
export {
  AuthProvider,
  useAuth,
  useUser,
  useIsAuthenticated,
  useNeedsOnboarding,
  useAuthLoading,
} from './context';

// Analytics
export {
  initAuthAnalytics,
  trackMethodSelected,
  trackOtpSent,
  trackOtpVerified,
  trackMagicLinkSent,
  trackMagicLinkVerified,
  trackOAuthStarted,
  trackOAuthCompleted,
  trackUserCreated,
  trackUserLogin,
  trackAccountLinked,
  trackAuthError,
  trackOnboardingStarted,
  trackGoalsSelected,
  trackNotificationDecision,
  trackOnboardingCompleted,
  trackLogout,
  trackSessionExpired,
  trackTokenRefreshed,
} from './analytics';

// Guards
export {
  checkBruteForce,
  recordAttempt,
  isKnownDevice,
  registerDevice,
  shouldWarnNewDevice,
  validateSession,
  detectLinkingConflict,
  getConflictMessage,
  sanitizePhone,
  sanitizeEmail,
  sanitizeDisplayName,
  isValidTokenFormat,
  getTokenExpiry,
  isTokenExpired,
} from './guards';

