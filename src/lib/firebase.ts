
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

// These are public keys and are safe to be exposed in the client-side code
export const AMADEUS_API_KEY = "8KbSUTGXfLXXnZhk3dvVJcAyhdL6uGKG";
export const AMADEUS_API_SECRET = "uLzV2uC2xTA9SGar";
export const HOTELBEDS_API_KEY = "c733b8a2157c154381e4a323133f734f";
export const HOTELBEDS_SECRET = "0b5853e05a";


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

    