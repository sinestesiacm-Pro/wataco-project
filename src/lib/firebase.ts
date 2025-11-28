
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";
import { firebaseConfig } from "@/firebase/config";

// This file provides a single, unified way to get Firebase services,
// ensuring the app is initialized only once, safe for both server and client.

// API Keys should be managed via environment variables.
// These are placeholders and should be set in your .env.local file.
export const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || 'd985a2bbbamsh1fc9f1cb973c8a9p16f799jsna8ded40163d7';

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, doc };

    