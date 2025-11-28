
'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [vipTier, setVipTier] = useState<VipTier | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUserStatus = useCallback(async (firebaseUser: User | null) => {
    setLoading(true);

    if (firebaseUser) {
        setUser(firebaseUser);
        // Check for VIP status in Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef).catch(err => {
            console.error("Firestore read error in auth context:", err);
            return null; // Handle potential Firestore read errors
        });

        if (userDoc && userDoc.exists() && userDoc.data().vipTier) {
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
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithEmail = (email: string, password: string) => {
      return createUserWithEmailAndPassword(auth, email, password);
  }

  const signInWithEmail = (email: string, password: string) => {
      return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    return signOut(auth);
  };

  if (loading) {
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
