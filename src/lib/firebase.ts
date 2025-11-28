
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "@/firebase/config";

// This file is simplified to only initialize and export Firebase services
// for use across the application, ensuring a single source of truth.

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, doc };
