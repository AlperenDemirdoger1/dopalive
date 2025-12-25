/**
 * DopaLive Authentication Types
 * 
 * Data models for User, AuthProvider, Session with full TypeScript support.
 * Designed for account linking and multi-provider authentication.
 */

// ============================================
// AUTH PROVIDER TYPES
// ============================================

export type AuthMethod = 'google' | 'phone' | 'email';

export interface AuthProviderLink {
  /** Provider identifier */
  providerId: AuthMethod;
  /** Provider-specific user ID */
  providerUserId: string;
  /** Email from this provider (if available) */
  email?: string;
  /** Phone from this provider (if available) */
  phone?: string;
  /** When this provider was linked */
  linkedAt: Date;
  /** Whether this provider's identity is verified */
  verified: boolean;
}

// ============================================
// USER MODEL
// ============================================

export interface User {
  /** Firebase Auth UID */
  uid: string;
  
  /** Primary email (normalized, lowercase) */
  email: string | null;
  /** Whether email is verified */
  emailVerified: boolean;
  
  /** Primary phone (E.164 format: +905xxxxxxxxx) */
  phone: string | null;
  /** Whether phone is verified */
  phoneVerified: boolean;
  
  /** Display name (optional, user-set) */
  displayName: string | null;
  /** Profile photo URL */
  photoURL: string | null;
  
  /** Linked authentication providers */
  providers: AuthProviderLink[];
  
  /** Which method was used for initial signup */
  signupMethod: AuthMethod;
  
  /** Onboarding status */
  onboardingCompleted: boolean;
  /** Selected goals during onboarding */
  goals: UserGoal[];
  /** Notification preferences */
  notificationPreferences: NotificationPreferences;
  
  /** Account status */
  status: 'active' | 'suspended' | 'deleted';
  
  /** Timestamps */
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  
  /** Device info for last login */
  lastDevice: DeviceInfo | null;
}

export type UserGoal = 
  | 'focus_sessions'      // Odaklanma seansları
  | 'task_completion'     // Görev tamamlama
  | 'accountability'      // Hesap verebilirlik
  | 'coaching'           // DEHB koçluğu
  | 'community'          // Topluluk desteği
  | 'habits';            // Alışkanlık oluşturma

export interface NotificationPreferences {
  /** Push notifications enabled */
  pushEnabled: boolean;
  /** Email notifications enabled */
  emailEnabled: boolean;
  /** SMS notifications enabled */
  smsEnabled: boolean;
  /** When user made this choice */
  decidedAt: Date | null;
}

// ============================================
// SESSION MODEL
// ============================================

export interface Session {
  /** Session ID (random UUID) */
  id: string;
  /** User ID this session belongs to */
  userId: string;
  
  /** Device information */
  device: DeviceInfo;
  
  /** Session tokens - stored hashed, never expose raw */
  accessTokenHash: string;
  refreshTokenHash: string;
  
  /** Token expiry times */
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  
  /** Session status */
  status: 'active' | 'expired' | 'revoked';
  
  /** Timestamps */
  createdAt: Date;
  lastActivityAt: Date;
  revokedAt: Date | null;
}

export interface DeviceInfo {
  /** Device fingerprint hash */
  fingerprint: string;
  /** User agent string */
  userAgent: string;
  /** IP address (for new device detection) */
  ip: string;
  /** Platform */
  platform: 'web' | 'ios' | 'android';
  /** Browser/app name */
  browserName: string;
  /** OS name */
  osName: string;
  /** Is this a known device for this user? */
  isKnown: boolean;
}

// ============================================
// AUTH STATE
// ============================================

export interface AuthState {
  /** Current user (null if not logged in) */
  user: User | null;
  /** Loading state */
  loading: boolean;
  /** Error if any */
  error: AuthError | null;
  /** Whether initial auth check is complete */
  initialized: boolean;
}

export interface AuthError {
  code: AuthErrorCode;
  message: string;
  /** User-friendly Turkish message */
  userMessage: string;
}

export type AuthErrorCode =
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/invalid-verification-code'
  | 'auth/invalid-verification-id'
  | 'auth/code-expired'
  | 'auth/too-many-requests'
  | 'auth/network-request-failed'
  | 'auth/popup-closed-by-user'
  | 'auth/account-exists-with-different-credential'
  | 'auth/credential-already-in-use'
  | 'auth/requires-recent-login'
  | 'auth/provider-already-linked'
  | 'auth/operation-not-allowed'
  | 'auth/expired-action-code'
  | 'auth/invalid-action-code'
  | 'auth/unknown';

// ============================================
// OTP & MAGIC LINK
// ============================================

export interface OTPRequest {
  /** Phone number in E.164 format */
  phone: string;
  /** reCAPTCHA token for bot protection */
  recaptchaToken: string;
}

export interface OTPVerification {
  /** Phone number in E.164 format */
  phone: string;
  /** 6-digit OTP code */
  code: string;
  /** Verification ID from Firebase */
  verificationId: string;
}

export interface MagicLinkRequest {
  /** Email address */
  email: string;
  /** Redirect URL after verification */
  redirectUrl: string;
}

// ============================================
// RATE LIMITING
// ============================================

export interface RateLimitEntry {
  /** Identifier (IP, phone, email) */
  identifier: string;
  /** Type of rate limit */
  type: 'otp' | 'magic_link' | 'login_attempt';
  /** Number of attempts */
  attempts: number;
  /** First attempt timestamp */
  firstAttemptAt: Date;
  /** Last attempt timestamp */
  lastAttemptAt: Date;
  /** When the window resets */
  windowResetAt: Date;
  /** Whether currently blocked */
  blocked: boolean;
  /** Block expiry time (if blocked) */
  blockedUntil: Date | null;
}

export interface RateLimitConfig {
  /** Maximum attempts in window */
  maxAttempts: number;
  /** Window duration in seconds */
  windowSeconds: number;
  /** Block duration in seconds (when exceeded) */
  blockSeconds: number;
}

// ============================================
// ANALYTICS EVENTS
// ============================================

export type AuthAnalyticsEvent =
  | { event: 'auth_method_selected'; method: AuthMethod }
  | { event: 'auth_started'; method: AuthMethod }
  | { event: 'auth_otp_sent'; phone: string }
  | { event: 'auth_otp_verified'; success: boolean; phone: string }
  | { event: 'auth_magic_link_sent'; email: string }
  | { event: 'auth_magic_link_verified'; success: boolean; email: string }
  | { event: 'auth_oauth_started'; provider: 'google' }
  | { event: 'auth_oauth_completed'; provider: 'google'; success: boolean }
  | { event: 'auth_user_created'; method: AuthMethod; userId: string }
  | { event: 'auth_user_login'; method: AuthMethod; userId: string; isNewDevice: boolean }
  | { event: 'auth_account_linked'; fromMethod: AuthMethod; toMethod: AuthMethod }
  | { event: 'auth_error'; code: AuthErrorCode; method: AuthMethod }
  | { event: 'onboarding_started'; userId: string }
  | { event: 'onboarding_goals_selected'; goals: UserGoal[] }
  | { event: 'onboarding_notifications_decided'; enabled: boolean }
  | { event: 'onboarding_completed'; userId: string; durationMs: number }
  | { event: 'auth_logout'; userId: string }
  | { event: 'auth_session_expired'; userId: string }
  | { event: 'auth_token_refreshed'; userId: string };

// ============================================
// API RESPONSE TYPES
// ============================================

export interface AuthResponse {
  success: boolean;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  error?: AuthError;
  /** Whether this was a new user creation */
  isNewUser?: boolean;
  /** Whether account linking occurred */
  accountLinked?: boolean;
  /** Requires onboarding? */
  requiresOnboarding?: boolean;
}

export interface TokenRefreshResponse {
  success: boolean;
  accessToken?: string;
  expiresAt?: number;
  error?: AuthError;
}

export interface LogoutResponse {
  success: boolean;
  error?: AuthError;
}

