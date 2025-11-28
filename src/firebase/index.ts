
// This barrel file re-exports all the necessary Firebase modules.
// It NO LONGER initializes firebase, that is handled by `src/lib/firebase.ts`
export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
