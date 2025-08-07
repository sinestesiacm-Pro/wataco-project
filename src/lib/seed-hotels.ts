
// To execute this script, run the following command in your terminal:
// npx tsx src/lib/seed-hotels.ts

import { collection, writeBatch, getDocs, doc } from 'firebase/firestore';
import { db } from './firebase';

const hotelsData = [
    {
      nombre: 'The Click Clack Hotel',
      ubicacion: 'Bogotá, Colombia',
      descripcion: 'Hotel de diseño moderno y único en el corazón de la ciudad.',
      media: [
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=500&auto=format&fit=crop"
      ],
      rating: 5,
      price: 280
    },
    {
      nombre: 'Hotel Charleston Santa Teresa',
      ubicacion: 'Cartagena, Colombia',
      descripcion: 'Lujo y historia en la ciudad amurallada.',
      media: [
        "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      rating: 5,
      price: 320
    },
    {
      nombre: 'Salento Real Eje Cafetero',
      ubicacion: 'Salento, Colombia',
      descripcion: 'Sumérgete en la cultura cafetera.',
      media: [
        "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      rating: 4,
      price: 150
    },
    {
      nombre: 'Le Marais Charm & Spa',
      ubicacion: 'Paris, France',
      descripcion: 'Encanto parisino en el corazón de Le Marais.',
      media: [
        "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      rating: 4,
      price: 380
    },
];


// Main function to seed the database
async function seedHotels() {
  console.log('Starting to seed "hoteles" collection...');

  const hotelsRef = collection(db, 'hoteles');
  
  // Optional: Check if the collection is already populated
  const existingDocs = await getDocs(hotelsRef);
  if (!existingDocs.empty) {
    console.log('The "hoteles" collection already contains data. Deleting old data before seeding.');
    const deleteBatch = writeBatch(db);
    existingDocs.forEach(doc => deleteBatch.delete(doc.ref));
    await deleteBatch.commit();
    console.log('Old data deleted.');
  }

  const batch = writeBatch(db);
  
  hotelsData.forEach((hotel) => {
    const docRef = doc(hotelsRef); 
    batch.set(docRef, hotel);
  });

  try {
    await batch.commit();
    console.log(`Successfully committed a batch of ${hotelsData.length} hotels to Firestore.`);
  } catch (error) {
    console.error('Error committing batch:', error);
  }
}

// Execute the seeding function
seedHotels();
