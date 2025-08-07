import { AmadeusHotelOffer } from '@/lib/types';

export const MOCK_HOTELS_DATA: AmadeusHotelOffer[] = [
    {
      type: 'hotel-offer',
      id: 'HB001',
      hotel: {
        hotelId: 'HB1',
        name: 'The Grand Resort',
        rating: '5',
        media: [
          { uri: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg', category: 'EXTERIOR' },
          { uri: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg', category: 'LOBBY' },
          { uri: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg', category: 'ROOM' },
          { uri: 'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg', category: 'POOL' },
        ],
        address: { lines: ['123 Ocean Drive'], postalCode: '33139', cityName: 'Miami', countryCode: 'US' },
        description: { lang: 'es', text: 'Experimenta el máximo lujo en The Grand Resort, donde un servicio impecable y vistas impresionantes al océano te esperan. Disfruta de nuestra piscina infinita, spa de clase mundial y opciones gastronómicas gourmet.' },
        amenities: ['SWIMMING_POOL', 'SPA', 'WIFI', 'FITNESS_CENTER', 'RESTAURANT', 'PARKING']
      },
      available: true,
      offers: [{
        id: 'offer-1',
        checkInDate: '2024-10-10',
        checkOutDate: '2024-10-15',
        price: { currency: 'USD', total: '475.00', base: '420.00' },
        room: { type: 'DELUXE_ROOM', description: { text: 'Suite con vista al mar y balcón privado.' }, amenities: ['WIFI', 'MINIBAR', 'SAFE'] }
      },{
        id: 'offer-1-standard',
        checkInDate: '2024-10-10',
        checkOutDate: '2024-10-15',
        price: { currency: 'USD', total: '350.00', base: '300.00' },
        room: { type: 'STANDARD_ROOM', description: { text: 'Habitación estándar con vistas al jardín.' }, amenities: ['WIFI', 'SAFE'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB002',
      hotel: {
        hotelId: 'HB2',
        name: 'Hotel Charleston Santa Teresa',
        rating: '5',
        media: [
          { uri: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/500334863.jpg', category: 'EXTERIOR' },
          { uri: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/500334858.jpg', category: 'POOL' },
          { uri: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/500334854.jpg', category: 'RESTAURANT' },
          { uri: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/500334861.jpg', category: 'ROOM' },
        ],
        address: { lines: ['Cra. 3 #31-23'], postalCode: '130001', cityName: 'Cartagena', countryCode: 'CO' },
        description: { lang: 'es', text: 'Ubicado en el corazón de la ciudad amurallada, nuestro hotel boutique ofrece un diseño elegante y un ambiente acogedor. Perfecto para viajeros que buscan explorar la historia y el encanto de Cartagena.' },
        amenities: ['WIFI', 'RESTAURANT', 'BAR', 'AIR_CONDITIONING', 'SWIMMING_POOL']
      },
      available: true,
      offers: [{
        id: 'offer-2',
        checkInDate: '2024-10-10',
        checkOutDate: '2024-10-15',
        price: { currency: 'USD', total: '320.00', base: '280.00' },
        room: { type: 'DOUBLE_ROOM', description: { text: 'Habitación doble estándar con escritorio.' }, amenities: ['WIFI', 'DESK'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB003',
      hotel: {
        hotelId: 'HB3',
        name: 'Salento Real Eje Cafetero',
        rating: '4',
        media: [
            { uri: 'https://images.pexels.com/photos/1749823/pexels-photo-1749823.jpeg', category: 'EXTERIOR' },
            { uri: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg', category: 'ROOM' },
            { uri: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg', category: 'VIEW' },
        ],
        address: { lines: ['Cra. 6 #1-05'], postalCode: '631020', cityName: 'Salento', countryCode: 'CO' },
        description: { lang: 'es', text: 'Escápate a la tranquilidad de las montañas cafeteras. Nuestro hotel ofrece un refugio acogedor con fácil acceso a la cultura del café y el Valle de Cocora.' },
        amenities: ['PARKING', 'WIFI', 'PETS_ALLOWED']
      },
      available: true,
      offers: [{
        id: 'offer-3',
        checkInDate: '2024-10-10',
        checkOutDate: '2024-10-15',
        price: { currency: 'USD', total: '150.00', base: '130.00' },
        room: { type: 'CABIN', description: { text: 'Cabaña acogedora con vistas a las montañas.' }, amenities: ['KITCHENETTE', 'WIFI'] }
      }]
    },
     {
      type: 'hotel-offer',
      id: 'HB004',
      hotel: {
        hotelId: 'HB4',
        name: 'The Click Clack Hotel',
        rating: '5',
        media: [
          { uri: 'https://pdt.multimediarepository.testing.amadeus.com/pdt-images/17/99/M/00/01/59/81/MD/1799M00015981MD.jpg', category: 'EXTERIOR' },
          { uri: 'https://pdt.multimediarepository.testing.amadeus.com/pdt-images/17/99/M/00/01/59/81/OD/1799M00015981OD.jpg', category: 'RESTAURANT' },
          { uri: 'https://pdt.multimediarepository.testing.amadeus.com/pdt-images/17/99/M/00/01/59/81/RD/1799M00015981RD.jpg', category: 'ROOM' },
          { uri: 'https://pdt.multimediarepository.testing.amadeus.com/pdt-images/17/99/M/00/01/59/81/GD/1799M00015981GD.jpg', category: 'LOBBY' },
        ],
        address: { lines: ['Cra. 11 #93-77'], postalCode: '110221', cityName: 'Bogotá', countryCode: 'CO' },
        description: { lang: 'es', text: 'Sumérgete en el diseño y la creatividad en este hotel único en el corazón de Bogotá. Disfruta de su rooftop bar, eventos culturales y habitaciones llenas de detalles sorprendentes.' },
        amenities: ['RESTAURANT', 'BAR', 'AIR_CONDITIONING', 'WIFI']
      },
      available: true,
      offers: [{
        id: 'offer-4',
        checkInDate: '2024-10-10',
        checkOutDate: '2024-10-15',
        price: { currency: 'USD', total: '280.00', base: '250.00' },
        room: { type: 'JUNIOR_SUITE', description: { text: 'Junior Suite con diseño de autor.' }, amenities: ['BALCONY', 'WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'INTL001',
      hotel: {
        hotelId: 'INTL1',
        name: 'Le Marais Charm & Spa',
        rating: '4',
        media: [
          { uri: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg', category: 'EXTERIOR' },
          { uri: 'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg', category: 'LOBBY' },
          { uri: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg', category: 'ROOM' },
        ],
        address: { lines: ['97 Rue des Archives'], postalCode: '75003', cityName: 'Paris', countryCode: 'FR' },
        description: { lang: 'es', text: 'Encantador hotel en el corazón de Le Marais, cerca de la Place des Vosges y el Museo Picasso.' },
        amenities: ['WIFI', 'SPA', 'AIR_CONDITIONING', 'PETS_ALLOWED']
      },
      available: true,
      offers: [{
        id: 'offer-5',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '380.00', base: '350.00' },
        room: { type: 'CHARM_ROOM', description: { text: 'Habitación con encanto parisino.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'INTL002',
      hotel: {
        hotelId: 'INTL2',
        name: 'The New Yorker Inn',
        rating: '4',
        media: [
          { uri: 'https://images.pexels.com/photos/2844474/pexels-photo-2844474.jpeg', category: 'EXTERIOR' },
          { uri: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg', category: 'LOBBY' },
          { uri: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg', category: 'ROOM' },
        ],
        address: { lines: ['481 8th Ave'], postalCode: '10001', cityName: 'New York', countryCode: 'US' },
        description: { lang: 'es', text: 'Hotel icónico con arquitectura Art Deco, a pasos de Times Square y el Madison Square Garden.' },
        amenities: ['WIFI', 'FITNESS_CENTER', 'RESTAURANT', 'BAR']
      },
      available: true,
      offers: [{
        id: 'offer-6',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '410.00', base: '360.00' },
        room: { type: 'SKYLINE_SUITE', description: { text: 'Suite con vistas al horizonte de Manhattan.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'INTL003',
      hotel: {
        hotelId: 'INTL3',
        name: 'Rome Antica Suites',
        rating: '5',
        media: [
          { uri: 'https://images.pexels.com/photos/3225524/pexels-photo-3225524.jpeg', category: 'EXTERIOR' },
          { uri: 'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg', category: 'LOBBY' },
          { uri: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg', category: 'ROOM' },
        ],
        address: { lines: ['Via del Corso 113'], postalCode: '00186', cityName: 'Rome', countryCode: 'IT' },
        description: { lang: 'es', text: 'Suites de lujo con vistas al Panteón. Vive la historia de Roma con el confort moderno.' },
        amenities: ['WIFI', 'AIR_CONDITIONING']
      },
      available: true,
      offers: [{
        id: 'offer-7',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '350.00', base: '310.00' },
        room: { type: 'HISTORIC_SUITE', description: { text: 'Suite con frescos originales.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'INTL004',
      hotel: {
        hotelId: 'INTL4',
        name: 'The Beverly Hills Hotel',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1627237648384-76580c2c7a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8VGhlJTIwQmV2ZXJseSUyMEhpbGxzJTIwSG90ZWx8ZW58MHx8fHwxNzU0NTU2NDM5fDA&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?fit=crop&w=800&q=80', category: 'POOL' },
          { uri: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?fit=crop&w=800&q=80', category: 'ROOM' },
        ],
        address: { lines: ['9641 Sunset Blvd'], postalCode: '90210', cityName: 'Beverly Hills', countryCode: 'US' },
        description: { lang: 'es', text: 'El legendario "Palacio Rosa" ofrece glamour atemporal y un servicio de primera clase en el corazón de Beverly Hills.' },
        amenities: ['SWIMMING_POOL', 'SPA', 'BEACH_ACCESS', 'RESTAURANT', 'FITNESS_CENTER']
      },
      available: true,
      offers: [{
        id: 'offer-8',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '780.00', base: '700.00' },
        room: { type: 'OCEAN_VIEW_SUITE', description: { text: 'Bungalow privado con piscina.' }, amenities: ['WIFI'] }
      }]
    }
  ];
