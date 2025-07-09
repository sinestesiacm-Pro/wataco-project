
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
    cityName: string;
    countryName: string;
}

export interface Airport {
  name: string;
  iataCode: string;
  subType: string;
  address: AirportAddress;
}

export interface AirportSearchResponse {
  data: Airport[];
}

// Hotel Types
export interface PriceBreakdown {
  gross_price: string;
  currency: string;
}

export interface Hotel {
  hotel_id: string;
  hotel_name?: string;
  main_photo_url?: string;
  review_score: number | null;
  review_score_word?: string;
  price_breakdown?: PriceBreakdown;
  city?: string;
  country_trans?: string;
  url: string;
  accommodation_type_name?: string;
  review_nr?: number;
  stars?: number;
}

export interface HotelSearchResponse {
  status: boolean;
  message: string;
  data: {
    hotels: Hotel[];
  };
}

export interface BookingDestination {
  dest_id: string;
  dest_type: string;
  city_name: string;
  country: string;
  label: string;
}

export interface HotelPhoto {
  url_original: string;
  url_max: string;
}

export interface HotelFacility {
  name: string;
  facility_id: string;
}

export interface HotelDetails {
  hotel_id: string;
  hotel_name_trans: string;
  description?: {
    description: string;
  };
  photos: HotelPhoto[];
  block?: {
    facility_name: string;
    facilities: HotelFacility[];
  }[];
  url: string;
  composite_price_breakdown?: PriceBreakdown;
}
