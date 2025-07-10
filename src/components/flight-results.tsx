'use client';

import Image from 'next/image';
import { FlightData, FlightOffer, Itinerary } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { AITravelTips } from './ai-travel-tips';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const formatDuration = (duration: string) => {
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function ItineraryDetails({ itinerary, dictionaries }: { itinerary: Itinerary, dictionaries: FlightData['dictionaries'] }) {
  const firstSegment = itinerary.segments[0];
  const lastSegment = itinerary.segments[itinerary.segments.length - 1];
  const airlineCode = firstSegment.carrierCode;
  const airlineName = dictionaries.carriers[airlineCode] || airlineCode;
  
  return (
    <div className="flex items-center gap-4 py-2">
       <Image
          src={`https://images.kiwi.com/airlines/64/${airlineCode}.png`}
          alt={airlineName}
          width={40}
          height={40}
          className="rounded-full bg-white p-1 shadow-md"
        />
        <div className="flex items-center gap-2">
           <div className="text-center">
              <p className="text-lg font-bold">{formatTime(firstSegment.departure.at)}</p>
              <p className="text-sm font-semibold">{firstSegment.departure.iataCode}</p>
           </div>
           <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className="text-center">
              <p className="text-lg font-bold">{formatTime(lastSegment.arrival.at)}</p>
              <p className="text-sm font-semibold">{lastSegment.arrival.iataCode}</p>
            </div>
        </div>
        <div className="flex-grow text-center">
            <p className="text-sm font-semibold">{formatDuration(itinerary.duration)}</p>
            <p className="text-xs text-muted-foreground">{itinerary.segments.length > 1 ? `${itinerary.segments.length - 1} escala(s)` : 'Directo'}</p>
        </div>
    </div>
  )
}

function CabinSelector({ flight }: { flight: FlightOffer }) {
    // Determine the cabin class from the first traveler's first fare detail
    const cabin = flight.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin || 'ECONOMY';
    
    // Helper to format cabin names for display
    const formatCabinName = (cabin: string) => {
        const name = cabin.replace('_', ' ').toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-[180px] justify-between font-semibold">
                    {formatCabinName(cabin)}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]">
                <DropdownMenuLabel>Seleccionar Clase</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* For this demo, only the current option is enabled as API returns one class */}
                <DropdownMenuRadioGroup value={cabin}>
                    <DropdownMenuRadioItem value="ECONOMY" disabled={cabin !== 'ECONOMY'}>Económica</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="PREMIUM_ECONOMY" disabled={cabin !== 'PREMIUM_ECONOMY'}>Premium Economy</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="BUSINESS" disabled={cabin !== 'BUSINESS'}>Negocios</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="FIRST" disabled={cabin !== 'FIRST'}>Primera</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function FlightResults({ flightData, destinationIata }: { flightData: FlightData; destinationIata: string; }) {
  const { data: flights, dictionaries } = flightData;
  const destinationName = dictionaries.locations?.[destinationIata]?.cityCode;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-headline font-bold text-gray-800">
          Vuelos a {destinationName || destinationIata}
        </h2>
        {destinationName && (
          <AITravelTips destination={destinationIata} destinationName={destinationName} />
        )}
      </div>

      <div className="space-y-4">
        {flights.map((flight) => (
          <Card key={flight.id} className="overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl border bg-card/95 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-2/3 divide-y divide-border">
                    {flight.itineraries.map((itinerary, i) => (
                        <ItineraryDetails key={i} itinerary={itinerary} dictionaries={dictionaries} />
                    ))}
                </div>
                
                <div className="w-full md:w-1/3 flex flex-col items-center md:items-end gap-4">
                    <CabinSelector flight={flight} />
                    <div className="text-center md:text-right">
                      <p className="text-3xl font-bold font-headline text-accent">${flight.price.total}</p>
                      <p className="text-xs text-muted-foreground">Precio total, {flight.oneWay ? 'solo ida' : 'ida y vuelta'}</p>
                    </div>
                    <Button 
                        size="lg"
                        className="w-full font-bold bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl shadow-md hover:shadow-lg transition-all"
                        onClick={() => alert(`La funcionalidad de reserva no está implementada en esta demostración.`)}
                    >
                        Seleccionar
                        <ArrowRight className="ml-2 h-5 w-5"/>
                    </Button>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
