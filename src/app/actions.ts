
'use server';

import { FlightData, Airport, AirportSearchResponse, AmadeusHotelOffer, PackageData, CruiseData, AmadeusHotel, Room } from '@/lib/types';
import { z } from 'zod';
import { getAmadeusToken } from '@/lib/amadeus-auth';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import crypto from 'crypto';
import { MOCK_HOTELS_DATA } from '@/lib/mock-data';
import { recommendedCruises } from '@/lib/mock-cruises';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { RAPIDAPI_KEY, GOOGLE_PLACES_API_KEY } from '@/lib/firebase';

const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';
const BOOKING_API_URL = 'https://booking-com15.p.rapidapi.com/api/v1/hotels';

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
       const errorMessage = errorBody.errors?.[0]?.detail || 'Error searching for flights.';
      if (response.status === 429) { // Too Many Requests
          return { success: false, error: 'The network rate limit is exceeded, please try again later' };
      }
      return { success: false, error: errorMessage };
    }

    const data: FlightData = await response.json();

    if (!data.data || data.data.length === 0) {
      return { success: false, error: 'No flights found for this route.' };
    }
    
    return { success: true, data };
  } catch (err: any) {
    console.error('diagnose: Error in searchFlights action:', err);
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
  const validatedKeyword = validation.data.keyword.toLowerCase();

  try {
    const token = await getAmadeusToken();
    const searchParams = new URLSearchParams({
      subType: 'CITY,AIRPORT',
      'page[limit]': '10',
      keyword: validatedKeyword,
    });

    const response = await fetch(`${AMADEUS_BASE_URL}/v1/reference-data/locations?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        console.warn('Amadeus API call failed in searchAirports.');
        const errorBody = await response.json().catch(() => ({}));
        return { success: false, error: errorBody.errors?.[0]?.detail || 'Failed to fetch airport data.' };
    }

    const apiData: AirportSearchResponse = await response.json();
    const apiResults = apiData.data.filter(location => location.iataCode && location.name && location.geoCode);
    
    // Deduplicate results, as API can return city and airport for the same place
    const uniqueResults = Array.from(new Map(apiResults.map(item => [item.iataCode, item])).values());

    return { success: true, data: uniqueResults };

  } catch (err: any) {
    console.error('diagnose: Error in searchAirports action:', err);
    return { success: false, error: 'An unexpected error occurred while searching for airports.' };
  }
}

export async function searchHotelDestinations(keyword: string): Promise<{ success: boolean; data?: Airport[]; error?: string }> {
    const validation = airportSearchSchema.safeParse({ keyword });
    if (!validation.success) {
        return { success: false, error: 'Invalid search keyword.' };
    }
    if (!keyword) {
        return { success: true, data: [] };
    }
    const validatedKeyword = validation.data.keyword.toLowerCase();

    try {
        const token = await getAmadeusToken();
        const searchParams = new URLSearchParams({
            subType: 'CITY',
            'page[limit]': '10',
            keyword: validatedKeyword,
        });

        const response = await fetch(`${AMADEUS_BASE_URL}/v1/reference-data/locations?${searchParams.toString()}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            console.warn('Amadeus API call failed for hotel destinations.');
            return { success: false, error: 'Failed to fetch destination data.' };
        }

        const apiData: AirportSearchResponse = await response.json();
        // Ensure we only return locations that have an IATA code and a name.
        const apiResults = apiData.data.filter(location => location.iataCode && location.name && location.geoCode);
        
        return { success: true, data: apiResults };
    } catch (err: any) {
        console.error('diagnose: Error in searchHotelDestinations action:', err);
        return { success: false, error: 'An unexpected error occurred while searching for destinations.' };
    }
}

const hotelSearchSchema = z.object({
  destinationName: z.string().min(2, "Destination city is required."),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  adults: z.number().int().min(1),
  currency: z.string().optional().default('USD'),
});

// This is a simplified search function that uses mock data as a fallback.
// The complex RapidAPI logic has been removed to ensure stability.
// To re-enable API search, the logic would need to be re-implemented here with robust error handling.
export async function searchHotels(params: {
  destinationName: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  currency?: string;
}): Promise<{ success: boolean; data?: AmadeusHotelOffer[]; error?: string }> {
    const validation = hotelSearchSchema.safeParse(params);
    if (!validation.success) {
        return { success: false, error: 'Invalid hotel search parameters.' };
    }
    
    const { destinationName } = validation.data;
    console.log(`Searching mock hotels for: ${destinationName}`);
    
    // Simulate a short delay for a better user experience
    await new Promise(resolve => setTimeout(resolve, 500));

    // Always use the mock data as a reliable source.
    const destinationCity = destinationName.split(',')[0].toLowerCase();
    const filteredMockData = MOCK_HOTELS_DATA.filter(
        hotel => hotel.hotel.address.cityName.toLowerCase() === destinationCity
    );

    if (filteredMockData.length > 0) {
        return { 
            success: true, 
            data: filteredMockData,
        };
    } else {
        // If no matches for the specific city, return a generic list from mock data.
        // This ensures the page never looks empty.
        console.warn(`No mock hotels found for "${destinationName}". Returning a general list.`);
        return { success: true, data: MOCK_HOTELS_DATA.slice(0, 5) };
    }
}

export async function getHotelDetailsHybrid(hotelId: string, checkInDate: string, checkOutDate: string) {
    console.log("getHotelDetailsHybrid called with:", { hotelId, checkInDate, checkOutDate });
    return { success: false, error: "getHotelDetailsHybrid no está implementado." };
}


export async function getFirestoreHotelDetails(id: string): Promise<{ success: boolean; data?: AmadeusHotel; error?: string }> {
    try {
        const hotelDocRef = doc(db, 'hoteles', id);
        const hotelDoc = await getDoc(hotelDocRef);

        if (!hotelDoc.exists()) {
            return { success: false, error: 'Hotel no encontrado en la base de datos.' };
        }

        const data = hotelDoc.data();
        
        const hotelData: AmadeusHotel = {
            hotelId: hotelDoc.id,
            name: data.nombre,
            rating: data.rating?.toString(),
            media: (data.media || []).map((url: string) => ({ uri: url, category: 'GENERAL' })),
            address: {
                cityName: data.ubicacion.split(',')[0],
                countryCode: data.ubicacion.split(',')[1]?.trim() || '',
                lines: [data.ubicacion],
                postalCode: '',
            },
            description: {
                lang: 'es',
                text: data.descripcion,
            },
            amenities: data.amenities || [],
        };

        return { success: true, data: hotelData };
    } catch (err: any) {
        if ((err as any).code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: `hoteles/${id}`,
                operation: 'get',
            });
            errorEmitter.emit('permission-error', permissionError);
            return { success: false, error: permissionError.message };
        }
        return { success: false, error: err.message || 'Ocurrió un error inesperado al buscar el hotel.' };
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
    return { success: false, error: 'Invalid package search parameters.' };
  }

  return { success: false, error: "Package search is not available in this demo. Please search for flights and hotels separately." };
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
    return { success: false, error: 'Invalid cruise search parameters.' };
  }

  // Simulate API call and filtering based on mock data
  try {
    const filteredCruises = recommendedCruises.filter(
      (cruise) => cruise.region === destinationRegion
    );

    if (filteredCruises.length === 0) {
      return { success: false, error: "No se encontraron cruceros para la región seleccionada." };
    }
    
    // We need to add a small delay to simulate a real API call for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, data: { data: filteredCruises } };
    
  } catch (err: any) {
    console.error('Error in searchCruises action:', err);
    return { success: false, error: err.message || 'An unexpected error occurred while searching for cruises.' };
  }
}

const vipActivationSchema = z.object({
    userId: z.string().min(1, "User ID is required."),
    membershipCode: z.string().min(6, "Membership code must be at least 6 characters."),
});

export async function activateVipMembership(params: { userId: string, membershipCode: string }): Promise<{ success: boolean; error?: string; message?: string; tier?: string }> {
    const validation = vipActivationSchema.safeParse(params);
    if (!validation.success) {
        return { success: false, error: 'Invalid activation parameters.' };
    }

    const { userId, membershipCode } = validation.data;

    try {
        const vipMembershipsRef = collection(db, 'vip_memberships');
        const q = query(vipMembershipsRef, where("code", "==", membershipCode));
        
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { success: false, error: "Invalid membership code." };
        }

        const vipDoc = querySnapshot.docs[0];
        const vipData = vipDoc.data();

        if (vipData.isUsed) {
            return { success: false, error: "This membership code has already been used." };
        }
        
        const vipTier = vipData.tier || 'gold'; 

        const batch = writeBatch(db);

        const vipDocRef = doc(db, "vip_memberships", vipDoc.id);
        batch.update(vipDocRef, { isUsed: true, usedBy: userId });

        const userDocRef = doc(db, "users", userId);
        batch.set(userDocRef, { vipTier: vipTier }, { merge: true });

        await batch.commit();

        return { success: true, message: "Congratulations! Your VIP membership has been activated.", tier: vipTier };

    } catch (err: any) {
        console.error("Error activating VIP membership:", err);
        return { success: false, error: err.message || "An unexpected error occurred while activating membership." };
    }
}


export async function getRecommendedHotels(): Promise<{ success: boolean; data?: any[]; error?: string }> {
    try {
        const hotelsCollection = collection(db, 'hoteles');
        const hotelSnapshot = await getDocs(hotelsCollection);
        if (hotelSnapshot.empty) {
            console.warn("Firestore 'hoteles' collection is empty. Falling back to MOCK_HOTELS_DATA.");
            const hotelsList = MOCK_HOTELS_DATA.map(offer => ({
                ...offer.hotel,
                id: offer.hotel.hotelId,
                nombre: offer.hotel.name,
                ubicacion: `${offer.hotel.address.cityName}, ${offer.hotel.address.countryCode}`,
                descripcion: offer.hotel.description?.text,
                price: parseFloat(offer.offers[0]?.price.total || '0')
            }));
            return { success: true, data: hotelsList };
        }
        const hotelsList = hotelSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return { success: true, data: hotelsList };
    } catch (err: any) {
        if ((err as any).code === 'permission-denied' || err instanceof FirestorePermissionError) {
            const permissionError = new FirestorePermissionError({
                path: 'hoteles',
                operation: 'list',
            });
            errorEmitter.emit('permission-error', permissionError);
            return { success: false, error: "Error de permisos al cargar hoteles recomendados." };
        }
        console.error("Error fetching recommended hotels:", err);
        return { success: false, error: "Ocurrió un error al cargar los hoteles. Revisa la configuración de Firebase y las reglas de seguridad de Firestore." };
    }
}

    