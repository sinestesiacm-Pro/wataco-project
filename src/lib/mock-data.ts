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
        address: { lines: ['123 Luxury Ave'], postalCode: '33139', cityName: 'Miami Beach', countryCode: 'US' },
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
        name: 'City Center Boutique Hotel',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1568495048035-31a9f39502ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxib3V0aXF1ZSUyMGhvdGVsJTIwbmV3JTIweW9ya3xlbnwwfHx8fDE3NTM4Nzk0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?fit=crop&w=800&q=80', category: 'LOBBY' },
          { uri: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?fit=crop&w=800&q=80', category: 'ROOM' },
        ],
        address: { lines: ['456 Central St'], postalCode: '10001', cityName: 'New York', countryCode: 'US' },
        description: { lang: 'es', text: 'Ubicado en el corazón de la acción, nuestro hotel boutique ofrece un diseño elegante y un ambiente acogedor. Perfecto para viajeros de negocios y de placer que buscan explorar la ciudad.' },
        amenities: ['WIFI', 'RESTAURANT', 'BAR', 'AIR_CONDITIONING']
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
        name: 'Mountain View Lodge',
        rating: '3',
        media: [
            { uri: 'https://images.unsplash.com/photo-1597709955882-d2edac2e1f4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxNb3VudGFpbiUyMFZpZXclMjBMb2RnZSUyMERlbnZlciUyQyUyMFVTfGVufDB8fHx8MTc1Mzc5NTI2MXww&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
            { uri: 'https://images.unsplash.com/photo-1616594039964-ae9124a35e23?fit=crop&w=800&q=80', category: 'VIEW' },
            { uri: 'https://images.unsplash.com/photo-1598928922559-052a3539818d?fit=crop&w=800&q=80', category: 'ROOM' },
        ],
        address: { lines: ['789 Peak Rd'], postalCode: '80202', cityName: 'Denver', countryCode: 'US' },
        description: { lang: 'es', text: 'Escápate a la tranquilidad de las montañas. Nuestro albergue rústico ofrece un refugio acogedor con fácil acceso a rutas de senderismo y esquí. Disfruta de la chimenea en nuestra sala común.' },
        amenities: ['PARKING', 'WIFI', 'PETS_ALLOWED']
      },
      available: true,
      offers: [{
        id: 'offer-3',
        checkInDate: '2024-10-10',
        checkOutDate: '2024-10-15',
        price: { currency: 'USD', total: '150.00', base: '130.00' },
        room: { type: 'CABIN', description: { text: 'Cabaña acogedora con cocina pequeña.' }, amenities: ['KITCHENETTE', 'WIFI'] }
      }]
    },
     {
      type: 'hotel-offer',
      id: 'HB004',
      hotel: {
        hotelId: 'HB4',
        name: 'Playa Paraiso All-Inclusive',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwbGF5YSUyMGRlbCUyMGNhcm1lbiUyMHJlc29ydHxlbnwwfHx8fDE3NTM4Nzk1MDF8MA&ixlib=rb-4.1.0&q=80&w=1080', category: 'POOL' },
          { uri: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?fit=crop&w=800&q=80', category: 'BEACH' },
          { uri: 'https://images.unsplash.com/photo-1559539343-a8c63ce577b8?fit=crop&w=800&q=80', category: 'RESTAURANT' },
        ],
        address: { lines: ['1 Paradise Beach'], postalCode: '77710', cityName: 'Playa del Carmen', countryCode: 'MX' },
        description: { lang: 'es', text: 'Sumérgete en el paraíso en nuestro resort todo incluido. Con múltiples piscinas, restaurantes y acceso directo a una playa de arena blanca, tus vacaciones de ensueño comienzan aquí.' },
        amenities: ['SWIMMING_POOL', 'RESTAURANT', 'BAR', 'AIR_CONDITIONING', 'BEACH_ACCESS']
      },
      available: true,
      offers: [{
        id: 'offer-4',
        checkInDate: '2024-10-10',
        checkOutDate: '2024-10-15',
        price: { currency: 'USD', total: '380.00', base: '350.00' },
        room: { type: 'JUNIOR_SUITE', description: { text: 'Junior Suite con todo incluido.' }, amenities: ['BALCONY', 'WIFI'] }
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
        name: 'Tango de Mayo Hotel',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1711743266323-5badf42d4797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGV4dGVyaW9yfGVufDB8fHx8MTc1MzY1NDg2OHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'LOBBY' },
          { uri: 'https://images.unsplash.com/photo-1590490359838-8427515b1368?fit=crop&w=800&q=80', category: 'ROOM' },
        ],
        address: { lines: ['Thames 2313'], postalCode: 'C1425FIG', cityName: 'Buenos Aires', countryCode: 'AR' },
        description: { lang: 'es', text: 'Un hotel boutique inspirado en el arte y la cultura de Palermo. Cada habitación es una obra de arte única.' },
        amenities: ['WIFI', 'RESTAURANT', 'BAR', 'PETS_ALLOWED']
      },
      available: true,
      offers: [{
        id: 'offer-6',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '175.00', base: '155.00' },
        room: { type: 'ART_ROOM', description: { text: 'Habitación decorada por artistas locales.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB007',
      hotel: {
        hotelId: 'HB7',
        name: 'The Londoner',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxob3RlbCUyMGV4dGVyaW9yfGVufDB8fHx8MTc1MzY1NDg2OHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?fit=crop&w=800&q=80', category: 'POOL' },
        ],
        address: { lines: ['38 Leicester Square'], postalCode: 'WC2H 7DX', cityName: 'Londres', countryCode: 'GB' },
        description: { lang: 'es', text: 'Lujo superlativo en Leicester Square. Un hotel de 16 pisos con spa, múltiples restaurantes y un cine privado.' },
        amenities: ['SPA', 'FITNESS_CENTER', 'SWIMMING_POOL', 'RESTAURANT', 'BAR']
      },
      available: true,
      offers: [{
        id: 'offer-7',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '650.00', base: '600.00' },
        room: { type: 'LUXURY_SUITE', description: { text: 'Suite de lujo con mayordomo personal.' }, amenities: ['WIFI', 'MINIBAR'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB008',
      hotel: {
        hotelId: 'HB8',
        name: 'Roma Antica Suites',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1572033841097-440a79b8c067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxyb21lJTIwaG90ZWwlMjB2aWV3fGVufDB8fHx8MTc1Mzg3OTU5Nnww&ixlib=rb-4.1.0&q=80&w=1080', category: 'ROOM' },
        ],
        address: { lines: ['Via dei Fori Imperiali, 1'], postalCode: '00186', cityName: 'Roma', countryCode: 'IT' },
        description: { lang: 'es', text: 'Duerme entre la historia. Suites elegantes con vistas a ruinas antiguas, a pasos del Foro Romano.' },
        amenities: ['WIFI', 'AIR_CONDITIONING']
      },
      available: true,
      offers: [{
        id: 'offer-8',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '280.00', base: '250.00' },
        room: { type: 'HISTORIC_SUITE', description: { text: 'Suite con vistas al Foro.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB009',
      hotel: {
        hotelId: 'HB9',
        name: 'Sakura Garden Hotel',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1607320895054-c5c543e9a069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxob3RlbCUyMGV4dGVyaW9yfGVufDB8fHx8MTc1MzY1NDg2OHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'GARDEN' },
          { uri: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?fit=crop&w=800&q=80', category: 'EXTERIOR' },
        ],
        address: { lines: ['2-2-1 Nishi-Shinjuku'], postalCode: '163-8221', cityName: 'Tokio', countryCode: 'JP' },
        description: { lang: 'es', text: 'Un oasis de tranquilidad en medio de Shinjuku. Disfruta de nuestro jardín tradicional japonés y onsen.' },
        amenities: ['WIFI', 'SPA', 'RESTAURANT']
      },
      available: true,
      offers: [{
        id: 'offer-9',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '420.00', base: '380.00' },
        room: { type: 'GARDEN_VIEW_ROOM', description: { text: 'Habitación con vistas al jardín Sakura.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB010',
      hotel: {
        hotelId: 'HB10',
        name: 'Gran Vía Capital',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1607320883386-99e7b333392c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aG90ZWwlMjBleHRlcmlvcnxlbnwwfHx8fDE3NTM2NTQ4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
        ],
        address: { lines: ['Gran Vía, 42'], postalCode: '28013', cityName: 'Madrid', countryCode: 'ES' },
        description: { lang: 'es', text: 'En el corazón de la Gran Vía, este hotel ofrece vistas espectaculares y acceso directo a los teatros y tiendas más importantes de Madrid.' },
        amenities: ['WIFI', 'BAR', 'RESTAURANT']
      },
      available: true,
      offers: [{
        id: 'offer-10',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '250.00', base: '220.00' },
        room: { type: 'CITY_VIEW_ROOM', description: { text: 'Habitación con vistas a la Gran Vía.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB011',
      hotel: {
        hotelId: 'HB11',
        name: 'Le Marais Charm',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1553199221-0602b15bde9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxMZSUyME1hcmFpcyUyMENoYXJtJTIwUGFyJUMzJUFEcyUyQyUyMEZSfGVufDB8fHx8MTc1MzgwMTIyOXww&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
        ],
        address: { lines: ['24 Rue de Sévigné'], postalCode: '75004', cityName: 'París', countryCode: 'FR' },
        description: { lang: 'es', text: 'Encanto parisino en el vibrante barrio de Le Marais. Un hotel boutique con patio interior y un ambiente acogedor.' },
        amenities: ['WIFI', 'PETS_ALLOWED']
      },
      available: true,
      offers: [{
        id: 'offer-11',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '310.00', base: '280.00' },
        room: { type: 'CHARM_ROOM', description: { text: 'Habitación acogedora con vistas al patio.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB012',
      hotel: {
        hotelId: 'HB12',
        name: 'Dubai Sands Resort & Spa',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fit=crop&w=800&q=80', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1567636788276-40a4779554d5?fit=crop&w=800&q=80', category: 'POOL' },
        ],
        address: { lines: ['Jumeirah Beach Road'], postalCode: '341030', cityName: 'Dubai', countryCode: 'AE' },
        description: { lang: 'es', text: 'Un resort de lujo con playa privada y vistas al Burj Al Arab. Experimenta la opulencia de Dubai.' },
        amenities: ['SWIMMING_POOL', 'SPA', 'BEACH_ACCESS', 'RESTAURANT', 'FITNESS_CENTER']
      },
      available: true,
      offers: [{
        id: 'offer-12',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '550.00', base: '500.00' },
        room: { type: 'OCEAN_VIEW_SUITE', description: { text: 'Suite con vista panorámica al mar.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB013',
      hotel: {
        hotelId: 'HB13',
        name: 'Cancún Palms All-Inclusive',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1607320874448-d33f052651e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxob3RlbCUyMGV4dGVyaW9yfGVufDB8fHx8MTc1MzY1NDg2OHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'POOL' },
        ],
        address: { lines: ['Blvd. Kukulcan Km 14.5'], postalCode: '77500', cityName: 'Cancún', countryCode: 'MX' },
        description: { lang: 'es', text: 'Diversión para toda la familia en nuestro resort todo incluido. Múltiples piscinas, actividades diarias y club infantil.' },
        amenities: ['SWIMMING_POOL', 'BEACH_ACCESS', 'RESTAURANT', 'BAR']
      },
      available: true,
      offers: [{
        id: 'offer-13',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '340.00', base: '300.00' },
        room: { type: 'FAMILY_ROOM', description: { text: 'Habitación familiar con literas.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB014',
      hotel: {
        hotelId: 'HB14',
        name: 'The New Yorker Inn',
        rating: '3',
        media: [
          { uri: 'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxob3RlbCUyMGV4dGVyaW9yfGVufDB8fHx8MTc1MzY1NDg2OHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
        ],
        address: { lines: ['481 8th Ave'], postalCode: '10001', cityName: 'Nueva York', countryCode: 'US' },
        description: { lang: 'es', text: 'Una opción económica y funcional cerca de Penn Station. Perfecto para explorar Manhattan sin gastar una fortuna.' },
        amenities: ['WIFI']
      },
      available: true,
      offers: [{
        id: 'offer-14',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '180.00', base: '160.00' },
        room: { type: 'STANDARD_ROOM', description: { text: 'Habitación estándar funcional.' }, amenities: ['WIFI'] }
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
      id: 'HB016',
      hotel: {
        hotelId: 'HB16',
        name: 'Tango de Mayo Hotel',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1711743266323-5badf42d4797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGV4dGVyaW9yfGVufDB8fHx8MTc1MzY1NDg2OHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'LOBBY' },
          { uri: 'https://images.unsplash.com/photo-1590490359838-8427515b1368?fit=crop&w=800&q=80', category: 'ROOM' },
        ],
        address: { lines: ['Thames 2313'], postalCode: 'C1425FIG', cityName: 'Buenos Aires', countryCode: 'AR' },
        description: { lang: 'es', text: 'Un hotel boutique inspirado en el arte y la cultura de Palermo. Cada habitación es una obra de arte única.' },
        amenities: ['WIFI', 'RESTAURANT', 'BAR', 'PETS_ALLOWED']
      },
      available: true,
      offers: [{
        id: 'offer-16',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '175.00', base: '155.00' },
        room: { type: 'SUPERIOR_ROOM', description: { text: 'Habitación Superior con balcón francés.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB017',
      hotel: {
        hotelId: 'HB17',
        name: 'The Shard Views',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?fit=crop&w=800&q=80', category: 'ROOM' },
        ],
        address: { lines: ['32 London Bridge St'], postalCode: 'SE1 9SG', cityName: 'Londres', countryCode: 'GB' },
        description: { lang: 'es', text: 'Alojamiento de lujo en el icónico The Shard. Vistas inigualables de Londres desde tu habitación.' },
        amenities: ['SWIMMING_POOL', 'SPA', 'RESTAURANT', 'BAR']
      },
      available: true,
      offers: [{
        id: 'offer-17',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '800.00', base: '750.00' },
        room: { type: 'SKYLINE_SUITE', description: { text: 'Suite con vistas de 180 grados.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB018',
      hotel: {
        hotelId: 'HB18',
        name: 'Trastevere Living',
        rating: '3',
        media: [
          { uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?fit=crop&w=800&q=80', category: 'APARTMENT' },
        ],
        address: { lines: ['Via della Lungaretta, 95'], postalCode: '00153', cityName: 'Roma', countryCode: 'IT' },
        description: { lang: 'es', text: 'Apartamentos con cocina en el bohemio barrio de Trastevere. Vive como un local.' },
        amenities: ['WIFI', 'KITCHENETTE', 'AIR_CONDITIONING']
      },
      available: true,
      offers: [{
        id: 'offer-18',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '160.00', base: '140.00' },
        room: { type: 'APARTMENT', description: { text: 'Apartamento de un dormitorio.' }, amenities: ['WIFI', 'KITCHENETTE'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB019',
      hotel: {
        hotelId: 'HB19',
        name: 'Capsule Hotel Shinjuku',
        rating: '3',
        media: [
          { uri: 'https://images.unsplash.com/photo-1472510771109-39b92752a6b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxob3RlbCUyMGV4dGVyaW9yfGVufDB8fHx8MTc1MzY1NDg2OHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'CAPSULE' },
        ],
        address: { lines: ['1-16-9 Kabukicho'], postalCode: '160-0021', cityName: 'Tokio', countryCode: 'JP' },
        description: { lang: 'es', text: 'Una experiencia japonesa única. Duerme en una cápsula moderna y funcional en el corazón de Shinjuku.' },
        amenities: ['WIFI', 'SHARED_BATHROOM']
      },
      available: true,
      offers: [{
        id: 'offer-19',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '90.00', base: '80.00' },
        room: { type: 'CAPSULE', description: { text: 'Cápsula individual con TV y A/C.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB020',
      hotel: {
        hotelId: 'HB20',
        name: 'Hotel Puerta de América',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1564566088416-baa476f858eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxIb3RlbCUyMFB1ZXJ0YSUyMGRlJTIwQW0lQzMlQTlyaWNhJTIwTWFkcmlkfGVufDB8fHx8MTc1MzcyMDk1NHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'ARCHITECTURE' },
        ],
        address: { lines: ['Av. de América, 41'], postalCode: '28028', cityName: 'Madrid', countryCode: 'ES' },
        description: { lang: 'es', text: 'Un museo de arquitectura y diseño. Cada planta fue diseñada por un arquitecto de fama mundial.' },
        amenities: ['WIFI', 'RESTAURANT', 'BAR', 'FITNESS_CENTER', 'SWIMMING_POOL']
      },
      available: true,
      offers: [{
        id: 'offer-20',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '290.00', base: '260.00' },
        room: { type: 'DESIGN_ROOM', description: { text: 'Habitación diseñada por Zaha Hadid.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB021',
      hotel: {
        hotelId: 'HB21',
        name: 'Hotel Costes',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1621293954908-36a194503738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxob3RlbCUyMGNvc3RlcyUyMHBhcmlzJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzUzODc5ODA2fDA&ixlib=rb-4.1.0&q=80&w=1080', category: 'INTERIOR' },
        ],
        address: { lines: ['239-241 Rue Saint-Honoré'], postalCode: '75001', cityName: 'París', countryCode: 'FR' },
        description: { lang: 'es', text: 'Lujo, opulencia y un ambiente chic. Famoso por su patio, spa y su clientela de celebridades.' },
        amenities: ['WIFI', 'RESTAURANT', 'BAR', 'SPA', 'SWIMMING_POOL']
      },
      available: true,
      offers: [{
        id: 'offer-21',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '750.00', base: '700.00' },
        room: { type: 'PRESTIGE_ROOM', description: { text: 'Habitación con decoración barroca y lujosa.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB022',
      hotel: {
        hotelId: 'HB22',
        name: 'Armani Hotel Dubai',
        rating: '5',
        media: [
          { uri: 'https://images.unsplash.com/photo-1677129667171-92abd8740fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxhcm1hbmklMjBob3RlbCUyMGR1YmFpfGVufDB8fHx8MTc1Mzc5NDkxMXww&ixlib=rb-4.1.0&q=80&w=1080', category: 'VIEW' },
        ],
        address: { lines: ['Burj Khalifa'], postalCode: '888333', cityName: 'Dubai', countryCode: 'AE' },
        description: { lang: 'es', text: 'Ocupando 11 pisos del icónico Burj Khalifa, este hotel ofrece la quintaesencia del estilo y la hospitalidad de Armani.' },
        amenities: ['WIFI', 'RESTAURANT', 'BAR', 'SPA', 'FITNESS_CENTER']
      },
      available: true,
      offers: [{
        id: 'offer-22',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '950.00', base: '900.00' },
        room: { type: 'ARMANI_SUITE', description: { text: 'Suite con vistas a la fuente de Dubai.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB023',
      hotel: {
        hotelId: 'HB23',
        name: 'Tulum Jungle Lodge',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?fit=crop&w=800&q=80', category: 'EXTERIOR' },
        ],
        address: { lines: ['Carretera Tulum-Boca Paila Km 8.5'], postalCode: '77780', cityName: 'Cancún', countryCode: 'MX' },
        description: { lang: 'es', text: 'Cabañas rústicas y lujosas en medio de la jungla de Tulum. Desconéctate y relájate en la naturaleza.' },
        amenities: ['WIFI', 'RESTAURANT', 'BEACH_ACCESS', 'YOGA_CLASSES']
      },
      available: true,
      offers: [{
        id: 'offer-23',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '410.00', base: '380.00' },
        room: { type: 'JUNGLE_CABIN', description: { text: 'Cabaña con terraza privada en la jungla.' }, amenities: ['WIFI'] }
      }]
    },
    {
      type: 'hotel-offer',
      id: 'HB024',
      hotel: {
        hotelId: 'HB24',
        name: 'The Standard, High Line',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1665411615010-623db963a4f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8VGhlJTIwU3RhbmRhcmQlMkMlMjBIaWdoJTIwTGluZSUyME51ZXZhJTIwWW9yayUyQyUyMFVTfGVufDB8fHx8MTc1Mzc5NTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
        ],
        address: { lines: ['848 Washington St'], postalCode: '10014', cityName: 'Nueva York', countryCode: 'US' },
        description: { lang: 'es', text: 'Flotando sobre el High Line en el Meatpacking District, este hotel es famoso por sus vistas panorámicas, su azotea y su ambiente vibrante.' },
        amenities: ['WIFI', 'RESTAURANT', 'BAR', 'PETS_ALLOWED']
      },
      available: true,
      offers: [{
        id: 'offer-24',
        checkInDate: '2024-11-05',
        checkOutDate: '2024-11-10',
        price: { currency: 'USD', total: '450.00', base: '410.00' },
        room: { type: 'HIGH_LINE_VIEW_ROOM', description: { text: 'Habitación con ventanales de piso a techo.' }, amenities: ['WIFI', 'MINIBAR'] }
      }]
    }
  ];








