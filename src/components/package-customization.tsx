'use client';

import { useState } from 'react';
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

const mockHotels = [
    { 
        name: "Hotel Rivoli (Recomendado)", 
        rating: 4, 
        priceModifier: 0,
        description: "Ubicado cerca del Louvre, el Hotel Rivoli ofrece un confort parisino clásico con un toque moderno. Perfecto para explorar el corazón de la ciudad.",
        amenities: [ { icon: Wifi, text: "Wi-Fi Gratuito" }, { icon: Utensils, text: "Desayuno Incluido" } ],
        images: [
            "https://images.unsplash.com/photo-1561501900-3701fa6a0864?fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?fit=crop&w=800&q=80",
        ]
    },
    { 
        name: "Grand Hotel du Palais Royal", 
        rating: 5, 
        priceModifier: 150,
        description: "Lujo y elegancia definen a este hotel 5 estrellas. Disfrute de su spa exclusivo y de unas vistas inmejorables de los jardines del Palais-Royal.",
        amenities: [ { icon: Wifi, text: "Wi-Fi Gratuito" }, { icon: Sparkles, text: "Spa y Bienestar" }, { icon: Utensils, text: "Restaurante Gourmet" } ],
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1596436889106-be35e843f974?fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?fit=crop&w=800&q=80",
        ]
    },
    { 
        name: "Hotel de Crillon", 
        rating: 5, 
        priceModifier: 400,
        description: "Un ícono de la hospitalidad parisina. Este palacio histórico ofrece suites opulentas, un servicio impecable y una piscina interior espectacular.",
        amenities: [ { icon: Wifi, text: "Wi-Fi Gratuito" }, { icon: Sparkles, text: "Piscina y Spa" }, { icon: Utensils, text: "Alta Cocina" } ],
        images: [
            "https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?fit=crop&w=800&q=80",
        ]
    },
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
    const [expandedHotel, setExpandedHotel] = useState<string | null>(mockHotels[0].name);

    const finalPrice = pkg.price + selectedHotel.priceModifier + selectedFlight.priceModifier;

    const handleBooking = () => {
        const params = new URLSearchParams({
            packageId: pkg.id,
            hotelPrice: selectedHotel.priceModifier.toString(),
            flightPrice: selectedFlight.priceModifier.toString(),
        });
        router.push(`/flights/checkout?${params.toString()}`);
    }

    const handleHotelSelection = (hotelName: string) => {
        setSelectedHotel(mockHotels.find(h => h.name === hotelName)!);
        setExpandedHotel(hotelName);
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
                     <RadioGroup value={selectedHotel.name} onValueChange={handleHotelSelection}>
                        {mockHotels.map(hotel => (
                           <Collapsible key={hotel.name} open={expandedHotel === hotel.name}>
                             <CollapsibleTrigger asChild>
                                 <Label htmlFor={hotel.name} className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10 has-[:checked]:bg-primary/20 has-[:checked]:border-primary transition-all">
                                    <RadioGroupItem value={hotel.name} id={hotel.name} className="mr-4"/>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{hotel.name}</p>
                                        <div className="flex items-center gap-1 text-amber-400">
                                            {[...Array(hotel.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current"/>)}
                                        </div>
                                    </div>
                                    <p className="text-lg font-bold">{hotel.priceModifier >= 0 ? `+$${hotel.priceModifier}` : `-$${Math.abs(hotel.priceModifier)}`}</p>
                                </Label>
                             </CollapsibleTrigger>
                             <CollapsibleContent>
                                <div className="p-4 grid md:grid-cols-2 gap-6 bg-black/20 rounded-b-lg">
                                    <div className="space-y-4">
                                        <p className="text-sm text-white/80">{hotel.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {hotel.amenities.map((amenity, i) => (
                                                <Badge key={i} variant="secondary" className="gap-2 bg-white/20 text-white border-none">
                                                    <amenity.icon className="h-4 w-4" />
                                                    {amenity.text}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                         <Carousel className="w-full rounded-lg overflow-hidden">
                                            <CarouselContent>
                                                {hotel.images.map((img, i) => (
                                                    <CarouselItem key={i} className="relative aspect-video">
                                                        <Image src={img} alt={`${hotel.name} image ${i+1}`} layout="fill" objectFit="cover" />
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
