
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

export const AMADEUS_API_KEY = "pSg6Cf912d8dAG1hAWG8mG6q68A5AsG6";
export const AMADEUS_API_SECRET = "WACDAA6GsA45G5Q1";

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
