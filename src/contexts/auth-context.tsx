'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Import the centralized auth instance
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

// Configuration check is implicitly handled by the firebase.ts module
const firebaseConfigValid = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // If config is not valid, auth will be null.
    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const getFirebaseAuth = () => {
    if (!auth) {
      throw new Error("Firebase is not configured correctly.");
    }
    return auth;
  }

  const signInWithGoogle = () => {
    const authInstance = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(authInstance, provider);
  };

  const signUpWithEmail = (email: string, password: string) => {
      const authInstance = getFirebaseAuth();
      return createUserWithEmailAndPassword(authInstance, email, password);
  }

  const signInWithEmail = (email: string, password: string) => {
      const authInstance = getFirebaseAuth();
      return signInWithEmailAndPassword(authInstance, email, password);
  }

  const logOut = () => {
    const authInstance = getFirebaseAuth();
    return signOut(authInstance).then(() => {
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
