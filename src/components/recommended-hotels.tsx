
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { MOCK_HOTELS_DATA } from '@/lib/mock-data';
import type { AmadeusHotelOffer } from '@/lib/types';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { format, addDays } from 'date-fns';

const HotelCard = React.memo(function HotelCard({ hotelOffer, onViewHotel }: { hotelOffer: AmadeusHotelOffer, onViewHotel: (offer: AmadeusHotelOffer) => void }) {
    const hotel = hotelOffer.hotel;
    const validMedia = hotel.media?.filter(item => item && item.uri) || [];
    const imageUrl = validMedia.length > 0 ? validMedia[0].uri : "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800";

    return (
        <Card className="rounded-2xl p-0 flex flex-col group transition-all duration-300 shadow-inner hover:shadow-card-3d bg-card/80 backdrop-blur-xl border hover:scale-105 overflow-hidden">
            <div className="relative w-full h-56 flex-shrink-0">
                <Image 
                    src={imageUrl}
                    data-ai-hint="hotel photo" 
                    alt={hotel.name || 'Hotel'}
                    fill 
                    className="object-cover"
                    draggable={false}
                />
                <div className="absolute top-0 right-0 p-3 z-10">
                    <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-white bg-black/30 hover:bg-black/50 hover:text-white rounded-full">
                        <Heart className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            <CardContent className="p-4 flex flex-col flex-grow">
                 <h3 className="font-bold font-headline text-lg text-foreground">{hotel.name}</h3>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   <MapPin className="h-4 w-4" />
                   {hotel.address.cityName}, {hotel.address.countryCode}
                 </div>
                 <div className="flex items-center gap-1 text-amber-400 mt-1">
                    {[...Array(parseInt(hotel.rating || '0'))].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                 </div>
                <div className="flex-grow"></div>
                <div className="flex justify-between items-end mt-2">
                    <p className="font-semibold text-xl text-foreground drop-shadow-md">${hotelOffer.offers[0].price.total}<span className="text-sm font-normal">/noche</span></p>
                    <Button onClick={() => onViewHotel(hotelOffer)} className="font-semibold">
                        Ver Hotel
                    </Button>
                 </div>
            </CardContent>
        </Card>
    );
});

export const RecommendedHotels = React.memo(function RecommendedHotels() {
  const router = useRouter();

  const handleViewHotel = useCallback((offer: AmadeusHotelOffer) => {
      const checkInDate = addDays(new Date(), 7);
      const checkOutDate = addDays(new Date(), 14);

      const params = new URLSearchParams({
        checkInDate: format(checkInDate, 'yyyy-MM-dd'),
        checkOutDate: format(checkOutDate, 'yyyy-MM-dd'),
        adults: '2',
        children: '0',
      });
      
      const hotelId = offer.hotel.hotelId || offer.id;
      const url = `/hotels/${hotelId}/offers?${params.toString()}`;
      
      // Use router.push with state to pass the complex object
      router.push(url, { state: { offer } } as any);
  }, [router]);

  return (
    <div className="relative space-y-6">
      <h2 className="text-3xl font-bold font-headline text-foreground drop-shadow-lg">Hoteles Recomendados Alrededor del Mundo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_HOTELS_DATA.slice(0, 4).map((hotelOffer) => (
            <HotelCard key={hotelOffer.id} hotelOffer={hotelOffer} onViewHotel={handleViewHotel} />
          ))}
      </div>
    </div>
  );
});

    