'use client';

import Image from 'next/image';
import type { FlightOffer, Itinerary, Dictionaries, Segment } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Clock } from 'lucide-react';
import { FlightBaggageInfo } from './flight-baggage-info';
import { FlightDetailsDialog } from './flight-details-dialog';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import React from 'react';
import { Separator } from './ui/separator';

const formatDuration = (duration: string) => {
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
}


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

    const stops = itinerary.segments.length - 1;
    const stopInfo = stops >= 1
        ? `${stops} escala${stops > 1 ? 's' : ''}`
        : 'Directo';

    return (
        <Card className="bg-white/60 backdrop-blur-lg border border-white/20 text-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-4 space-y-4">
                {/* Airline Info */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Image
                            src={`https://images.kiwi.com/airlines/32/${firstSegment.carrierCode}.png`}
                            alt={airlineName}
                            width={24}
                            height={24}
                            className="rounded-full bg-white p-0.5 shadow-sm"
                        />
                        <span className="font-semibold text-sm">{airlineName}</span>
                    </div>
                    <span className="text-xs text-gray-600">{firstSegment.carrierCode} {firstSegment.number}</span>
                </div>

                {/* Flight Details */}
                <div className="flex items-center justify-between">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{formatTime(firstSegment.departure.at)}</p>
                        <p className="font-semibold text-gray-600">{firstSegment.departure.iataCode}</p>
                    </div>
                    <div className="flex-grow flex flex-col items-center text-gray-600 px-2">
                        <div className="w-full h-px bg-gray-400/50 relative my-1">
                            <Plane className="w-4 h-4 absolute right-1/2 translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 p-0.5 rounded-full border border-gray-300"/>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">{formatTime(lastSegment.arrival.at)}</p>
                        <p className="font-semibold text-gray-600">{lastSegment.arrival.iataCode}</p>
                    </div>
                </div>
                
                <Separator className="bg-gray-400/30" />

                {/* Duration, Stops, Price */}
                <div className="flex justify-between items-center">
                    <div className="text-sm flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-gray-700">
                           <Clock className="w-4 h-4"/>
                           <span className="font-medium">{formatDuration(itinerary.duration)}</span>
                        </div>
                        <span className="text-gray-600 font-medium">{stopInfo}</span>
                    </div>
                     <p className="text-2xl font-bold text-green-600">${flight.price.total}</p>
                </div>
                
                <FlightDetailsDialog
                    flight={flight}
                    dictionaries={dictionaries}
                    onSelectFlight={onSelectFlight}
                    dialogTitle={title.includes('ida') ? 'Vuelo de Ida' : 'Vuelo de Vuelta'}
                />

            </CardContent>
        </Card>
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
