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
import { Clock, Luggage, Plane, Settings2, QrCode, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { parseISO, format as formatDate } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';

const formatDuration = (duration: string) => {
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const SegmentDetails = ({ segment, dictionaries }: { segment: Segment, dictionaries: Dictionaries }) => {
    const airlineName = dictionaries.carriers[segment.carrierCode] || segment.carrierCode;
    
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
                <div className="text-sm text-muted-foreground mt-2 flex items-center justify-between">
                    <span>{airlineName} &middot; {segment.carrierCode} {segment.number}</span>
                     <span className="font-medium">{dictionaries.aircraft[segment.aircraft.code] || `Aeronave ${segment.aircraft.code}`}</span>
                </div>
            </div>
        </div>
    )
}

const BoardingPassCard = ({ itinerary, dictionaries, title }: { itinerary: Itinerary, dictionaries: Dictionaries, title: string }) => {
    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];
    const airlineName = dictionaries.carriers[firstSegment.carrierCode] || firstSegment.carrierCode;
    const departureDate = formatDate(parseISO(firstSegment.departure.at), "d MMM, yyyy", { locale: es });

    return (
        <Card className="bg-card/80 backdrop-blur-sm p-0 rounded-2xl shadow-lg overflow-hidden border-2 border-primary/10">
            <div className="flex">
                {/* Main flight info */}
                <div className="flex-grow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="font-headline font-bold text-xl text-primary">{title}</p>
                            <p className="text-sm font-semibold text-muted-foreground">{departureDate}</p>
                        </div>
                        <Image
                            src={`https://images.kiwi.com/airlines/64/${firstSegment.carrierCode}.png`}
                            alt={airlineName}
                            width={48}
                            height={48}
                            className="rounded-full bg-white p-1 shadow-md"
                        />
                    </div>
                    
                    <div className="flex items-center justify-between my-6">
                        <div className="text-center">
                            <p className="text-4xl font-bold font-headline">{firstSegment.departure.iataCode}</p>
                            <p className="text-lg font-semibold">{formatTime(firstSegment.departure.at)}</p>
                        </div>
                        <div className="flex flex-col items-center text-muted-foreground">
                            <p className="text-sm font-semibold">{formatDuration(itinerary.duration)}</p>
                            <Plane className="w-6 h-6 my-1 text-primary" />
                             <p className="text-xs">{itinerary.segments.length > 1 ? `${itinerary.segments.length - 1} escala(s)` : 'Directo'}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold font-headline">{lastSegment.arrival.iataCode}</p>
                             <p className="text-lg font-semibold">{formatTime(lastSegment.arrival.at)}</p>
                        </div>
                    </div>
                     <div className="text-xs text-muted-foreground text-center">
                        Operado por {airlineName}
                    </div>
                </div>

                {/* QR Code Stub */}
                <div className="bg-muted/40 w-32 flex-shrink-0 border-l-2 border-dashed border-border flex flex-col items-center justify-center p-4">
                     <p className="font-headline font-bold text-primary text-sm mb-2 text-center animate-pulse-text">Casi Listo</p>
                     <div className="bg-white p-1 rounded-md shadow-inner">
                        <QrCode className="w-16 h-16 text-black" />
                     </div>
                     <p className="text-xs font-mono mt-2 text-center">{firstSegment.carrierCode} {firstSegment.number}</p>
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
        <Card className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-primary/10">
            <CardHeader className="p-0 mb-4">
              <h3 className="font-headline font-bold text-xl text-primary">Equipaje Incluido</h3>
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

const PriceCard = ({ flight, onSelectFlight }: { flight: FlightOffer, onSelectFlight: (flight: FlightOffer) => void }) => {
    return (
        <Card className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-primary/10">
            <p className="text-sm text-muted-foreground">Precio total</p>
            <p className="text-4xl font-bold text-accent my-2">${flight.price.total}</p>
            <div className="flex flex-col gap-2 mt-4">
                <Button asChild
                    variant="outline"
                    className="w-full"
                >
                    <Link href={`/flights/${flight.id}`}>
                        <Settings2 className="mr-2 h-4 w-4" />
                        Personalizar Vuelo
                    </Link>
                </Button>
                <Button
                    className="w-full bg-success hover:bg-success/90 text-success-foreground"
                    onClick={() => onSelectFlight(flight)}
                >
                     
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirmar Reserva
                </Button>
            </div>
        </Card>
    )
}

interface FlightDetailsDialogProps {
  flight: FlightOffer;
  dictionaries: Dictionaries;
  onSelectFlight: (flight: FlightOffer) => void;
}

export function FlightDetailsDialog({ flight, dictionaries, onSelectFlight }: FlightDetailsDialogProps) {
  
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
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col bg-background/80 backdrop-blur-xl p-0 border-0 shadow-2xl rounded-3xl overflow-hidden">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="font-headline text-3xl">Detalles del Vuelo</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 overflow-y-auto p-6 pt-0">
              <div className="md:col-span-7 space-y-6">
                  {flight.itineraries.map((itinerary, index) => (
                      <BoardingPassCard key={index} itinerary={itinerary} dictionaries={dictionaries} title={index === 0 ? 'Vuelo de Ida' : 'Vuelo de Vuelta'}/>
                  ))}
              </div>
              <div className="md:col-span-5 space-y-6">
                  <PriceCard flight={flight} onSelectFlight={onSelectFlight} />
                  <BaggageInfo flight={flight} />
              </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}
