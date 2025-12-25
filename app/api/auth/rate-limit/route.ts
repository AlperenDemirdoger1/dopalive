/**
 * Rate Limiting API
 * 
 * Handles rate limiting for:
 * - OTP requests
 * - Magic link requests
 * - Login attempts
 * 
 * Uses Firestore for distributed rate limiting
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';

// Rate limit configurations
const RATE_LIMITS = {
  otp: {
    maxAttempts: 5,
    windowSeconds: 3600,      // 1 hour
    blockSeconds: 3600,       // 1 hour block
  },
  magic_link: {
    maxAttempts: 5,
    windowSeconds: 3600,      // 1 hour
    blockSeconds: 3600,       // 1 hour block
  },
  login_attempt: {
    maxAttempts: 10,
    windowSeconds: 900,       // 15 minutes
    blockSeconds: 1800,       // 30 minute block
  },
  otp_verify: {
    maxAttempts: 5,
    windowSeconds: 300,       // 5 minutes per code
    blockSeconds: 900,        // 15 minute block
  },
};

type RateLimitType = keyof typeof RATE_LIMITS;

// ============================================
// POST - Check and increment rate limit
// ============================================

export async function POST(request: NextRequest) {
  try {
    const db = getAdminDb();
    if (!db) {
      // If no DB, allow (fail open for development)
      return NextResponse.json({ allowed: true });
    }
    
    const body = await request.json();
    const { type, identifier } = body as { type: RateLimitType; identifier: string };
    
    if (!type || !identifier) {
      return NextResponse.json(
        { error: 'Tip ve tanımlayıcı gerekli' },
        { status: 400 }
      );
    }
    
    if (!RATE_LIMITS[type]) {
      return NextResponse.json(
        { error: 'Geçersiz rate limit tipi' },
        { status: 400 }
      );
    }
    
    const config = RATE_LIMITS[type];
    const now = Date.now();
    
    // Get client IP for additional tracking
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Create a unique key combining type, identifier, and optionally IP
    const rateLimitKey = `${type}:${identifier}`;
    const rateLimitRef = db.collection('rate_limits').doc(rateLimitKey);
    
    // Use transaction to atomically check and update
    const result = await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(rateLimitRef);
      
      if (!doc.exists) {
        // First attempt
        transaction.set(rateLimitRef, {
          identifier,
          type,
          ip,
          attempts: 1,
          firstAttemptAt: new Date(now),
          lastAttemptAt: new Date(now),
          windowResetAt: new Date(now + config.windowSeconds * 1000),
          blocked: false,
          blockedUntil: null,
        });
        
        return {
          allowed: true,
          remaining: config.maxAttempts - 1,
          resetAt: now + config.windowSeconds * 1000,
        };
      }
      
      const data = doc.data()!;
      
      // Check if currently blocked
      if (data.blocked && data.blockedUntil) {
        const blockedUntil = data.blockedUntil.toDate().getTime();
        if (now < blockedUntil) {
          return {
            allowed: false,
            blocked: true,
            blockedUntil,
            message: 'Çok fazla deneme. Lütfen bekle.',
          };
        }
        
        // Block expired, reset
        transaction.set(rateLimitRef, {
          identifier,
          type,
          ip,
          attempts: 1,
          firstAttemptAt: new Date(now),
          lastAttemptAt: new Date(now),
          windowResetAt: new Date(now + config.windowSeconds * 1000),
          blocked: false,
          blockedUntil: null,
        });
        
        return {
          allowed: true,
          remaining: config.maxAttempts - 1,
          resetAt: now + config.windowSeconds * 1000,
        };
      }
      
      // Check if window expired
      const windowResetAt = data.windowResetAt.toDate().getTime();
      if (now >= windowResetAt) {
        // Window expired, reset
        transaction.set(rateLimitRef, {
          identifier,
          type,
          ip,
          attempts: 1,
          firstAttemptAt: new Date(now),
          lastAttemptAt: new Date(now),
          windowResetAt: new Date(now + config.windowSeconds * 1000),
          blocked: false,
          blockedUntil: null,
        });
        
        return {
          allowed: true,
          remaining: config.maxAttempts - 1,
          resetAt: now + config.windowSeconds * 1000,
        };
      }
      
      // Increment attempts
      const newAttempts = data.attempts + 1;
      
      if (newAttempts > config.maxAttempts) {
        // Block user
        const blockedUntil = now + config.blockSeconds * 1000;
        
        transaction.update(rateLimitRef, {
          attempts: newAttempts,
          lastAttemptAt: new Date(now),
          blocked: true,
          blockedUntil: new Date(blockedUntil),
        });
        
        return {
          allowed: false,
          blocked: true,
          blockedUntil,
          message: 'Çok fazla deneme. Lütfen bekle.',
        };
      }
      
      // Allow but track
      transaction.update(rateLimitRef, {
        attempts: newAttempts,
        lastAttemptAt: new Date(now),
        ip, // Update IP in case it changed
      });
      
      return {
        allowed: true,
        remaining: config.maxAttempts - newAttempts,
        resetAt: windowResetAt,
      };
    });
    
    if (!result.allowed) {
      return NextResponse.json(result, { status: 429 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Rate limit error:', error);
    // Fail open - allow request if rate limiting fails
    return NextResponse.json({ allowed: true });
  }
}

// ============================================
// DELETE - Reset rate limit (for successful auth)
// ============================================

export async function DELETE(request: NextRequest) {
  try {
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ success: true });
    }
    
    const body = await request.json();
    const { type, identifier } = body as { type: RateLimitType; identifier: string };
    
    if (!type || !identifier) {
      return NextResponse.json(
        { error: 'Tip ve tanımlayıcı gerekli' },
        { status: 400 }
      );
    }
    
    const rateLimitKey = `${type}:${identifier}`;
    await db.collection('rate_limits').doc(rateLimitKey).delete();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Rate limit delete error:', error);
    return NextResponse.json({ success: true });
  }
}

