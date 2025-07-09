'use server';

import { FlightData } from '@/lib/types';
import { z } from 'zod';
import { unstable_cache } from 'next/cache';

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY || '8KbSUTGXfLXXnZhk3dvVJcAyhdL6uGKG';
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET || 'uLzV2uC2xTA9SGar';
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';

const getAmadeusToken = unstable_cache(
  async () => {
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
        console.error('Failed to get Amadeus token', await response.text());
        throw new Error('Invalid API credentials.');
      }
      const data = await response.json();
      return data.access_token as string;
    } catch (err) {
      console.error(err);
      throw new Error('Could not retrieve API token.');
    }
  },
  ['amadeus_token'],
  { revalidate: 3500 } // Revalidate token slightly before it expires (default is 3600s)
);


const searchSchema = z.object({
  origin: z.string().min(3).max(3),
  destination: z.string().min(3).max(3),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  adults: z.number().int().min(1),
});

export async function searchFlights(params: {
  origin: string,
  destination: string,
  departureDate: string,
  returnDate?: string,
  adults: number
}): Promise<{ success: boolean; data?: FlightData; error?: string }> {
  
  const validation = searchSchema.safeParse(params);
  if (!validation.success) {
    return { success: false, error: 'Invalid search parameters.' };
  }

  const { origin, destination, departureDate, returnDate, adults } = validation.data;

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
