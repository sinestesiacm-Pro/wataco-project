'use client';

import Image from 'next/image';
import type { FlightOffer, Itinerary, Dictionaries } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane, Clock, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from './ui/separator';
import { AITravelTips } from './ai-travel-tips';
import { FlightDetailsDialog } from './flight-details-dialog';

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
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-2/3 flex items-center gap-4">
                     <Image
                        src={`https://images.kiwi.com/airlines/64/${firstSegment.carrierCode}.png`}
                        alt={airlineName}
                        width={48}
                        height={48}
                        className="rounded-full bg-white p-1 shadow-md"
                    />
                    <div className="flex-grow">
                        <div className="flex items-center gap-4">
                            <div className="font-semibold">
                                <span className="text-xl">{formatTime(firstSegment.departure.at)}</span>
                                <span className="text-sm text-muted-foreground ml-1">{firstSegment.departure.iataCode}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-muted-foreground">{formatDuration(itinerary.duration)}</span>
                                <div className="w-16 h-px bg-border my-1"></div>
                                <span className="text-xs text-primary font-semibold">{stops === 0 ? 'Directo' : `${stops} escala(s)`}</span>
                            </div>
                            <div className="font-semibold">
                                <span className="text-xl">{formatTime(lastSegment.arrival.at)}</span>
                                <span className="text-sm text-muted-foreground ml-1">{lastSegment.arrival.iataCode}</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{airlineName}</p>
                    </div>
                </div>
                 <div className="w-full md:w-1/3 flex flex-col items-center md:items-end gap-3">
                    <div className="text-center md:text-right">
                        <p className="text-2xl font-bold font-headline text-accent">
                            ${flight.price.total}
                        </p>
                        <p className="text-xs text-muted-foreground">Precio total, ida y vuelta</p>
                    </div>
                     <div className="flex gap-2">
                        <FlightDetailsDialog flight={flight} dictionaries={dictionaries} />
                        <Button onClick={() => onSelectFlight(flight)}>
                            Seleccionar
                        </Button>
                    </div>
                </div>
            </CardContent>
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
        {/* Potentially add AITravelTips or other components here */}
      </div>

       {selectedOutboundFlight && (
         <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Plane className="h-5 w-5 text-primary"/>
                    <p className="font-semibold">
                        Vuelo de ida seleccionado: {selectedOutboundFlight.itineraries[0].segments[0].departure.iataCode} - {selectedOutboundFlight.itineraries[0].segments.slice(-1)[0].arrival.iataCode}}
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
