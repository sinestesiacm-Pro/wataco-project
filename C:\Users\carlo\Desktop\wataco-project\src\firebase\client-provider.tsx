'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { app, auth, db } from '@/lib/firebase'; // Import the unified instances

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  // The instances are already initialized in @/lib/firebase,
  // so we just pass them to the provider.
  const firebaseServices = useMemo(() => {
    return {
      firebaseApp: app,
      auth: auth,
      firestore: db,
    };
  }, []);

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
