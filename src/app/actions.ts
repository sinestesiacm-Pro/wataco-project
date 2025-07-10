'use server';

import { FlightData, Airport, AirportSearchResponse, AmadeusHotelOffer, PackageData, CruiseData } from '@/lib/types';
import { z } from 'zod';

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';
const HOTELBEDS_API_KEY = "7b693caa6d94519ce17374929121537f";


// In-memory cache for Amadeus token
let amadeusTokenCache = {
  token: null as string | null,
  expiresAt: 0 as number,
};

async function getAmadeusToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if it's still valid (with a 100-second buffer)
  if (amadeusTokenCache.token && now < amadeusTokenCache.expiresAt) {
    return amadeusTokenCache.token;
  }

  if (!AMADEUS_API_KEY || !AMADEUS_API_SECRET) {
    throw new Error('Las credenciales de la API de Amadeus no están configuradas. Por favor, añádelas a tu archivo .env.');
  }

  const tokenUrl = `${AMADEUS_BASE_URL}/v1/security/oauth2/token`;
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', AMADEUS_API_KEY);
  params.append('client_secret', AMADEUS_API_SECRET);

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => response.text());
      console.error('Failed to get Amadeus token', errorBody);
      const errorMessage = (errorBody as any)?.error_description || (errorBody as any)?.errors?.[0]?.detail || response.statusText;
      throw new Error(`Error de token de Amadeus: ${errorMessage}`);
    }

    const data = await response.json();
    const token = data.access_token as string;
    // Amadeus token expires in 3600 seconds. We'll refresh it a bit earlier.
    const expiresIn = (data.expires_in || 3600) - 100; // a buffer of 100 seconds
    
    amadeusTokenCache = {
      token: token,
      expiresAt: now + expiresIn * 1000,
    };

    return token;
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
        throw new Error(`No se pudo obtener el token de la API. Razón: ${err.message}`);
    }
    throw new Error('No se pudo obtener el token de la API debido a un error desconocido.');
  }
}


const searchSchema = z.object({
  origin: z.string().min(3).max(3),
  destination: z.string().min(3).max(3),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  adults: z.number().int().min(1),
  children: z.number().int().min(0).optional(),
  infants: z.number().int().min(0).optional(),
  travelClass: z.nativeEnum(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST']).optional(),
});

export async function searchFlights(params: {
  origin: string,
  destination: string,
  departureDate: string,
  returnDate?: string,
  adults: number,
  children?: number,
  infants?: number,
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
}): Promise<{ success: boolean; data?: FlightData; error?: string }> {
  
  const validation = searchSchema.safeParse(params);
  if (!validation.success) {
    return { success: false, error: 'Parámetros de búsqueda inválidos.' };
  }

  const { origin, destination, departureDate, returnDate, adults, children, infants, travelClass } = validation.data;

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

    if (travelClass) {
      searchParams.append('travelClass', travelClass);
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
    console.error(err);
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

    const searchParams = new URLSearchParams({
      keyword: validation.data.keyword,
      subType: 'CITY,AIRPORT',
      'page[limit]': '50',
    });

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
    console.error(err);
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
  const mockHotelsData: AmadeusHotelOffer[] = [
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
        checkInDate: params.checkInDate,
        checkOutDate: params.checkOutDate,
        price: { currency: 'USD', total: '475.00', base: '420.00' },
        room: { description: { text: 'Suite con vista al mar y balcón privado.' } }
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
          { uri: 'https://images.unsplash.com/photo-1590490360181-a75d1f88a652?fit=crop&w=800&q=80', category: 'LOBBY' },
          { uri: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?fit=crop&w=800&q=80', category: 'ROOM' },
        ],
        address: { lines: ['456 Central St'], postalCode: '10001', cityName: 'New York', countryCode: 'US' },
        description: { lang: 'es', text: 'Ubicado en el corazón de la acción, nuestro hotel boutique ofrece un diseño elegante y un ambiente acogedor. Perfecto para viajeros de negocios y de placer que buscan explorar la ciudad.' },
        amenities: ['WIFI', 'RESTAURANT', 'BAR', 'AIR_CONDITIONING']
      },
      available: true,
      offers: [{
        id: 'offer-2',
        checkInDate: params.checkInDate,
        checkOutDate: params.checkOutDate,
        price: { currency: 'USD', total: '320.00', base: '280.00' },
        room: { description: { text: 'Habitación doble estándar con escritorio.' } }
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
        checkInDate: params.checkInDate,
        checkOutDate: params.checkOutDate,
        price: { currency: 'USD', total: '150.00', base: '130.00' },
        room: { description: { text: 'Cabaña acogedora con cocina pequeña.' } }
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
        checkInDate: params.checkInDate,
        checkOutDate: params.checkOutDate,
        price: { currency: 'USD', total: '380.00', base: '350.00' },
        room: { description: { text: 'Junior Suite con todo incluido.' } }
      }]
    }
  ];
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, data: mockHotelsData };
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

  try {
    const token = await getAmadeusToken();

    const response = await fetch(`${AMADEUS_BASE_URL}/v3/shopping/hotel-offers/${offerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Amadeus Hotel Details Error:', errorBody);
      const errorMessage = errorBody.errors?.[0]?.detail || 'Error al obtener los detalles del hotel.';
      return { success: false, error: errorMessage };
    }

    const result = await response.json();

    if (!result.data) {
      return { success: false, error: 'No se pudieron obtener los detalles del hotel.' };
    }

    return { success: true, data: result.data };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message || 'Ocurrió un error inesperado.' };
  }
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
