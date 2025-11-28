
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, doc } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { firebaseConfig } from "@/firebase/config";

// This file provides a single, unified way to get Firebase services,
// ensuring the app is initialized only once.

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, doc };
