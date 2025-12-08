import { initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const projectId = process.env.FIREBASE_PROJECT_ID;
const rawPrivateKey =
  process.env.FIREBASE_PRIVATE_KEY_BASE64
    ? Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64, "base64").toString("utf8")
    : process.env.FIREBASE_PRIVATE_KEY?.replace(/\r?\n/g, "\n");

const hasServiceAccount =
  process.env.FIREBASE_CLIENT_EMAIL &&
  rawPrivateKey &&
  projectId;

if (!hasServiceAccount) {
  // eslint-disable-next-line no-console
  console.warn(
    "[firebase-admin] Missing service account envs; admin SDK will not initialize. Provide FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY or FIREBASE_PRIVATE_KEY_BASE64.",
  );
}

const app =
  hasServiceAccount && getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: rawPrivateKey,
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      })
    : getApps().length
      ? getApp()
      : undefined;

export const adminDb = app ? getFirestore(app) : undefined;
export const adminStorage = app ? getStorage(app) : undefined;

