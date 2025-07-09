'use client';

import Image from 'next/image';
import { FlightData, FlightOffer, Itinerary, Segment } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, BaggageClaim, Clock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AITravelTips } from './ai-travel-tips';
import { Separator } from './ui/separator';

interface FlightResultsProps {
  flightData: FlightData;
  destinationIata: string;
}

const getBaggageInfo = (flight: FlightOffer): string => {
  try {
    const baggage = flight.travelerPricings[0]?.fareDetailsBySegment[0]?.includedCheckedBags;
    if (baggage && baggage.quantity > 0) {
      return `${baggage.quantity} checked bag(s)`;
    }
    return 'Carry-on only';
  } catch (e) {
    return 'Carry-on only';
  }
};

const formatDuration = (duration: string) => {
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
}

function SegmentDetails({ segments, dictionaries }: { segments: Segment[], dictionaries: FlightData['dictionaries']}) {
  return (
     <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 flex-grow">
      <div className="text-center">
        <p className="font-headline text-xl font-bold text-primary">{segments[0].departure.iataCode}</p>
        <p className="text-sm text-muted-foreground">{new Date(segments[0].departure.at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
      
      <div className="flex-grow text-center w-full md:w-auto">
        <div className="relative w-full h-px bg-border my-2 md:my-0">
          <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-1 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground mt-2 md:mt-1">{segments.length > 1 ? `${segments.length - 1} stop(s)` : 'Direct'}</p>
      </div>

      <div className="text-center">
        <p className="font-headline text-xl font-bold text-primary">{segments[segments.length - 1].arrival.iataCode}</p>
        <p className="text-sm text-muted-foreground">{new Date(segments[segments.length - 1].arrival.at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </div>
  )
}

function ItineraryDetails({ itinerary, flight, dictionaries, isReturn }: { itinerary: Itinerary, flight: FlightOffer, dictionaries: FlightData['dictionaries'], isReturn: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Badge variant="outline">{isReturn ? 'Return' : 'Outbound'}</Badge>
        <div className="flex items-center text-xs text-muted-foreground space-x-4">
          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{formatDuration(itinerary.duration)}</span>
          {!isReturn && <span className="flex items-center"><BaggageClaim className="w-3 h-3 mr-1" />{getBaggageInfo(flight)}</span>}
        </div>
      </div>
      <SegmentDetails segments={itinerary.segments} dictionaries={dictionaries} />
    </div>
  )
}

export function FlightResults({ flightData, destinationIata }: FlightResultsProps) {
  const { data: flights, dictionaries } = flightData;
  const destinationName = dictionaries.locations?.[destinationIata]?.cityCode;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-headline font-bold text-primary-dark">
          Flights to {destinationName || destinationIata}
        </h2>
        {destinationName && (
          <AITravelTips destination={destinationIata} destinationName={destinationName} />
        )}
      </div>

      {flights.map((flight, index) => {
        const airlineCode = flight.validatingAirlineCodes[0];
        const airlineName = dictionaries.carriers[airlineCode];
        const isBestPrice = index === 0;

        return (
          <Card key={flight.id} className="overflow-hidden transition-shadow hover:shadow-lg">
            {isBestPrice && (
              <Badge className="bg-green-500 text-white rounded-none rounded-br-lg absolute top-0 left-0 z-10 font-bold">
                <Star className="w-3 h-3 mr-1.5" /> Best Price
              </Badge>
            )}
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-stretch gap-6">
              <div className="flex-grow w-full space-y-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={`https://images.kiwi.com/airlines/64/${airlineCode}.png`}
                    alt={airlineName || airlineCode}
                    width={40}
                    height={40}
                    className="rounded-full bg-white shadow-md"
                  />
                   <div className='w-full'>
                    <p className="font-semibold font-body">{airlineName}</p>
                     <p className="text-xs text-muted-foreground">{flight.oneWay ? 'One Way' : 'Round Trip'}</p>
                   </div>
                </div>
                <div className="space-y-4">
                   {flight.itineraries.map((itinerary, i) => (
                    <div key={i}>
                      <ItineraryDetails 
                        itinerary={itinerary} 
                        flight={flight}
                        dictionaries={dictionaries} 
                        isReturn={i > 0} 
                      />
                      {i === 0 && flight.itineraries.length > 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:border-l md:pl-6 w-full md:w-auto text-center md:text-right flex-shrink-0 flex flex-col justify-center mt-4 md:mt-0">
                  <p className="text-3xl font-bold font-headline text-accent">{flight.price.total}€</p>
                  <p className="text-xs text-muted-foreground">Total price for {flight.travelerPricings.length} adult(s)</p>
                  <Button 
                    className="mt-2 w-full md:w-auto font-bold bg-accent hover:bg-accent/90"
                    onClick={() => alert(`Redirecting to book flight to ${flight.itineraries[0].segments[flight.itineraries[0].segments.length-1].arrival.iataCode}...`)}
                  >
                    Book Now
                  </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
