import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";
import { firebaseConfig } from "@/firebase/config";

// These are public keys and are safe to be exposed in the client-side code
// These are now being sourced from the firebaseConfig for consistency
export const AMADEUS_API_KEY = process.env.NEXT_PUBLIC_AMADEUS_API_KEY || "YOUR_AMADEUS_API_KEY";
export const AMADEUS_API_SECRET = process.env.NEXT_PUBLIC_AMADEUS_API_SECRET || "YOUR_AMADEUS_API_SECRET";
export const HOTELBEDS_API_KEY = process.env.NEXT_PUBLIC_HOTELBEDS_API_KEY || "YOUR_HOTELBEDS_API_KEY";
export const HOTELBEDS_SECRET = process.env.NEXT_PUBLIC_HOTELBEDS_SECRET || "YOUR_HOTELBEDS_SECRET";
export const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || "YOUR_GOOGLE_PLACES_API_KEY";


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
