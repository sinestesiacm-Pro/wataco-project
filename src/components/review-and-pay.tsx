
'use client';

import type { FlightOffer, Dictionaries, Itinerary } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plane, Lock, ShieldCheck, UserCheck, Armchair } from 'lucide-react';
import Image from 'next/image';
import { FlightBaggageInfo } from './flight-baggage-info';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { cn } from '@/lib/utils';
import React from 'react';

interface ReviewAndPayProps {
    outboundFlight: FlightOffer;
    returnFlight: FlightOffer | null;
    dictionaries: Dictionaries;
    addonsPrice: number;
    onOutboundChange: () => void;
    onReturnChange?: () => void;
}

const formatDuration = (duration: string) => duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
const formatTime = (dateString: string) => new Date(dateString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('es-ES', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

// Improved city name resolver
const getCityName = (iataCode: string, dictionaries: Dictionaries): string => {
    const location = dictionaries.locations[iataCode];
    if (!location) return iataCode;
    
    // The location object for a city code has the same cityCode and iataCode.
    // e.g., for Toronto (YTO), the locations entry for YTO might be { cityCode: 'YTO', countryCode: 'CA' }
    // The name of the city is not directly in the dictionaries but can be inferred from other airports in that city.
    // Let's find an airport with that city code to get the name.
    const cityLocation = Object.values(dictionaries.locations).find(loc => loc.cityCode === location.cityCode && loc.cityCode !== iataCode);
    
    // A simpler and more reliable way might be to just use the cityCode itself for lookup if it's different.
    // The dictionaries structure is tricky: dictionaries.locations['YYZ'] = { cityCode: 'YTO', ... }. dictionaries.locations['YTO'] doesn't have a name.
    // Let's find an airport that belongs to this city code to infer the city name
    const airportInCity = Object.values(dictionaries.locations).find(loc => loc.cityCode === location.cityCode);
    if (airportInCity) {
      // Find the city entry from an airport code.
      const mainCity = Object.values(dictionaries.locations).find(loc => loc.cityCode === airportInCity.cityCode);
      // This is a guess. The dictionary structure is not ideal. A better way would be a direct city name mapping.
      // For now, we will assume the city name can be found from one of its airports' address.
      // This is not in the provided `dictionaries` type, so we have to assume a structure.
      // Let's go back to a simpler logic that is more robust.
      const locationData = dictionaries.locations[location.cityCode];
      if (locationData && locationData.cityCode) {
           const cityValue = Object.entries(dictionaries.locations).find(([key, value]) => value.cityCode === location.cityCode && key === value.cityCode);
           // Based on Amadeus response, city name is not in the dictionary. We have to parse it.
           // A real solution would be to call the locations API, but for now we improvise from what we have.
           // Since the city name is not in the dictionaries, we need to find an airport that belongs to it.
           // The provided data does not seem to have the city name. We will mock a mapping for common codes.
           const cityMap: {[key:string]: string} = { 'YTO': 'Toronto', 'PAR': 'Paris', 'LON': 'London', 'NYC': 'New York' };
           if(cityMap[location.cityCode]) return cityMap[location.cityCode];

           return location.cityCode;
      }
    }
    
    return iataCode;
};

const StopInfo = ({ itinerary, dictionaries }: { itinerary: Itinerary, dictionaries: Dictionaries }) => {
    if (itinerary.segments.length <= 1) return null;
    
    return (
        <div className="space-y-4 px-2 mt-4">
            {itinerary.segments.slice(0, -1).map((segment, index) => {
                const nextSegment = itinerary.segments[index + 1];
                const layoverDuration = new Date(nextSegment.departure.at).getTime() - new Date(segment.arrival.at).getTime();
                const hours = Math.floor(layoverDuration / (1000 * 60 * 60));
                const minutes = Math.floor((layoverDuration % (1000 * 60 * 60)) / (1000 * 60));
                
                const cityName = getCityName(segment.arrival.iataCode, dictionaries);

                return (
                     <div key={`stop-${index}`} className="text-xs text-center text-muted-foreground">
                        <p className="font-semibold">Escala en {cityName}</p>
                        <p>Duración: {hours}h {minutes}m</p>
                    </div>
                )
            })}
        </div>
    )
}


const FlightSummaryCard = ({ title, itinerary, dictionaries, onChangeClick }: { title: string, itinerary: Itinerary, dictionaries: Dictionaries, onChangeClick: () => void }) => {
    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];
    const airlineName = dictionaries.carriers[firstSegment.carrierCode] || firstSegment.carrierCode;
    const originCityName = getCityName(firstSegment.departure.iataCode, dictionaries);
    const destinationCityName = getCityName(lastSegment.arrival.iataCode, dictionaries);
    const airlineCode = firstSegment.carrierCode;
    const stops = itinerary.segments.length - 1;

    return (
      <Collapsible asChild>
        <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl font-headline text-card-foreground">{title}</CardTitle>
                <Button variant="link" onClick={onChangeClick} className="text-primary">Cambiar vuelo</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                     <Image
                        src={`https://images.kiwi.com/airlines/64/${airlineCode}.png`}
                        alt={airlineName}
                        width={40}
                        height={40}
                        className="rounded-full bg-white p-1 shadow-md"
                        unoptimized
                    />
                    <div>
                        <p className="font-semibold">{formatDate(firstSegment.departure.at)}</p>
                        <p className="text-sm text-muted-foreground">{airlineName} &middot; {firstSegment.carrierCode} {firstSegment.number}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                     <div className="text-left">
                        <p className="text-2xl font-bold">{formatTime(firstSegment.departure.at)}</p>
                        <p className="font-semibold text-card-foreground">{firstSegment.departure.iataCode}</p>
                        <p className="text-xs text-muted-foreground truncate">{originCityName}</p>
                    </div>

                    <CollapsibleTrigger asChild>
                        <button className={cn("flex-grow flex flex-col items-center text-muted-foreground px-4", stops === 0 && "pointer-events-none")}>
                            <p className="text-xs font-semibold">{formatDuration(itinerary.duration)}</p>
                            <div className="w-full h-px bg-border relative my-1">
                               <Plane className="w-4 h-4 absolute right-1/2 translate-x-1/2 -translate-y-1/2 bg-card text-card-foreground p-0.5 rounded-full"/>
                            </div>
                             <p className="text-xs">{stops > 1 ? `${stops} escalas` : stops === 1 ? '1 escala' : 'Directo'}</p>
                        </button>
                    </CollapsibleTrigger>
                    
                     <div className="text-right">
                        <p className="text-2xl font-bold">{formatTime(lastSegment.arrival.at)}</p>
                        <p className="font-semibold text-card-foreground">{lastSegment.arrival.iataCode}</p>
                        <p className="text-xs text-muted-foreground truncate">{destinationCityName}</p>
                    </div>
                </div>
                <CollapsibleContent>
                    <StopInfo itinerary={itinerary} dictionaries={dictionaries} />
                </CollapsibleContent>
            </CardContent>
        </Card>
     </Collapsible>
    );
};

const additionalServices = [
    { id: 'insurance', name: 'Seguro de Viaje Completo', description: 'Cobertura médica, de equipaje y cancelación.', price: 45.50, icon: ShieldCheck },
    { id: 'priority', name: 'Embarque Prioritario', description: 'Sube al avión primero y asegura espacio para tu equipaje.', price: 15.00, icon: UserCheck },
    { id: 'assistance', name: 'Asistencia Especial', description: 'Soporte para movilidad reducida o necesidades especiales.', price: 0, icon: Armchair },
];


const AdditionalServicesCard = ({ onPriceChange }: { onPriceChange: (price: number) => void }) => {
    const { toast } = useToast();

    const handleServiceToggle = (checked: boolean, price: number) => {
        onPriceChange(checked ? price : -price);
        if (checked) {
            toast({
                title: "Servicio añadido",
                description: `El servicio ha sido añadido a tu reserva.`,
                variant: 'success'
            })
        }
    }
    
    return (
        <Card className="bg-card text-card-foreground">
            <CardHeader>
                <CardTitle className="text-xl font-headline text-card-foreground">Servicios Adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {additionalServices.map(service => (
                    <div key={service.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted">
                        <div className="flex items-center gap-4">
                           <service.icon className="h-8 w-8 text-primary" />
                           <div>
                             <Label htmlFor={service.id} className="font-semibold text-card-foreground">{service.name}</Label>
                             <p className="text-xs text-muted-foreground">{service.description}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-semibold text-lg text-primary">
                                {service.price > 0 ? `$${service.price.toFixed(2)}` : 'Gratis'}
                            </span>
                             <Switch 
                                id={service.id} 
                                onCheckedChange={(checked) => handleServiceToggle(checked, service.price)}
                                className="data-[state=unchecked]:bg-input"
                             />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
};


const PriceSummaryCard = ({outboundFlight, returnFlight, addonsPrice }: {outboundFlight: FlightOffer, returnFlight: FlightOffer | null, addonsPrice: number }) => {
    const finalOffer = returnFlight || outboundFlight;
    const basePrice = parseFloat(finalOffer.price.base);
    const taxes = parseFloat(finalOffer.price.total) - basePrice;
    const [additionalServicesPrice, setAdditionalServicesPrice] = useState(0);

    const total = basePrice + taxes + addonsPrice + additionalServicesPrice;

    const checkoutLink = `/flights/checkout?outboundId=${outboundFlight.id}${returnFlight ? `&returnId=${returnFlight.id}` : ''}&addons=${addonsPrice + additionalServicesPrice}`;

    return (
        <Card className="sticky top-24 shadow-lg bg-card text-card-foreground">
            <CardHeader>
                <CardTitle className="text-2xl font-bold font-headline text-card-foreground">Resumen de Precio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Vuelos</span>
                    <span>${basePrice.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Impuestos y tasas</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>
                 {addonsPrice > 0 && (
                    <div className="flex justify-between text-primary font-medium">
                        <span >Tarifa Seleccionada</span>
                        <span>${addonsPrice.toFixed(2)}</span>
                    </div>
                 )}
                 {additionalServicesPrice > 0 && (
                    <div className="flex justify-between text-primary font-medium">
                        <span >Servicios Adicionales</span>
                        <span>${additionalServicesPrice.toFixed(2)}</span>
                    </div>
                 )}
                <Separator className="bg-border"/>
                <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                 <Button asChild size="lg" className="w-full mt-4 bg-success hover:bg-success/90">
                    <Link href={checkoutLink}>
                        <Lock className="mr-2 h-5 w-5" />
                        Ir al Pago
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export function ReviewAndPay({ outboundFlight, returnFlight, dictionaries, addonsPrice, onOutboundChange, onReturnChange }: ReviewAndPayProps) {
    const [extraServicesPrice, setExtraServicesPrice] = useState(0);
    const returnItinerary = returnFlight ? (returnFlight.itineraries.length > 1 ? returnFlight.itineraries[1] : returnFlight.itineraries[0]) : null;

    return (
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8 space-y-6">
                <h2 className="text-3xl font-headline font-bold">Revisa y completa tu reserva</h2>
                
                <FlightSummaryCard title="Vuelo de Ida" itinerary={outboundFlight.itineraries[0]} dictionaries={dictionaries} onChangeClick={onOutboundChange} />
                
                {returnFlight && onReturnChange && returnItinerary && (
                    <FlightSummaryCard title="Vuelo de Vuelta" itinerary={returnItinerary} dictionaries={dictionaries} onChangeClick={onReturnChange} />
                )}

                <Separator/>
                
                <AdditionalServicesCard onPriceChange={(price) => setExtraServicesPrice(prev => prev + price)} />

                 <Card className="bg-card text-card-foreground">
                    <CardHeader>
                        <CardTitle className="text-xl font-headline text-card-foreground">Equipaje</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="font-semibold text-card-foreground">Tu vuelo incluye:</span>
                            <FlightBaggageInfo flight={outboundFlight} />
                        </div>
                        <Button variant="outline" disabled>Añadir más equipaje (Próximamente)</Button>
                    </CardContent>
                </Card>
            </div>
            <aside className="lg:col-span-4 mt-8 lg:mt-0">
                <PriceSummaryCard 
                    outboundFlight={outboundFlight} 
                    returnFlight={returnFlight} 
                    addonsPrice={addonsPrice + extraServicesPrice}
                />
            </aside>
        </div>
    );
}
