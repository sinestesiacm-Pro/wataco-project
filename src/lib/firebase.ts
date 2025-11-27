
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

// These are public keys and are safe to be exposed in the client-side code
export const AMADEUS_API_KEY = "8KbSUTGXfLXXnZhk3dvVJcAyhdL6uGKG";
export const AMADEUS_API_SECRET = "uLzV2uC2xTA9SGar";

// Hotelbeds Hotels API Credentials
export const HOTELBEDS_API_KEY = "7b693caa6d94519ce17374929121537f";
export const HOTELBEDS_SECRET = "8ecd58d026";

// Hotelbeds Activities API Credentials (for future use)
export const HOTELBEDS_ACTIVITIES_API_KEY = "0ecd9c27847f29ca3db2c0375b53d1e0";
export const HOTELBEDS_ACTIVITIES_SECRET = "a831c2be29";


const firebaseConfig = {
  apiKey: "AIzaSyDNbwoek_BuA76NtTdaS-emwDj92jhbLdo",
  authDomain: "tripify-umvao.firebaseapp.com",
  projectId: "tripify-umvao",
  storageBucket: "tripify-umvao.firebasestorage.app",
  messagingSenderId: "952475896153",
  appId: "1:952475896153:web:0ff3bee2a694926621a448",
  measurementId: ""
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

    