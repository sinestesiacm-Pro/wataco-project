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
          { uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=800&q=80', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?fit=crop&w=800&q=80', category: 'LOBBY' },
          { uri: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?fit=crop&w=800&q=80', category: 'POOL' },
          { uri: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?fit=crop&w=800&q=80', category: 'ROOM' },
        ],
        address: { lines: ['Carrera 1 #17-10'], postalCode: '470006', cityName: 'Santa Marta', countryCode: 'CO' },
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
          { uri: 'https://images.unsplash.com/photo-1549294413-26f195200c16?fit=crop&w=800&q=80', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?fit=crop&w=800&q=80', category: 'LOBBY' },
          { uri: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?fit=crop&w=800&q=80', category: 'ROOM' },
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
            { uri: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?fit=crop&w=800&q=80', category: 'EXTERIOR' },
            { uri: 'https://images.unsplash.com/photo-1616594039964-ae9124a35e23?fit=crop&w=800&q=80', category: 'VIEW' },
            { uri: 'https://images.unsplash.com/photo-1598928922559-052a3539818d?fit=crop&w=800&q=80', category: 'ROOM' },
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
        name: 'Click Clack Hotel Bogotá',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?fit=crop&w=800&q=80', category: 'POOL' },
          { uri: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?fit=crop&w=800&q=80', category: 'BEACH' },
          { uri: 'https://images.unsplash.com/photo-1559539343-a8c63ce577b8?fit=crop&w=800&q=80', category: 'RESTAURANT' },
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
      id: 'HB005',
      hotel: {
        hotelId: 'HB5',
        name: 'Urban Oasis Lofts',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1565329921943-7e537b7a2ea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtZWRlbGxpbiUyMGVsJTIwcG9ibGFkbyUyMGFwYXJ0bWVudHxlbnwwfHx8fDE3NTM4Nzk1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080', category: 'LIVING_AREA' },
          { uri: 'https://images.unsplash.com/photo-1588855426540-5d18916a0d20?fit=crop&w=800&q=80', category: 'BEDROOM' },
        ],
        address: { lines: ['Calle 10 #43A-30'], postalCode: '050021', cityName: 'Medellín', countryCode: 'CO' },
        description: { lang: 'es', text: 'Lofts modernos en el corazón de El Poblado. Perfecto para estancias largas y viajeros que buscan independencia y estilo.' },
        amenities: ['WIFI', 'KITCHENETTE', 'AIR_CONDITIONING', 'PARKING']
      },
      available: true,
      offers: [{
        id: 'offer-5',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '210.00', base: '190.00' },
        room: { type: 'LOFT', description: { text: 'Loft de dos niveles con cocina completa.' }, amenities: ['WIFI', 'KITCHENETTE'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB006',
      hotel: {
        hotelId: 'HB6',
        name: 'Casa San Agustín',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?fit=crop&w=800&q=80', category: 'LOBBY' },
          { uri: 'https://images.unsplash.com/photo-1590490359838-8427515b1368?fit=crop&w=800&q=80', category: 'ROOM' },
        ],
        address: { lines: ['Calle de la Universidad #36-44'], postalCode: '130001', cityName: 'Cartagena', countryCode: 'CO' },
        description: { lang: 'es', text: 'Un lujoso hotel boutique que combina la arquitectura colonial con el diseño contemporáneo en el centro histórico de Cartagena.' },
        amenities: ['WIFI', 'RESTAURANT', 'BAR', 'PETS_ALLOWED', 'SWIMMING_POOL']
      },
      available: true,
      offers: [{
        id: 'offer-6',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '450.00', base: '410.00' },
        room: { type: 'ART_ROOM', description: { text: 'Habitación decorada por artistas locales.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB007',
      hotel: {
        hotelId: 'HB7',
        name: 'The Charlee Hotel',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?fit=crop&w=800&q=80', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?fit=crop&w=800&q=80', category: 'POOL' },
        ],
        address: { lines: ['Calle 9A #37-16'], postalCode: '050021', cityName: 'Medellín', countryCode: 'CO' },
        description: { lang: 'es', text: 'Lujo y arte en el corazón de la vida nocturna de Medellín. Disfruta de su icónico rooftop bar y piscina con vistas a la ciudad.' },
        amenities: ['SPA', 'FITNESS_CENTER', 'SWIMMING_POOL', 'RESTAURANT', 'BAR']
      },
      available: true,
      offers: [{
        id: 'offer-7',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '290.00', base: '260.00' },
        room: { type: 'LUXURY_SUITE', description: { text: 'Suite de lujo con obras de arte originales.' }, amenities: ['WIFI', 'MINIBAR'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB008',
      hotel: {
        hotelId: 'HB8',
        name: 'Hotel Intercontinental Cali',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1637889408383-87f02910011a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxSb21hJTIwQW50aWNhJTIwU3VpdGVzJTIwUm9tYSUyQyUyMElUfGVufDB8fHx8MTc1Mzg3MjIzOHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'ROOM' },
        ],
        address: { lines: ['Avenida Colombia #2-72'], postalCode: '760044', cityName: 'Cali', countryCode: 'CO' },
        description: { lang: 'es', text: 'Un ícono de la ciudad con una ubicación privilegiada. Ofrece amplias instalaciones, piscinas y una variada oferta gastronómica.' },
        amenities: ['WIFI', 'AIR_CONDITIONING', 'SWIMMING_POOL', 'RESTAURANT']
      },
      available: true,
      offers: [{
        id: 'offer-8',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '180.00', base: '160.00' },
        room: { type: 'HISTORIC_SUITE', description: { text: 'Suite con vistas al río Cali.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB009',
      hotel: {
        hotelId: 'HB9',
        name: 'Hotel Dann Carlton Bucaramanga',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1607320895054-c5c543e9a069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxob3RlbCUyMGV4dGVyaW9yfGVufDB8fHx8MTc1MzY1NDg2OHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'GARDEN' },
          { uri: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?fit=crop&w=800&q=80', category: 'EXTERIOR' },
        ],
        address: { lines: ['Calle 47 #28-43'], postalCode: '680003', cityName: 'Bucaramanga', countryCode: 'CO' },
        description: { lang: 'es', text: 'Lujo y exclusividad en la "Ciudad Bonita". Disfruta de su rooftop con piscina, spa y vistas panorámicas de la ciudad.' },
        amenities: ['WIFI', 'SPA', 'RESTAURANT', 'SWIMMING_POOL']
      },
      available: true,
      offers: [{
        id: 'offer-9',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '190.00', base: '170.00' },
        room: { type: 'GARDEN_VIEW_ROOM', description: { text: 'Habitación ejecutiva con vistas a la ciudad.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB010',
      hotel: {
        hotelId: 'HB10',
        name: 'Hotel Caribe by Faranda Grand',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1607320883386-99e7b333392c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aG90ZWwlMjBleHRlcmlvcnxlbnwwfHx8fDE3NTM2NTQ4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
        ],
        address: { lines: ['Cra. 1 #2-87, Bocagrande'], postalCode: '130001', cityName: 'Cartagena', countryCode: 'CO' },
        description: { lang: 'es', text: 'Un hotel histórico y emblemático en Cartagena, con extensos jardines tropicales, una enorme piscina y acceso directo a la playa de Bocagrande.' },
        amenities: ['WIFI', 'BAR', 'RESTAURANT', 'SWIMMING_POOL', 'BEACH_ACCESS']
      },
      available: true,
      offers: [{
        id: 'offer-10',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '250.00', base: '220.00' },
        room: { type: 'CITY_VIEW_ROOM', description: { text: 'Habitación con vistas a los jardines.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB011',
      hotel: {
        hotelId: 'HB11',
        name: 'Hotel Las Américas Casa de Playa',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1553199221-0602b15bde9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxMZSUyME1hcmFpcyUyMENoYXJtJTIwUGFyJUMzJUFEcyUyQyUyMEZSfGVufDB8fHx8MTc1MzgwMTIyOXww&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
        ],
        address: { lines: ['Anillo Vial, Sector Cielo Mar'], postalCode: '130001', cityName: 'Cartagena', countryCode: 'CO' },
        description: { lang: 'es', text: 'Un completo resort tropical con múltiples piscinas, toboganes de agua y un sinfín de actividades para toda la familia frente al mar Caribe.' },
        amenities: ['WIFI', 'PETS_ALLOWED', 'SWIMMING_POOL', 'RESTAURANT']
      },
      available: true,
      offers: [{
        id: 'offer-11',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '310.00', base: '280.00' },
        room: { type: 'CHARM_ROOM', description: { text: 'Habitación tropical con balcón.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB012',
      hotel: {
        hotelId: 'HB12',
        name: 'Bioxury Hotel',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fit=crop&w=800&q=80', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1567636788276-40a4779554d5?fit=crop&w=800&q=80', category: 'POOL' },
        ],
        address: { lines: ['Cra. 11a #80-14'], postalCode: '110221', cityName: 'Bogotá', countryCode: 'CO' },
        description: { lang: 'es', text: 'Un hotel de lujo con un enfoque en la sostenibilidad y el diseño biofílico. Disfruta de su restaurante orgánico y su ambiente sofisticado.' },
        amenities: ['SWIMMING_POOL', 'SPA', 'BEACH_ACCESS', 'RESTAURANT', 'FITNESS_CENTER']
      },
      available: true,
      offers: [{
        id: 'offer-12',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '240.00', base: '210.00' },
        room: { type: 'OCEAN_VIEW_SUITE', description: { text: 'Suite de diseño con terraza privada.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB013',
      hotel: {
        hotelId: 'HB13',
        name: 'Decameron Panaca',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1607320874448-d33f052651e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxob3RlbCUyMGV4dGVyaW9yfGVufDB8fHx8MTc1MzY1NDg2OHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'POOL' },
        ],
        address: { lines: ['Km 7 Vereda Kerman'], postalCode: '634027', cityName: 'Quimbaya', countryCode: 'CO' },
        description: { lang: 'es', text: 'Un resort todo incluido inmerso en la cultura cafetera y agropecuaria. Ideal para familias, con acceso directo al Parque PANACA.' },
        amenities: ['SWIMMING_POOL', 'BEACH_ACCESS', 'RESTAURANT', 'BAR']
      },
      available: true,
      offers: [{
        id: 'offer-13',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '280.00', base: '250.00' },
        room: { type: 'FAMILY_ROOM', description: { text: 'Habitación familiar rodeada de naturaleza.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB014',
      hotel: {
        hotelId: 'HB14',
        name: 'Hotel Movich Casa del Alférez',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1645382738209-110622cb069f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx0aGUlMjBuZXclMjB5b3JrZXIlMjBpbm4lMjB8ZW58MHx8fHwxNzUzODAxNjY5fDA&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
        ],
        address: { lines: ['Cra. 10 # 9-45'], postalCode: '760044', cityName: 'Cali', countryCode: 'CO' },
        description: { lang: 'es', text: 'Un hotel boutique de lujo en el tradicional barrio de Granada, conocido por su gastronomía y diseño. Ofrece una experiencia exclusiva y personalizada.' },
        amenities: ['WIFI', 'RESTAURANT', 'BAR']
      },
      available: true,
      offers: [{
        id: 'offer-14',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '260.00', base: '230.00' },
        room: { type: 'STANDARD_ROOM', description: { text: 'Habitación de lujo con amenities premium.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB015',
      hotel: {
        hotelId: 'HB15',
        name: 'Medellín Verde',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?fit=crop&w=800&q=80', category: 'POOL' },
        ],
        address: { lines: ['Vereda El Escobero'], postalCode: '050010', cityName: 'Medellín', countryCode: 'CO' },
        description: { lang: 'es', text: 'Un hotel ecológico y sostenible en las colinas de Envigado, con vistas panorámicas de la ciudad.' },
        amenities: ['WIFI', 'RESTAURANT']
      },
      available: true,
      offers: [{
        id: 'offer-15',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '230.00', base: '210.00' },
        room: { type: 'ECO_SUITE', description: { text: 'Suite con materiales reciclados y vistas a la ciudad.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB017',
      hotel: {
        hotelId: 'HB17',
        name: 'W Bogotá',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?fit=crop&w=800&q=80', category: 'ROOM' },
        ],
        address: { lines: ['Ak. 9 #115-30'], postalCode: '110111', cityName: 'Bogotá', countryCode: 'CO' },
        description: { lang: 'es', text: 'Inspirado en la leyenda de El Dorado, el W Bogotá combina lujo moderno con la cultura local. Disfruta de su Away Spa y su vibrante vida nocturna.' },
        amenities: ['SWIMMING_POOL', 'SPA', 'RESTAURANT', 'BAR']
      },
      available: true,
      offers: [{
        id: 'offer-17',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '380.00', base: '350.00' },
        room: { type: 'SKYLINE_SUITE', description: { text: 'Suite con vistas de 180 grados.' }, amenities: ['WIFI'] }
      }]
    },
  ];
