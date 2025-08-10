
import type { CruisePackage } from './types';

export const recommendedCruises: CruisePackage[] = [
  {
    id: 'caribbean-dream-01',
    name: 'Caribbean Dream',
    ship: 'Explorer of the Seas',
    duration: '7 Nights',
    image: 'https://images.unsplash.com/photo-1662154477069-c8c0a5361a4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjYXJpYmJlYW4lMjBiZWFjaHxlbnwwfHx8fDE3NTQ1NTY2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'caribbean beach',
    videoUrl: 'https://videos.pexels.com/video-files/3089163/3089163-hd.mp4',
    carouselImages: [
      'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg',
      'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
      'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6'
    ],
    rating: 5,
    reviews: 1150,
    price: '980',
    itinerary: [
      { day: 1, port: 'Miami, USA', arrival: 'Embark', departure: '18:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1599542222383-0c4a4e12395b' },
      { day: 2, port: 'Nassau, Bahamas', arrival: '08:00', departure: '17:00', countryCode: 'bs', image: 'https://images.unsplash.com/photo-1574542544973-59c3d8b59d32' },
      { day: 3, port: 'At Sea', arrival: 'High Seas', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 4, port: 'Charlotte Amalie, St. Thomas', arrival: '08:00', departure: '18:00', countryCode: 'vi', image: 'https://images.unsplash.com/photo-1574401569788-f1f13a453697' },
      { day: 5, port: 'Philipsburg, St. Maarten', arrival: '07:00', departure: '17:00', countryCode: 'sx', image: 'https://images.unsplash.com/photo-1606233767215-181172157d6b' },
      { day: 6, port: 'At Sea', arrival: 'High Seas', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 7, port: 'Miami, USA', arrival: '06:00', departure: 'Disembark', countryCode: 'us', image: 'https://images.unsplash.com/photo-1599542222383-0c4a4e12395b' },
    ],
  },
  {
    id: 'alaskan-adventure-01',
    name: 'Alaskan Adventure',
    ship: 'National Geographic Quest',
    duration: '8 Nights',
    image: 'https://images.unsplash.com/photo-1527022206739-2c7edca55829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YWxhc2thJTIwZ2xhY2llcnxlbnwwfHx8fDE3NTQ1NTY2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'alaska glacier',
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
      { day: 1, port: 'Seattle, USA', arrival: 'Embark', departure: '18:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1605333146449-b5cd15f75c2d' },
      { day: 2, port: 'At Sea', arrival: 'High Seas', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 3, port: 'Ketchikan, Alaska', arrival: '08:00', departure: '18:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1628042533390-3693241b1285' },
      { day: 4, port: 'Juneau, Alaska', arrival: '07:00', departure: '16:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1606233767215-181172157d6b' },
      { day: 5, port: 'Skagway, Alaska', arrival: '09:00', departure: '19:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1593539193635-f726a578a1f8' },
      { day: 6, port: 'Glacier Bay National Park', arrival: 'Scenic Cruising', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1605333146449-b5cd15f75c2d' },
      { day: 7, port: 'At Sea', arrival: 'High Seas', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1499946252333-28913915bab8' },
      { day: 8, port: 'Seward, Alaska', arrival: '08:00', departure: 'Disembark', countryCode: 'us', image: 'https://images.unsplash.com/photo-1605333146449-b5cd15f75c2d' },
    ]
  },
];
