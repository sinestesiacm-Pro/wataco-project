import { AmadeusHotelOffer, Room } from '@/lib/types';

export const MOCK_ROOMS_DATA: Room[] = [
    {
        id: 'room-std-01',
        checkInDate: '2024-10-10',
        checkOutDate: '2024-10-15',
        price: { currency: 'USD', total: '250.00', base: '220.00' },
        room: {
            type: '2_STANDARD',
            description: { text: 'Habitación Estándar' },
            amenities: ['WIFI', 'MINIBAR'],
            photo: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            size: '25',
            bedType: '1 Cama Doble',
        }
    },
    {
        id: 'room-dlx-02',
        checkInDate: '2024-10-10',
        checkOutDate: '2024-10-15',
        price: { currency: 'USD', total: '380.00', base: '340.00' },
        room: {
            type: '2_DELUXE',
            description: { text: 'Suite Deluxe con Vistas' },
            amenities: ['WIFI', 'BALCONY', 'SAFE'],
            photo: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            size: '45',
            bedType: '1 Cama King',
        }
    },
    {
        id: 'room-fam-03',
        checkInDate: '2024-10-10',
        checkOutDate: '2024-10-15',
        price: { currency: 'USD', total: '450.00', base: '400.00' },
        room: {
            type: '4_FAMILY',
            description: { text: 'Habitación Familiar' },
            amenities: ['WIFI', 'KITCHENETTE'],
            photo: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            size: '55',
            bedType: '2 Camas Dobles',
        }
    },
];

export const MOCK_HOTELS_DATA: AmadeusHotelOffer[] = [
    {
      type: 'hotel-offer',
      id: 'HB004',
      hotel: {
        hotelId: '138463', // Real Hotelbeds Code for The Click Clack Hotel Bogotá
        name: 'The Click Clack Hotel Bogotá',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=500&auto=format&fit=crop', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop', category: 'LOBBY' },
          { uri: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=500&auto=format&fit=crop', category: 'ROOM' },
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
          { uri: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'EXTERIOR' },
          { uri: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'POOL' },
          { uri: 'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'ROOM' },
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
            { uri: 'https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'EXTERIOR' },
            { uri: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'ROOM' },
            { uri: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'VIEW' },
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
          { uri: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'EXTERIOR' },
          { uri: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'LOBBY' },
          { uri: 'https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'ROOM' },
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
          { uri: 'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'EXTERIOR' },
          { uri: 'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'LOBBY' },
          { uri: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'ROOM' },
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
          { uri: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'EXTERIOR' },
          { uri: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'POOL' },
          { uri: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'ROOM' },
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
