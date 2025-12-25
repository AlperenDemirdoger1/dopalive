/**
 * DopaLive Auth Analytics
 * 
 * Tracks authentication funnel events for:
 * - Method selection
 * - Verification success/failure
 * - User creation vs login
 * - Onboarding completion
 */

import { AuthAnalyticsEvent, AuthMethod, UserGoal, AuthErrorCode } from './types';

// ============================================
// ANALYTICS INTERFACE
// ============================================

interface AnalyticsService {
  track: (eventName: string, properties?: Record<string, unknown>) => void;
}

let analyticsService: AnalyticsService | null = null;

/**
 * Initialize analytics (call once on app start)
 */
export function initAuthAnalytics(service: AnalyticsService): void {
  analyticsService = service;
}

/**
 * Track an auth event
 */
export function trackAuthEvent(event: AuthAnalyticsEvent): void {
  if (!analyticsService) {
    // Fallback to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth Analytics]', event);
    }
    
    // Also send to Google Analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag('event', event.event, event);
      }
    }
    return;
  }
  
  analyticsService.track(event.event, event as unknown as Record<string, unknown>);
}

// ============================================
// EVENT HELPERS
// ============================================

/**
 * Track when user selects an auth method
 */
export function trackMethodSelected(method: AuthMethod): void {
  trackAuthEvent({
    event: 'auth_method_selected',
    method,
  });
}

/**
 * Track when auth process starts
 */
export function trackAuthStarted(method: AuthMethod): void {
  trackAuthEvent({
    event: 'auth_started',
    method,
  });
}

/**
 * Track OTP sent
 */
export function trackOtpSent(phone: string): void {
  // Mask phone for privacy
  const maskedPhone = phone.slice(0, 4) + '****' + phone.slice(-2);
  trackAuthEvent({
    event: 'auth_otp_sent',
    phone: maskedPhone,
  });
}

/**
 * Track OTP verification result
 */
export function trackOtpVerified(success: boolean, phone: string): void {
  const maskedPhone = phone.slice(0, 4) + '****' + phone.slice(-2);
  trackAuthEvent({
    event: 'auth_otp_verified',
    success,
    phone: maskedPhone,
  });
}

/**
 * Track magic link sent
 */
export function trackMagicLinkSent(email: string): void {
  // Hash email for privacy
  const [local, domain] = email.split('@');
  const maskedEmail = local[0] + '***@' + domain;
  trackAuthEvent({
    event: 'auth_magic_link_sent',
    email: maskedEmail,
  });
}

/**
 * Track magic link verification result
 */
export function trackMagicLinkVerified(success: boolean, email: string): void {
  const [local, domain] = email.split('@');
  const maskedEmail = local[0] + '***@' + domain;
  trackAuthEvent({
    event: 'auth_magic_link_verified',
    success,
    email: maskedEmail,
  });
}

/**
 * Track OAuth started
 */
export function trackOAuthStarted(provider: 'google'): void {
  trackAuthEvent({
    event: 'auth_oauth_started',
    provider,
  });
}

/**
 * Track OAuth completed
 */
export function trackOAuthCompleted(provider: 'google', success: boolean): void {
  trackAuthEvent({
    event: 'auth_oauth_completed',
    provider,
    success,
  });
}

/**
 * Track new user creation
 */
export function trackUserCreated(method: AuthMethod, userId: string): void {
  trackAuthEvent({
    event: 'auth_user_created',
    method,
    userId,
  });
}

/**
 * Track user login
 */
export function trackUserLogin(method: AuthMethod, userId: string, isNewDevice: boolean): void {
  trackAuthEvent({
    event: 'auth_user_login',
    method,
    userId,
    isNewDevice,
  });
}

/**
 * Track account linking
 */
export function trackAccountLinked(fromMethod: AuthMethod, toMethod: AuthMethod): void {
  trackAuthEvent({
    event: 'auth_account_linked',
    fromMethod,
    toMethod,
  });
}

/**
 * Track auth error
 */
export function trackAuthError(code: AuthErrorCode, method: AuthMethod): void {
  trackAuthEvent({
    event: 'auth_error',
    code,
    method,
  });
}

/**
 * Track onboarding started
 */
export function trackOnboardingStarted(userId: string): void {
  trackAuthEvent({
    event: 'onboarding_started',
    userId,
  });
}

/**
 * Track goals selection
 */
export function trackGoalsSelected(goals: UserGoal[]): void {
  trackAuthEvent({
    event: 'onboarding_goals_selected',
    goals,
  });
}

/**
 * Track notification permission decision
 */
export function trackNotificationDecision(enabled: boolean): void {
  trackAuthEvent({
    event: 'onboarding_notifications_decided',
    enabled,
  });
}

/**
 * Track onboarding completion
 */
export function trackOnboardingCompleted(userId: string, durationMs: number): void {
  trackAuthEvent({
    event: 'onboarding_completed',
    userId,
    durationMs,
  });
}

/**
 * Track logout
 */
export function trackLogout(userId: string): void {
  trackAuthEvent({
    event: 'auth_logout',
    userId,
  });
}

/**
 * Track session expiry
 */
export function trackSessionExpired(userId: string): void {
  trackAuthEvent({
    event: 'auth_session_expired',
    userId,
  });
}

/**
 * Track token refresh
 */
export function trackTokenRefreshed(userId: string): void {
  trackAuthEvent({
    event: 'auth_token_refreshed',
    userId,
  });
}

// ============================================
// FUNNEL TRACKING
// ============================================

interface FunnelState {
  startTime: number;
  method: AuthMethod | null;
  steps: string[];
}

let currentFunnel: FunnelState | null = null;

/**
 * Start tracking a new auth funnel
 */
export function startAuthFunnel(method: AuthMethod): void {
  currentFunnel = {
    startTime: Date.now(),
    method,
    steps: ['started'],
  };
  trackAuthStarted(method);
}

/**
 * Add a step to the current funnel
 */
export function addFunnelStep(step: string): void {
  if (currentFunnel) {
    currentFunnel.steps.push(step);
  }
}

/**
 * Complete the auth funnel
 */
export function completeAuthFunnel(userId: string, isNewUser: boolean): void {
  if (currentFunnel && currentFunnel.method) {
    if (isNewUser) {
      trackUserCreated(currentFunnel.method, userId);
    } else {
      trackUserLogin(currentFunnel.method, userId, false);
    }
    currentFunnel = null;
  }
}

/**
 * Abort the auth funnel (user cancelled or error)
 */
export function abortAuthFunnel(reason: string): void {
  if (currentFunnel) {
    addFunnelStep(`aborted:${reason}`);
    currentFunnel = null;
  }
}

