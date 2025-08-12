'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hotel, Plane, Star, ArrowRight, CheckCircle, Wifi, Utensils, Sparkles } from 'lucide-react';
import type { PackageOffer } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { MOCK_HOTELS_DATA } from '@/lib/mock-data';

const getMockHotelsForDestination = (destination: string) => {
    const destinationCity = destination.split(',')[0].toLowerCase();
    switch (destinationCity) {
        case 'paris':
            return MOCK_HOTELS_DATA.filter(h => h.hotel.address.cityName.toLowerCase() === 'paris');
        case 'tokyo':
             return MOCK_HOTELS_DATA.filter(h => h.hotel.name?.toLowerCase().includes('ritz-carlton'));
        case 'serengeti':
            return MOCK_HOTELS_DATA.filter(h => h.hotel.name?.toLowerCase().includes('amangiri'));
        case 'amalfi coast':
            return MOCK_HOTELS_DATA.filter(h => h.hotel.name?.toLowerCase().includes('santorini'));
        case 'rio de janeiro':
            return MOCK_HOTELS_DATA.filter(h => h.hotel.name?.toLowerCase().includes('beverly hills'));
        case 'maldives':
             return MOCK_HOTELS_DATA.filter(h => h.hotel.name?.toLowerCase().includes('burj al arab'));
        default:
            return MOCK_HOTELS_DATA.slice(3, 6);
    }
}


const mockFlights = [
    { airline: "Avianca", time: "08:00 - 22:00", priceModifier: 0 },
    { airline: "Air France", time: "10:30 - 00:30", priceModifier: 50 },
    { airline: "Iberia", time: "21:00 - 11:00 (+1)", priceModifier: -25 },
]

export function PackageCustomization({ pkg }: { pkg: PackageOffer }) {
    const router = useRouter();
    const availableHotels = useMemo(() => getMockHotelsForDestination(pkg.destination), [pkg.destination]);

    const [selectedHotel, setSelectedHotel] = useState(() => availableHotels[0] || null);
    const [selectedFlight, setSelectedFlight] = useState(mockFlights[0]);
    const [expandedHotel, setExpandedHotel] = useState<string | null>(() => (availableHotels[0]?.id) || null);
    
    useEffect(() => {
        if (availableHotels.length > 0 && !selectedHotel) {
            setSelectedHotel(availableHotels[0]);
            setExpandedHotel(availableHotels[0].id);
        }
    }, [availableHotels, selectedHotel]);


    if (!availableHotels || availableHotels.length === 0 || !selectedHotel) {
        return (
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold font-headline">Personaliza tu Paquete</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-white/80">Actualmente no hay hoteles sugeridos para este destino. Por favor, busca vuelos y hoteles por separado.</p>
                </CardContent>
            </Card>
        );
    }

    const getPriceModifier = (hotelId: string) => {
        const basePrice = availableHotels[0]?.offers[0]?.price.total ? parseFloat(availableHotels[0].offers[0].price.total) : 0;
        const currentHotel = availableHotels.find(h => h.id === hotelId);
        const currentPrice = currentHotel?.offers[0]?.price.total ? parseFloat(currentHotel.offers[0].price.total) : 0;
        return currentPrice - basePrice;
    }
    
    const finalPrice = pkg.price + getPriceModifier(selectedHotel.id) + selectedFlight.priceModifier;

    const handleBooking = () => {
        const params = new URLSearchParams({
            packageId: pkg.id,
            hotelPrice: getPriceModifier(selectedHotel.id).toString(),
            flightPrice: selectedFlight.priceModifier.toString(),
        });
        router.push(`/flights/checkout?${params.toString()}`);
    }

    const handleHotelSelection = (hotelId: string) => {
        setSelectedHotel(availableHotels.find(h => h.id === hotelId)!);
        setExpandedHotel(hotelId);
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
                     <RadioGroup value={selectedHotel.id} onValueChange={handleHotelSelection}>
                        {availableHotels.map(hotelOffer => {
                            const hotel = hotelOffer.hotel;
                            const priceModifier = getPriceModifier(hotelOffer.id);
                            return (
                               <Collapsible key={hotel.hotelId} open={expandedHotel === hotelOffer.id}>
                                 <CollapsibleTrigger asChild>
                                     <Label htmlFor={hotelOffer.id} className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10 has-[:checked]:bg-primary/20 has-[:checked]:border-primary transition-all">
                                        <RadioGroupItem value={hotelOffer.id} id={hotelOffer.id} className="mr-4"/>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{hotel.name}</p>
                                            <div className="flex items-center gap-1 text-amber-400">
                                                {[...Array(parseInt(hotel.rating || '0'))].map((_, i) => <Star key={i} className="w-4 h-4 fill-current"/>)}
                                            </div>
                                        </div>
                                        <p className="text-lg font-bold">{priceModifier >= 0 ? `+$${priceModifier.toFixed(0)}` : `-$${Math.abs(priceModifier).toFixed(0)}`}</p>
                                    </Label>
                                 </CollapsibleTrigger>
                                 <CollapsibleContent>
                                    <div className="p-4 grid md:grid-cols-2 gap-6 bg-black/20 rounded-b-lg">
                                        <div className="space-y-4">
                                            <p className="text-sm text-white/80">{hotel.description?.text}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {(hotel.amenities || []).slice(0,3).map((amenity, i) => (
                                                    <Badge key={i} variant="secondary" className="gap-2 bg-white/20 text-white border-none">
                                                        <Sparkles className="h-4 w-4" />
                                                        {amenity}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                             <Carousel className="w-full rounded-lg overflow-hidden">
                                                <CarouselContent>
                                                    {(hotel.media || []).map((img, i) => (
                                                        <CarouselItem key={i} className="relative aspect-video">
                                                            <Image src={img.uri} alt={`${hotel.name} image ${i+1}`} fill objectFit="cover" />
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 border-white/20 text-white hover:bg-black/50 hover:text-white" />
                                                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 border-white/20 text-white hover:bg-black/50 hover:text-white" />
                                            </Carousel>
                                        </div>
                                    </div>
                                 </CollapsibleContent>
                               </Collapsible>
                            )
                        })}
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
                        <p className="text-4xl font-bold text-white">${finalPrice.toFixed(2)}</p>
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
