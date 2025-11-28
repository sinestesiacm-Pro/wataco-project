
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "@/firebase/config";

// This file is now simplified and can be used on both server and client,
// but it ensures initialization only happens once.

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// API keys are now correctly handled in server-side files that need them.
export const AMADEUS_API_KEY = process.env.NEXT_PUBLIC_AMADEUS_API_KEY;
export const AMADEUS_API_SECRET = process.env.NEXT_PUBLIC_AMADEUS_API_SECRET;
export const HOTELBEDS_API_KEY = process.env.NEXT_PUBLIC_HOTELBEDS_API_KEY;
export const HOTELBEDS_SECRET = process.env.NEXT_PUBLIC_HOTELBEDS_SECRET;

export { app, auth, db, doc };
