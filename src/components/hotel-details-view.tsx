
'use client';

import type { AmadeusHotelOffer } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Star, MapPin, Wifi, Car, Waves, Utensils, GlassWater, Wind, Dumbbell, Sparkles, Dog, Plane, CheckCircle2, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HotelMapDialog } from './hotel-map-dialog';

const amenityIcons: { [key: string]: LucideIcon } = {
  SWIMMING_POOL: Waves,
  SPA: Sparkles,
  WIFI: Wifi,
  RESTAURANT: Utensils,
  PARKING: Car,
  FITNESS_CENTER: Dumbbell,
  BAR: GlassWater,
  AIR_CONDITIONING: Wind,
  PETS_ALLOWED: Dog,
  AIRPORT_SHUTTLE: Plane,
  BEACH_ACCESS: Waves,
};

const formatAmenity = (amenity: string) => {
  return amenity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const renderStars = (rating: string) => {
    return [...Array(parseInt(rating))].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
    ));
};

interface HotelDetailsViewProps {
  hotelOffer: AmadeusHotelOffer;
  onSeeRooms: () => void;
}

export function HotelDetailsView({ hotelOffer, onSeeRooms }: HotelDetailsViewProps) {
  const hotel = hotelOffer.hotel;

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden bg-transparent border-0 shadow-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-0 text-white">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-3xl font-headline text-white">{hotel.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-white/80">
                        {hotel.rating && <div className="flex items-center">{renderStars(hotel.rating)}</div>}
                        <div className="flex items-center gap-1"><MapPin className="h-4 w-4" />{hotel.address.cityName}, {hotel.address.countryCode}</div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="space-y-6">
                        {hotel.description && (
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Sobre esta propiedad</h3>
                                <p className="text-white/80">{hotel.description.text}</p>
                            </div>
                        )}
                        {hotel.amenities && hotel.amenities.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-lg mb-3">Servicios del Hotel</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {hotel.amenities.map(amenity => {
                                        const Icon = amenityIcons[amenity] || CheckCircle2;
                                        return (
                                            <div key={amenity} className="flex items-center gap-2 text-sm">
                                                <Icon className="h-5 w-5 text-primary" />
                                                <span>{formatAmenity(amenity)}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                         <div>
                            <HotelMapDialog hotelName={hotel.name || 'Ubicación'} />
                        </div>
                    </div>
                </CardContent>
            </div>
             <div className="relative min-h-[300px] lg:min-h-0">
                <Carousel className="w-full h-full">
                  <CarouselContent>
                    {hotel.media && hotel.media.length > 0 ? (
                      hotel.media.map((photo, index) => (
                        <CarouselItem key={index}>
                           <div className="relative w-full h-full aspect-video lg:aspect-auto lg:h-full rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={photo.uri}
                                alt={`${hotel.name} - ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                           </div>
                        </CarouselItem>
                      ))
                    ) : (
                       <CarouselItem>
                         <div className="relative w-full h-full aspect-video lg:aspect-auto lg:h-full rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="https://placehold.co/800x600.png"
                                alt="Placeholder hotel image"
                                fill
                                className="object-cover"
                            />
                         </div>
                        </CarouselItem>
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-black/30 border-white/20 text-white hover:bg-black/50 hover:text-white" />
                  <CarouselNext className="right-4 bg-black/30 border-white/20 text-white hover:bg-black/50 hover:text-white" />
                </Carousel>
            </div>
        </div>
      </Card>
      
      <div className="flex justify-center mt-8">
        <Button size="lg" onClick={onSeeRooms} className="font-bold text-lg bg-success hover:bg-success/90">
          Ver habitaciones
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
