
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

// These are public keys and are safe to be exposed in the client-side code
export const AMADEUS_API_KEY = process.env.NEXT_PUBLIC_AMADEUS_API_KEY;
export const AMADEUS_API_SECRET = process.env.NEXT_PUBLIC_AMADEUS_API_SECRET;

// Hotelbeds Hotels API Credentials
export const HOTELBEDS_API_KEY = process.env.NEXT_PUBLIC_HOTELBEDS_API_KEY;
export const HOTELBEDS_SECRET = process.env.NEXT_PUBLIC_HOTELBEDS_SECRET;

// Hotelbeds Activities API Credentials (for future use)
export const HOTELBEDS_ACTIVITIES_API_KEY = process.env.NEXT_PUBLIC_HOTELBEDS_ACTIVITIES_API_KEY;
export const HOTELBEDS_ACTIVITIES_SECRET = process.env.NEXT_PUBLIC_HOTELBEDS_ACTIVITIES_SECRET;

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
  measurementId: "YOUR_FIREBASE_MEASUREMENT_ID"
};

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, doc };
