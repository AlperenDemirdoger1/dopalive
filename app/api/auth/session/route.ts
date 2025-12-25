/**
 * Session Management API
 * 
 * Handles:
 * - GET: Get current session info
 * - POST: Create/refresh session
 * - DELETE: Logout (revoke all tokens)
 */

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { getAuth } from 'firebase-admin/auth';

// ============================================
// GET - Get current session
// ============================================

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }
    
    // Verify token
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Get user data from Firestore
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }
    
    const userData = userDoc.data();
    
    return NextResponse.json({
      success: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        phone: decodedToken.phone_number,
        displayName: userData?.displayName || decodedToken.name,
        photoURL: userData?.photoURL || decodedToken.picture,
        onboardingCompleted: userData?.onboardingCompleted || false,
        goals: userData?.goals || [],
      },
      expiresAt: decodedToken.exp * 1000,
    });
  } catch (error: unknown) {
    console.error('Session GET error:', error);
    
    const authError = error as { code?: string };
    if (authError.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { error: 'Oturum süresi doldu', code: 'token_expired' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Oturum doğrulanamadı' },
      { status: 401 }
    );
  }
}

// ============================================
// POST - Create/update session (sync user data)
// ============================================

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }
    
    // Verify token
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Get request body
    const body = await request.json().catch(() => ({}));
    
    // Get device info from headers
    const userAgent = request.headers.get('user-agent') || '';
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check if user exists
    const userRef = adminDb.collection('users').doc(decodedToken.uid);
    const userDoc = await userRef.get();
    
    const now = new Date();
    const isNewUser = !userDoc.exists;
    
    if (isNewUser) {
      // Create new user document
      const newUser = {
        uid: decodedToken.uid,
        email: decodedToken.email || null,
        emailVerified: decodedToken.email_verified || false,
        phone: decodedToken.phone_number || null,
        phoneVerified: !!decodedToken.phone_number,
        displayName: decodedToken.name || body.displayName || null,
        photoURL: decodedToken.picture || null,
        providers: [{
          providerId: decodedToken.firebase.sign_in_provider,
          providerUserId: decodedToken.uid,
          email: decodedToken.email,
          phone: decodedToken.phone_number,
          linkedAt: now,
          verified: true,
        }],
        signupMethod: decodedToken.firebase.sign_in_provider,
        onboardingCompleted: false,
        goals: [],
        notificationPreferences: {
          pushEnabled: false,
          emailEnabled: false,
          smsEnabled: false,
          decidedAt: null,
        },
        status: 'active',
        createdAt: now,
        updatedAt: now,
        lastLoginAt: now,
        lastDevice: {
          userAgent,
          ip,
          platform: detectPlatform(userAgent),
          browserName: detectBrowser(userAgent),
          osName: detectOS(userAgent),
          isKnown: true,
        },
      };
      
      await userRef.set(newUser);
      
      return NextResponse.json({
        success: true,
        isNewUser: true,
        requiresOnboarding: true,
        user: {
          uid: newUser.uid,
          displayName: newUser.displayName,
          email: newUser.email,
          phone: newUser.phone,
          onboardingCompleted: false,
        },
      });
    } else {
      // Update existing user
      const existingData = userDoc.data();
      
      // Check for new device
      const isNewDevice = existingData?.lastDevice?.userAgent !== userAgent ||
                          existingData?.lastDevice?.ip !== ip;
      
      await userRef.update({
        lastLoginAt: now,
        updatedAt: now,
        lastDevice: {
          userAgent,
          ip,
          platform: detectPlatform(userAgent),
          browserName: detectBrowser(userAgent),
          osName: detectOS(userAgent),
          isKnown: !isNewDevice,
        },
      });
      
      // If new device, could trigger notification/email
      if (isNewDevice && existingData?.email) {
        // TODO: Send new device notification
        console.log('New device detected for user:', decodedToken.uid);
      }
      
      return NextResponse.json({
        success: true,
        isNewUser: false,
        isNewDevice,
        requiresOnboarding: !existingData?.onboardingCompleted,
        user: {
          uid: decodedToken.uid,
          displayName: existingData?.displayName || decodedToken.name,
          email: existingData?.email || decodedToken.email,
          phone: existingData?.phone || decodedToken.phone_number,
          onboardingCompleted: existingData?.onboardingCompleted || false,
          goals: existingData?.goals || [],
        },
      });
    }
  } catch (error: unknown) {
    console.error('Session POST error:', error);
    return NextResponse.json(
      { error: 'Oturum oluşturulamadı' },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE - Logout (revoke tokens)
// ============================================

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify token
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Revoke all refresh tokens for this user
    await auth.revokeRefreshTokens(decodedToken.uid);
    
    // Update user's session status in Firestore
    if (adminDb) {
      await adminDb.collection('users').doc(decodedToken.uid).update({
        lastLogoutAt: new Date(),
        updatedAt: new Date(),
      });
      
      // Mark all active sessions as revoked
      const sessionsRef = adminDb
        .collection('sessions')
        .where('userId', '==', decodedToken.uid)
        .where('status', '==', 'active');
      
      const sessions = await sessionsRef.get();
      const batch = adminDb.batch();
      
      sessions.docs.forEach(doc => {
        batch.update(doc.ref, {
          status: 'revoked',
          revokedAt: new Date(),
        });
      });
      
      await batch.commit();
    }
    
    return NextResponse.json({
      success: true,
      message: 'Çıkış yapıldı',
    });
  } catch (error: unknown) {
    console.error('Session DELETE error:', error);
    return NextResponse.json(
      { error: 'Çıkış yapılamadı' },
      { status: 500 }
    );
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function detectPlatform(userAgent: string): 'web' | 'ios' | 'android' {
  const ua = userAgent.toLowerCase();
  if (ua.includes('iphone') || ua.includes('ipad')) return 'ios';
  if (ua.includes('android')) return 'android';
  return 'web';
}

function detectBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('chrome') && !ua.includes('edg')) return 'Chrome';
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';
  if (ua.includes('firefox')) return 'Firefox';
  if (ua.includes('edg')) return 'Edge';
  return 'Unknown';
}

function detectOS(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('windows')) return 'Windows';
  if (ua.includes('mac os')) return 'macOS';
  if (ua.includes('iphone') || ua.includes('ipad')) return 'iOS';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('linux')) return 'Linux';
  return 'Unknown';
}

