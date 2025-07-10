'use client';

import type { FlightOffer, Dictionaries, Itinerary } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plane, Lock, CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';

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
                        <p className="text-sm text-muted-foreground">{airlineName}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                     <div className="text-center">
                        <p className="text-2xl font-bold">{formatTime(firstSegment.departure.at)}</p>
                        <p className="font-semibold text-muted-foreground">{firstSegment.departure.iataCode}</p>
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
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const FareUpgradeCard = () => (
    <Card className="border-primary bg-primary/5">
        <CardHeader>
            <CardTitle className="text-xl font-headline">Mejora tu Tarifa</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <p className="font-semibold">Optima: Más flexibilidad y equipaje</p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2">
                    <li>Selección de asiento estándar incluida</li>
                    <li>1 maleta facturada de 23 kg</li>
                    <li>Cambios permitidos (puede aplicarse diferencia de tarifa)</li>
                </ul>
            </div>
            <Button className="w-full sm:w-auto">+ $85.00</Button>
        </CardContent>
    </Card>
);

const PriceSummaryCard = ({outboundFlight, returnFlight}: {outboundFlight: FlightOffer, returnFlight: FlightOffer | null}) => {
    // A round trip offer in Amadeus already contains the total price.
    // If it's a one-way trip, selectedReturn will be null, and we use the outbound price.
    // If it's a round trip, selectedReturn will be the same as selectedOutbound,
    // and its price is the total for the round trip.
    const finalOffer = returnFlight || outboundFlight;
    const total = parseFloat(finalOffer.price.total);
    const basePrice = parseFloat(finalOffer.price.base);
    const taxes = total - basePrice;


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
                <Separator />
                <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                 <Button size="lg" className="w-full mt-4 bg-success hover:bg-success/90">
                    <Lock className="mr-2 h-5 w-5" />
                    Ir a la página de pago
                </Button>
            </CardContent>
        </Card>
    )
}

export function ReviewAndPay({ outboundFlight, returnFlight, dictionaries, onOutboundChange, onReturnChange }: ReviewAndPayProps) {
    return (
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8 space-y-6">
                <h2 className="text-3xl font-headline font-bold text-gray-800">Revisa y completa tu reserva</h2>
                
                <FlightSummaryCard title="Vuelo de Ida" itinerary={outboundFlight.itineraries[0]} dictionaries={dictionaries} onChangeClick={onOutboundChange} />
                
                {returnFlight && onReturnChange && (
                     // In Amadeus round-trip search, itineraries[1] is the return leg
                    <FlightSummaryCard title="Vuelo de Vuelta" itinerary={returnFlight.itineraries[1]} dictionaries={dictionaries} onChangeClick={onReturnChange} />
                )}

                <Separator />
                
                <FareUpgradeCard />

                 <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-headline">Equipaje</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-success"/><span>Artículo personal (bolso pequeño)</span></div>
                        <div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-success"/><span>Equipaje de mano (hasta 10kg)</span></div>
                        <div className="flex items-center gap-2"><XCircle className="h-5 w-5 text-destructive"/><span>Equipaje facturado (añadir con recargo)</span></div>
                    </CardContent>
                </Card>
            </div>
            <aside className="lg:col-span-4 mt-8 lg:mt-0">
                <PriceSummaryCard outboundFlight={outboundFlight} returnFlight={returnFlight} />
            </aside>
        </div>
    );
}
