/**
 * DopaLive Auth Utilities
 * 
 * Phone normalization, rate limiting helpers, device detection,
 * and other security utilities.
 */

import { AuthError, AuthErrorCode, DeviceInfo, RateLimitConfig } from './types';

// ============================================
// PHONE NUMBER NORMALIZATION
// ============================================

/**
 * Normalize phone number to E.164 format (+905xxxxxxxxx)
 * Handles Turkish numbers with various input formats
 */
export function normalizePhone(phone: string): string {
  // Remove all non-digit characters except leading +
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // Remove leading + for processing
  const hasPlus = cleaned.startsWith('+');
  if (hasPlus) {
    cleaned = cleaned.slice(1);
  }
  
  // Handle Turkish numbers
  if (cleaned.startsWith('90')) {
    // Already has country code
    return '+' + cleaned;
  } else if (cleaned.startsWith('0')) {
    // Local format (05xx xxx xx xx)
    return '+90' + cleaned.slice(1);
  } else if (cleaned.length === 10 && cleaned.startsWith('5')) {
    // Without leading 0 (5xx xxx xx xx)
    return '+90' + cleaned;
  }
  
  // For other formats, assume it's already complete
  return hasPlus ? '+' + cleaned : '+' + cleaned;
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  const normalized = normalizePhone(phone);
  // Turkish mobile: +90 5XX XXX XX XX (13 chars)
  const turkishMobileRegex = /^\+905\d{9}$/;
  return turkishMobileRegex.test(normalized);
}

/**
 * Format phone for display (mask middle digits for privacy)
 */
export function maskPhone(phone: string): string {
  const normalized = normalizePhone(phone);
  if (normalized.length < 10) return phone;
  // +90 5XX *** ** XX
  return normalized.slice(0, 7) + ' *** ** ' + normalized.slice(-2);
}

// ============================================
// EMAIL UTILITIES
// ============================================

/**
 * Normalize email address (lowercase, trim)
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Mask email for display
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  
  const maskedLocal = local.length > 2 
    ? local[0] + '***' + local[local.length - 1]
    : local[0] + '***';
  
  return maskedLocal + '@' + domain;
}

// ============================================
// RATE LIMITING
// ============================================

export const RATE_LIMIT_CONFIGS: Record<string, RateLimitConfig> = {
  otp: {
    maxAttempts: 5,
    windowSeconds: 3600,     // 1 hour window
    blockSeconds: 3600,      // 1 hour block
  },
  magic_link: {
    maxAttempts: 5,
    windowSeconds: 3600,     // 1 hour window
    blockSeconds: 3600,      // 1 hour block
  },
  login_attempt: {
    maxAttempts: 10,
    windowSeconds: 900,      // 15 minute window
    blockSeconds: 1800,      // 30 minute block
  },
  otp_verify: {
    maxAttempts: 5,
    windowSeconds: 300,      // 5 minute window (per verification)
    blockSeconds: 900,       // 15 minute block
  },
};

/**
 * Generate rate limit key
 */
export function getRateLimitKey(type: string, identifier: string): string {
  return `rate_limit:${type}:${identifier}`;
}

/**
 * Check if should be rate limited
 */
export function shouldRateLimit(
  attempts: number,
  firstAttemptAt: Date,
  config: RateLimitConfig
): boolean {
  const now = Date.now();
  const windowStart = firstAttemptAt.getTime();
  const windowEnd = windowStart + config.windowSeconds * 1000;
  
  // If outside window, reset
  if (now > windowEnd) {
    return false;
  }
  
  // Check if exceeded
  return attempts >= config.maxAttempts;
}

// ============================================
// DEVICE DETECTION
// ============================================

/**
 * Parse user agent to extract device info
 */
export function parseUserAgent(userAgent: string): Partial<DeviceInfo> {
  const ua = userAgent.toLowerCase();
  
  // Platform detection
  let platform: 'web' | 'ios' | 'android' = 'web';
  if (ua.includes('iphone') || ua.includes('ipad')) {
    platform = 'ios';
  } else if (ua.includes('android')) {
    platform = 'android';
  }
  
  // Browser detection
  let browserName = 'Unknown';
  if (ua.includes('chrome') && !ua.includes('edg')) {
    browserName = 'Chrome';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    browserName = 'Safari';
  } else if (ua.includes('firefox')) {
    browserName = 'Firefox';
  } else if (ua.includes('edg')) {
    browserName = 'Edge';
  }
  
  // OS detection
  let osName = 'Unknown';
  if (ua.includes('windows')) {
    osName = 'Windows';
  } else if (ua.includes('mac os')) {
    osName = 'macOS';
  } else if (ua.includes('iphone') || ua.includes('ipad')) {
    osName = 'iOS';
  } else if (ua.includes('android')) {
    osName = 'Android';
  } else if (ua.includes('linux')) {
    osName = 'Linux';
  }
  
  return {
    platform,
    browserName,
    osName,
    userAgent,
  };
}

/**
 * Generate simple device fingerprint from available info
 * Note: This is a simple fingerprint, not a full browser fingerprint
 */
export function generateDeviceFingerprint(
  userAgent: string,
  screenWidth?: number,
  screenHeight?: number,
  timezone?: string,
  language?: string
): string {
  const components = [
    userAgent,
    screenWidth?.toString() || 'unknown',
    screenHeight?.toString() || 'unknown',
    timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    language || navigator?.language || 'unknown',
  ];
  
  // Simple hash function
  const str = components.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(36);
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * User-friendly Turkish error messages
 * ADHD-friendly: Short, non-blaming, actionable
 */
const ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  'auth/invalid-email': 'E-posta adresi geçersiz görünüyor.',
  'auth/user-disabled': 'Bu hesap şu an aktif değil.',
  'auth/user-not-found': 'Henüz bir hesabın yok, hemen oluşturalım!',
  'auth/wrong-password': 'Giriş bilgileri eşleşmedi.',
  'auth/email-already-in-use': 'Bu e-posta zaten kullanılıyor.',
  'auth/weak-password': 'Daha güçlü bir şifre deneyelim.',
  'auth/invalid-verification-code': 'Kod eşleşmedi, tekrar deneyelim.',
  'auth/invalid-verification-id': 'Oturum zaman aşımına uğradı, tekrar başlayalım.',
  'auth/code-expired': 'Kod süresi doldu, yeni kod gönderelim.',
  'auth/too-many-requests': 'Çok fazla deneme! Biraz bekle ve tekrar dene.',
  'auth/network-request-failed': 'İnternet bağlantısını kontrol eder misin?',
  'auth/popup-closed-by-user': 'Giriş penceresi kapandı, tekrar deneyelim.',
  'auth/account-exists-with-different-credential': 'Bu hesap farklı bir yöntemle açılmış.',
  'auth/credential-already-in-use': 'Bu bilgiler başka bir hesaba bağlı.',
  'auth/requires-recent-login': 'Güvenlik için tekrar giriş yapman gerekiyor.',
  'auth/provider-already-linked': 'Bu yöntem zaten hesabına bağlı.',
  'auth/operation-not-allowed': 'Bu işlem şu an aktif değil.',
  'auth/expired-action-code': 'Bağlantının süresi dolmuş, yenisini gönderelim.',
  'auth/invalid-action-code': 'Bağlantı geçersiz, yenisini gönderelim.',
  'auth/unknown': 'Bir şeyler ters gitti, tekrar deneyelim.',
};

/**
 * Convert Firebase error code to AuthError
 */
export function parseAuthError(error: unknown): AuthError {
  const firebaseError = error as { code?: string; message?: string };
  const code = (firebaseError.code as AuthErrorCode) || 'auth/unknown';
  
  return {
    code,
    message: firebaseError.message || 'Unknown error',
    userMessage: ERROR_MESSAGES[code] || ERROR_MESSAGES['auth/unknown'],
  };
}

// ============================================
// TOKEN UTILITIES
// ============================================

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => chars[byte % chars.length]).join('');
}

/**
 * Simple hash function for client-side (not cryptographic)
 * For server-side, use proper crypto
 */
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// ============================================
// STORAGE KEYS
// ============================================

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'dopalive_access_token',
  REFRESH_TOKEN: 'dopalive_refresh_token',
  USER: 'dopalive_user',
  DEVICE_ID: 'dopalive_device_id',
  AUTH_STATE: 'dopalive_auth_state',
  ONBOARDING_PROGRESS: 'dopalive_onboarding_progress',
} as const;

// ============================================
// SECURE STORAGE
// ============================================

/**
 * Secure storage wrapper
 * Uses sessionStorage for tokens (cleared on tab close)
 * Uses localStorage for persistent data
 */
export const secureStorage = {
  setToken(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    try {
      // Tokens in sessionStorage for security
      sessionStorage.setItem(key, value);
    } catch (e) {
      console.error('Failed to store token:', e);
    }
  },
  
  getToken(key: string): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  
  removeToken(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.removeItem(key);
    } catch (e) {
      console.error('Failed to remove token:', e);
    }
  },
  
  setPersistent(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('Failed to store data:', e);
    }
  },
  
  getPersistent(key: string): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  
  removePersistent(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Failed to remove data:', e);
    }
  },
  
  clearAll(): void {
    if (typeof window === 'undefined') return;
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
      });
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
  },
};

