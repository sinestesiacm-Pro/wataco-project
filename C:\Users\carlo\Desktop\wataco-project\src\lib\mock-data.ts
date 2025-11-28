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
          { uri: 'https://www.clickclackhotel.com/bogota/wp-content/uploads/2019/11/1920x1080-INTERNA-CLICKCLACK-HOTEL-BOGOTA-NOCHE-ok.jpg', category: 'EXTERIOR' },
          { uri: 'https://live.staticflickr.com/65535/50531393638_405db3a364_b.jpg', category: 'LOBBY' },
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
          { uri: 'https://image-tc.galaxy.tf/wipng-ay18s0je9nlxfl0vj341d3sow/charleston-santa-teresa_wide.png?w=1920', category: 'EXTERIOR' },
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
      id: 'HB005',
      hotel: {
        hotelId: 'BOG005',
        name: 'Grand Hyatt Bogota',
        rating: '5',
        media: [],
        address: { lines: ['Cl. 24a #57-60'], postalCode: '111321', cityName: 'Bogotá', countryCode: 'CO' },
        description: { lang: 'es', text: 'Un oasis de lujo y sofisticación con uno de los spas más grandes de Latinoamérica. Disfruta de vistas panorámicas y una gastronomía excepcional.' },
        amenities: ['SWIMMING_POOL', 'SPA', 'FITNESS_CENTER', 'RESTAURANT', 'BAR']
      },
      available: true,
      offers: [{id: 'offer-5', checkInDate: '2024-10-10', price: { currency: 'USD', total: '310.00'}, room: { type: 'KING_ROOM' }}]
    },
    {
      type: 'hotel-offer',
      id: 'CTG006',
      hotel: {
        hotelId: 'CTG006',
        name: 'Hotel Boutique Casa San Agustín',
        rating: '5',
        media: [],
        address: { lines: ['Cl. de la Universidad #36-44'], postalCode: '130001', cityName: 'Cartagena', countryCode: 'CO' },
        description: { lang: 'es', text: 'Lujo refinado en tres casas coloniales restauradas. Su piscina en el patio central es un ícono de la ciudad amurallada.' },
        amenities: ['SWIMMING_POOL', 'RESTAURANT', 'SPA', 'WIFI']
      },
      available: true,
      offers: [{id: 'offer-6', checkInDate: '2024-10-10', price: { currency: 'USD', total: '650.00'}, room: { type: 'DELUXE_SUITE'}}]
    },
    {
      type: 'hotel-offer',
      id: 'BCN001',
      hotel: {
        hotelId: 'BCN001',
        name: 'W Barcelona',
        rating: '5',
        media: [],
        address: { lines: ['Plaça de la Rosa dels Vents, 1'], postalCode: '08039', cityName: 'Barcelona', countryCode: 'ES' },
        description: { lang: 'es', text: 'Icónico hotel en forma de vela en la playa de la Barceloneta, con vistas panorámicas, una animada azotea y un ambiente de lujo moderno.' },
        amenities: ['SWIMMING_POOL', 'BEACH_ACCESS', 'FITNESS_CENTER', 'SPA', 'BAR']
      },
      available: true,
      offers: [{id: 'offer-bcn1', checkInDate: '2024-10-10', price: { currency: 'USD', total: '480.00'}, room: { type: 'WONDERFUL_SKY'}}]
    },
    {
      type: 'hotel-offer',
      id: 'ROM001',
      hotel: {
        hotelId: 'ROM001',
        name: 'Hotel Eden - Dorchester Collection',
        rating: '5',
        media: [],
        address: { lines: ['Via Ludovisi, 49'], postalCode: '00187', cityName: 'Rome', countryCode: 'IT' },
        description: { lang: 'es', text: 'Elegancia romana con un espectacular bar en la azotea que ofrece vistas panorámicas de la Ciudad Eterna. Un refugio de lujo cerca de la Via Veneto.' },
        amenities: ['SPA', 'FITNESS_CENTER', 'RESTAURANT', 'BAR']
      },
      available: true,
      offers: [{id: 'offer-rom1', checkInDate: '2024-10-10', price: { currency: 'USD', total: '850.00'}, room: { type: 'CLASSIC_ROOM'}}]
    },
    {
      type: 'hotel-offer',
      id: 'PAR001',
      hotel: {
        hotelId: 'PAR001',
        name: 'Four Seasons Hotel George V',
        rating: '5',
        media: [],
        address: { lines: ['31 Av. George V'], postalCode: '75008', cityName: 'Paris', countryCode: 'FR' },
        description: { lang: 'es', text: 'Un icono del lujo parisino, a pocos pasos de los Campos Elíseos. Disfruta de sus tres restaurantes con estrellas Michelin y un servicio impecable.' },
        amenities: ['SPA', 'FITNESS_CENTER', 'RESTAURANT', 'SWIMMING_POOL']
      },
      available: true,
      offers: [{id: 'offer-par1', checkInDate: '2024-10-10', price: { currency: 'USD', total: '1500.00'}, room: { type: 'SUPERIOR_ROOM'}}]
    },
    {
      type: 'hotel-offer',
      id: 'NYC001',
      hotel: {
        hotelId: 'NYC001',
        name: 'The Plaza, A Fairmont Managed Hotel',
        rating: '5',
        media: [],
        address: { lines: ['768 5th Ave'], postalCode: '10019', cityName: 'New York', countryCode: 'US' },
        description: { lang: 'es', text: 'El hotel más famoso de Nueva York, un hito histórico en Central Park South. Lujo, elegancia y un servicio que ha definido generaciones.' },
        amenities: ['SPA', 'RESTAURANT', 'BAR', 'FITNESS_CENTER']
      },
      available: true,
      offers: [{id: 'offer-nyc1', checkInDate: '2024-10-10', price: { currency: 'USD', total: '950.00'}, room: { type: 'PLAZA_ROOM'}}]
    },
    {
      type: 'hotel-offer',
      id: 'TYO001',
      hotel: {
        hotelId: 'TYO001',
        name: 'Aman Tokyo',
        rating: '5',
        media: [],
        address: { lines: ['1-5-6 Otemachi, Chiyoda-ku'], postalCode: '100-0004', cityName: 'Tokyo', countryCode: 'JP' },
        description: { lang: 'es', text: 'Un santuario urbano con diseño japonés minimalista y vistas panorámicas de la ciudad y el Monte Fuji desde sus pisos más altos.' },
        amenities: ['SWIMMING_POOL', 'SPA', 'FITNESS_CENTER', 'RESTAURANT']
      },
      available: true,
      offers: [{id: 'offer-tyo1', checkInDate: '2024-10-10', price: { currency: 'USD', total: '1300.00'}, room: { type: 'DELUXE_ROOM'}}]
    },
    {
      type: 'hotel-offer',
      id: 'LON001',
      hotel: {
        hotelId: 'LON001',
        name: 'The Savoy',
        rating: '5',
        media: [],
        address: { lines: ['Strand'], postalCode: 'WC2R 0EZ', cityName: 'London', countryCode: 'GB' },
        description: { lang: 'es', text: 'Un icono eduardiano a orillas del Támesis, que combina un estilo atemporal con instalaciones modernas y un servicio de fama mundial.' },
        amenities: ['SWIMMING_POOL', 'SPA', 'FITNESS_CENTER', 'RESTAURANT', 'BAR']
      },
      available: true,
      offers: [{id: 'offer-lon1', checkInDate: '2024-10-10', price: { currency: 'USD', total: '850.00'}, room: { type: 'SUPERIOR_QUEEN'}}]
    },
    {
      type: 'hotel-offer',
      id: 'MIA001',
      hotel: {
        hotelId: 'MIA001',
        name: 'Faena Hotel Miami Beach',
        rating: '5',
        media: [],
        address: { lines: ['3201 Collins Ave'], postalCode: '33140', cityName: 'Miami', countryCode: 'US' },
        description: { lang: 'es', text: 'Un universo de arte, lujo y diseño de la mano de Alan Faena. Un teatro de experiencias con un servicio excepcional en Miami Beach.' },
        amenities: ['SWIMMING_POOL', 'BEACH_ACCESS', 'SPA', 'RESTAURANT', 'BAR']
      },
      available: true,
      offers: [{id: 'offer-mia1', checkInDate: '2024-10-10', price: { currency: 'USD', total: '800.00'}, room: { type: 'BAY_VIEW_JUNIOR'}}]
    }
  ];
