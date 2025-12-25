import { initializeApp, getApps, cert, getApp, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";

let _app: App | undefined;
let _adminDb: Firestore | undefined;
let _adminStorage: Storage | undefined;
let _initialized = false;

function getPrivateKey(): string | undefined {
  if (process.env.FIREBASE_PRIVATE_KEY_BASE64) {
    return Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64, "base64").toString("utf8");
  }
  if (process.env.FIREBASE_PRIVATE_KEY) {
    return process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
  }
  return undefined;
}

function initializeAdmin() {
  if (_initialized) return;
  _initialized = true;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  const hasServiceAccount = clientEmail && privateKey && projectId;

  if (!hasServiceAccount) {
    // eslint-disable-next-line no-console
    console.warn(
      "[firebase-admin] Missing service account envs; admin SDK will not initialize. Provide FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY or FIREBASE_PRIVATE_KEY_BASE64.",
    );
    return;
  }

  try {
    _app = getApps().length === 0
      ? initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        })
      : getApp();

    _adminDb = getFirestore(_app);
    _adminStorage = getStorage(_app);
  } catch (error) {
    console.error("[firebase-admin] Failed to initialize:", error);
  }
}

export function getAdminDb(): Firestore | undefined {
  initializeAdmin();
  return _adminDb;
}

export function getAdminStorage(): Storage | undefined {
  initializeAdmin();
  return _adminStorage;
}

// Legacy exports for backward compatibility
export const adminDb = undefined as Firestore | undefined;
export const adminStorage = undefined as Storage | undefined;

