/**
 * User Update API
 * 
 * Handles:
 * - PATCH: Update user profile (display name, goals, notifications)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import { getAuth } from 'firebase-admin/auth';
import { UserGoal } from '@/lib/auth/types';

// Valid goals
const VALID_GOALS: UserGoal[] = [
  'focus_sessions',
  'task_completion',
  'accountability',
  'coaching',
  'community',
  'habits',
];

// ============================================
// PATCH - Update user profile
// ============================================

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json(
        { error: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }
    
    // Verify token
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Parse request body
    const body = await request.json();
    const { displayName, goals, notificationPreferences, onboardingCompleted } = body;
    
    // Validate goals if provided
    if (goals !== undefined) {
      if (!Array.isArray(goals)) {
        return NextResponse.json(
          { error: 'Hedefler bir dizi olmalı' },
          { status: 400 }
        );
      }
      
      const invalidGoals = goals.filter((g: string) => !VALID_GOALS.includes(g as UserGoal));
      if (invalidGoals.length > 0) {
        return NextResponse.json(
          { error: `Geçersiz hedefler: ${invalidGoals.join(', ')}` },
          { status: 400 }
        );
      }
    }
    
    // Validate display name if provided
    if (displayName !== undefined) {
      if (typeof displayName !== 'string') {
        return NextResponse.json(
          { error: 'İsim bir metin olmalı' },
          { status: 400 }
        );
      }
      
      if (displayName.length > 50) {
        return NextResponse.json(
          { error: 'İsim 50 karakterden uzun olamaz' },
          { status: 400 }
        );
      }
    }
    
    // Build update object
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };
    
    if (displayName !== undefined) {
      updateData.displayName = displayName.trim() || null;
      
      // Also update Firebase Auth profile
      await auth.updateUser(decodedToken.uid, {
        displayName: displayName.trim() || undefined,
      });
    }
    
    if (goals !== undefined) {
      updateData.goals = goals;
    }
    
    if (notificationPreferences !== undefined) {
      const currentDoc = await db.collection('users').doc(decodedToken.uid).get();
      const currentPrefs = currentDoc.data()?.notificationPreferences || {};
      
      updateData.notificationPreferences = {
        ...currentPrefs,
        ...notificationPreferences,
        decidedAt: new Date(),
      };
    }
    
    if (onboardingCompleted !== undefined) {
      updateData.onboardingCompleted = Boolean(onboardingCompleted);
      if (onboardingCompleted) {
        updateData.onboardingCompletedAt = new Date();
      }
    }
    
    // Update user document
    const userRef = db.collection('users').doc(decodedToken.uid);
    await userRef.update(updateData);
    
    // Get updated user data
    const updatedDoc = await userRef.get();
    const userData = updatedDoc.data();
    
    return NextResponse.json({
      success: true,
      user: {
        uid: decodedToken.uid,
        displayName: userData?.displayName,
        email: userData?.email,
        phone: userData?.phone,
        goals: userData?.goals,
        notificationPreferences: userData?.notificationPreferences,
        onboardingCompleted: userData?.onboardingCompleted,
      },
    });
  } catch (error: unknown) {
    console.error('User PATCH error:', error);
    
    const authError = error as { code?: string };
    if (authError.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { error: 'Oturum süresi doldu', code: 'token_expired' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Profil güncellenemedi' },
      { status: 500 }
    );
  }
}

