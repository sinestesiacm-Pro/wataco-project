
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
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, doc };

    