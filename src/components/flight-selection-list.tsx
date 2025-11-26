
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

    const getCityName = (iataCode: string) => {
      const location = dictionaries.locations[iataCode];
      if (!location) return iataCode;
      
      // If the location itself is a city, return its name (e.g., YTO is Toronto)
      if (location.cityCode === iataCode) {
          const cityEntry = Object.values(dictionaries.locations).find(loc => loc.cityCode === iataCode);
           // This logic is a bit tricky. We find the first airport in that city and get its city name.
          const matchingAirport = Object.entries(dictionaries.locations).find(([key, value]) => value.cityCode === iataCode);
          if (matchingAirport) {
              const airportLocation = dictionaries.locations[matchingAirport[0]];
              return airportLocation?.cityCode ? dictionaries.locations[airportLocation.cityCode]?.cityCode || airportLocation.cityCode : iataCode;
          }
      }
      
      // If the location is an airport, return its city name
      return dictionaries.locations[location.cityCode]?.cityCode || location.cityCode || iataCode;
    };


    return (
        <div className="space-y-4 px-2">
            {itinerary.segments.slice(0, -1).map((segment, index) => {
                const nextSegment = itinerary.segments[index + 1];
                const layoverDuration = new Date(nextSegment.departure.at).getTime() - new Date(segment.arrival.at).getTime();
                const hours = Math.floor(layoverDuration / (1000 * 60 * 60));
                const minutes = Math.floor((layoverDuration % (1000 * 60 * 60)) / (1000 * 60));
                
                const cityName = getCityName(segment.arrival.iataCode);

                return (
                     <div key={`stop-${index}`} className="text-xs text-center text-muted-foreground">
                        <p>Escala en {cityName}</p>
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
    const airlineCode = firstSegment.carrierCode;

    const stops = itinerary.segments.length - 1;
    const stopInfoText = stops > 1 ? `${stops} escalas` : stops === 1 ? '1 escala' : 'Directo';

    return (
        <Collapsible asChild>
          <Card className="bg-card/80 backdrop-blur-lg border text-card-foreground rounded-2xl shadow-lg">
            <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center px-2 text-sm">
                    <div className="flex items-center gap-2">
                        <Image
                            src={`https://images.kiwi.com/airlines/32/${airlineCode}.png`}
                            alt={airlineName}
                            width={24}
                            height={24}
                            className="rounded-sm bg-white/50"
                            unoptimized
                        />
                        <p className="font-semibold">{airlineName}</p>
                    </div>
                    <p className="text-muted-foreground font-mono">{firstSegment.carrierCode} {firstSegment.number}</p>
                </div>
                
                <div className="flex items-center justify-around">
                    <div className="text-center flex-grow flex-shrink-0 basis-0">
                        <p className="text-2xl font-bold">{formatTime(firstSegment.departure.at)}</p>
                        <p className="font-semibold text-muted-foreground">{firstSegment.departure.iataCode}</p>
                    </div>
                    
                     <CollapsibleTrigger asChild>
                         <button className={cn("flex w-auto flex-col items-center cursor-pointer text-center px-2", stops === 0 && "pointer-events-none")}>
                            <div className="w-full relative h-6 flex items-center justify-center">
                                <div className="absolute w-full h-px bg-border"></div>
                                <div className="relative bg-card p-1 rounded-full border">
                                   <Plane className="w-5 h-5"/>
                                </div>
                            </div>
                        </button>
                    </CollapsibleTrigger>
                    
                    <div className="text-center flex-grow flex-shrink-0 basis-0">
                        <p className="text-2xl font-bold">{formatTime(lastSegment.arrival.at)}</p>
                        <p className="font-semibold text-muted-foreground">{lastSegment.arrival.iataCode}</p>
                    </div>
                </div>
                
                <CollapsibleContent>
                    <StopInfo itinerary={itinerary} dictionaries={dictionaries} />
                </CollapsibleContent>
                
                <div className="flex justify-between items-center text-sm px-2 text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3"/>
                        <span>{formatDuration(itinerary.duration)}</span>
                    </div>
                    <span>{stopInfoText}</span>
                    <p className="text-xl font-bold text-card-foreground">${flight.price.total}</p>
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
            <h2 className="text-3xl font-headline font-bold">
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
