
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star, MapPin } from 'lucide-react';
import Link from 'next/link';
import { MOCK_HOTELS_DATA } from '@/lib/mock-data';
import type { AmadeusHotelOffer } from '@/lib/types';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format, addDays } from 'date-fns';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Skeleton } from './ui/skeleton';
import { getRecommendedHotels } from '@/app/actions';

const renderStars = (rating: string | undefined) => {
    const starCount = parseInt(rating || '0', 10);
    if (starCount === 0) return null;
    
    return (
        <div className="flex items-center gap-1">
            {[...Array(starCount)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-300 fill-amber-400" />
            ))}
        </div>
    );
};

const shuffleArray = <T,>(array: T[]): T[] => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const HotelCard = React.memo(function HotelCard({ hotelOffer, onViewHotel }: { hotelOffer: AmadeusHotelOffer, onViewHotel: (offer: AmadeusHotelOffer) => void }) {
    const hotel = hotelOffer.hotel;

    return (
        <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl transition-all duration-500 ease-in-out hover:shadow-2xl" onClick={() => onViewHotel(hotelOffer)}>
             <Image
                src={hotel.media?.[0]?.uri || 'https://placehold.co/800x600.png'}
                data-ai-hint="hotel photo"
                alt={`${hotel.name || 'Hotel'} image`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                draggable={false}
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x600.png'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end h-full">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                    <h3 className="font-bold font-headline text-2xl text-white drop-shadow-md">{hotel.name}</h3>
                     <div className="flex items-center gap-4 mt-1 text-sm text-white/90">
                       {renderStars(hotel.rating)}
                       <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{hotel.address.cityName}, {hotel.address.countryCode}</span>
                       </div>
                    </div>
                </div>
                 <div className="mt-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex justify-between items-end">
                    <p className="font-semibold text-xl drop-shadow-lg">${hotelOffer.offers[0].price.total}<span className="text-sm font-normal">/noche</span></p>
                    <Button className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30">
                        Ver Hotel
                    </Button>
                </div>
            </div>
        </div>
    );
});

export const RecommendedHotels = React.memo(function RecommendedHotels() {
  const router = useRouter();
  const [allHotels, setAllHotels] = useState<AmadeusHotelOffer[]>([]);
  const [displayedHotels, setDisplayedHotels] = useState<AmadeusHotelOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
        setLoading(true);
        const result = await getRecommendedHotels();
        if(result.success && result.data) {
            setAllHotels(result.data);
            setDisplayedHotels(shuffleArray([...result.data]).slice(0, 4));
        }
        setLoading(false);
    }
    fetchHotels();
  }, []);

  useEffect(() => {
    if (allHotels.length > 0) {
        const interval = setInterval(() => {
            setDisplayedHotels(shuffleArray([...allHotels]).slice(0, 4));
        }, 10000); // Rotate every 10 seconds

        return () => clearInterval(interval);
    }
  }, [allHotels]);

  const handleViewHotel = useCallback((offer: AmadeusHotelOffer) => {
      const hotelId = offer.hotel.hotelId || offer.id;
      router.push(`/hotels/${hotelId}`);
  }, [router]);
  
  if (loading) {
      return (
          <div className="space-y-6">
               <Skeleton className="h-8 w-1/3" />
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                   {[...Array(4)].map((_, i) => <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />)}
               </div>
          </div>
      )
  }

  return (
    <div className="relative space-y-6">
      <div 
        className="glitch-container text-2xl font-bold font-headline text-foreground"
        data-text="Hoteles Recomendados Alrededor del Mundo"
      >
        <span data-text="Hoteles Recomendados Alrededor del Mundo">Hoteles Recomendados Alrededor del Mundo</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedHotels.map((hotelOffer) => (
            <HotelCard key={hotelOffer.id} hotelOffer={hotelOffer} onViewHotel={handleViewHotel} />
          ))}
      </div>
    </div>
  );
});
