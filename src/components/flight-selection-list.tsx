
'use client';

import Image from 'next/image';
import type { FlightOffer, Itinerary, Dictionaries } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';
import { FlightBaggageInfo } from './flight-baggage-info';
import { FlightDetailsDialog } from './flight-details-dialog';
import { cn } from '@/lib/utils';

const formatDuration = (duration: string) => {
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
};

interface FlightSelectionListProps {
  flights: FlightOffer[];
  dictionaries: Dictionaries;
  onSelectFlight: (flight: FlightOffer, addons: number) => void;
  title: string;
  selectedOutboundFlight?: FlightOffer | null;
}

function FlightCard({ flight, dictionaries, onSelectFlight, title }: { flight: FlightOffer, dictionaries: Dictionaries, onSelectFlight: (flight: FlightOffer, addons: number) => void, title: string }) {
    const itinerary = flight.itineraries[0];
    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];
    const airlineName = dictionaries.carriers[firstSegment.carrierCode] || firstSegment.carrierCode;
    const originCity = dictionaries.locations[firstSegment.departure.iataCode]?.cityCode;
    const destinationCity = dictionaries.locations[lastSegment.arrival.iataCode]?.cityCode;

    const stops = itinerary.segments.length - 1;

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl flex flex-col sm:flex-row text-white">
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
                                <p className="font-semibold text-white/80">{firstSegment.departure.iataCode}</p>
                                <p className="text-xs text-white/70">{originCity}</p>
                            </div>
                            <div className="flex-grow flex flex-col items-center text-white/80 px-2">
                                <p className="text-xs font-semibold">{formatDuration(itinerary.duration)}</p>
                                <div className="w-full h-px bg-white/20 relative my-1">
                                    <Plane className="w-4 h-4 absolute right-1/2 translate-x-1/2 -translate-y-1/2 bg-background text-white p-0.5 rounded-full"/>
                                </div>
                                <p className={cn("text-xs font-semibold", stops > 0 ? "text-amber-400" : "text-success")}>{stops === 0 ? 'Directo' : `${stops} escala(s)`}</p>
                            </div>
                            <div className="font-semibold text-right">
                                <p className="text-2xl font-bold">{formatTime(lastSegment.arrival.at)}</p>
                                 <p className="font-semibold text-white/80">{lastSegment.arrival.iataCode}</p>
                                 <p className="text-xs text-white/70">{destinationCity}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-dashed border-white/20">
                            <p className="text-xs text-white/70">{airlineName} &middot; {firstSegment.carrierCode} {firstSegment.number}</p>
                            <FlightBaggageInfo flight={flight} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tear-off stub */}
            <div className="flex-shrink-0 w-full sm:w-48 bg-black/20 ticket-tear flex sm:flex-col items-center justify-between sm:justify-center p-4 gap-3">
                <div className="text-center">
                    <p className="text-xs sm:text-sm text-white/70">Precio total</p>
                    <p className="text-2xl sm:text-3xl font-bold font-headline text-accent">
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
        </Card>
    );
};


export function FlightSelectionList({ flights, dictionaries, onSelectFlight, title, selectedOutboundFlight }: FlightSelectionListProps) {
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-headline font-bold text-white">
          {title}
        </h2>
      </div>

       {selectedOutboundFlight && (
         <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 flex items-center justify-between gap-4 text-white">
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
