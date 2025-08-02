'use client';

import Image from 'next/image';
import type { FlightOffer, Itinerary, Dictionaries, Segment } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Clock, ArrowRight } from 'lucide-react';
import { FlightBaggageInfo } from './flight-baggage-info';
import { FlightDetailsDialog } from './flight-details-dialog';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { differenceInMinutes } from 'date-fns';
import React from 'react';

const formatDuration = (duration: string) => {
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
}

const getLayoverInfo = (currentSegment: Segment, nextSegment: Segment, dictionaries: Dictionaries) => {
    const arrivalTime = new Date(currentSegment.arrival.at);
    const departureTime = new Date(nextSegment.departure.at);
    const duration = differenceInMinutes(departureTime, arrivalTime);
    
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const layoverDuration = `${hours}h ${minutes}m`;
    const layoverLocation = dictionaries.locations[currentSegment.arrival.iataCode]?.cityCode || currentSegment.arrival.iataCode;

    return {
        duration: layoverDuration,
        location: layoverLocation,
    }
}


const FlightItineraryDetail = ({ itinerary, dictionaries }: { itinerary: Itinerary, dictionaries: Dictionaries }) => (
    <div className="bg-black/20 backdrop-blur-sm p-4 rounded-b-2xl">
        <div className="relative pl-5">
            {/* Timeline line */}
            <div className="absolute left-10 top-5 bottom-5 w-0.5 bg-primary/30" />

            {itinerary.segments.map((segment, index) => {
                const isLastSegment = index === itinerary.segments.length - 1;
                const layover = !isLastSegment ? getLayoverInfo(segment, itinerary.segments[index + 1], dictionaries) : null;
                const airlineName = dictionaries.carriers[segment.carrierCode] || segment.carrierCode;

                return (
                    <React.Fragment key={segment.id}>
                        {/* Segment Point */}
                        <div className="flex items-start gap-4 relative">
                            <div className="absolute left-0 top-0 h-full flex justify-center w-10">
                                <div className="h-4 w-4 bg-primary rounded-full mt-1 border-2 border-background ring-2 ring-primary/50" />
                            </div>
                            <div className="flex-grow pl-8 pb-8">
                                <div className="flex items-center gap-2 font-bold text-white">
                                    <span>{formatTime(segment.departure.at)}</span>
                                    <ArrowRight className="h-4 w-4" />
                                    <span>{formatTime(segment.arrival.at)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-white/80">
                                    <span>{segment.departure.iataCode}</span>
                                    <span>-</span>
                                    <span>{segment.arrival.iataCode}</span>
                                </div>
                                <p className="text-xs text-white/70 mt-1">{formatDate(segment.departure.at)}</p>
                                <p className="text-xs text-white/70 mt-1">{airlineName} · Duración: {formatDuration(segment.duration)}</p>
                            </div>
                        </div>
                        
                        {/* Layover Point */}
                        {layover && (
                             <div className="flex items-start gap-4 relative mb-8">
                                <div className="absolute left-0 top-0 h-full flex justify-center w-10">
                                    <Clock className="h-4 w-4 text-accent mt-1" />
                                </div>
                                <div className="pl-8 text-accent font-semibold">
                                    <p>Escala en {layover.location} · {layover.duration}</p>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    </div>
);


interface FlightSelectionListProps {
  flights: FlightOffer[];
  dictionaries: Dictionaries;
  onSelectFlight: (flight: FlightOffer, addons: number) => void;
  title: string;
  selectedOutboundFlight?: FlightOffer | null;
}

function FlightCard({ flight, dictionaries, onSelectFlight, title }: { flight: FlightOffer, dictionaries: Dictionaries, onSelectFlight: (flight: FlightOffer, addons: number) => void, title: string }) {
    const isReturnFlight = title.toLowerCase().includes('vuelta');
    const itinerary = (isReturnFlight && flight.itineraries.length > 1) ? flight.itineraries[1] : flight.itineraries[0];
    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];
    const airlineName = dictionaries.carriers[firstSegment.carrierCode] || firstSegment.carrierCode;
    const originCity = dictionaries.locations[firstSegment.departure.iataCode]?.cityCode;
    const destinationCity = dictionaries.locations[lastSegment.arrival.iataCode]?.cityCode;

    const stops = itinerary.segments.length - 1;
    const stopInfo = stops >= 1
        ? `${stops} escala${stops > 1 ? 's' : ''} en ${itinerary.segments[0].arrival.iataCode}`
        : 'Directo';


    return (
        <Collapsible asChild>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl border-none bg-white/60 backdrop-blur-lg flex flex-col text-gray-800">
                <div className="flex flex-col sm:flex-row">
                    {/* Main boarding pass section */}
                    <div className="flex-grow p-4 md:p-6">
                        <CollapsibleTrigger className="flex items-start gap-4 w-full text-left">
                            <Image
                                src={`https://images.kiwi.com/airlines/64/${firstSegment.carrierCode}.png`}
                                alt={airlineName}
                                width={48}
                                height={48}
                                className="rounded-full bg-white p-1 shadow-md"
                            />
                            <div className="flex-grow">
                                <div className="flex items-center justify-between">
                                    <div className="font-semibold text-left text-gray-800">
                                        <p className="text-2xl font-bold">{formatTime(firstSegment.departure.at)}</p>
                                        <p className="font-semibold text-gray-600">{firstSegment.departure.iataCode}</p>
                                        <p className="text-xs text-gray-500">{originCity}</p>
                                    </div>
                                    <div className="flex-grow flex flex-col items-center text-gray-600 px-2">
                                        <p className="text-xs font-semibold text-gray-800">{formatDuration(itinerary.duration)}</p>
                                        <div className="w-full h-px bg-gray-400/50 relative my-1">
                                            <Plane className="w-4 h-4 absolute right-1/2 translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 p-0.5 rounded-full border border-gray-300"/>
                                        </div>
                                        <p className={cn("text-xs font-semibold drop-shadow-sm", stops > 0 ? "text-primary" : "text-green-600")}>{stopInfo}</p>
                                    </div>
                                    <div className="font-semibold text-right text-gray-800">
                                        <p className="text-2xl font-bold">{formatTime(lastSegment.arrival.at)}</p>
                                        <p className="font-semibold text-gray-600">{lastSegment.arrival.iataCode}</p>
                                        <p className="text-xs text-gray-500">{destinationCity}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-dashed border-gray-400/50">
                                    <p className="text-xs text-gray-500">{airlineName} &middot; {firstSegment.carrierCode} {firstSegment.number}</p>
                                    <FlightBaggageInfo flight={flight} />
                                </div>
                            </div>
                        </CollapsibleTrigger>
                    </div>

                    {/* Tear-off stub */}
                    <div className="flex-shrink-0 w-full sm:w-48 bg-white/60 ticket-tear flex sm:flex-col items-center justify-between sm:justify-center p-4 gap-3">
                        <div className="text-center">
                            <p className="text-xs sm:text-sm text-gray-700">Precio total</p>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                ${flight.price.total}
                            </p>
                        </div>
                        <FlightDetailsDialog
                            flight={flight}
                            dictionaries={dictionaries}
                            onSelectFlight={onSelectFlight}
                            dialogTitle={title.includes('ida') ? 'Vuelo de Ida' : 'Vuelo de Vuelta'}
                        />
                    </div>
                </div>
                 <CollapsibleContent>
                    <FlightItineraryDetail itinerary={itinerary} dictionaries={dictionaries} />
                </CollapsibleContent>
            </Card>
        </Collapsible>
    );
};


export function FlightSelectionList({ flights, dictionaries, onSelectFlight, title, selectedOutboundFlight }: FlightSelectionListProps) {
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-headline font-bold text-white drop-shadow-lg">
          {title}
        </h2>
      </div>

       {selectedOutboundFlight && (
         <Card className="bg-gradient-to-r from-yellow-400 to-amber-500 border-none shadow-lg">
            <CardContent className="p-4 flex items-center justify-between gap-4 text-gray-800">
                <div className="flex items-center gap-3">
                    <Plane className="h-5 w-5"/>
                    <p className="font-semibold">
                        Vuelo de ida seleccionado: {selectedOutboundFlight.itineraries[0].segments[0].departure.iataCode} - {selectedOutboundFlight.itineraries[0].segments.slice(-1)[0].arrival.iataCode}
                    </p>
                </div>
                <p className="font-bold text-lg">${selectedOutboundFlight.price.total}</p>
            </CardContent>
         </Card>
      )}

      {flights.length > 0 ? (
          <div className="space-y-4">
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} dictionaries={dictionaries} onSelectFlight={onSelectFlight} title={title} />
            ))}
          </div>
      ) : (
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
            <CardContent className="pt-6 text-center text-white/70">
                <p>No hay vuelos que coincidan con tus filtros.</p>
                <p>Intenta ajustar o eliminar algunos filtros para ver más resultados.</p>
            </CardContent>
        </Card>
      )}

    </div>
  );
}
