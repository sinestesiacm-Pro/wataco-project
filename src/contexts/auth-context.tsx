
'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

// Check if we're in a development environment (like the preview window)
const isDevelopment = process.env.NODE_ENV === 'development';

type VipTier = 'gold' | 'platinum' | 'black';

interface AuthContextType {
  user: User | null;
  vipTier: VipTier | null;
  loading: boolean;
  signInWithGoogle: () => Promise<any>;
  logOut: () => Promise<any>;
  signUpWithEmail: (email:string, pass:string) => Promise<any>;
  signInWithEmail: (email:string, pass:string) => Promise<any>;
  refreshAuthStatus: () => Promise<void>;
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
  const [vipTier, setVipTier] = useState<VipTier | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUserStatus = useCallback(async (firebaseUser: User | null) => {
    setLoading(true);
    if (isDevelopment) {
        setUser(mockUser);
        // Simulate checking VIP status for mock user
        const userDocRef = doc(db, 'users', mockUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().vipTier) {
            setVipTier(userDoc.data().vipTier);
        } else {
            setVipTier(null);
        }
        setLoading(false);
        return;
    }

    if (firebaseUser) {
        setUser(firebaseUser);
        // Check for VIP status in Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().vipTier) {
            setVipTier(userDoc.data().vipTier);
        } else {
            setVipTier(null);
        }
    } else {
        setUser(null);
        setVipTier(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, checkUserStatus);
    return () => unsubscribe();
  }, [checkUserStatus]);
  
  const refreshAuthStatus = async () => {
    await checkUserStatus(auth.currentUser);
  }

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
      setVipTier(null);
      return Promise.resolve();
    }
    return signOut(auth);
  };

  if (loading && user === null) { // Show loader only on initial page load
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  const value = { user, vipTier, loading, signInWithGoogle, logOut, signUpWithEmail, signInWithEmail, refreshAuthStatus };

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
