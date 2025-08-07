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
        "https://images.unsplash.com/photo-1557733686-54d18473d49e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtZWRlbGxpbnxlbnwwfHx8fDE3NTQxMzcyODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      rating: 5,
      price: 280
    },
    {
      nombre: 'Hotel Charleston Santa Teresa',
      ubicacion: 'Cartagena, Colombia',
      descripcion: 'Lujo y historia en la ciudad amurallada.',
      media: [
        "https://images.unsplash.com/photo-1549294413-26f195200c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGNoYXJsZXN0b24lMjBzYW50YSUyMHRlcmVzYXxlbnwwfHx8fDE3NTQxMzcyODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/161758/pexels-photo-161758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/277574/pexels-photo-277574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      rating: 5,
      price: 320
    },
    {
      nombre: 'Salento Real Eje Cafetero',
      ubicacion: 'Salento, Colombia',
      descripcion: 'Sumérgete en la cultura cafetera.',
      media: [
        "https://images.unsplash.com/photo-1621758448353-9bcf7b4da2f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzYWxlbnRvJTIwY29sb21iaWElMjBjb2ZmZWUlMjByZWdpb258ZW58MHx8fHwxNzU0MTM3Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/6585756/pexels-photo-6585756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      rating: 4,
      price: 150
    },
    {
      nombre: 'Le Marais Charm & Spa',
      ubicacion: 'Paris, France',
      descripcion: 'Encanto parisino en el corazón de Le Marais.',
      media: [
        "https://images.unsplash.com/photo-1594365458706-6fab3472f681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxob3RlbCUyMGxlJTIwbWFyYWlzJTIwcGFyaXN8ZW58MHx8fHwxNzU0MTM3Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      rating: 4,
      price: 380
    },
    {
      nombre: 'The New Yorker Inn',
      ubicacion: 'New York, USA',
      descripcion: 'Hotel icónico con arquitectura Art Deco, a pasos de Times Square.',
      media: [
        "https://images.unsplash.com/photo-1544815521-80841127c00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0aGUlMjBuZXclMjB5b3JrZXIlMjBob3RlbHxlbnwwfHx8fDE3NTQxMzcyODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      rating: 4,
      price: 410
    },
    {
      nombre: 'The Beverly Hills Hotel',
      ubicacion: 'Beverly Hills, USA',
      descripcion: 'El legendario "Palacio Rosa" ofrece glamour atemporal.',
      media: [
        "https://images.unsplash.com/photo-1620789439137-23451b68e0e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiZXZlcmx5JTIwaGlsbHMlMjBob3RlbHxlbnwwfHx8fDE3NTQxMzcyODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      rating: 5,
      price: 780
    },
    {
        nombre: 'Santorini Grace',
        ubicacion: 'Santorini, Greece',
        descripcion: 'Vistas icónicas de la caldera y suites de lujo encaladas.',
        media: [
            "https://images.unsplash.com/photo-1563823434121-b85de130e0a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBob3RlbHxlbnwwfHx8fDE3NTQxMzcyODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.pexels.com/photos/161852/white-building-travel-limestone-161852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        rating: 5,
        price: 950
    },
    {
        nombre: 'Riad Yasmine',
        ubicacion: 'Marrakech, Morocco',
        descripcion: 'Un oasis de paz con un patio de piscina icónico en la Medina.',
        media: [
            "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYXJyYWtlY2glMjByaWFkfGVufDB8fHx8fDE3NTQxMzcyODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.pexels.com/photos/6998754/pexels-photo-6998754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/3550444/pexels-photo-3550444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/2088019/pexels-photo-2088019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/6436793/pexels-photo-6436793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/6120223/pexels-photo-6120223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        rating: 4,
        price: 220
    },
    {
        nombre: 'Amangiri',
        ubicacion: 'Canyon Point, USA',
        descripcion: 'Lujo minimalista y aislamiento en el desierto de Utah.',
        media: [
            "https://images.unsplash.com/photo-1639534448069-a47cf42d7cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhbWFuZ2lyaSUyMGhvdGVsfGVufDB8fHx8fDE3NTQxMzcyODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/258352/pexels-photo-258352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1294665/pexels-photo-1294665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        rating: 5,
        price: 2500
    },
    {
        nombre: 'Burj Al Arab Jumeirah',
        ubicacion: 'Dubai, UAE',
        descripcion: 'Lujo icónico en el hotel más famoso de Dubái.',
        media: [
            "https://images.unsplash.com/photo-1574542544973-59c3d8b59d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxidXJqJTIwYWwlMjBhcmFiJTIwaG90ZWx8ZW58MHx8fHwxNzU0MTM3Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.pexels.com/photos/1580112/pexels-photo-1580112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/2082949/pexels-photo-2082949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        rating: 5,
        price: 1800
    },
    {
        nombre: 'The Ritz-Carlton',
        ubicacion: 'Kyoto, Japan',
        descripcion: 'Elegancia japonesa y vistas al río Kamogawa.',
        media: [
            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyaXR6JTIwY2FybHRvbiUyMGt5b3RvJTIwaG90ZWx8ZW58MHx8fHwxNzU0MTM3Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/2873951/pexels-photo-2873951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/221455/pexels-photo-221455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/161255/pexels-photo-161255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        rating: 5,
        price: 1100
    },
    {
        nombre: 'Hotel du Cap-Eden-Roc',
        ubicacion: 'Antibes, France',
        descripcion: 'Glamour de la Riviera Francesa y lujo atemporal.',
        media: [
            "https://images.unsplash.com/photo-1727813660088-4e751f96700c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGR1JTIwY2FwJTIwZWRlbiUyMHJvYyUyMGFudGliZXN8ZW58MHx8fHwxNzU0MTM3Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/161758/pexels-photo-161758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/277574/pexels-photo-277574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        ],
        rating: 5,
        price: 1500
    }
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
