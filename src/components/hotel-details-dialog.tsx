'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { AmadeusHotelOffer } from '@/lib/types';
import { ScrollArea } from './ui/scroll-area';
import { HotelDetailsView } from './hotel-details-view';
import Link from 'next/link';

interface HotelDetailsDialogProps {
  offer: AmadeusHotelOffer;
  children: React.ReactNode;
}

export function HotelDetailsDialog({ offer, children }: HotelDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const detailsLink = `/hotels/${offer.id}`;

  const handleSeeRooms = () => {
    // This function is now a simple navigation
    // The actual availability search happens on the details page
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] flex flex-col bg-white/10 backdrop-blur-xl p-6 border border-white/20 shadow-2xl rounded-3xl">
        {offer ? (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>{offer.hotel.name}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-full pr-4 -mr-4">
              <Link href={detailsLink} legacyBehavior>
                <a onClick={() => setIsOpen(false)}>
                  <HotelDetailsView hotelOffer={offer} />
                </a>
              </Link>
            </ScrollArea>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            <p>No se pudieron cargar los detalles del hotel.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  </change>
  <change>
    <file>/src/components/hotel-details-view.tsx</file>
    <content><![CDATA['use client';

import type { AmadeusHotelOffer } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Star, MapPin, Wifi, Car, Waves, Utensils, GlassWater, Wind, Dumbbell, Sparkles, Dog, Plane, CheckCircle2, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HotelMapDialog } from './hotel-map-dialog';
import { Badge } from './ui/badge';

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
}

export function HotelDetailsView({ hotelOffer }: HotelDetailsViewProps) {
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
                                <h3 className="font-semibold text-lg mb-3">Servicios Populares</h3>
                                <div className="flex flex-wrap gap-2">
                                    {hotel.amenities.slice(0, 6).map(amenity => {
                                        const Icon = amenityIcons[amenity] || CheckCircle2;
                                        return (
                                            <Badge key={amenity} variant="secondary" className="gap-2 bg-white/20 text-white border-none">
                                                <Icon className="h-4 w-4" />
                                                {formatAmenity(amenity)}
                                            </Badge>
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
             <div className="relative">
                <Carousel className="w-full rounded-xl overflow-hidden shadow-lg">
                  <CarouselContent>
                    {hotel.media && hotel.media.length > 0 ? (
                      hotel.media.map((photo, index) => (
                        <CarouselItem key={index} className="relative aspect-[4/3]">
                          <Image
                              src={photo.uri}
                              alt={`${hotel.name} - ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </CarouselItem>
                      ))
                    ) : (
                       <CarouselItem className="relative aspect-[4/3]">
                          <Image
                              src="https://placehold.co/800x600.png"
                              alt="Placeholder hotel image"
                              fill
                              className="object-cover"
                          />
                        </CarouselItem>
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 border-white/20 text-white hover:bg-black/50 hover:text-white" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 border-white/20 text-white hover:bg-black/50 hover:text-white" />
                </Carousel>
            </div>
        </div>
      </Card>
    </div>
  );
}
