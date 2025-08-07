
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { MOCK_HOTELS_DATA } from '@/lib/mock-data';
import type { AmadeusHotelOffer } from '@/lib/types';
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HotelCard = ({ hotel }: { hotel: AmadeusHotelOffer }) => (
    <Card className="rounded-2xl p-0 flex flex-col group transition-all duration-300 shadow-2xl bg-white/40 backdrop-blur-xl border-none hover:scale-105">
        <div className="relative w-full h-48 flex-shrink-0">
             <Carousel className="w-full h-full rounded-t-2xl overflow-hidden">
                <CarouselContent>
                    {hotel.hotel.media?.map((photo, index) => (
                        <CarouselItem key={index}>
                             <div className="relative h-48 w-full">
                                <Image 
                                    src={photo.uri}
                                    data-ai-hint="hotel photo" 
                                    alt={`${hotel.hotel.name} image ${index + 1}`}
                                    fill 
                                    className="object-cover"
                                    draggable={false}
                                />
                             </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                 <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                 <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </Carousel>
            <Button variant="ghost" size="icon" className="absolute top-3 right-3 w-8 h-8 flex-shrink-0 text-white bg-black/30 hover:bg-black/50 hover:text-white rounded-full z-20">
                <Heart className="h-5 w-5" />
            </Button>
        </div>
        <CardContent className="p-4 flex flex-col flex-grow text-gray-800">
            <h3 className="font-bold text-lg">{hotel.hotel.name}</h3>
            <p className="text-sm text-gray-600">{hotel.hotel.address.cityName}, {hotel.hotel.address.countryCode}</p>
            
            <div className="flex items-center gap-2 mt-2 text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(parseInt(hotel.hotel.rating || '0'))].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
            </div>
            
            <div className="flex-grow"></div>
            
            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-xs text-gray-600">from</p>
                    <p className="font-semibold text-2xl text-white">${hotel.offers[0].price.total}<span className="text-sm font-normal text-gray-700">/night</span></p>
                </div>
                <Button asChild className="font-semibold">
                    <Link href={`/hotels/${hotel.id}`}>View Hotel</Link>
                </Button>
            </div>
        </CardContent>
    </Card>
);

export function RecommendedHotels() {
  const [hotels, setHotels] = useState<AmadeusHotelOffer[]>([]);

  useEffect(() => {
    const shuffled = [...MOCK_HOTELS_DATA].sort(() => 0.5 - Math.random());
    setHotels(shuffled.slice(0, 4));
  }, []);


  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold font-headline text-white drop-shadow-lg">Recommended Hotels Around the World</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.map((hotel, index) => (
          <HotelCard key={hotel.id || index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
