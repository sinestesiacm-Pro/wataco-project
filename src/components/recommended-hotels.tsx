'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';
import type { AmadeusHotelOffer } from '@/lib/types';
import React, { useCallback, useEffect, useState, memo } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { getRecommendedHotels, getGooglePlacePhotos } from '@/app/actions';
import { Skeleton } from './ui/skeleton';

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

const HotelCard = memo(function HotelCard({ hotelOffer, onViewHotel, photo }: { hotelOffer: AmadeusHotelOffer, onViewHotel: (offer: AmadeusHotelOffer) => void, photo: string | null }) {
    const hotel = hotelOffer.hotel;

    return (
        <motion.div 
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl transition-all duration-500 ease-in-out hover:shadow-2xl cursor-pointer bg-card" 
            onClick={() => onViewHotel(hotelOffer)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
             {!photo ? (
                 <Skeleton className="h-full w-full" />
             ) : (
                <Image
                    src={photo}
                    data-ai-hint="hotel photo"
                    alt={`${hotel.name || 'Hotel'} image`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                    draggable={false}
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x600.png'; }}
                />
             )}
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
        </motion.div>
    );
});

export const RecommendedHotels = memo(function RecommendedHotels() {
  const router = useRouter();
  const [allHotels, setAllHotels] = useState<AmadeusHotelOffer[]>([]);
  const [displayedHotels, setDisplayedHotels] = useState<{offer: AmadeusHotelOffer, photo: string | null}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndPrepareHotels = async () => {
        setLoading(true);
        const result = await getRecommendedHotels();
        if (result.success && result.data) {
            setAllHotels(result.data);
            
            const firstBatch = shuffleArray([...result.data]).slice(0, 4);
            const hotelPromises = firstBatch.map(async (offer) => {
                const photoUrls = await getGooglePlacePhotos(`${offer.hotel.name}, ${offer.hotel.address.cityName}`, 1);
                return {
                    offer: offer,
                    photo: photoUrls.length > 0 ? photoUrls[0] : (offer.hotel.media?.[0]?.uri || 'https://placehold.co/800x600.png')
                };
            });
            const firstDisplayedHotels = await Promise.all(hotelPromises);
            setDisplayedHotels(firstDisplayedHotels);
        }
        setLoading(false);
    }
    fetchAndPrepareHotels();
  }, []);

  useEffect(() => {
    if (allHotels.length === 0) return;

    const interval = setInterval(async () => {
        const nextBatch = shuffleArray([...allHotels]).slice(0, 4);
        const hotelPromises = nextBatch.map(async (offer) => {
            const photoUrls = await getGooglePlacePhotos(`${offer.hotel.name}, ${offer.hotel.address.cityName}`, 1);
            return {
                offer: offer,
                photo: photoUrls.length > 0 ? photoUrls[0] : (offer.hotel.media?.[0]?.uri || 'https://placehold.co/800x600.png')
            };
        });
        const nextDisplayedHotels = await Promise.all(hotelPromises);
        setDisplayedHotels(nextDisplayedHotels);
    }, 10000); // Rotate every 10 seconds

    return () => clearInterval(interval);
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
          <AnimatePresence mode="popLayout">
            {displayedHotels.map(({offer, photo}) => (
              <HotelCard key={offer.id} hotelOffer={offer} onViewHotel={handleViewHotel} photo={photo} />
            ))}
          </AnimatePresence>
      </div>
    </div>
  );
});
