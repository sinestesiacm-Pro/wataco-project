'use server';

import { FlightData, Airport, AirportSearchResponse, AmadeusHotelOffer, AmadeusHotelId } from '@/lib/types';
import { z } from 'zod';

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';

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
    
    const filteredData = data.data.filter(location => location.iataCode && location.name);
    
    return { success: true, data: filteredData };

  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message || 'An unexpected error occurred.' };
  }
}

const getHotelsByCitySchema = z.object({
  cityCode: z.string().min(3).max(3),
});

async function getHotelsByCity(cityCode: string): Promise<{ success: boolean; data?: AmadeusHotelId[]; error?: string }> {
  const validation = getHotelsByCitySchema.safeParse({ cityCode });
  if (!validation.success) {
    return { success: false, error: 'Invalid city code.' };
  }
  try {
    const token = await getAmadeusToken();
    const searchParams = new URLSearchParams({
      cityCode: validation.data.cityCode.toUpperCase(),
      radius: '20',
      radiusUnit: 'KM',
    });

    const response = await fetch(`${AMADEUS_BASE_URL}/v1/reference-data/locations/hotels/by-city?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Amadeus getHotelsByCity Error:', errorBody);
      return { success: false, error: 'Could not retrieve hotel list.' };
    }

    const result = await response.json();
    return { success: true, data: result.data };

  } catch (err: any) {
    console.error(err);
    return { success: false, error: 'An unexpected error occurred while fetching hotel list.' };
  }
}

const hotelSearchSchema = z.object({
  cityCode: z.string().min(3).max(3),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  adults: z.number().int().min(1),
  ratings: z.array(z.number()).optional(),
  amenities: z.array(z.string()).optional(),
  boardTypes: z.array(z.string()).optional(),
});

export async function searchHotels(params: {
  cityCode: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  ratings?: number[];
  amenities?: string[];
  boardTypes?: string[];
}): Promise<{ success: boolean; data?: AmadeusHotelOffer[]; error?: string }> {
  const validation = hotelSearchSchema.safeParse(params);
  if (!validation.success) {
    return { success: false, error: 'Invalid hotel search parameters.' };
  }

  const { cityCode, checkInDate, checkOutDate, adults, ratings, amenities, boardTypes } = validation.data;

  try {
    // Step 1: Get list of hotel IDs for the given cityCode
    const hotelListResponse = await getHotelsByCity(cityCode);
    if (!hotelListResponse.success || !hotelListResponse.data || hotelListResponse.data.length === 0) {
        return { success: false, error: 'No hotels found for this destination.' };
    }
    const hotelIds = hotelListResponse.data.map(hotel => hotel.hotelId);

    // Step 2: Get offers for the found hotel IDs
    const token = await getAmadeusToken();

    const searchParams = new URLSearchParams({
      hotelIds: hotelIds.slice(0, 50).join(','),
      checkInDate,
      checkOutDate,
      adults: adults.toString(),
      currency: 'USD',
      view: 'FULL',
      bestRateOnly: 'false',
    });

    if (ratings && ratings.length > 0) {
      searchParams.append('ratings', ratings.join(','));
    }

    if (amenities && amenities.length > 0) {
      searchParams.append('amenities', amenities.join(','));
    }

    if (boardTypes && boardTypes.length > 0) {
      searchParams.append('boardType', boardTypes.join(','));
    }

    const response = await fetch(`${AMADEUS_BASE_URL}/v3/shopping/hotel-offers?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Amadeus Hotel Search Error:', errorBody);
      const errorMessage = errorBody.errors?.[0]?.detail || 'Error in hotel search.';
      return { success: false, error: errorMessage };
    }

    const result = await response.json();

    if (!result.data || result.data.length === 0) {
      return { success: false, error: 'No hotels found for this destination.' };
    }

    return { success: true, data: result.data };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message || 'An unexpected error occurred.' };
  }
}

const hotelDetailsSchema = z.object({
  offerId: z.string(),
});

export async function getHotelDetails(params: { offerId: string }): Promise<{ success: boolean; data?: AmadeusHotelOffer; error?: string }> {
  const validation = hotelDetailsSchema.safeParse(params);
  if (!validation.success) {
    return { success: false, error: 'Invalid hotel details parameters.' };
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
      const errorMessage = errorBody.errors?.[0]?.detail || 'Error fetching hotel details.';
      return { success: false, error: errorMessage };
    }

    const result = await response.json();

    if (!result.data) {
      return { success: false, error: 'Could not retrieve hotel details.' };
    }

    return { success: true, data: result.data };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message || 'An unexpected error occurred.' };
  }
}
