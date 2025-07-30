'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, firebaseConfigValid } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseConfigValid) {
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
    if (!firebaseConfigValid) {
      const error = new Error("Firebase is not configured correctly.");
      error.name = "FirebaseConfigError";
      throw error;
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
    return signOut(authInstance);
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }
  
  if (!firebaseConfigValid) {
    return (
      <div className="flex items-center justify-center h-screen bg-background p-4">
        <Alert variant="destructive" className="max-w-2xl">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error de Configuración de Firebase</AlertTitle>
          <AlertDescription>
            Las credenciales de Firebase no están configuradas correctamente en el código fuente.
          </AlertDescription>
        </Alert>
      </div>
    )
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
