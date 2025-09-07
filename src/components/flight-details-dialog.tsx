
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { FlightOffer, Dictionaries, Itinerary } from '@/lib/types';
import { Clock, Luggage, Plane, QrCode, CheckCircle, ArrowRight, Armchair, PlusCircle, Briefcase, Star, Check } from 'lucide-react';
import Image from 'next/image';
import { parseISO, format as formatDate } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

const formatDuration = (duration: string) => {
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const BoardingPassCard = ({ itinerary, dictionaries, title }: { itinerary: Itinerary, dictionaries: Dictionaries, title: string }) => {
    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];
    const airlineName = dictionaries.carriers[firstSegment.carrierCode] || firstSegment.carrierCode;
    const airlineCode = firstSegment.carrierCode;
    const departureDate = formatDate(parseISO(firstSegment.departure.at), "d MMM, yyyy", { locale: es });

    const stops = itinerary.segments.length - 1;
    const stopInfo = stops === 1 
        ? `1 escala en ${dictionaries.locations[itinerary.segments[0].arrival.iataCode]?.cityCode || itinerary.segments[0].arrival.iataCode}`
        : stops > 1 
            ? `${stops} escalas`
            : 'Directo';


    return (
        <Card className="bg-white/60 backdrop-blur-sm p-0 rounded-2xl shadow-lg overflow-hidden border-2 border-primary/10">
            <div className="flex">
                <div className="flex-grow p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="font-headline font-bold text-xl text-primary">{title}</p>
                            <p className="text-sm font-semibold text-gray-800">{departureDate}</p>
                        </div>
                         <Image
                            src={`https://images.kiwi.com/airlines/64/${airlineCode}.png`}
                            alt={airlineName}
                            width={48}
                            height={48}
                            className="rounded-full bg-white p-1 shadow-md"
                            unoptimized
                        />
                    </div>
                    
                    <div className="flex items-center justify-between my-6">
                        <div className="text-center">
                            <p className="text-2xl sm:text-4xl font-bold font-headline text-gray-800">{firstSegment.departure.iataCode}</p>
                            <p className="text-base sm:text-lg font-semibold text-gray-800">{formatTime(firstSegment.departure.at)}</p>
                        </div>
                        <div className="flex flex-col items-center px-2">
                            <p className="text-sm font-semibold text-gray-800">{formatDuration(itinerary.duration)}</p>
                            <Plane className="w-6 h-6 my-1 text-primary" />
                             <p className="text-xs text-gray-800">{stopInfo}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl sm:text-4xl font-bold font-headline text-gray-800">{lastSegment.arrival.iataCode}</p>
                             <p className="text-base sm:text-lg font-semibold text-gray-800">{formatTime(lastSegment.arrival.at)}</p>
                        </div>
                    </div>
                     <div className="text-xs text-gray-700 text-center">
                        Operado por {airlineName}
                    </div>
                </div>

                <div className="bg-black/20 w-24 sm:w-32 flex-shrink-0 border-l-2 border-dashed border-border flex-col items-center justify-center p-2 sm:p-4 hidden sm:flex">
                     <p className="font-headline font-bold text-primary text-sm mb-2 text-center animate-pulse-text">Casi Listo</p>
                     <div className="bg-white p-1 rounded-md shadow-inner">
                        <QrCode className="w-12 h-12 sm:w-16 h-12 sm:h-16 text-black" />
                     </div>
                     <p className="text-xs font-mono mt-2 text-center text-gray-800">{firstSegment.carrierCode} {firstSegment.number}</p>
                </div>
            </div>
        </Card>
    );
};

const fareOptions = [
    {
        name: "Light",
        priceModifier: 0,
        features: ["1 objeto personal"],
        icon: Briefcase,
    },
    {
        name: "Plus",
        priceModifier: 45,
        features: ["1 objeto personal", "1 equipaje de mano", "1 equipaje facturado (23kg)", "Selección de asiento estándar"],
        icon: Luggage,
    },
    {
        name: "Premium",
        priceModifier: 120,
        features: ["Todo lo de Plus", "Embarque prioritario", "Flexibilidad para cambios"],
        icon: Star,
    },
];

const PriceCard = ({ flight, onSelectFlight }: { flight: FlightOffer, onSelectFlight: (flight: FlightOffer, addons: number) => void }) => {
    const [selectedFare, setSelectedFare] = useState(fareOptions[0]);
    
    const basePrice = parseFloat(flight.price.total);
    const addonsPrice = selectedFare.priceModifier;
    const totalPrice = basePrice + addonsPrice;

    return (
        <Card className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border-2 border-primary/10 flex flex-col h-full text-gray-800">
            <h3 className="font-headline font-bold text-xl text-primary mb-4">Elige tu Tarifa</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
                {fareOptions.map(fare => (
                    <button key={fare.name} onClick={() => setSelectedFare(fare)} className={cn("p-3 rounded-lg border-2 text-center transition-all", selectedFare.name === fare.name ? "border-primary bg-primary/20" : "border-gray-500/20 bg-black/10 hover:bg-black/20")}>
                        <fare.icon className={cn("h-6 w-6 mx-auto mb-1", selectedFare.name === fare.name ? "text-primary" : "text-gray-800/70")} />
                        <p className="font-semibold text-sm text-gray-800">{fare.name}</p>
                        <p className="text-xs text-gray-700/70">+${fare.priceModifier}</p>
                    </button>
                ))}
            </div>
            
            <div className="flex-grow pr-3 -mr-3 mb-4 min-h-[80px]">
              <ul className="text-sm space-y-2">
                  {selectedFare.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2 text-gray-800">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                      </li>
                  ))}
              </ul>
            </div>
            
            <div className="flex-grow"></div>

            <Separator className="my-4 bg-gray-500/20"/>

            <p className="text-sm text-gray-700">Precio total</p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-800 my-2">${totalPrice.toFixed(2)}</p>
            
            <DialogClose asChild>
                <Button
                    className="w-full bg-success hover:bg-success/90 text-success-foreground mt-4"
                    onClick={() => onSelectFlight(flight, addonsPrice)}
                >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirmar Selección
                </Button>
            </DialogClose>
        </Card>
    )
}

interface FlightDetailsDialogProps {
  flight: FlightOffer;
  dictionaries: Dictionaries;
  onSelectFlight: (flight: FlightOffer, addons: number) => void;
  dialogTitle: string;
}

export function FlightDetailsDialog({ flight, dictionaries, onSelectFlight, dialogTitle }: FlightDetailsDialogProps) {
  
  const itineraryToShow = flight.itineraries.length > 1 && dialogTitle.toLowerCase().includes('vuelta')
    ? flight.itineraries[1]
    : flight.itineraries[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center">
         <Button 
            className="w-4/5 font-bold text-lg py-6 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
         >
            Seleccionar
         </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] flex flex-col bg-white/60 backdrop-blur-xl p-0 border border-white/20 shadow-2xl rounded-3xl">
          <DialogHeader className="p-4 sm:p-6 pb-2 sm:pb-4 flex-shrink-0 text-gray-800">
            <DialogTitle className="font-headline text-2xl sm:text-3xl">Detalles de tu Selección</DialogTitle>
          </DialogHeader>
          
          <div className="flex-grow overflow-y-auto">
            <ScrollArea className="h-full">
              <div className="space-y-6 p-4 sm:p-6 pt-0">
                  <BoardingPassCard itinerary={itineraryToShow} dictionaries={dictionaries} title={dialogTitle}/>
                  <PriceCard flight={flight} onSelectFlight={onSelectFlight} />
              </div>
            </ScrollArea>
          </div>
      </DialogContent>
    </Dialog>
  );
}
