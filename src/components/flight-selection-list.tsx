'use client';

import Image from 'next/image';
import type { FlightOffer, Itinerary, Dictionaries } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';
import { FlightBaggageInfo } from './flight-baggage-info';

const formatDuration = (duration: string) => {
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
};

interface FlightSelectionListProps {
  flights: FlightOffer[];
  dictionaries: Dictionaries;
  onSelectFlight: (flight: FlightOffer) => void;
  title: string;
  selectedOutboundFlight?: FlightOffer | null;
}

const FlightCard = ({ flight, dictionaries, onSelectFlight }: { flight: FlightOffer, dictionaries: Dictionaries, onSelectFlight: (flight: FlightOffer) => void }) => {
    const itinerary = flight.itineraries[0];
    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];
    const airlineName = dictionaries.carriers[firstSegment.carrierCode] || firstSegment.carrierCode;
    const stops = itinerary.segments.length - 1;

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl border bg-card/95 backdrop-blur-sm">
            <div className="flex">
                {/* Main boarding pass section */}
                <div className="flex-grow p-4 md:p-6">
                    <div className="flex items-start gap-4">
                        <Image
                            src={`https://images.kiwi.com/airlines/64/${firstSegment.carrierCode}.png`}
                            alt={airlineName}
                            width={48}
                            height={48}
                            className="rounded-full bg-white p-1 shadow-md"
                        />
                        <div className="flex-grow">
                             <div className="flex items-center justify-between">
                                <div className="font-semibold text-left">
                                    <p className="text-2xl font-bold">{formatTime(firstSegment.departure.at)}</p>
                                    <p className="text-sm text-muted-foreground">{firstSegment.departure.iataCode}</p>
                                </div>
                                <div className="flex-grow flex flex-col items-center text-muted-foreground px-2">
                                    <p className="text-xs font-semibold">{formatDuration(itinerary.duration)}</p>
                                    <div className="w-full h-px bg-border relative my-1">
                                        <Plane className="w-4 h-4 absolute right-1/2 translate-x-1/2 -translate-y-1/2 bg-card text-muted-foreground p-0.5 rounded-full"/>
                                    </div>
                                    <p className="text-xs text-primary font-semibold">{stops === 0 ? 'Directo' : `${stops} escala(s)`}</p>
                                </div>
                                <div className="font-semibold text-right">
                                    <p className="text-2xl font-bold">{formatTime(lastSegment.arrival.at)}</p>
                                    <p className="text-sm text-muted-foreground">{lastSegment.arrival.iataCode}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-dashed">
                                <p className="text-xs text-muted-foreground">{airlineName}</p>
                                <FlightBaggageInfo flight={flight} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tear-off stub */}
                <div className="flex-shrink-0 w-48 bg-muted/30 ticket-tear flex flex-col items-center justify-center p-4 gap-3">
                    <div className="text-center">
                        <p className="text-2xl font-bold font-headline text-success">
                            ${flight.price.total}
                        </p>
                        <p className="text-xs text-muted-foreground">Precio total, ida y vuelta</p>
                    </div>
                    <Button 
                        size="sm"
                        className="w-full font-semibold"
                        onClick={() => onSelectFlight(flight)}
                    >
                        Seleccionar
                    </Button>
                </div>
            </div>
        </Card>
    );
};


export function FlightSelectionList({ flights, dictionaries, onSelectFlight, title, selectedOutboundFlight }: FlightSelectionListProps) {
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-headline font-bold text-gray-800">
          {title}
        </h2>
      </div>

       {selectedOutboundFlight && (
         <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Plane className="h-5 w-5 text-primary"/>
                    <p className="font-semibold">
                        Vuelo de ida seleccionado: {selectedOutboundFlight.itineraries[0].segments[0].departure.iataCode} - {selectedOutboundFlight.itineraries[0].segments.slice(-1)[0].arrival.iataCode}
                    </p>
                </div>
                <p className="font-bold text-lg text-primary">${selectedOutboundFlight.price.total}</p>
            </CardContent>
         </Card>
      )}

      {flights.length > 0 ? (
          <div className="space-y-4">
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} dictionaries={dictionaries} onSelectFlight={onSelectFlight} />
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
