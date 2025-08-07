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
          { uri: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', category: 'LOBBY' },
          { uri: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', category: 'ROOM' },
          { uri: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', category: 'POOL' },
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
          { uri: 'https://images.unsplash.com/photo-1566633806327-68e169e455e4?w=800', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1621791334085-3b4a2f243a75?w=800', category: 'POOL' },
          { uri: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', category: 'RESTAURANT' },
          { uri: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', category: 'ROOM' },
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
            { uri: 'https://images.unsplash.com/photo-1618586348632-c65ac26b4a53?w=800', category: 'EXTERIOR' },
            { uri: 'https://images.unsplash.com/photo-1622322268832-9556e84d7159?w=800', category: 'ROOM' },
            { uri: 'https://images.unsplash.com/photo-1615882414197-d6a85f57a3e7?w=800', category: 'VIEW' },
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
          { uri: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', category: 'RESTAURANT' },
          { uri: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', category: 'ROOM' },
          { uri: 'https://images.unsplash.com/photo-1578680952199-b84a0d88b412?w=800', category: 'LOBBY' },
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
          { uri: 'https://images.unsplash.com/photo-1549923233-547437e2a9a7?w=800', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', category: 'LOBBY' },
          { uri: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', category: 'ROOM' },
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
          { uri: 'https://images.unsplash.com/photo-1560066982-959828628b43?w=800', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=800', category: 'LOBBY' },
          { uri: 'https://images.unsplash.com/photo-1590490360181-241d3c122556?w=800', category: 'ROOM' },
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
          { uri: 'https://images.unsplash.com/photo-1572116469696-34de0f175c4c?w=800', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?w=800', category: 'LOBBY' },
          { uri: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800', category: 'ROOM' },
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
          { uri: 'https://images.unsplash.com/photo-1627237648384-76580c257a17?w=800', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800', category: 'POOL' },
          { uri: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', category: 'ROOM' },
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
