
'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BedDouble, Star } from 'lucide-react';
import type { Hotel } from '@/lib/types';
import { Badge } from './ui/badge';

interface HotelResultsProps {
    hotels: Hotel[] | null;
}

export function HotelResults({ hotels }: HotelResultsProps) {
    if (!hotels || hotels.length === 0) {
        return (
            <div className="text-center py-16">
                <h3 className="text-xl font-semibold">No Hotels Found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
        );
    }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        {hotels.map((hotel) => (
          <Card key={hotel.hotel_id} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border bg-card flex flex-col">
            <div className="overflow-hidden relative">
              <Image 
                src={hotel.main_photo_url ? hotel.main_photo_url.replace('square60', 'square200') : 'https://placehold.co/400x300.png'}
                data-ai-hint="hotel room" 
                alt={hotel.hotel_name} 
                width={400} 
                height={300} 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
               <div className="absolute bottom-4 left-4">
                 <h3 className="text-xl font-bold font-headline text-white">{hotel.hotel_name}</h3>
                 <p className="text-sm text-white/90">{`${hotel.city}, ${hotel.country_trans}`}</p>
              </div>
            </div>
            
            <CardContent className="p-4 flex flex-col flex-grow">
              <div className='flex justify-between items-start mb-2'>
                <Badge variant="secondary">{hotel.accommodation_type_name}</Badge>
                {hotel.review_score && (
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                        <span className="font-bold">{hotel.review_score.toFixed(1)}</span>
                        <span className="text-xs text-muted-foreground">({hotel.review_nr} reviews)</span>
                    </div>
                )}
              </div>
             
              <div className="flex-grow" />

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                {hotel.price_breakdown?.gross_price ? (
                    <div>
                        <p className="text-xs text-muted-foreground font-body">From</p>
                        <p className="font-bold text-2xl text-accent">{hotel.price_breakdown.gross_price}</p>
                    </div>
                ) : <div />}
                <Button asChild>
                    <a href={hotel.url} target="_blank" rel="noopener noreferrer">
                        <BedDouble className="mr-2 h-4 w-4" />
                        View Deal
                    </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
