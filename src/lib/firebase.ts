
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";
import { firebaseConfig } from "@/firebase/config";

// This file provides a single, unified way to get Firebase services,
// ensuring the app is initialized only once, safe for both server and client.

// API Keys should be managed via environment variables.
// These are placeholders and should be set in your .env.local file.
export const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || 'YOUR_RAPIDAPI_KEY';
export const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 'YOUR_GOOGLE_PLACES_KEY';

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, doc };

    