import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNbwoek_BuA76NtTdaS-emwDj92jhbLdo",
  authDomain: "tripify-umvao.firebaseapp.com",
  projectId: "tripify-umvao",
  storageBucket: "tripify-umvao.firebasestorage.app",
  messagingSenderId: "952475896153",
  appId: "1:952475896153:web:0ff3bee2a694926621a448",
  measurementId: ""
};

// Check if the configuration is valid
export const firebaseConfigValid = !!firebaseConfig.apiKey;

// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);

export { app, auth };