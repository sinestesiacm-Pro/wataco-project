
'use client';

// This barrel file re-exports all the necessary Firebase modules.
// The client-provider will use this to initialize Firebase on the client.

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
