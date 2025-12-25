'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;

// Check if Firebase config is properly set
const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.appId
);

if (typeof window !== 'undefined' && isFirebaseConfigured) {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }

    if (app) {
      try {
        analytics = getAnalytics(app);
      } catch (error) {
        // Silently fail analytics - not critical for app functionality
        if (process.env.NODE_ENV === 'development') {
          console.warn('Firebase Analytics not available:', error);
        }
      }
    }
  } catch (error) {
    // Silently fail Firebase initialization in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Firebase not configured - some features may be unavailable');
    }
  }
}

export function initAnalytics() {
  // Analytics already initialized above
  return analytics;
}

export { app, analytics };
