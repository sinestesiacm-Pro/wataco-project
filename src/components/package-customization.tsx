'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hotel, Plane, Star, ArrowRight, CheckCircle } from 'lucide-react';
import type { PackageOffer } from '@/lib/types';
import { useRouter } from 'next/navigation';

const mockHotels = [
    { name: "Hotel Rivoli (Recomendado)", rating: 4, priceModifier: 0 },
    { name: "Grand Hotel du Palais Royal", rating: 5, priceModifier: 150 },
    { name: "Hotel de Crillon", rating: 5, priceModifier: 400 },
];

const mockFlights = [
    { airline: "Avianca", time: "08:00 - 22:00", priceModifier: 0 },
    { airline: "Air France", time: "10:30 - 00:30", priceModifier: 50 },
    { airline: "Iberia", time: "21:00 - 11:00 (+1)", priceModifier: -25 },
]

export function PackageCustomization({ pkg }: { pkg: PackageOffer }) {
    const router = useRouter();
    const [selectedHotel, setSelectedHotel] = useState(mockHotels[0]);
    const [selectedFlight, setSelectedFlight] = useState(mockFlights[0]);

    const finalPrice = pkg.price + selectedHotel.priceModifier + selectedFlight.priceModifier;

    const handleBooking = () => {
        const params = new URLSearchParams({
            packageId: pkg.id,
            hotelPrice: selectedHotel.priceModifier.toString(),
            flightPrice: selectedFlight.priceModifier.toString(),
        });
        router.push(`/flights/checkout?${params.toString()}`);
    }

    return (
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold font-headline">Personaliza tu Paquete</CardTitle>
                <CardDescription className="text-white/80">Ajusta tu hotel y vuelo para crear el viaje perfecto. El precio se actualizará automáticamente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Hotel Selection */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2"><Hotel /> Elige tu Hotel</h3>
                     <RadioGroup value={selectedHotel.name} onValueChange={(val) => setSelectedHotel(mockHotels.find(h => h.name === val)!)}>
                        {mockHotels.map(hotel => (
                            <Label key={hotel.name} htmlFor={hotel.name} className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10 has-[:checked]:bg-primary/20 has-[:checked]:border-primary">
                                <RadioGroupItem value={hotel.name} id={hotel.name} className="mr-4"/>
                                <div className="flex-grow">
                                    <p className="font-semibold">{hotel.name}</p>
                                    <div className="flex items-center gap-1 text-amber-400">
                                        {[...Array(hotel.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current"/>)}
                                    </div>
                                </div>
                                <p className="text-lg font-bold">{hotel.priceModifier >= 0 ? `+$${hotel.priceModifier}` : `-$${Math.abs(hotel.priceModifier)}`}</p>
                            </Label>
                        ))}
                    </RadioGroup>
                </div>

                 {/* Flight Selection */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2"><Plane /> Elige tu Vuelo</h3>
                     <Select value={selectedFlight.time} onValueChange={(val) => setSelectedFlight(mockFlights.find(f => f.time === val)!)}>
                        <SelectTrigger className="w-full bg-black/20 border-white/30">
                            <SelectValue placeholder="Selecciona un horario de vuelo" />
                        </SelectTrigger>
                        <SelectContent>
                           {mockFlights.map(flight => (
                             <SelectItem key={flight.time} value={flight.time}>
                                <div className="flex justify-between w-full">
                                    <span>{flight.airline} ({flight.time})</span>
                                    <span className="font-semibold">{flight.priceModifier >= 0 ? `+$${flight.priceModifier}` : `-$${Math.abs(flight.priceModifier)}`}</span>
                                </div>
                             </SelectItem>
                           ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Final Price and Booking */}
                <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <p className="text-sm text-white/80">Precio final por persona</p>
                        <p className="text-4xl font-bold text-accent">${finalPrice.toFixed(2)}</p>
                    </div>
                    <Button size="lg" className="w-full sm:w-auto bg-success hover:bg-success/90" onClick={handleBooking}>
                        <CheckCircle className="mr-2 h-5 w-5"/>
                        Reservar Paquete
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
}
