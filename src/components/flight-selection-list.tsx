
'use client';

import Image from 'next/image';
import type { FlightOffer, Itinerary, Dictionaries, Segment } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Clock, ChevronDown } from 'lucide-react';
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

interface StopInfoProps {
    itinerary: Itinerary;
    dictionaries: Dictionaries;
}

const StopInfo = ({ itinerary, dictionaries }: StopInfoProps) => {
    if (itinerary.segments.length <= 1) return null;

    return (
        <div className="space-y-4 px-2">
            {itinerary.segments.slice(0, -1).map((segment, index) => {
                const nextSegment = itinerary.segments[index + 1];
                const layoverDuration = new Date(nextSegment.departure.at).getTime() - new Date(segment.arrival.at).getTime();
                const hours = Math.floor(layoverDuration / (1000 * 60 * 60));
                const minutes = Math.floor((layoverDuration % (1000 * 60 * 60)) / (1000 * 60));
                
                return (
                     <div key={`stop-${index}`} className="text-xs text-center text-gray-600">
                        <p>Escala en {segment.arrival.iataCode} ({dictionaries.locations[segment.arrival.iataCode]?.cityCode})</p>
                        <p>Duración: {hours}h {minutes}m</p>
                    </div>
                )
            })}
        </div>
    )
}

interface FlightCardProps {
  flight: FlightOffer;
  dictionaries: Dictionaries;
  onSelectFlight: (flight: FlightOffer, addons: number) => void;
  title: string;
}

const FlightCard = React.memo(function FlightCard({ flight, dictionaries, onSelectFlight, title }: FlightCardProps) {
    const isReturnFlight = title.toLowerCase().includes('vuelta');
    const itinerary = (isReturnFlight && flight.itineraries.length > 1) ? flight.itineraries[1] : flight.itineraries[0];
    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];
    const airlineName = dictionaries.carriers[firstSegment.carrierCode] || firstSegment.carrierCode;
    const flightNumber = `${firstSegment.carrierCode} ${firstSegment.number}`;

    const stops = itinerary.segments.length - 1;
    const stopInfoText = stops > 1 ? `${stops} escalas` : stops === 1 ? '1 escala' : 'Directo';

    return (
        <Collapsible asChild>
          <Card className="bg-white/60 backdrop-blur-lg border border-white/20 text-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center px-2 text-sm">
                    <p className="font-semibold">{airlineName}</p>
                    <p className="text-gray-600 font-mono">{flightNumber}</p>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{formatTime(firstSegment.departure.at)}</p>
                        <p className="font-semibold text-gray-600">{firstSegment.departure.iataCode}</p>
                    </div>
                    
                     <CollapsibleTrigger asChild>
                         <button className={cn("flex-grow flex flex-col items-center cursor-pointer text-center px-2", stops === 0 && "pointer-events-none")}>
                            <div className="w-full relative h-6 flex items-center justify-center">
                                <div className="absolute w-full h-px bg-gray-400/50 top-[9px]"></div>
                                <div className="absolute w-full h-px bg-gray-400/50 bottom-[9px]"></div>
                                <div className="relative bg-white/60 p-1 rounded-full border border-gray-300">
                                   <Plane className="w-5 h-5 text-gray-800"/>
                                </div>
                            </div>
                        </button>
                    </CollapsibleTrigger>
                    
                    <div className="text-center">
                        <p className="text-2xl font-bold">{formatTime(lastSegment.arrival.at)}</p>
                        <p className="font-semibold text-gray-600">{lastSegment.arrival.iataCode}</p>
                    </div>
                </div>
                
                <CollapsibleContent>
                    <StopInfo itinerary={itinerary} dictionaries={dictionaries} />
                </CollapsibleContent>
                
                <div className="flex justify-between items-center text-sm px-2 text-gray-600">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3"/>
                        <span>{formatDuration(itinerary.duration)}</span>
                    </div>
                    <span>{stopInfoText}</span>
                    <p className="text-xl font-bold text-gray-800">${flight.price.total}</p>
                </div>

                <div className="pt-2">
                  <FlightDetailsDialog
                      flight={flight}
                      dictionaries={dictionaries}
                      onSelectFlight={onSelectFlight}
                      dialogTitle={title.includes('ida') ? 'Vuelo de Ida' : 'Vuelo de Vuelta'}
                  />
                </div>
            </CardContent>
          </Card>
        </Collapsible>
    );
});


export function FlightSelectionList({ flights, dictionaries, onSelectFlight, title, selectedOutboundFlight }: {
    flights: FlightOffer[];
    dictionaries: Dictionaries;
    onSelectFlight: (flight: FlightOffer, addons: number) => void;
    title: string;
    selectedOutboundFlight?: FlightOffer | null;
}) {
  
  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-3xl font-headline font-bold text-white drop-shadow-lg">
                {title}
            </h2>
        </div>

        {selectedOutboundFlight && (
            <Card className="bg-gradient-to-r from-yellow-400 to-amber-500 border-none shadow-lg mb-4">
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
