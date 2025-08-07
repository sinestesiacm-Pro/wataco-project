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
        "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
        "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
        "https://images.pexels.com/photos/3889987/pexels-photo-3889987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
        "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
        "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
        "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
            "https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
            "https://images.pexels.com/photos/2088019/pexels-photo-2088019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
            "https://images.pexels.com/photos/1294665/pexels-photo-1294665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
            "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
            "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
            "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
