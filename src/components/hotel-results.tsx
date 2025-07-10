'use client';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Star, MapPin } from 'lucide-react';
import type { AmadeusHotelOffer } from '@/lib/types';
import { HotelDetailsDialog } from './hotel-details-dialog';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

interface HotelResultsProps {
    hotels: AmadeusHotelOffer[];
}

const renderStars = (rating: string | undefined) => {
    const starCount = parseInt(rating || '0', 10);
    if (starCount === 0) return null;
    
    return (
        <div className="flex items-center gap-1">
            {[...Array(starCount)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
            <span className="text-sm font-bold">{starCount}.0</span>
        </div>
    );
};

const formatAmenity = (amenity: string) => {
  return amenity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function HotelResults({ hotels }: HotelResultsProps) {
  return (
    <div className="space-y-4">
       <h2 className="text-3xl font-headline font-bold text-gray-800">
          Mostrando {hotels.length} hotel{hotels.length !== 1 && 'es'}
        </h2>
      {hotels.map((offer) => (
        <Card key={offer.id} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border bg-card/95 backdrop-blur-sm flex flex-col md:flex-row">
            <div className="relative h-48 md:h-auto md:w-1/3 xl:w-1/4">
                <Image 
                    src={offer.hotel.media?.[0]?.uri || 'https://placehold.co/400x300.png'}
                    data-ai-hint="hotel exterior" 
                    alt={offer.hotel.name || 'Hotel image'} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            
            <div className="md:w-2/3 xl:w-3/4 flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold font-headline text-primary">{offer.hotel.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                            {renderStars(offer.hotel.rating)}
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                {offer.hotel.address.cityName}, {offer.hotel.address.countryCode}
                            </div>
                        </div>
                    </div>
                </div>
                 <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                    {offer.hotel.description?.text}
                 </p>
                 {offer.hotel.amenities && offer.hotel.amenities.length > 0 && (
                    <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                            {offer.hotel.amenities.slice(0, 5).map((amenity, index) => (
                            <Badge key={index} variant="secondary">
                                {formatAmenity(amenity)}
                            </Badge>
                            ))}
                        </div>
                    </div>
                 )}
              </div>
              
              <Separator />

              <div className="p-6 bg-muted/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="text-center sm:text-left">
                    <p className="text-xs text-muted-foreground font-body">Precio por noche</p>
                    <p className="font-bold text-3xl text-tertiary">
                      ${offer.offers?.[0]?.price?.total}
                    </p>
                </div>
                <HotelDetailsDialog
                  offer={offer}
                />
              </div>
            </div>
        </Card>
      ))}
    </div>
  );
}
