'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { AmadeusHotelOffer } from '@/lib/types';
import { HotelDetailsDialog } from './hotel-details-dialog';

interface HotelResultsProps {
    hotels: AmadeusHotelOffer[];
}

const renderStars = (rating: string | undefined) => {
    const starCount = parseInt(rating || '0', 10);
    if (starCount === 0) return null;
    
    return (
        <div className="flex items-center">
            {[...Array(starCount)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
        </div>
    );
};

export function HotelResults({ hotels }: HotelResultsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        {hotels.map((offer, index) => (
          <Card key={`${offer.id}-${index}`} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border bg-card flex flex-col">
            <div className="overflow-hidden relative">
              <Image 
                src={offer.hotel.media?.[0]?.uri || 'https://placehold.co/400x300.png'}
                data-ai-hint="hotel exterior" 
                alt={offer.hotel.name || 'Hotel image'} 
                width={400} 
                height={300} 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
               <div className="absolute bottom-4 left-4">
                 <h3 className="text-xl font-bold font-headline text-white">{offer.hotel.name}</h3>
                 {offer.hotel.address?.cityName && (
                    <p className="text-sm text-white/90">{`${offer.hotel.address.cityName}`}</p>
                 )}
              </div>
            </div>
            
            <CardContent className="p-4 flex flex-col flex-grow">
              <div className='flex justify-between items-start mb-2'>
                {renderStars(offer.hotel.rating)}
              </div>
             
              <div className="flex-grow" />

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                {offer.offers?.[0]?.price?.total ? (
                    <div>
                        <p className="text-xs text-muted-foreground font-body">Desde</p>
                        <p className="font-bold text-2xl text-accent">
                          ${offer.offers[0].price.total}
                        </p>
                    </div>
                ) : <div />}
                <HotelDetailsDialog
                  offer={offer}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
