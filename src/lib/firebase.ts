
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

export const AMADEUS_API_KEY = "8KbSUTGXfLXXnZhk3dvVJcAyhdL6uGKG";
export const AMADEUS_API_SECRET = "uLzV2uC2xTA9SGar";

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
