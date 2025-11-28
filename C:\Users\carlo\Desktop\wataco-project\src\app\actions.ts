'use server';

import { FlightData, Airport, AirportSearchResponse, AmadeusHotelOffer, PackageData, CruiseData, AmadeusHotel, Room } from '@/lib/types';
import { z } from 'zod';
import { getAmadeusToken } from '@/lib/amadeus-auth';
import { MOCK_HOTELS_DATA } from '@/lib/mock-data';
import { recommendedCruises } from '@/lib/mock-cruises';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, writeBatch, limit, startAt, orderBy } from 'firebase/firestore';
import { db, AMADEUS_API_KEY, AMADEUS_API_SECRET, HOTELBEDS_API_KEY, HOTELBEDS_SECRET, GOOGLE_PLACES_API_KEY } from '@/lib/firebase';
import crypto from 'crypto';

const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';
const HOTELBEDS_API_URL = "https://api.test.hotelbeds.com";


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
    
    const { destinationName, checkInDate, checkOutDate } = validation.data;
    
    try {
        const hotelsRef = collection(db, 'hoteles');
        const destinationQuery = destinationName.split(',')[0].trim();
        
        const q = query(
            hotelsRef, 
            where("ubicacion", ">=", destinationQuery),
            where("ubicacion", "<=", destinationQuery + '\uf8ff')
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { success: false, error: `No se encontraron hoteles para "${destinationQuery}". Intenta con otro destino.` };
        }

        const hotelOffers: AmadeusHotelOffer[] = querySnapshot.docs.map(docSnap => {
            const data = docSnap.data();
            const hotel: AmadeusHotel = {
                hotelId: docSnap.id,
                name: data.nombre,
                rating: data.rating?.toString(),
                media: (data.media || []).map((url: string) => ({ uri: url, category: 'PHOTO' })),
                address: {
                    cityName: data.ubicacion.split(',')[0],
                    countryCode: data.ubicacion.split(',')[1]?.trim() || 'N/A',
                    lines: [data.ubicacion],
                    postalCode: '',
                },
                description: { lang: 'es', text: data.descripcion },
                amenities: data.amenities || []
            };

            const offer: AmadeusHotelOffer = {
                type: 'hotel-offer',
                id: docSnap.id,
                hotel,
                available: true,
                offers: [
                    {
                        id: `${docSnap.id}-offer`,
                        checkInDate,
                        checkOutDate,
                        price: {
                            currency: 'USD',
                            total: data.price?.toString() || '0',
                            base: (data.price * 0.9).toString()
                        },
                        room: {
                            type: 'STANDARD_ROOM',
                            description: {
                                text: 'Habitación Estándar'
                            }
                        }
                    }
                ]
            };
            return offer;
        });
        
        return { success: true, data: hotelOffers };

    } catch (err: any) {
        console.error('Error in searchHotels from Firestore:', err);
        return { success: false, error: 'Ocurrió un error al buscar hoteles.' };
    }
}


export async function getGooglePlacePhotos(placeName: string, maxPhotos = 5): Promise<string[]> {
    const apiKey = GOOGLE_PLACES_API_KEY;
    if (!apiKey || apiKey === 'YOUR_GOOGLE_PLACES_API_KEY' || apiKey.startsWith('AIzaSyCAYuKcPuVCRXy5pDqrMUvcWcKJxdTZ0bE')) {
        console.warn("Google Places API Key is not configured. Photo search is disabled.");
        return [];
    }

    try {
        const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
        const findPlaceResponse = await fetch(findPlaceUrl);
        const findPlaceData = await findPlaceResponse.json();

        if (findPlaceData.status !== 'OK' || !findPlaceData.candidates || findPlaceData.candidates.length === 0) {
            console.warn(`No Google Place ID found for "${placeName}".`);
            return [];
        }

        const placeId = findPlaceData.candidates[0].place_id;

        const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;
        const placeDetailsResponse = await fetch(placeDetailsUrl);
        const placeDetailsData = await placeDetailsResponse.json();

        if (placeDetailsData.status !== 'OK' || !placeDetailsData.result.photos) {
            console.warn(`No photos found for place ID "${placeId}".`);
            return [];
        }

        const photoUrls = placeDetailsData.result.photos.slice(0, maxPhotos).map((photo: any) => {
            return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${apiKey}`;
        });
        
        return photoUrls;

    } catch (error) {
        console.error("Error fetching photos from Google Places API:", error);
        return [];
    }
}


export async function getFirestoreHotelDetails(id: string): Promise<{ success: boolean; data?: AmadeusHotel; error?: string }> {
    try {
        const hotelFromMock = MOCK_HOTELS_DATA.find(h => h.hotel.hotelId === id);

        if (!hotelFromMock) {
            return { success: false, error: 'Hotel no encontrado en los datos de muestra.' };
        }

        return { success: true, data: hotelFromMock.hotel };
    } catch (err: any) {
        console.error('Error fetching hotel from mock data:', err);
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
      (cruise) => cruise.region === params.destinationRegion
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


export async function getRecommendedHotels(): Promise<{ success: boolean; data?: AmadeusHotelOffer[]; error?: string }> {
    try {
        // Return a slice of the full mock data
        return { success: true, data: MOCK_HOTELS_DATA.slice(0, 4) };
    } catch (err: any) {
        console.error("Error processing recommended hotels from mock data:", err);
        return { success: false, error: "Ocurrió un error al procesar los hoteles recomendados." };
    }
}