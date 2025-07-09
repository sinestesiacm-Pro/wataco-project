
'use server';

import { FlightData, Airport, AirportSearchResponse, Hotel } from '@/lib/types';
import { z } from 'zod';

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'booking-com15.p.rapidapi.com';
const RAPIDAPI_BASE_URL = 'https://booking-com15.p.rapidapi.com/api/v1/hotels';


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
    throw new Error('Amadeus API credentials are not configured in the environment variables.');
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
      const errorText = await response.text();
      console.error('Failed to get Amadeus token', errorText);
      throw new Error(`Invalid API credentials: ${response.statusText}`);
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
    throw new Error('Could not retrieve API token.');
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
    return { success: false, error: 'Invalid search parameters.' };
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
      currencyCode: 'EUR',
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
      const errorMessage = errorBody.errors?.[0]?.detail || 'Error in flight search.';
      return { success: false, error: errorMessage };
    }

    const data: FlightData = await response.json();

    if (!data.data || data.data.length === 0) {
      return { success: false, error: 'No flights found for this route.' };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message || 'An unexpected error occurred.' };
  }
}


const airportSearchSchema = z.object({
  keyword: z.string().min(1),
});

export async function searchAirports(keyword: string): Promise<{ success: boolean; data?: Airport[]; error?: string }> {
  const validation = airportSearchSchema.safeParse({ keyword });
  if (!validation.success) {
    return { success: false, error: 'Invalid search keyword.' };
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
      const errorMessage = errorBody.errors?.[0]?.detail || 'Error in airport search.';
      return { success: false, error: errorMessage };
    }

    const data: AirportSearchResponse = await response.json();
    
    // Filter out locations that don't have an iataCode or a name.
    const filteredData = data.data.filter(location => location.iataCode && location.name);
    
    return { success: true, data: filteredData };

  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message || 'An unexpected error occurred.' };
  }
}


const hotelSearchSchema = z.object({
  dest_id: z.string(),
  arrival_date: z.string(),
  departure_date: z.string(),
  adults: z.number().int().min(1),
});

export async function searchHotels(params: {
  dest_id: string;
  arrival_date: string;
  departure_date: string;
  adults: number;
}): Promise<{ success: boolean; data?: Hotel[]; error?: string }> {
  const validation = hotelSearchSchema.safeParse(params);
  if (!validation.success) {
    return { success: false, error: 'Invalid hotel search parameters.' };
  }
  
  if (!RAPIDAPI_KEY) {
    throw new Error('RapidAPI key is not configured in the environment variables.');
  }

  const { dest_id, arrival_date, departure_date, adults } = validation.data;
  
  const searchParams = new URLSearchParams({
    dest_id,
    search_type: 'CITY',
    arrival_date,
    departure_date,
    adults: adults.toString(),
    room_qty: '1',
    page_number: '1',
    languagecode: 'en-us',
    currency_code: 'USD',
  });

  try {
    const response = await fetch(`${RAPIDAPI_BASE_URL}/searchHotels?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY,
      },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('RapidAPI Hotel Search Error:', errorBody);
      const errorMessage = errorBody.message || 'Error in hotel search.';
      return { success: false, error: errorMessage };
    }

    const result = await response.json();
    
    if (!result.status || !result.data || !result.data.hotels || result.data.hotels.length === 0) {
      return { success: false, error: 'No hotels found for this destination.' };
    }

    // The API response has a 'data' object which contains a 'hotels' array.
    return { success: true, data: result.data.hotels };

  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message || 'An unexpected error occurred.' };
  }
}
