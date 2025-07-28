import type { CruisePackage } from './types';

export const recommendedCruises: CruisePackage[] = [
  {
    id: 'caribbean-dream-01',
    name: 'Sueño del Caribe Occidental',
    ship: 'Symphony of the Seas',
    duration: '7 Noches',
    image: 'https://images.unsplash.com/photo-1678377281995-ca41018f4937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxjcnVpc2UlMjBzaGlwJTIwY2FyaWJiZWFufGVufDB8fHx8MTc1MzcxNTkzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    videoUrl: 'https://videos.pexels.com/video-files/3089163/3089163-hd.mp4',
    carouselImages: [
      'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg',
      'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
      'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6'
    ],
    hint: 'cruise ship caribbean',
    rating: 5,
    reviews: 1150,
    price: '980',
    itinerary: [
      { day: 1, port: 'Miami, Florida', arrival: 'Embarque', departure: '16:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1518831032849-37435f336187' },
      { day: 2, port: 'Navegación', arrival: 'Alta Mar', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 3, port: 'Roatán, Honduras', arrival: '08:00', departure: '17:00', countryCode: 'hn', image: 'https://images.unsplash.com/photo-1616192758174-84518f73c38a' },
      { day: 4, port: 'Costa Maya, México', arrival: '08:00', departure: '17:00', countryCode: 'mx', image: 'https://images.unsplash.com/photo-1629814393963-490332857500' },
      { day: 5, port: 'Cozumel, México', arrival: '07:00', departure: '16:00', countryCode: 'mx', image: 'https://images.unsplash.com/photo-1601002244297-c8a75a7c2c96' },
      { day: 6, port: 'Navegación', arrival: 'Alta Mar', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 7, port: 'Miami, Florida', arrival: '06:00', departure: 'Desembarque', countryCode: 'us', image: 'https://images.unsplash.com/photo-1518831032849-37435f336187' },
    ],
  },
  {
    id: 'norway-fjords-01',
    name: 'Fiordos Noruegos',
    ship: 'MSC Euribia',
    duration: '8 Noches',
    image: 'https://images.unsplash.com/photo-1656490246727-a58085b306d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxub3J3YXklMjBmam9yZHN8ZW58MHx8fHwxNzUzNzE1OTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-hd.mp4',
    carouselImages: [
      'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg',
      'https://images.pexels.com/photos/176383/pexels-photo-176383.jpeg',
      'https://images.pexels.com/photos/159781/cruise-ship-deck-ocean-sea-159781.jpeg',
      'https://images.pexels.com/photos/1638283/pexels-photo-1638283.jpeg'
    ],
    hint: 'norway fjords',
    rating: 5,
    reviews: 876,
    price: '1450',
    itinerary: [
      { day: 1, port: 'Copenhague, Dinamarca', arrival: 'Embarque', departure: '18:00', countryCode: 'dk', image: 'https://images.unsplash.com/photo-1512470876302-9722aa2a015c' },
      { day: 2, port: 'Navegación', arrival: 'Alta Mar', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 3, port: 'Hellesylt/Geiranger, Noruega', arrival: '08:00', departure: '18:00', countryCode: 'no', image: 'https://images.unsplash.com/photo-1599120286134-84615d8f6d62' },
      { day: 4, port: 'Alesund, Noruega', arrival: '07:00', departure: '16:00', countryCode: 'no', image: 'https://images.unsplash.com/photo-1627999335805-a9094036f0e2' },
      { day: 5, port: 'Flam, Noruega', arrival: '09:00', departure: '19:00', countryCode: 'no', image: 'https://images.unsplash.com/photo-1582239401509-3286f9f688a4' },
      { day: 6, port: 'Navegación', arrival: 'Alta Mar', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 7, port: 'Kiel, Alemania', arrival: '09:00', departure: '19:00', countryCode: 'de', image: 'https://images.unsplash.com/photo-1596701871245-538355f75e9f' },
      { day: 8, port: 'Copenhague, Dinamarca', arrival: '08:00', departure: 'Desembarque', countryCode: 'dk', image: 'https://images.unsplash.com/photo-1512470876302-9722aa2a015c' },
    ]
  },
  {
    id: 'greek-isles-01',
    name: 'Islas Griegas',
    ship: 'Celebrity Ascent',
    duration: '10 Noches',
    image: 'https://images.unsplash.com/photo-1446822679794-fbd084d10491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Z3JlZWNlJTIwc2FudG9yaW5pfGVufDB8fHx8MTc1MzcxNTkzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    videoUrl: 'https://videos.pexels.com/video-files/853874/853874-hd.mp4',
    carouselImages: [
      'https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg',
      'https://images.pexels.com/photos/1831236/pexels-photo-1831236.jpeg',
      'https://images.pexels.com/photos/2088295/pexels-photo-2088295.jpeg',
      'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg'
    ],
    hint: 'greece santorini',
    rating: 4,
    reviews: 921,
    price: '1990',
    itinerary: [
      { day: 1, port: 'Atenas (Pireo), Grecia', arrival: 'Embarque', departure: '17:00', countryCode: 'gr', image: 'https://images.unsplash.com/photo-1590523278191-9c2d59644848' },
      { day: 2, port: 'Santorini, Grecia', arrival: '07:00', departure: '22:00', countryCode: 'gr', image: 'https://images.unsplash.com/photo-1563823434121-b85de130e0a4' },
      { day: 3, port: 'Kusadasi (Éfeso), Turquía', arrival: '08:00', departure: '20:00', countryCode: 'tr', image: 'https://images.unsplash.com/photo-1628325985838-844a4b26a6c4' },
      { day: 4, port: 'Mykonos, Grecia', arrival: '07:00', departure: '20:00', countryCode: 'gr', image: 'https://images.unsplash.com/photo-1575853670266-9815a5c60205' },
      { day: 5, port: 'Navegación', arrival: 'Alta Mar', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 6, port: 'Corfú, Grecia', arrival: '08:00', departure: '17:00', countryCode: 'gr', image: 'https://images.unsplash.com/photo-1616686417935-86b16e118991' },
      { day: 7, port: 'Kotor, Montenegro', arrival: '08:00', departure: '17:00', countryCode: 'me', image: 'https://images.unsplash.com/photo-1589369319985-e115eb36c0a0' },
      { day: 8, port: 'Dubrovnik, Croacia', arrival: '08:00', departure: '18:00', countryCode: 'hr', image: 'https://images.unsplash.com/photo-1560375981-80f19c0b17b3' },
      { day: 9, port: 'Navegación', arrival: 'Alta Mar', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 10, port: 'Atenas (Pireo), Grecia', arrival: '06:00', departure: 'Desembarque', countryCode: 'gr', image: 'https://images.unsplash.com/photo-1590523278191-9c2d59644848' },
    ]
  },
  {
    id: 'alaska-expedition-01',
    name: 'Expedición a Alaska',
    ship: 'Norwegian Bliss',
    duration: '7 Noches',
    image: 'https://images.unsplash.com/photo-1690053712746-de87328066d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YWxhc2thJTIwZ2xhY2llcnxlbnwwfHx8fDE3NTM3MTU5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    videoUrl: 'https://videos.pexels.com/video-files/4059941/4059941-hd.mp4',
    carouselImages: [
      'https://images.pexels.com/photos/156314/glacier-ice-climbing-ice-climber-156314.jpeg',
      'https://images.pexels.com/photos/3408973/pexels-photo-3408973.jpeg',
      'https://images.pexels.com/photos/2088203/pexels-photo-2088203.jpeg',
      'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg'
    ],
    hint: 'alaska glacier',
    rating: 5,
    reviews: 1043,
    price: '1250',
    itinerary: [
      { day: 1, port: 'Seattle, Washington', arrival: 'Embarque', departure: '17:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1595982301934-299130b65679' },
      { day: 2, port: 'Navegación', arrival: 'Alta Mar', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 3, port: 'Ketchikan, Alaska', arrival: '07:00', departure: '15:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1620656254582-3e639b75b436' },
      { day: 4, port: 'Juneau, Alaska', arrival: '11:00', departure: '22:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1627894767295-a01b7a26c442' },
      { day: 5, port: 'Skagway, Alaska', arrival: '08:00', departure: '17:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1551522439-8a4e69b52a55' },
      { day: 6, port: 'Victoria, Canadá', arrival: '14:00', departure: '22:00', countryCode: 'ca', image: 'https://images.unsplash.com/photo-1590176024976-13a64a3f2d2b' },
      { day: 7, port: 'Seattle, Washington', arrival: '06:00', departure: 'Desembarque', countryCode: 'us', image: 'https://images.unsplash.com/photo-1595982301934-299130b65679' },
    ]
  },
];
