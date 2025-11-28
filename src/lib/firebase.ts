
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "@/firebase/config";

// This file provides a simple, shared instance of Firebase services.
// It relies on the client-side initialization to have already occurred.

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// API keys should be handled by server-side actions, not exported globally.
export { app, auth, db, doc };
