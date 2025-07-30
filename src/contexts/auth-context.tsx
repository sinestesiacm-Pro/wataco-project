'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, type FirebaseOptions } from 'firebase/auth';
import { getAuth, initializeAuth, indexedDBLocalPersistence } from 'firebase/auth';
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<any>;
  logOut: () => Promise<any>;
  signUpWithEmail: (email:string, pass:string) => Promise<any>;
  signInWithEmail: (email:string, pass:string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseConfigValid = firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId;

let app: FirebaseApp;
if (firebaseConfigValid) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!firebaseConfigValid) {
        setLoading(false);
        return;
    }
    const auth = initializeAuth(app, {
      persistence: indexedDBLocalPersistence
    });
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const getFirebaseAuth = () => {
    if (!firebaseConfigValid) {
      throw new Error("Firebase configuration is invalid.");
    }
    return getAuth(app);
  }

  const signInWithGoogle = () => {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithEmail = (email: string, password: string) => {
      const auth = getFirebaseAuth();
      return createUserWithEmailAndPassword(auth, email, password);
  }

  const signInWithEmail = (email: string, password: string) => {
      const auth = getFirebaseAuth();
      return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    const auth = getFirebaseAuth();
    return signOut(auth).then(() => {
        router.push('/');
    });
  };

  if (!firebaseConfigValid) {
    return (
      <div className="flex items-center justify-center h-screen bg-background p-4">
        <Alert variant="destructive" className="max-w-2xl">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error de Configuración de Firebase</AlertTitle>
          <AlertDescription>
            Las variables de entorno de Firebase no están configuradas correctamente. 
            Por favor, asegúrate de que tu archivo <strong>.env</strong> 
            contiene todas las variables <code>NEXT_PUBLIC_FIREBASE_*</code> requeridas.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }
  
  const value = { user, loading, signInWithGoogle, logOut, signUpWithEmail, signInWithEmail };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
