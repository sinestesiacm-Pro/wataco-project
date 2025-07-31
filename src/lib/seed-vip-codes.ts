// To execute this script, run the following command in your terminal:
// npx tsx src/lib/seed-vip-codes.ts

import { collection, writeBatch, getDocs, doc } from 'firebase/firestore';
import { db } from './firebase';

// Function to generate a random alphanumeric string of a given length
const generateRandomCode = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Main function to seed the database
async function seedVipCodes() {
  console.log('Starting to seed VIP membership codes...');

  const vipMembershipsRef = collection(db, 'vip_memberships');
  
  // Optional: Check if the collection is already populated
  const existingDocs = await getDocs(vipMembershipsRef);
  if (!existingDocs.empty) {
    console.log('The "vip_memberships" collection already contains data. Aborting seeding.');
    return;
  }

  const batch = writeBatch(db);
  const codesToGenerate = 20;
  const generatedCodes = new Set<string>();

  while (generatedCodes.size < codesToGenerate) {
    const newCode = `VIP-${generateRandomCode(6)}`;
    generatedCodes.add(newCode);
  }

  console.log(`Generated ${codesToGenerate} unique codes.`);

  generatedCodes.forEach(code => {
    // Let Firestore generate a unique document ID automatically
    const docRef = doc(vipMembershipsRef); 
    batch.set(docRef, {
      code: code,
      isUsed: false,
      usedBy: null,
    });
  });

  try {
    await batch.commit();
    console.log(`Successfully committed a batch of ${codesToGenerate} VIP codes to Firestore.`);
  } catch (error) {
    console.error('Error committing batch:', error);
  }
}

// Execute the seeding function
seedVipCodes();
