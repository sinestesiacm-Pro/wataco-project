'use client';

import Image from 'next/image';
import { FlightData, FlightOffer, Itinerary, Segment } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaneTakeoff, PlaneLanding, Star, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AITravelTips } from './ai-travel-tips';
import { Separator } from './ui/separator';

interface FlightResultsProps {
  flightData: FlightData;
  destinationIata: string;
}

const formatDuration = (duration: string) => {
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function ItineraryDetails({ itinerary, dictionaries }: { itinerary: Itinerary, dictionaries: FlightData['dictionaries'] }) {
  const firstSegment = itinerary.segments[0];
  const lastSegment = itinerary.segments[itinerary.segments.length - 1];
  
  return (
    <div className="flex items-center justify-between w-full gap-4">
      <div className="flex items-center gap-3 text-center">
        <PlaneTakeoff className="w-5 h-5 text-primary" />
        <div>
          <p className="text-xl font-bold font-headline">{formatTime(firstSegment.departure.at)}</p>
          <p className="text-sm font-semibold">{firstSegment.departure.iataCode}</p>
        </div>
      </div>
      
      <div className="flex-grow text-center">
        <div className="text-xs text-muted-foreground">{formatDuration(itinerary.duration)}</div>
        <div className="relative w-full h-px bg-border my-1">
          <div className="absolute w-full -top-0.5 flex justify-center">
            {itinerary.segments.length > 1 && (
              [...Array(itinerary.segments.length - 1)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-border mx-1" />
              ))
            )}
          </div>
        </div>
        <div className="text-xs text-primary font-semibold">{itinerary.segments.length > 1 ? `${itinerary.segments.length - 1} stop(s)` : 'Direct'}</div>
      </div>

      <div className="flex items-center gap-3 text-center">
         <div>
          <p className="text-xl font-bold font-headline">{formatTime(lastSegment.arrival.at)}</p>
          <p className="text-sm font-semibold">{lastSegment.arrival.iataCode}</p>
        </div>
        <PlaneLanding className="w-5 h-5 text-primary" />
      </div>
    </div>
  )
}


export function FlightResults({ flightData, destinationIata }: FlightResultsProps) {
  const { data: flights, dictionaries } = flightData;
  const destinationName = dictionaries.locations?.[destinationIata]?.cityCode;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-headline font-bold text-gray-800">
          Flights to {destinationName || destinationIata}
        </h2>
        {destinationName && (
          <AITravelTips destination={destinationIata} destinationName={destinationName} />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 space-y-4">
          {flights.map((flight, index) => {
            const airlineCode = flight.validatingAirlineCodes[0];
            const airlineName = dictionaries.carriers[airlineCode];
            const isBestPrice = index === 0;

            return (
              <Card key={flight.id} className="overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl relative border bg-card/95 backdrop-blur-sm">
                {isBestPrice && (
                  <Badge variant="success" className="absolute top-4 -left-2 rounded-r-full rounded-l-none px-4 py-1.5 text-sm font-bold z-10 shadow-lg">
                    <Star className="w-4 h-4 mr-1.5" /> Best Price
                  </Badge>
                )}
                <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-stretch gap-6">
                  <div className="md:w-1/5 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r pb-4 md:pb-0 md:pr-6">
                     <Image
                        src={`https://images.kiwi.com/airlines/64/${airlineCode}.png`}
                        alt={airlineName || airlineCode}
                        width={48}
                        height={48}
                        className="rounded-full bg-white p-1 shadow-md mb-2"
                      />
                      <p className="font-semibold font-body text-center">{airlineName}</p>
                      <p className="text-xs text-muted-foreground">{flight.oneWay ? 'One Way' : 'Round Trip'}</p>
                  </div>
                  
                  <div className="flex-grow w-full space-y-4">
                      {flight.itineraries.map((itinerary, i) => (
                        <div key={i}>
                          <ItineraryDetails 
                            itinerary={itinerary} 
                            dictionaries={dictionaries} 
                          />
                          {i === 0 && flight.itineraries.length > 1 && <Separator className="my-4" />}
                        </div>
                      ))}
                  </div>
                  
                  <div className="md:w-1/4 w-full text-center md:text-right flex-shrink-0 flex flex-col justify-center items-center md:items-end mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l md:pl-6">
                      <p className="text-4xl font-bold font-headline text-gray-800">${flight.price.total}</p>
                      <p className="text-xs text-muted-foreground mb-3">Total for {flight.travelerPricings.length} traveler(s)</p>
                      <Button 
                        size="lg"
                        className="w-full md:w-auto font-bold bg-accent hover:bg-accent/90 text-accent-foreground text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
                        onClick={() => alert(`Redirecting to book flight to ${flight.itineraries[0].segments[flight.itineraries[0].segments.length-1].arrival.iataCode}...`)}
                      >
                        Book Now
                        <ArrowRight className="ml-2 h-5 w-5"/>
                      </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
