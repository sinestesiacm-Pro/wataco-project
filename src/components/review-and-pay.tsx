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

interface ReviewAndPayProps {
    outboundFlight: FlightOffer;
    returnFlight: FlightOffer | null;
    dictionaries: Dictionaries;
    onOutboundChange: () => void;
    onReturnChange?: () => void;
}

const formatDuration = (duration: string) => duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
const formatTime = (dateString: string) => new Date(dateString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('es-ES', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

const FlightSummaryCard = ({ title, itinerary, dictionaries, onChangeClick }: { title: string, itinerary: Itinerary, dictionaries: Dictionaries, onChangeClick: () => void }) => {
    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];
    const airlineName = dictionaries.carriers[firstSegment.carrierCode] || firstSegment.carrierCode;
    const originCity = dictionaries.locations[firstSegment.departure.iataCode]?.cityCode;
    const destinationCity = dictionaries.locations[lastSegment.arrival.iataCode]?.cityCode;

    return (
        <Card className="bg-card/80">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl font-headline">{title}</CardTitle>
                <Button variant="link" onClick={onChangeClick}>Cambiar vuelo</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                     <Image
                        src={`https://images.kiwi.com/airlines/64/${firstSegment.carrierCode}.png`}
                        alt={airlineName}
                        width={40}
                        height={40}
                        className="rounded-full bg-white p-1 shadow-md"
                    />
                    <div>
                        <p className="font-semibold">{formatDate(firstSegment.departure.at)}</p>
                        <p className="text-sm text-muted-foreground">{airlineName} &middot; {firstSegment.carrierCode} {firstSegment.number}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                     <div className="text-center">
                        <p className="text-2xl font-bold">{formatTime(firstSegment.departure.at)}</p>
                        <p className="font-semibold text-muted-foreground">{firstSegment.departure.iataCode}</p>
                        <p className="text-xs text-muted-foreground">{originCity}</p>
                    </div>
                    <div className="flex-grow flex flex-col items-center text-muted-foreground px-4">
                        <p className="text-xs font-semibold">{formatDuration(itinerary.duration)}</p>
                        <div className="w-full h-px bg-border relative my-1">
                           <Plane className="w-4 h-4 absolute right-1/2 translate-x-1/2 -translate-y-1/2 bg-card text-muted-foreground p-0.5 rounded-full"/>
                        </div>
                         <p className="text-xs">{itinerary.segments.length > 1 ? `${itinerary.segments.length - 1} escala(s)` : 'Directo'}</p>
                    </div>
                     <div className="text-center">
                        <p className="text-2xl font-bold">{formatTime(lastSegment.arrival.at)}</p>
                        <p className="font-semibold text-muted-foreground">{lastSegment.arrival.iataCode}</p>
                        <p className="text-xs text-muted-foreground">{destinationCity}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
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
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-headline">Servicios Adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {additionalServices.map(service => (
                    <div key={service.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                        <div className="flex items-center gap-4">
                           <service.icon className="h-8 w-8 text-primary" />
                           <div>
                             <Label htmlFor={service.id} className="font-semibold">{service.name}</Label>
                             <p className="text-xs text-muted-foreground">{service.description}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-semibold text-lg text-tertiary">
                                {service.price > 0 ? `$${service.price.toFixed(2)}` : 'Gratis'}
                            </span>
                             <Switch 
                                id={service.id} 
                                onCheckedChange={(checked) => handleServiceToggle(checked, service.price)}
                             />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
};


const PriceSummaryCard = ({outboundFlight, returnFlight, additionalServicesPrice }: {outboundFlight: FlightOffer, returnFlight: FlightOffer | null, additionalServicesPrice: number }) => {
    const finalOffer = returnFlight || outboundFlight;
    const basePrice = parseFloat(finalOffer.price.base);
    const taxes = parseFloat(finalOffer.price.total) - basePrice;
    const total = parseFloat(finalOffer.price.total) + additionalServicesPrice;

    const checkoutLink = `/flights/checkout?outboundId=${outboundFlight.id}${returnFlight ? `&returnId=${returnFlight.id}` : ''}&addons=${additionalServicesPrice}`;

    return (
        <Card className="sticky top-24 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold font-headline">Resumen de Precio</CardTitle>
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
                 {additionalServicesPrice > 0 && (
                    <div className="flex justify-between text-primary font-medium">
                        <span >Servicios Adicionales</span>
                        <span>${additionalServicesPrice.toFixed(2)}</span>
                    </div>
                 )}
                <Separator />
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

export function ReviewAndPay({ outboundFlight, returnFlight, dictionaries, onOutboundChange, onReturnChange }: ReviewAndPayProps) {
    const [additionalServicesPrice, setAdditionalServicesPrice] = useState(0);

    return (
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8 space-y-6">
                <h2 className="text-3xl font-headline font-bold text-gray-800">Revisa y completa tu reserva</h2>
                
                <FlightSummaryCard title="Vuelo de Ida" itinerary={outboundFlight.itineraries[0]} dictionaries={dictionaries} onChangeClick={onOutboundChange} />
                
                {returnFlight && onReturnChange && (
                    <FlightSummaryCard title="Vuelo de Vuelta" itinerary={returnFlight.itineraries[1]} dictionaries={dictionaries} onChangeClick={onReturnChange} />
                )}

                <Separator />
                
                <AdditionalServicesCard onPriceChange={(price) => setAdditionalServicesPrice(prev => prev + price)} />

                 <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-headline">Equipaje</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="font-semibold">Tu vuelo incluye:</span>
                            <FlightBaggageInfo flight={outboundFlight} />
                        </div>
                        <Button variant="outline">Añadir más equipaje</Button>
                    </CardContent>
                </Card>
            </div>
            <aside className="lg:col-span-4 mt-8 lg:mt-0">
                <PriceSummaryCard 
                    outboundFlight={outboundFlight} 
                    returnFlight={returnFlight} 
                    additionalServicesPrice={additionalServicesPrice}
                />
            </aside>
        </div>
    );
}
