'use client';

import { useState, useEffect } from 'react';
import type { AmadeusHotel } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Star, MapPin, Wifi, Car, Waves, Utensils, GlassWater, Wind, Dumbbell, Sparkles, Dog, Plane, CheckCircle2, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HotelMapDialog } from './hotel-map-dialog';
import { Badge } from './ui/badge';
import { getGooglePlacePhotos } from '@/app/actions';

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
  hotel: AmadeusHotel;
}

export function HotelDetailsView({ hotel }: HotelDetailsViewProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoadingPhotos(true);
      const photoUrls = await getGooglePlacePhotos(`${hotel.name}, ${hotel.address.cityName}`);
      
      const staticPhotos = hotel.media?.map(p => p.uri).filter(uri => !!uri) || [];

      // Combine and deduplicate, prioritizing Google Photos
      const combinedPhotos = [...new Set([...photoUrls, ...staticPhotos])];

      setPhotos(combinedPhotos);
      setLoadingPhotos(false);
    };

    fetchPhotos();
  }, [hotel.name, hotel.address.cityName, hotel.media]);

  const displayPhotos = photos.length > 0 ? photos : (hotel.media?.map(p => p.uri).filter(uri => !!uri) || ['https://placehold.co/800x600.png']);

  return (
    <div className="space-y-8">
      <Card className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg h-[60vh] md:h-[70vh]">
        
        <Carousel className="absolute inset-0 w-full h-full">
          <CarouselContent>
            {loadingPhotos ? (
              <CarouselItem>
                <div className="relative h-[60vh] md:h-[70vh] w-full bg-muted/20 animate-pulse" />
              </CarouselItem>
            ) : (
              displayPhotos.map((photo, index) => (
                <CarouselItem key={index}>
                   <div className="relative h-[60vh] md:h-[70vh] w-full">
                    <Image
                        src={photo}
                        alt={`${hotel.name} - ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                    />
                   </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 hover:text-white" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 hover:text-white" />
        </Carousel>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none" />

        <div className="relative h-full flex flex-col justify-end p-6 md:p-8 pointer-events-none">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-3xl md:text-4xl font-headline text-white drop-shadow-lg">{hotel.name}</CardTitle>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-white/90">
                    {hotel.rating && <div className="flex items-center">{renderStars(hotel.rating)}</div>}
                    <div className="flex items-center gap-1"><MapPin className="h-4 w-4" />{hotel.address.cityName}, {hotel.address.countryCode}</div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-6">
                    {hotel.description && (
                        <div>
                            <h3 className="font-semibold text-lg mb-2 text-white">Sobre esta propiedad</h3>
                            <p className="text-white/80 line-clamp-3">{hotel.description.text}</p>
                        </div>
                    )}
                    {hotel.amenities && hotel.amenities.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-lg mb-3 text-white">Servicios Populares</h3>
                            <div className="flex flex-wrap gap-2">
                                {hotel.amenities.slice(0, 6).map(amenity => {
                                    const Icon = amenityIcons[amenity] || CheckCircle2;
                                    return (
                                        <Badge key={amenity} variant="secondary" className="gap-2 bg-white/10 text-white border-white/20">
                                            <Icon className="h-4 w-4" />
                                            {formatAmenity(amenity)}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                     <div className="pointer-events-auto">
                        <HotelMapDialog hotelName={hotel.name || 'Ubicación'} />
                    </div>
                </div>
            </CardContent>
        </div>
      </Card>
    </div>
  );
}
