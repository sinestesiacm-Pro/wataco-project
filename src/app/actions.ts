
'use server';

import { FlightData, Airport, AirportSearchResponse, AmadeusHotelOffer, PackageData, CruiseData, AmadeusHotel, Room } from '@/lib/types';
import { z } from 'zod';
import { getAmadeusToken } from '@/lib/amadeus-auth';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { db, HOTELBEDS_API_KEY, HOTELBEDS_SECRET } from '@/lib/firebase';
import crypto from 'crypto';
import { MOCK_HOTELS_DATA } from '@/lib/mock-data';

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
        // Ensure we only return locations that have an IATA code and a name.
        const apiResults = apiData.data.filter(location => location.iataCode && location.name && location.geoCode);
        
        return { success: true, data: apiResults };
    } catch (err: any) {
        console.error('diagnose: Error in searchHotelDestinations action:', err);
        return { success: false, error: 'An unexpected error occurred while searching for destinations.' };
    }
}

const hotelSearchSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  adults: z.number().int().min(1),
  ratings: z.array(z.number()).optional(),
  amenities: z.array(z.string()).optional(),
});

export async function searchHotels(params: {
  latitude: number;
  longitude: number;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  ratings?: number[];
  amenities?: string[];
}): Promise<{ success: boolean; data?: any; error?: string }> {
    const validation = hotelSearchSchema.safeParse(params);
    if (!validation.success) {
        console.error("Invalid hotel search parameters:", validation.error.flatten());
        return { success: false, error: 'Invalid hotel search parameters.' };
    }

    if (!HOTELBEDS_API_KEY || !HOTELBEDS_SECRET) {
      return { success: false, error: "La API de Hotelbeds no está configurada. Por favor, añade las credenciales." };
    }

    const { latitude, longitude, checkInDate, checkOutDate, adults } = validation.data;
    
    // Hotelbeds authentication and request signature
    const signature = crypto.createHash('sha256').update(HOTELBEDS_API_KEY + HOTELBEDS_SECRET + Math.floor(Date.now() / 1000)).digest('hex');
    const headers = {
        'Api-key': HOTELBEDS_API_KEY,
        'X-Signature': signature,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip'
    };

    try {
        const availabilityRequestBody = {
            "stay": {
                "checkIn": checkInDate,
                "checkOut": checkOutDate
            },
            "occupancies": [{
                "rooms": 1,
                "adults": adults,
                "children": 0
            }],
            "geolocation": {
                "latitude": latitude,
                "longitude": longitude,
                "radius": 20,
                "unit": "km"
            }
        };

        const availabilityResponse = await fetch(`${HOTELBEDS_API_URL}/hotel-api/1.0/hotels`, {
            method: 'POST',
            headers,
            body: JSON.stringify(availabilityRequestBody)
        });

        if (!availabilityResponse.ok) {
            const errorBody = await availabilityResponse.json();
            console.error('Hotelbeds Availability API Error:', errorBody);
            return { success: false, error: `Error fetching hotel offers from Hotelbeds: ${errorBody.error?.message || availabilityResponse.statusText}` };
        }

        const availabilityData = await availabilityResponse.json();
        if (!availabilityData.hotels || !availabilityData.hotels.hotels) {
            return { success: false, error: "No se encontraron ofertas de hotel para el destino y las fechas seleccionados." };
        }


        // This is a simplified mapping. A real implementation would be more robust.
        const offers: AmadeusHotelOffer[] = availabilityData.hotels.hotels.map((hotel: any) => ({
            type: 'hotel-offer',
            id: hotel.code.toString(),
            hotel: {
                hotelId: hotel.code.toString(),
                name: hotel.name,
                rating: hotel.categoryCode.replace('EST', ''),
                address: {
                    cityName: hotel.destinationName,
                    countryCode: hotel.countryCode,
                    lines: [hotel.address],
                    postalCode: hotel.postalCode
                },
                media: hotel.images?.map((img: any) => ({ uri: `http://photos.hotelbeds.com/giata/${img.path}` })) || [],
            },
            available: true,
            offers: hotel.rooms.map((room: any) => ({
                id: room.code,
                checkInDate,
                checkOutDate,
                price: {
                    currency: hotel.currency,
                    total: room.rates[0].net,
                    base: room.rates[0].net,
                },
                room: {
                    type: room.name,
                    description: {
                        text: room.name
                    }
                }
            }))
        }));

        if (offers.length === 0) {
            return { success: false, error: "No hay ofertas de hotel disponibles para las fechas y el destino seleccionados." };
        }
        
        return { success: true, data: offers };

    } catch (err: any) {
        console.error('Error in searchHotels action:', err);
        return { success: false, error: err.message || 'An unexpected error occurred while searching for hotels.' };
    }
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
        console.error('Error fetching hotel from Firestore:', err);
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

  return { success: false, error: "Cruise search is not available in this demo." };
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
