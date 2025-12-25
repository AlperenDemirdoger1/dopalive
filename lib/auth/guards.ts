/**
 * DopaLive Auth Guards
 * 
 * Edge-case protection and security guards:
 * - Brute force protection
 * - New device detection alerts
 * - Session validation
 * - Account linking conflict resolution
 */

import { AuthMethod, AuthError, DeviceInfo } from './types';
import { RATE_LIMIT_CONFIGS, getRateLimitKey } from './utils';

// ============================================
// BRUTE FORCE PROTECTION
// ============================================

interface BruteForceState {
  attempts: Map<string, { count: number; firstAttempt: number; blocked: boolean; blockedUntil: number }>;
}

const bruteForceState: BruteForceState = {
  attempts: new Map(),
};

/**
 * Check if identifier is blocked due to brute force
 */
export function checkBruteForce(
  type: 'otp' | 'login' | 'magic_link',
  identifier: string
): { allowed: boolean; blockedUntil?: number; message?: string } {
  const key = getRateLimitKey(type, identifier);
  const state = bruteForceState.attempts.get(key);
  const now = Date.now();
  
  // No previous attempts
  if (!state) {
    return { allowed: true };
  }
  
  // Check if blocked
  if (state.blocked && state.blockedUntil > now) {
    const remainingSeconds = Math.ceil((state.blockedUntil - now) / 1000);
    return {
      allowed: false,
      blockedUntil: state.blockedUntil,
      message: `Çok fazla deneme. ${remainingSeconds} saniye bekle.`,
    };
  }
  
  // Block expired
  if (state.blocked && state.blockedUntil <= now) {
    bruteForceState.attempts.delete(key);
    return { allowed: true };
  }
  
  return { allowed: true };
}

/**
 * Record an attempt (success or failure)
 */
export function recordAttempt(
  type: 'otp' | 'login' | 'magic_link',
  identifier: string,
  success: boolean
): void {
  const key = getRateLimitKey(type, identifier);
  const now = Date.now();
  
  if (success) {
    // Clear on success
    bruteForceState.attempts.delete(key);
    return;
  }
  
  const config = RATE_LIMIT_CONFIGS[type] || RATE_LIMIT_CONFIGS.login_attempt;
  const state = bruteForceState.attempts.get(key);
  
  if (!state) {
    bruteForceState.attempts.set(key, {
      count: 1,
      firstAttempt: now,
      blocked: false,
      blockedUntil: 0,
    });
    return;
  }
  
  // Check if window expired
  if (now - state.firstAttempt > config.windowSeconds * 1000) {
    bruteForceState.attempts.set(key, {
      count: 1,
      firstAttempt: now,
      blocked: false,
      blockedUntil: 0,
    });
    return;
  }
  
  // Increment
  state.count++;
  
  // Check if should block
  if (state.count >= config.maxAttempts) {
    state.blocked = true;
    state.blockedUntil = now + config.blockSeconds * 1000;
  }
}

// ============================================
// NEW DEVICE DETECTION
// ============================================

interface KnownDevice {
  fingerprint: string;
  lastSeen: number;
  userAgent: string;
}

const KNOWN_DEVICES_KEY = 'dopalive_known_devices';
const MAX_KNOWN_DEVICES = 5;

/**
 * Get known devices for current user
 */
export function getKnownDevices(): KnownDevice[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(KNOWN_DEVICES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Check if current device is known
 */
export function isKnownDevice(fingerprint: string): boolean {
  const devices = getKnownDevices();
  return devices.some(d => d.fingerprint === fingerprint);
}

/**
 * Register current device as known
 */
export function registerDevice(fingerprint: string, userAgent: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    let devices = getKnownDevices();
    
    // Update or add
    const existingIndex = devices.findIndex(d => d.fingerprint === fingerprint);
    if (existingIndex >= 0) {
      devices[existingIndex].lastSeen = Date.now();
    } else {
      devices.push({
        fingerprint,
        lastSeen: Date.now(),
        userAgent,
      });
    }
    
    // Keep only most recent devices
    devices = devices
      .sort((a, b) => b.lastSeen - a.lastSeen)
      .slice(0, MAX_KNOWN_DEVICES);
    
    localStorage.setItem(KNOWN_DEVICES_KEY, JSON.stringify(devices));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Check if should warn about new device
 */
export function shouldWarnNewDevice(fingerprint: string): boolean {
  const devices = getKnownDevices();
  
  // First device - no warning
  if (devices.length === 0) {
    return false;
  }
  
  // Known device - no warning
  if (isKnownDevice(fingerprint)) {
    return false;
  }
  
  // New device - warn
  return true;
}

// ============================================
// SESSION VALIDATION
// ============================================

/**
 * Validate session is still active
 */
export function validateSession(
  accessTokenExpiry: number,
  refreshTokenExpiry: number
): { valid: boolean; needsRefresh: boolean; expired: boolean } {
  const now = Date.now();
  
  // Completely expired
  if (now >= refreshTokenExpiry) {
    return { valid: false, needsRefresh: false, expired: true };
  }
  
  // Access token expired but refresh available
  if (now >= accessTokenExpiry) {
    return { valid: true, needsRefresh: true, expired: false };
  }
  
  // About to expire (within 5 minutes)
  if (now >= accessTokenExpiry - 5 * 60 * 1000) {
    return { valid: true, needsRefresh: true, expired: false };
  }
  
  return { valid: true, needsRefresh: false, expired: false };
}

// ============================================
// ACCOUNT LINKING CONFLICT RESOLUTION
// ============================================

export interface LinkingConflict {
  type: 'email_exists' | 'phone_exists' | 'provider_linked';
  existingMethods: AuthMethod[];
  newMethod: AuthMethod;
  identifier: string;
}

/**
 * Detect potential account linking conflicts
 */
export function detectLinkingConflict(
  existingProviders: string[],
  newMethod: AuthMethod,
  identifier: string
): LinkingConflict | null {
  if (existingProviders.length === 0) {
    return null;
  }
  
  // Map provider IDs to our AuthMethods
  const existingMethods: AuthMethod[] = existingProviders.map(p => {
    switch (p) {
      case 'google.com': return 'google';
      case 'phone': return 'phone';
      default: return 'email';
    }
  });
  
  // Check for conflicts
  if (existingMethods.includes(newMethod)) {
    return {
      type: 'provider_linked',
      existingMethods,
      newMethod,
      identifier,
    };
  }
  
  return {
    type: identifier.includes('@') ? 'email_exists' : 'phone_exists',
    existingMethods,
    newMethod,
    identifier,
  };
}

/**
 * Get user-friendly conflict message
 */
export function getConflictMessage(conflict: LinkingConflict): string {
  const methodNames: Record<AuthMethod, string> = {
    google: 'Google',
    phone: 'telefon',
    email: 'e-posta',
  };
  
  switch (conflict.type) {
    case 'provider_linked':
      return `Bu ${methodNames[conflict.newMethod]} hesabı zaten bağlı.`;
    case 'email_exists':
    case 'phone_exists':
      const methods = conflict.existingMethods
        .map(m => methodNames[m])
        .join(' veya ');
      return `Bu hesap ${methods} ile açılmış. Aynı yöntemle giriş yaparak hesapları birleştirebilirsin.`;
  }
}

// ============================================
// INPUT SANITIZATION
// ============================================

/**
 * Sanitize phone input
 */
export function sanitizePhone(input: string): string {
  // Remove all non-digit characters except leading +
  let sanitized = input.replace(/[^\d+]/g, '');
  
  // Ensure only one + at the beginning
  if (sanitized.startsWith('+')) {
    sanitized = '+' + sanitized.slice(1).replace(/\+/g, '');
  }
  
  // Limit length
  return sanitized.slice(0, 15);
}

/**
 * Sanitize email input
 */
export function sanitizeEmail(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[<>'"]/g, '') // Remove potential XSS characters
    .slice(0, 254); // RFC 5321 limit
}

/**
 * Sanitize display name input
 */
export function sanitizeDisplayName(input: string): string {
  return input
    .trim()
    .replace(/[<>'"]/g, '') // Remove potential XSS characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .slice(0, 50); // Reasonable limit
}

// ============================================
// SECURE TOKEN HANDLING
// ============================================

/**
 * Check if token looks valid (basic format check)
 */
export function isValidTokenFormat(token: string): boolean {
  // JWT format: xxx.xxx.xxx
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  // Each part should be base64url encoded
  const base64urlPattern = /^[A-Za-z0-9_-]+$/;
  return parts.every(part => base64urlPattern.test(part));
}

/**
 * Extract expiry from JWT (client-side, not cryptographically verified)
 */
export function getTokenExpiry(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

/**
 * Check if token is expired or about to expire
 */
export function isTokenExpired(token: string, bufferSeconds: number = 60): boolean {
  const expiry = getTokenExpiry(token);
  if (!expiry) return true;
  
  return Date.now() >= expiry - bufferSeconds * 1000;
}

