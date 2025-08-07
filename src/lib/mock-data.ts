import { AmadeusHotelOffer } from '@/lib/types';

export const MOCK_HOTELS_DATA: AmadeusHotelOffer[] = [
    {
      type: 'hotel-offer',
      id: 'HB004',
      hotel: {
        hotelId: '138463', // Real Hotelbeds Code for The Click Clack Hotel Bogotá
        name: 'The Click Clack Hotel Bogotá',
        rating: '5',
        media: [
          { uri: 'https://i.ibb.co/3s61Bzy/click-clack-bogota-1.jpg', category: 'EXTERIOR' },
          { uri: 'https://i.ibb.co/YcXn3qH/click-clack-bogota-2.jpg', category: 'LOBBY' },
          { uri: 'https://i.ibb.co/yQW2Yxf/click-clack-bogota-3.jpg', category: 'ROOM' },
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
      id: 'HB002',
      hotel: {
        hotelId: '26639', // Real Hotelbeds Code for Charleston Santa Teresa
        name: 'Hotel Charleston Santa Teresa',
        rating: '5',
        media: [
          { uri: 'https://i.ibb.co/N1NqP3p/charleston-cartagena-1.jpg', category: 'EXTERIOR' },
          { uri: 'https://i.ibb.co/F8g7z4q/charleston-cartagena-2.jpg', category: 'POOL' },
          { uri: 'https://i.ibb.co/vqm0r2b/charleston-cartagena-3.jpg', category: 'ROOM' },
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
        hotelId: '448831', // Hotel Salento Real
        name: 'Salento Real Eje Cafetero',
        rating: '4',
        media: [
            { uri: 'https://i.ibb.co/L8BfVn7/salento-real-1.jpg', category: 'EXTERIOR' },
            { uri: 'https://i.ibb.co/hK7fJgS/salento-real-2.jpg', category: 'ROOM' },
            { uri: 'https://i.ibb.co/9vLvGzV/salento-real-3.jpg', category: 'VIEW' },
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
      id: 'INTL001',
      hotel: {
        hotelId: '2321', // Hotel Regina Opera Grands Boulevards
        name: 'Le Marais Charm & Spa',
        rating: '4',
        media: [
          { uri: 'https://i.ibb.co/k2xMhB5/marais-paris-1.jpg', category: 'EXTERIOR' },
          { uri: 'https://i.ibb.co/q9nKWg4/marais-paris-2.jpg', category: 'LOBBY' },
          { uri: 'https://i.ibb.co/68v4yY6/marais-paris-3.jpg', category: 'ROOM' },
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
        hotelId: '1074', // The New Yorker, A Wyndham Hotel
        name: 'The New Yorker Inn',
        rating: '4',
        media: [
          { uri: 'https://i.ibb.co/LdYy0g6/new-yorker-1.jpg', category: 'EXTERIOR' },
          { uri: 'https://i.ibb.co/tCKYm9h/new-yorker-2.jpg', category: 'LOBBY' },
          { uri: 'https://i.ibb.co/tPXyLwG/new-yorker-3.jpg', category: 'ROOM' },
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
      id: 'INTL004',
      hotel: {
        hotelId: '1692', // The Beverly Hills Hotel
        name: 'The Beverly Hills Hotel',
        rating: '5',
        media: [
          { uri: 'https://i.ibb.co/pwnxRq6/beverly-hills-1.jpg', category: 'EXTERIOR' },
          { uri: 'https://i.ibb.co/kHDFK3S/beverly-hills-2.jpg', category: 'POOL' },
          { uri: 'https://i.ibb.co/JqfQNcD/beverly-hills-3.jpg', category: 'ROOM' },
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
