'use client';

import Image from 'next/image';
import type { FlightOffer, Itinerary, Dictionaries, Segment } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Clock, ChevronDown, ArrowRight } from 'lucide-react';
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
    const airlineCode = firstSegment.carrierCode;
    const flightNumber = `${firstSegment.carrierCode}${firstSegment.number}`;

    const stops = itinerary.segments.length - 1;
    const stopInfoText = stops > 0 ? `${stops} escala(s)` : 'Directo';

    return (
        <Card className="bg-card/80 backdrop-blur-lg border text-card-foreground rounded-2xl shadow-lg">
            <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="flex justify-between items-start text-sm">
                    <div className="flex items-center gap-2 font-semibold" style={{color: '#546377'}}>
                        <Image
                            src={`https://images.kiwi.com/airlines/64/${airlineCode}.png`}
                            alt={airlineName}
                            width={24}
                            height={24}
                            className="rounded-full bg-white p-0.5 shadow-md"
                            unoptimized
                        />
                        <span>{airlineName}</span>
                    </div>
                    <span className="font-mono text-xs" style={{color: '#546377'}}>{flightNumber}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-left">
                        <p className="text-2xl font-bold" style={{color: '#323a48'}}>{formatTime(firstSegment.departure.at)}</p>
                        <p className="font-medium text-base" style={{color: '#546377'}}>{firstSegment.departure.iataCode}</p>
                    </div>

                    <div className="text-center flex-grow mx-4">
                        <p className="text-xs font-medium" style={{color: '#546377'}}>{formatDuration(itinerary.duration)}</p>
                        <div className="w-full h-px bg-success my-1"></div>
                        <p className="text-xs font-semibold text-success">{stopInfoText}</p>
                    </div>

                    <div className="text-right">
                        <p className="text-2xl font-bold" style={{color: '#323a48'}}>{formatTime(lastSegment.arrival.at)}</p>
                        <p className="font-medium text-base" style={{color: '#546377'}}>{lastSegment.arrival.iataCode}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                        <p className="text-sm font-medium" style={{color: '#546377'}}>Precio total</p>
                        <p className="text-3xl font-bold text-[#15c5dc]">{flight.price.total} <span className="text-base font-medium">{flight.price.currency}</span></p>
                    </div>
                    <div className="w-32">
                      <FlightDetailsDialog flight={flight} dictionaries={dictionaries} onSelectFlight={onSelectFlight} dialogTitle={title} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});

interface FlightInfoProps {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    totalResults: number;
}

export function FlightSelectionList({ flights, dictionaries, onSelectFlight, title, selectedOutboundFlight, flightInfo }: {
    flights: FlightOffer[];
    dictionaries: Dictionaries;
    onSelectFlight: (flight: FlightOffer, addons: number) => void;
    title: string;
    selectedOutboundFlight?: FlightOffer | null;
    flightInfo: FlightInfoProps;
}) {
  
  return (
    <div className="space-y-6">
        <div className="mb-6">
            <h2 className="text-lg font-medium" style={{color: '#323a48'}}>
                {flightInfo.origin} → {flightInfo.destination}
            </h2>
            <p className="text-sm" style={{color: '#546377'}}>
                {flightInfo.departureDate} {flightInfo.returnDate && `- ${flightInfo.returnDate}`}
            </p>
            <p className="mt-4 font-medium" style={{color: '#546377'}}>{flightInfo.totalResults} vuelos encontrados</p>
        </div>

        {selectedOutboundFlight && (
            <Card className="bg-success/20 border-success/50 shadow-lg mb-4">
                <CardContent className="p-4 flex items-center justify-between gap-4 text-success-foreground">
                    <div className="flex items-center gap-3">
                        <Plane className="h-5 w-5"/>
                        <p className="font-semibold text-card-foreground">
                            Vuelo de ida seleccionado: {selectedOutboundFlight.itineraries[0].segments[0].departure.iataCode} - {selectedOutboundFlight.itineraries[0].segments.slice(-1)[0].arrival.iataCode}
                        </p>
                    </div>
                    <p className="font-bold text-lg text-card-foreground">${selectedOutboundFlight.price.total}</p>
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
            <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                    <p>No hay vuelos que coincidan con tus filtros.</p>
                    <p>Intenta ajustar o eliminar algunos filtros para ver más resultados.</p>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
