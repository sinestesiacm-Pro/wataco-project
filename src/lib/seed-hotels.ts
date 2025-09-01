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
        "https://www.clickclackhotel.com/media/uploads/galeriahoteles/hoteles_bogota.jpg?q=pr:sharp/rs:fill/w:960/h:1000/g:ce/f:jpg",
        "https://www.clickclackhotel.com/media/uploads/info_landing/PRODUCTOS_CUIDADO_-74.jpg?q=pr:sharp/rs:fill/w:1200/h:800/f:jpg",
        "https://www.clickclackhotel.com/media/uploads/galeriahabitaciones/Portada.jpg?q=pr:sharp/rs:fill/w:1920/h:1000/g:ce/f:jpg",
        "https://www.clickclackhotel.com/media/uploads/galeriahabitaciones/l5.jpg?q=pr:sharp/rs:fill/w:1920/h:1000/f:jpg",
        "https://www.clickclackhotel.com/media/uploads/galeriahabitaciones/portadal.jpg?q=pr:sharp/rs:fill/w:1920/h:1000/g:ce/f:jpg",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/268205097.jpg?k=adda31e2de3d98f1a16d2bf686e6db20d1c3bb24b751201d425296527c428c18&o=&hp=1"
      ],
      rating: 5,
      price: 280
    },
    {
      nombre: 'Hotel Charleston Santa Teresa',
      ubicacion: 'Cartagena, Colombia',
      descripcion: 'Lujo y historia en la ciudad amurallada.',
      media: [
        "https://live.staticflickr.com/590/33257495121_2cb15ce3a0_b.jpg",
        "https://image-tc.galaxy.tf/wiwebp-efi4bkfvzvb3h5hzbu4ld4lop/hotel-charleston-santa-teresa-cartagena-aerial-view.webp?width=1920",
        "https://image-tc.galaxy.tf/wiwebp-4qzziexjtttbeiuklh0b7wyf2/piscina-en-la-azotea-hotel-charleston-santa-teresa-cartagena.webp?width=1920",
        "https://image-tc.galaxy.tf/wijpeg-3zwht0g3k68140bt7dot77uoy/spa-jacuzzi-hotel-charleston-santa-teresa-cartagena_standard.jpg?width=2000&crop=110%2C0%2C1780%2C1335",
        "https://image-tc.galaxy.tf/wijpeg-3bv4d6k0npormxm79rk2u1x5e/grand-suite-city-view-charleston-santa-teresa-cartagena-01_standard.jpg?width=800&crop=121%2C0%2C1759%2C1319",
        "https://image-tc.galaxy.tf/wijpeg-xkzv7vouldhq3fpeaay07iax/pasillo-restaurante-harry-sasson-cartagena-santa-teresa_standard.jpg?width=1140&crop=106%2C0%2C1709%2C1282"
      ],
      rating: 5,
      price: 320
    },
    {
      nombre: 'Salento Real Eje Cafetero',
      ubicacion: 'Salento, Colombia',
      descripcion: 'Sumérgete en la cultura cafetera.',
      media: [
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
        "https://images.unsplash.com/photo-1594937553554-e889311fe883?w=800",
        "https://images.unsplash.com/photo-1610480356555-523e0789a5b3?w=800",
        "https://images.unsplash.com/photo-1621876849970-3505584a6ba3?w=800",
        "https://images.unsplash.com/photo-1552097732-43637495565e?w=800",
        "https://images.unsplash.com/photo-1615849021235-e639aa806b53?w=800"
      ],
      rating: 4,
      price: 150
    },
    {
      nombre: 'Le Marais Charm & Spa',
      ubicacion: 'Paris, France',
      descripcion: 'Encanto parisino en el corazón de Le Marais.',
      media: [
        "https://images.unsplash.com/photo-1502602898657-3e91760c0337?w=800",
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800",
        "https://images.unsplash.com/photo-1568524620138-f86a943a1a31?w=800",
        "https://images.unsplash.com/photo-1562613497-886e08226082?w=800",
        "https://images.unsplash.com/photo-1595204452559-5287d554a938?w=800",
        "https://images.unsplash.com/photo-1612443258279-e0b046736287?w=800"
      ],
      rating: 4,
      price: 380
    },
    {
      nombre: 'The New Yorker Inn',
      ubicacion: 'New York, USA',
      descripcion: 'Hotel icónico con arquitectura Art Deco, a pasos de Times Square.',
      media: [
        "https://images.unsplash.com/photo-1563226466-83665164a743?w=800",
        "https://images.unsplash.com/photo-1546436836-07a91091f160?w=800",
        "https://images.unsplash.com/photo-1517165699265-42841643cb99?w=800",
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800",
        "https://images.unsplash.com/photo-1538605245 buddhavision-5b5ea6b32488?w=800",
        "https://images.unsplash.com/photo-1596742578272-9a0524201b54?w=800"
      ],
      rating: 4,
      price: 410
    },
    {
      nombre: 'The Beverly Hills Hotel',
      ubicacion: 'Beverly Hills, USA',
      descripcion: 'El legendario "Palacio Rosa" ofrece glamour atemporal.',
      media: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
        "https://images.unsplash.com/photo-1613553474173-863462403642?w=800",
        "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
        "https://images.unsplash.com/photo-1600585152225-358bfe9ddb0b?w=800"
      ],
      rating: 5,
      price: 780
    },
    {
        nombre: 'Santorini Grace',
        ubicacion: 'Santorini, Greece',
        descripcion: 'Vistas icónicas de la caldera y suites de lujo encaladas.',
        media: [
            "https://images.unsplash.com/photo-1533104816931-20fa69146ca2?w=800",
            "https://images.unsplash.com/photo-1590390161421-23606973344a?w=800",
            "https://images.unsplash.com/photo-1589370143376-417163259b92?w=800",
            "https://images.unsplash.com/photo-1570204568545-5ac835332a6f?w=800",
            "https://images.unsplash.com/photo-1613482221894-4752b95c994a?w=800",
            "https://images.unsplash.com/photo-1563823434121-b85de130e0a4?w=800"
        ],
        rating: 5,
        price: 950
    },
    {
        nombre: 'Riad Yasmine',
        ubicacion: 'Marrakech, Morocco',
        descripcion: 'Un oasis de paz con un patio de piscina icónico en la Medina.',
        media: [
            "https://images.unsplash.com/photo-1569431597028-9f15037746b9?w=800",
            "https://images.unsplash.com/photo-1594917407351-403444062445?w=800",
            "https://images.unsplash.com/photo-1628169493923-94E56a2f4761?w=800",
            "https://images.unsplash.com/photo-1549973843-943e6a45e7b5?w=800",
            "https://images.unsplash.com/photo-1559941948-2b5a6c38b293?w=800",
            "https://images.unsplash.com/photo-1518423985043-43575f154344?w=800"
        ],
        rating: 4,
        price: 220
    },
    {
        nombre: 'Amangiri',
        ubicacion: 'Canyon Point, USA',
        descripcion: 'Lujo minimalista y aislamiento en el desierto de Utah.',
        media: [
            "https://images.unsplash.com/photo-1572488949834-585429355b25?w=800",
            "https://images.unsplash.com/photo-1615247001936-9a23108c353a?w=800",
            "https://images.unsplash.com/photo-1598328229976-92a54e52252b?w=800",
            "https://images.unsplash.com/photo-1566649774356-9ddd4765713b?w=800",
            "https://images.unsplash.com/photo-1542444599-4172b5363162?w=800",
            "https://images.unsplash.com/photo-1598462699734-655293246757?w=800"
        ],
        rating: 5,
        price: 2500
    },
    {
        nombre: 'Burj Al Arab Jumeirah',
        ubicacion: 'Dubai, UAE',
        descripcion: 'Lujo icónico en el hotel más famoso de Dubái.',
        media: [
            "https://images.unsplash.com/photo-1512428552673-219595fac076?w=800",
            "https://images.unsplash.com/photo-1528702748617-c67d94c9f6a3?w=800",
            "https://images.unsplash.com/photo-1506092306359-63d1da4235d7?w=800",
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
            "https://images.unsplash.com/photo-1598954849313-f872a0f8b1b5?w=800",
            "https://images.unsplash.com/photo-1535585209347-a410355486c7?w=800"
        ],
        rating: 5,
        price: 1800
    },
    {
        nombre: 'The Ritz-Carlton',
        ubicacion: 'Kyoto, Japan',
        descripcion: 'Elegancia japonesa y vistas al río Kamogawa.',
        media: [
            "https://images.unsplash.com/photo-1559624978-7013c74de359?w=800",
            "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800",
            "https://images.unsplash.com/photo-1584949093418-659a8ae62649?w=800",
            "https://images.unsplash.com/photo-1503792444264-92b465759349?w=800",
            "https://images.unsplash.com/photo-1594914753556-45a7b8064132?w=800",
            "https://images.unsplash.com/photo-1583796069502-a791d1e479a4?w=800"
        ],
        rating: 5,
        price: 1100
    },
    {
        nombre: 'Hotel du Cap-Eden-Roc',
        ubicacion: 'Antibes, France',
        descripcion: 'Glamour de la Riviera Francesa y lujo atemporal.',
        media: [
            "https://images.unsplash.com/photo-1601648439969-dd6247d4665d?w=800",
            "https://images.unsplash.com/photo-1606526131698-975916183424?w=800",
            "https://images.unsplash.com/photo-1622322528229-373c353a4789?w=800",
            "https://images.unsplash.com/photo-1599896541042-490395431671?w=800",
            "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?w=800",
            "https://images.unsplash.com/photo-1589923188900-85da5548644f?w=800"
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
