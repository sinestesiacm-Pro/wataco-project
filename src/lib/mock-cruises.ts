
import type { CruisePackage } from './types';

export const recommendedCruises: CruisePackage[] = [
  {
    id: 'caribbean-dream-01',
    name: 'Caribbean Dream',
    ship: 'Explorer of the Seas',
    duration: '7 Nights',
    region: 'CARIBBEAN',
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
      { day: 3, port: 'At Sea', arrival: 'High Seas', departure: '', isAtSea: true },
      { day: 4, port: 'Charlotte Amalie, St. Thomas', arrival: '08:00', departure: '18:00', countryCode: 'vi', image: 'https://images.unsplash.com/photo-1574401569788-f1f13a453697' },
      { day: 5, port: 'Philipsburg, St. Maarten', arrival: '07:00', departure: '17:00', countryCode: 'sx', image: 'https://images.unsplash.com/photo-1606233767215-181172157d6b' },
      { day: 6, port: 'At Sea', arrival: 'High Seas', departure: '', isAtSea: true },
      { day: 7, port: 'Miami, USA', arrival: '06:00', departure: 'Disembark', countryCode: 'us', image: 'https://images.unsplash.com/photo-1599542222383-0c4a4e12395b' },
    ],
  },
  {
    id: 'alaskan-adventure-01',
    name: 'Alaskan Adventure',
    ship: 'National Geographic Quest',
    duration: '8 Nights',
    region: 'ALASKA',
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
      { day: 1, port: 'Seattle, USA', arrival: 'Embark', departure: '18:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1502104034324-a3250214152c' },
      { day: 2, port: 'At Sea', arrival: 'High Seas', departure: '', isAtSea: true },
      { day: 3, port: 'Ketchikan, Alaska', arrival: '08:00', departure: '18:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1628042533390-3693241b1285' },
      { day: 4, port: 'Juneau, Alaska', arrival: '07:00', departure: '16:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1593539193635-f726a578a1f8' },
      { day: 5, port: 'Skagway, Alaska', arrival: '09:00', departure: '19:00', countryCode: 'us', image: 'https://images.unsplash.com/photo-1569429594182-159f0861503e' },
      { day: 6, port: 'Glacier Bay National Park', arrival: 'Scenic Cruising', departure: '', isAtSea: true, image: 'https://images.unsplash.com/photo-1527022206739-2c7edca55829' },
      { day: 7, port: 'At Sea', arrival: 'High Seas', departure: '', isAtSea: true },
      { day: 8, port: 'Seward, Alaska', arrival: '08:00', departure: 'Disembark', countryCode: 'us', image: 'https://images.unsplash.com/photo-1548849839-55448b11c3e1' },
    ]
  },
  {
    id: 'caribbean-celebration-02',
    name: 'Southern Caribbean Celebration',
    ship: 'Celebrity Apex',
    duration: '7 Nights',
    region: 'CARIBBEAN',
    image: 'https://images.unsplash.com/photo-1654241935439-71fba502eff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjYXJpYmUlMjB8ZW58MHx8fHwxNzU3Mjc3NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'modern cruise ship',
    videoUrl: 'https://videos.pexels.com/video-files/857251/857251-hd.mp4',
    carouselImages: [
      'https://images.pexels.com/photos/1831236/pexels-photo-1831236.jpeg',
      'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
      'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg'
    ],
    rating: 5,
    reviews: 940,
    price: '1120',
    itinerary: [
      { day: 1, port: 'San Juan, Puerto Rico', arrival: 'Embark', departure: '20:00', countryCode: 'pr', image: 'https://images.unsplash.com/photo-1588728876250-863a49339a13' },
      { day: 2, port: 'At Sea', arrival: 'High Seas', departure: '', isAtSea: true },
      { day: 3, port: 'Bridgetown, Barbados', arrival: '08:00', departure: '18:00', countryCode: 'bb', image: 'https://images.unsplash.com/photo-1584880965022-297a7913e2f0' },
      { day: 4, port: 'Castries, St. Lucia', arrival: '08:00', departure: '17:00', countryCode: 'lc', image: 'https://images.unsplash.com/photo-1596701976263-415f33362145' },
      { day: 5, port: "St. John's, Antigua", arrival: '08:00', departure: '17:00', countryCode: 'ag', image: 'https://images.unsplash.com/photo-1579453701853-99757c21c37b' },
      { day: 6, port: 'Basseterre, St. Kitts', arrival: '07:00', departure: '16:00', countryCode: 'kn', image: 'https://images.unsplash.com/photo-1597811902263-54898b50f75e' },
      { day: 7, port: 'San Juan, Puerto Rico', arrival: '06:00', departure: 'Disembark', countryCode: 'pr', image: 'https://images.unsplash.com/photo-1588728876250-863a49339a13' },
    ],
  },
  {
    id: 'mediterranean-majesty-01',
    name: 'Mediterranean Majesty',
    ship: 'MSC Grandiosa',
    duration: '7 Nights',
    region: 'EUROPE',
    image: 'https://images.unsplash.com/photo-1516496636080-14fb876e029d',
    hint: 'cruise ship europe',
    videoUrl: 'https://videos.pexels.com/video-files/855389/855389-hd.mp4',
    carouselImages: [
      'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg',
      'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg',
      'https://images.pexels.com/photos/2224850/pexels-photo-2224850.jpeg'
    ],
    rating: 4,
    reviews: 1320,
    price: '890',
    itinerary: [
      { day: 1, port: 'Barcelona, Spain', arrival: 'Embark', departure: '18:00', countryCode: 'es', image: 'https://images.unsplash.com/photo-1523531294919-467a62a94eda' },
      { day: 2, port: 'Marseille, France', arrival: '08:00', departure: '17:00', countryCode: 'fr', image: 'https://images.unsplash.com/photo-1563503200-a3593368153c' },
      { day: 3, port: 'Genoa, Italy', arrival: '08:00', departure: '18:00', countryCode: 'it', image: 'https://images.unsplash.com/photo-1588523773934-03a89e02316e' },
      { day: 4, port: 'Naples, Italy', arrival: '13:00', departure: '20:00', countryCode: 'it', image: 'https://images.unsplash.com/photo-1589133292419-14a4231b4716' },
      { day: 5, port: 'Messina, Sicily', arrival: '08:00', departure: '18:00', countryCode: 'it', image: 'https://images.unsplash.com/photo-1594959146524-73d8a6d63428' },
      { day: 6, port: 'Valletta, Malta', arrival: '08:00', departure: '17:00', countryCode: 'mt', image: 'https://images.unsplash.com/photo-1590796338575-8828f731112d' },
      { day: 7, port: 'At Sea', arrival: 'High Seas', departure: '', isAtSea: true },
    ]
  }
];
