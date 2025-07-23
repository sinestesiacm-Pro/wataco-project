'use server';

import { FlightData, Airport, AirportSearchResponse, AmadeusHotelOffer, PackageData, CruiseData } from '@/lib/types';
import { z } from 'zod';
import { getAmadeusToken } from '@/lib/amadeus-auth';

const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';
const HOTELBEDS_API_KEY = "7b693caa6d94519ce17374929121537f";

const searchSchema = z.object({
  origin: z.string().min(3).max(3),
  destination: z.string().min(3).max(3),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  adults: z.number().int().min(1),
  children: z.number().int().min(0).optional(),
  infants: z.number().int().min(0).optional(),
});

export async function searchFlights(params: {
  origin: string,
  destination: string,
  departureDate: string,
  returnDate?: string,
  adults: number,
  children?: number,
  infants?: number,
}): Promise<{ success: boolean; data?: FlightData; error?: string }> {
  
  const validation = searchSchema.safeParse(params);
  if (!validation.success) {
    return { success: false, error: 'Parámetros de búsqueda inválidos.' };
  }

  const { origin, destination, departureDate, returnDate, adults, children, infants } = validation.data;

  try {
    const token = await getAmadeusToken();

    const searchParams = new URLSearchParams({
      originLocationCode: origin.toUpperCase(),
      destinationLocationCode: destination.toUpperCase(),
      departureDate: departureDate,
      adults: adults.toString(),
      max: '15',
      currencyCode: 'USD',
    });

    if (returnDate) {
      searchParams.append('returnDate', returnDate);
    }
    
    if (children && children > 0) {
      searchParams.append('children', children.toString());
    }

    if (infants && infants > 0) {
      searchParams.append('infants', infants.toString());
    }

    const response = await fetch(`${AMADEUS_BASE_URL}/v2/shopping/flight-offers?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Amadeus API Error:', errorBody);
      const errorMessage = errorBody.errors?.[0]?.detail || 'Error en la búsqueda de vuelos.';
      return { success: false, error: errorMessage };
    }

    const data: FlightData = await response.json();

    if (!data.data || data.data.length === 0) {
      return { success: false, error: 'No se encontraron vuelos para esta ruta.' };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('diagnose: Error in searchFlights action:', err);
    return { success: false, error: err.message || 'Ocurrió un error inesperado.' };
  }
}


const airportSearchSchema = z.object({
  keyword: z.string().min(1),
});

export async function searchAirports(keyword: string): Promise<{ success: boolean; data?: Airport[]; error?: string }> {
  const validation = airportSearchSchema.safeParse({ keyword });
  if (!validation.success) {
    return { success: false, error: 'Palabra clave de búsqueda inválida.' };
  }

  try {
    const token = await getAmadeusToken();
    const validatedKeyword = validation.data.keyword;

    const searchParams = new URLSearchParams({
      subType: 'CITY,AIRPORT',
      'page[limit]': '50',
    });
    
    // If the keyword is likely an IATA code, prioritize a location search by that code.
    if (validatedKeyword.length === 3 && validatedKeyword.toUpperCase() === validatedKeyword) {
      searchParams.append('locationType', 'CITY');
      searchParams.append('keyword', validatedKeyword);
    } else {
      searchParams.append('keyword', validatedKeyword);
    }

    const response = await fetch(`${AMADEUS_BASE_URL}/v1/reference-data/locations?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Amadeus API Error (Airports):', errorBody);
      const errorMessage = errorBody.errors?.[0]?.detail || 'Error en la búsqueda de aeropuertos.';
      return { success: false, error: errorMessage };
    }

    const data: AirportSearchResponse = await response.json();
    
    const filteredData = data.data.filter(location => location.iataCode && location.name);
    
    return { success: true, data: filteredData };

  } catch (err: any) {
    console.error('diagnose: Error in searchAirports action:', err);
    return { success: false, error: err.message || 'Ocurrió un error inesperado.' };
  }
}

const hotelDestinations: Airport[] = [
    { name: 'Nueva York', iataCode: 'NYC', subType: 'CITY', address: { cityName: 'Nueva York', countryName: 'Estados Unidos' } },
    { name: 'Londres', iataCode: 'LON', subType: 'CITY', address: { cityName: 'Londres', countryName: 'Reino Unido' } },
    { name: 'París', iataCode: 'PAR', subType: 'CITY', address: { cityName: 'París', countryName: 'Francia' } },
    { name: 'Tokio', iataCode: 'TYO', subType: 'CITY', address: { cityName: 'Tokio', countryName: 'Japón' } },
    { name: 'Dubai', iataCode: 'DXB', subType: 'CITY', address: { cityName: 'Dubai', countryName: 'Emiratos Árabes Unidos' } },
    { name: 'Roma', iataCode: 'ROM', subType: 'CITY', address: { cityName: 'Roma', countryName: 'Italia' } },
    { name: 'Cancún', iataCode: 'CUN', subType: 'CITY', address: { cityName: 'Cancún', countryName: 'México' } },
    { name: 'Madrid', iataCode: 'MAD', subType: 'CITY', address: { cityName: 'Madrid', countryName: 'España' } },
    { name: 'Buenos Aires', iataCode: 'BUE', subType: 'CITY', address: { cityName: 'Buenos Aires', countryName: 'Argentina' } },
    { name: 'Medellín', iataCode: 'MDE', subType: 'CITY', address: { cityName: 'Medellín', countryName: 'Colombia' } },
];

export async function searchHotelDestinations(keyword: string): Promise<{ success: boolean; data?: Airport[]; error?: string }> {
    if (!keyword) {
        return { success: true, data: [] };
    }
    const lowercasedKeyword = keyword.toLowerCase();
    const filteredData = hotelDestinations.filter(
        dest => dest.name.toLowerCase().includes(lowercasedKeyword) || dest.address?.countryName?.toLowerCase().includes(lowercasedKeyword)
    );
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 200)); 
    return { success: true, data: filteredData };
}

const MOCK_HOTELS_DATA: AmadeusHotelOffer[] = [
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
          { uri: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?fit=crop&w=800&q=80', category: 'EXTERIOR' },
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
            { uri: 'https://images.unsplash.com/photo-1575586232388-26154f2c8f8a?fit=crop&w=800&q=80', category: 'EXTERIOR' },
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
          { uri: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?fit=crop&w=800&q=80', category: 'POOL' },
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
    }
  ];

const hotelSearchSchema = z.object({
  cityCode: z.string().min(3).max(3),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  adults: z.number().int().min(1),
  ratings: z.array(z.number()).optional(),
  amenities: z.array(z.string()).optional(),
});

export async function searchHotels(params: {
  cityCode: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  ratings?: number[];
  amenities?: string[];
}): Promise<{ success: boolean; data?: AmadeusHotelOffer[]; error?: string }> {
  const validation = hotelSearchSchema.safeParse(params);
  if (!validation.success) {
    return { success: false, error: 'Parámetros de búsqueda de hotel inválidos.' };
  }
  
  if (!HOTELBEDS_API_KEY) {
      return { success: false, error: 'La clave API de Hotelbeds no está configurada.' };
  }

  // NOTE: This is a mocked response to demonstrate the UI with Hotelbeds-like data.
  // A real integration would involve calls to Hotelbeds API endpoints.
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, data: MOCK_HOTELS_DATA };
}


const hotelDetailsSchema = z.object({
  offerId: z.string(),
});

export async function getHotelDetails(params: { offerId: string }): Promise<{ success: boolean; data?: AmadeusHotelOffer; error?: string }> {
  const validation = hotelDetailsSchema.safeParse(params);
  if (!validation.success) {
    return { success: false, error: 'Parámetros de detalles de hotel inválidos.' };
  }

  const { offerId } = validation.data;

  // In a real app, you would fetch from Amadeus or another API.
  // Here, we find the hotel from our mocked data for the demo.
  const hotelOffer = MOCK_HOTELS_DATA.find(offer => offer.id === offerId);

  if (!hotelOffer) {
    return { success: false, error: 'No se pudieron obtener los detalles del hotel.' };
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return { success: true, data: hotelOffer };
}

const packageSearchSchema = z.object({
  originLocationCode: z.string().min(3).max(3),
  destinationLocationCode: z.string().min(3).max(3),
  departureDate: z.string(),
  returnDate: z.string(),
  adults: z.number().int().min(1),
});

export async function searchPackages(params: {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
}): Promise<{ success: boolean; data?: PackageData; error?: string }> {
  
  const validation = packageSearchSchema.safeParse(params);
  if (!validation.success) {
    return { success: false, error: 'Parámetros de búsqueda de paquete inválidos.' };
  }

  // The actual Amadeus Flight+Hotel Search API is complex and may not be available in the standard test environment.
  // This is a placeholder response that informs the user.
  return { success: false, error: "La búsqueda de paquetes no está disponible en esta demostración. Por favor, busca vuelos y hoteles por separado." };
}

const cruiseSearchSchema = z.object({
  destinationRegion: z.string(),
  departureDate: z.string(),
  adults: z.number().int().min(1),
});

export async function searchCruises(params: {
  destinationRegion: string;
  departureDate: string;
  adults: number;
}): Promise<{ success: boolean; data?: CruiseData; error?: string }> {
  const validation = cruiseSearchSchema.safeParse(params);
  if (!validation.success) {
    return { success: false, error: 'Parámetros de búsqueda de crucero inválidos.' };
  }

  // The Amadeus Cruise API is not available in the standard test environment.
  // This is a placeholder response.
  return { success: false, error: "La búsqueda de cruceros no está disponible en esta demostración." };
}
