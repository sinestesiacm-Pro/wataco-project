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
        name: 'The Click Clack Hotel',
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
      id: 'INTL001',
      hotel: {
        hotelId: 'INTL1',
        name: 'Le Marais Charm & Spa',
        rating: '4',
        media: [
          { uri: 'https://images.unsplash.com/photo-1553199221-0602b15bde9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxMZSUyME1hcmFpcyUyMENoYXJtJTIwUGFyJUMzJUFEcyUyQyUyMEZSfGVufDB8fHx8MTc1MzgwMTIyOXww&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
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
          { uri: 'https://images.unsplash.com/photo-1645382738209-110622cb069f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx0aGUlMjBuZXclMjB5b3JrZXIlMjBpbm4lMjB8ZW58MHx8fHwxNzUzODAxNjY5fDA&ixlib=rb-4.1.0&q=80&w=1080', category: 'EXTERIOR' },
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
          { uri: 'https://images.unsplash.com/photo-1637889408383-87f02910011a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxSb21hJTIwQW50aWNhJTIwU3VpdGVzJTIwUm9tYSUyQyUyMElUfGVufDB8fHx8MTc1MzgyMjIzOHww&ixlib=rb-4.1.0&q=80&w=1080', category: 'ROOM' },
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
          { uri: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?fit=crop&w=800&q=80', category: 'EXTERIOR' },
          { uri: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?fit=crop&w=800&q=80', category: 'POOL' },
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
