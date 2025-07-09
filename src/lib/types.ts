

export interface FlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  departure: AirportInfo;
  arrival: AirportInfo;
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface AirportInfo {
  iataCode: string;
  terminal?: string;
  at: string;
}

export interface Price {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
  grandTotal: string;
}

export interface Fee {
  amount: string;
  type: string;
}

export interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: Price;
  fareDetailsBySegment: FareDetailsBySegment[];
}

export interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  class: string;
  includedCheckedBags: {
    quantity: number;
  };
}

export interface Dictionaries {
  carriers: { [key: string]: string };
  currencies: { [key: string]: string };
  aircraft: { [key: string]: string };
  locations: {
    [key: string]: {
      cityCode: string;
      countryCode: string;
    }
  }
}

export interface FlightData {
    data: FlightOffer[];
    dictionaries: Dictionaries;
}

export interface AirportAddress {
    cityName?: string;
    countryName?: string;
}

export interface Airport {
  name: string;
  iataCode: string;
  subType: string;
  address?: AirportAddress;
}

export interface AirportSearchResponse {
  data: Airport[];
}

// Amadeus Hotel Types
export interface AmadeusHotel {
  hotelId: string;
  name: string;
  rating?: string;
  media?: {
    uri: string;
    category: string;
  }[];
  address: {
    lines: string[];
    postalCode: string;
    cityName: string;
    countryCode: string;
  };
  contact?: {
      phone: string;
      fax: string;
  };
  description?: {
      lang: string;
      text: string;
  };
  amenities?: string[];
}

export interface AmadeusHotelOffer {
  type: "hotel-offer";
  id: string;
  hotel: AmadeusHotel;
  available: boolean;
  offers: {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    price: {
      currency: string;
      total: string;
      base: string;
      variations?: {
        average?: {
          base: string;
        }
      }
    };
    room: {
        description: {
            text: string;
        }
    }
  }[];
  self?: string;
}

export interface AmadeusHotelSearchResponse {
  data: AmadeusHotelOffer[];
}
