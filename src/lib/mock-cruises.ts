
import type { CruisePackage } from './types';

export const recommendedCruises: CruisePackage[] = [
  {
    id: 'caribbean-colombia-01',
    name: 'Caribe Colombiano Mágico',
    ship: 'Explorer of the Seas',
    duration: '5 Noches',
    image: 'https://images.unsplash.com/photo-1574401569788-f1f13a453697?w=500',
    hint: 'colombia capurgana',
    videoUrl: 'https://videos.pexels.com/video-files/3089163/3089163-hd.mp4',
    carouselImages: [
      'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg',
      'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
      'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6'
    ],
    rating: 5,
    reviews: 1150,
    price: '780',
    itinerary: [
      { day: 1, port: 'Cartagena, Colombia', arrival: 'Embarque', departure: '18:00', countryCode: 'co', image: 'https://images.unsplash.com/photo-1599542222383-0c4a4e12395b' },
      { day: 2, port: 'Islas del Rosario', arrival: '08:00', departure: '17:00', countryCode: 'co', image: 'https://images.unsplash.com/photo-1574542544973-59c3d8b59d32' },
      { day: 3, port: 'Capurganá, Chocó', arrival: '08:00', departure: '17:00', countryCode: 'co', image: 'https://images.unsplash.com/photo-1574401569788-f1f13a453697' },
      { day: 4, port: 'Navegación', arrival: 'Alta Mar', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 5, port: 'Cartagena, Colombia', arrival: '06:00', departure: 'Desembarque', countryCode: 'co', image: 'https://images.unsplash.com/photo-1599542222383-0c4a4e12395b' },
    ],
  },
  {
    id: 'pacific-colombia-01',
    name: 'Aventura en el Pacífico',
    ship: 'National Geographic Quest',
    duration: '8 Noches',
    image: 'https://images.unsplash.com/photo-1605333146449-b5cd15f75c2d?w=500',
    hint: 'colombia pacific ocean',
    videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-hd.mp4',
    carouselImages: [
      'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg',
      'https://images.pexels.com/photos/176383/pexels-photo-176383.jpeg',
      'https://images.pexels.com/photos/159781/cruise-ship-deck-ocean-sea-159781.jpeg',
      'https://images.pexels.com/photos/1638283/pexels-photo-1638283.jpeg'
    ],
    rating: 5,
    reviews: 876,
    price: '1850',
    itinerary: [
      { day: 1, port: 'Buenaventura, Colombia', arrival: 'Embarque', departure: '18:00', countryCode: 'co', image: 'https://images.unsplash.com/photo-1605333146449-b5cd15f75c2d' },
      { day: 2, port: 'Bahía Solano, Chocó', arrival: '08:00', departure: '18:00', countryCode: 'co', image: 'https://images.unsplash.com/photo-1628042533390-3693241b1285' },
      { day: 3, port: 'Nuquí, Chocó', arrival: '07:00', departure: '16:00', countryCode: 'co', image: 'https://images.unsplash.com/photo-1606233767215-181172157d6b' },
      { day: 4, port: 'Avistamiento de Ballenas', arrival: 'Alta Mar', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1606233767215-181172157d6b' },
      { day: 5, port: 'Isla Gorgona', arrival: '09:00', departure: '19:00', countryCode: 'co', image: 'https://images.unsplash.com/photo-1593539193635-f726a578a1f8' },
      { day: 6, port: 'Navegación', arrival: 'Alta Mar', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 7, port: 'Tumaco, Nariño', arrival: '09:00', departure: '19:00', countryCode: 'co', image: 'https://images.unsplash.com/photo-1605333146449-b5cd15f75c2d' },
      { day: 8, port: 'Buenaventura, Colombia', arrival: '08:00', departure: 'Desembarque', countryCode: 'co', image: 'https://images.unsplash.com/photo-1605333146449-b5cd15f75c2d' },
    ]
  },
];
