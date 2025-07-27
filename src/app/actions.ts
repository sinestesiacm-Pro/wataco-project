'use server';

import { FlightData, Airport, AirportSearchResponse, AmadeusHotelOffer, PackageData, CruiseData } from '@/lib/types';
import { z } from 'zod';
import { getAmadeusToken } from '@/lib/amadeus-auth';
import { MOCK_HOTELS_DATA } from '@/lib/mock-data';

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

  // Fisher-Yates shuffle algorithm
  const shuffledHotels = [...MOCK_HOTELS_DATA];
  for (let i = shuffledHotels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledHotels[i], shuffledHotels[j]] = [shuffledHotels[j], shuffledHotels[i]];
  }

  return { success: true, data: shuffledHotels };
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
