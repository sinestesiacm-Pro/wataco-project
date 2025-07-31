'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

// Check if we're in a development environment (like the preview window)
const isDevelopment = process.env.NODE_ENV === 'development';

interface AuthContextType {
  user: User | null;
  isVIP: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<any>;
  logOut: () => Promise<any>;
  signUpWithEmail: (email:string, pass:string) => Promise<any>;
  signInWithEmail: (email:string, pass:string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A mock user for the development environment
const mockUser = {
  uid: 'dev-user-123',
  email: 'dev@example.com',
  displayName: 'Dev User',
  photoURL: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100',
  // Add other User properties as needed, but keep them minimal
} as User;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isVIP, setIsVIP] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async (firebaseUser: User | null) => {
        if (isDevelopment) {
            setUser(mockUser);
            // Simulate checking VIP status for mock user
            setIsVIP(false); 
            setLoading(false);
            return;
        }

        if (firebaseUser) {
            setUser(firebaseUser);
            // Check for VIP status in Firestore
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists() && userDoc.data().isVIP) {
                setIsVIP(true);
            } else {
                setIsVIP(false);
            }
        } else {
            setUser(null);
            setIsVIP(false);
        }
        setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, checkUserStatus);

    return () => unsubscribe();
  }, []);
  
  const signInWithGoogle = () => {
    if (isDevelopment) {
      setUser(mockUser);
      return Promise.resolve();
    }
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithEmail = (email: string, password: string) => {
      if (isDevelopment) {
        setUser(mockUser);
        return Promise.resolve();
      }
      return createUserWithEmailAndPassword(auth, email, password);
  }

  const signInWithEmail = (email: string, password: string) => {
      if (isDevelopment) {
        setUser(mockUser);
        return Promise.resolve();
      }
      return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    if (isDevelopment) {
      setUser(null);
      setIsVIP(false);
      return Promise.resolve();
    }
    return signOut(auth);
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  const value = { user, isVIP, loading, signInWithGoogle, logOut, signUpWithEmail, signInWithEmail };

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
