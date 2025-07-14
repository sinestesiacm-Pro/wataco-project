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
  cabin: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
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

// Room and Hotel Offer types
export interface Room {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  boardType?: string;
  price: {
    currency: string;
    total: string;
    base: string;
    variations?: {
      average?: {
        base: string;
      };
    };
  };
  room: {
    type: string;
    description: {
      text: string;
    };
    amenities?: string[];
  };
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
  offers: Room[];
  self?: string;
}

export interface AmadeusHotelSearchResponse {
  data: AmadeusHotelOffer[];
}

// Package Types
export interface PackageOffer {
    id: string;
    title: string;
    destination: string;
    origin: string;
    price: number;
    duration: number;
    dates: string;
    description: string;
    includes: string[];
    not_included: string[];
    image: string;
    hint: string;
    rating: number;
    reviews: number;
    special_offer?: string;
}


export interface PackageData {
    data: PackageOffer[];
    dictionaries: Dictionaries;
}

// Cruise Types (Placeholder)
export interface CruiseOffer {
    id: string;
    provider: string;
    shipName: string;
    itinerary: {
        name: string;
        ports: string[];
        durationDays: number;
    };
    price: {
        currency: string;
        total: string;
    };
    image: string;
}

export interface CruiseData {
    data: CruiseOffer[];
}
