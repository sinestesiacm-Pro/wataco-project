'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { FlightOffer, Itinerary, Dictionaries, Segment } from '@/lib/types';
import { Clock, Luggage, Plane, Settings2, X } from 'lucide-react';
import Image from 'next/image';
import { parseISO } from 'date-fns';

const formatDuration = (duration: string) => {
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const SegmentDetails = ({ segment, dictionaries }: { segment: Segment, dictionaries: Dictionaries }) => {
    const airlineName = dictionaries.carriers[segment.carrierCode] || segment.carrierCode;
    const aircraftName = dictionaries.aircraft[segment.aircraft.code] || `Aeronave ${segment.aircraft.code}`;
    
    return (
        <div className="flex gap-4 items-start relative pl-8">
            <div className="absolute left-[3px] top-1.5 flex flex-col items-center h-full">
                <div className="w-3 h-3 rounded-full bg-primary border-2 border-card ring-4 ring-card"></div>
                <div className="flex-grow w-px bg-border my-2"></div>
            </div>

            <div className="w-full">
                <div className="flex items-center gap-4 mt-2">
                    <div className="text-left">
                        <p className="text-2xl font-bold">{formatTime(segment.departure.at)}</p>
                        <p className="font-semibold text-muted-foreground text-lg">{segment.departure.iataCode}</p>
                    </div>
                    
                    <div className="flex-grow flex flex-col items-center text-muted-foreground pt-1">
                        <p className="text-xs font-semibold mb-1">{formatDuration(segment.duration)}</p>
                        <div className="w-full h-px bg-border relative">
                           <Plane className="w-4 h-4 absolute right-1/2 translate-x-1/2 -translate-y-1/2 bg-card text-muted-foreground p-0.5 rounded-full"/>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-2xl font-bold">{formatTime(segment.arrival.at)}</p>
                        <p className="font-semibold text-muted-foreground text-lg">{segment.arrival.iataCode}</p>
                    </div>
                </div>
                <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                    <Image
                        src={`https://images.kiwi.com/airlines/32/${segment.carrierCode}.png`}
                        alt={airlineName}
                        width={20}
                        height={20}
                        className="rounded-full bg-white"
                    />
                    <span>{airlineName} &middot; {segment.carrierCode} {segment.number} &middot; {aircraftName}</span>
                </div>
            </div>
        </div>
    )
}

const ItineraryCard = ({ itinerary, dictionaries, title }: { itinerary: Itinerary, dictionaries: Dictionaries, title: string }) => {
    const totalDuration = formatDuration(itinerary.duration);
    const stopCount = itinerary.segments.length - 1;

    return (
        <Card className="bg-card p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline font-bold text-xl">{title}</h3>
                <div className="flex gap-4 text-sm font-medium">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{totalDuration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Plane className="w-4 h-4 text-muted-foreground" />
                        <span>{stopCount > 0 ? `${stopCount} escala${stopCount > 1 ? 's' : ''}` : 'Directo'}</span>
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                {itinerary.segments.map((segment, index) => {
                    const isLastSegment = index === itinerary.segments.length - 1;
                    let layoverDuration = '';
                    if (!isLastSegment) {
                        const nextSegment = itinerary.segments[index + 1];
                        if (nextSegment) {
                            const arrivalTime = parseISO(segment.arrival.at);
                            const departureTime = parseISO(nextSegment.departure.at);
                            const diffMs = departureTime.getTime() - arrivalTime.getTime();
                            const hours = Math.floor(diffMs / 3600000);
                            const minutes = Math.floor((diffMs % 3600000) / 60000);
                            layoverDuration = `PT${hours}H${minutes}M`;
                        }
                    }

                    return (
                        <div key={segment.id}>
                            <SegmentDetails segment={segment} dictionaries={dictionaries} />
                            {!isLastSegment && (
                                <div className="relative pl-8 py-4">
                                    <div className="absolute left-[3px] top-0 flex flex-col items-center h-full">
                                        <div className="flex-grow w-px bg-border"></div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-semibold text-primary ml-[18px] bg-primary/10 px-3 py-1.5 rounded-lg">
                                        <Clock className="w-4 h-4" />
                                        <span>Escala en {segment.arrival.iataCode}: {formatDuration(layoverDuration)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
                <div className="relative pl-8 h-1">
                    <div className="absolute left-[3px] top-0 flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-primary border-2 border-card ring-4 ring-card"></div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const BaggageInfo = ({ flight }: { flight: FlightOffer }) => {
    const travelerPricing = flight.travelerPricings[0];
    const baggage = travelerPricing.fareDetailsBySegment[0].includedCheckedBags;
    const cabinBagText = "1 pieza de equipaje de mano";
    const checkedBagText = baggage?.quantity > 0 ? `${baggage.quantity} maleta${baggage.quantity !== 1 ? 's' : ''} documentada${baggage.quantity !== 1 ? 's' : ''}` : 'Equipaje documentado no incluido';

    return (
        <Card className="bg-card p-6 rounded-2xl shadow-sm">
            <CardHeader className="p-0 mb-4">
              <h3 className="font-headline font-bold text-xl">Equipaje Incluido</h3>
            </CardHeader>
            <CardContent className="p-0 space-y-3 text-base">
                <div className="flex items-center gap-3">
                    <Luggage className="w-5 h-5 text-primary" />
                    <span>{cabinBagText}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Luggage className="w-5 h-5 text-primary" />
                    <span>{checkedBagText}</span>
                </div>
            </CardContent>
        </Card>
    )
}

const PriceCard = ({ flight }: { flight: FlightOffer }) => {
    return (
        <Card className="bg-card p-6 rounded-2xl shadow-sm">
            <p className="text-sm text-muted-foreground">Precio total</p>
            <p className="text-4xl font-bold text-primary my-2">${flight.price.total}</p>
            <div className="flex flex-col gap-2 mt-4">
                <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={() => alert('La funcionalidad de personalizar no está implementada en esta demostración.')}
                >
                    <Settings2 className="mr-2 h-4 w-4" />
                    Personalizar Vuelo
                </Button>
                <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => alert('La funcionalidad de reserva no está implementada en esta demostración.')}
                >
                    Confirmar Reserva
                </Button>
            </div>
        </Card>
    )
}

interface FlightDetailsDialogProps {
  flight: FlightOffer;
  dictionaries: Dictionaries;
}

export function FlightDetailsDialog({ flight, dictionaries }: FlightDetailsDialogProps) {
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
            size="sm"
            className="w-full font-semibold"
        >
            Seleccionar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col bg-background/60 backdrop-blur-2xl p-0 border-0 shadow-2xl rounded-3xl overflow-hidden">
          <DialogHeader className="p-6 pb-4 border-b-0">
            <DialogTitle className="font-headline text-2xl">Detalles del Vuelo</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 overflow-y-auto p-6 pt-0">
              <div className="md:col-span-7 space-y-6">
                  {flight.itineraries.map((itinerary, index) => (
                      <ItineraryCard key={index} itinerary={itinerary} dictionaries={dictionaries} title={index === 0 ? 'Vuelo de Ida' : 'Vuelo de Vuelta'}/>
                  ))}
              </div>
              <div className="md:col-span-5 space-y-6">
                  <BaggageInfo flight={flight} />
                  <PriceCard flight={flight} />
              </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}
