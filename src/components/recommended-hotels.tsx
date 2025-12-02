'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Loader2 } from 'lucide-react';
import type { AmadeusHotelOffer } from '@/lib/types';
import React, { useCallback, useEffect, useState, memo } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { getRecommendedHotels } from '@/app/actions';
import { getGooglePlacePhotos } from '@/app/actions';
import { cn } from '@/lib/utils';

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

const HotelCard = memo(function HotelCard({ hotelOffer, onViewHotel }: { hotelOffer: AmadeusHotelOffer; onViewHotel: (offer: AmadeusHotelOffer) => void; }) {
    const hotel = hotelOffer.hotel;
    const [photo, setPhoto] = useState<string | null>(null);
    const [loadingPhoto, setLoadingPhoto] = useState(true);
    
    useEffect(() => {
        let isCancelled = false;
        const fetchPhoto = async () => {
            setLoadingPhoto(true);
            const photos = await getGooglePlacePhotos(`${hotel.name}, ${hotel.address.cityName}`);
            if (!isCancelled) {
                setPhoto(photos[0] || hotel.media?.[0]?.uri || 'https://placehold.co/800x600.png');
                setLoadingPhoto(false);
            }
        };
        fetchPhoto();
        return () => { isCancelled = true; };
    }, [hotel.name, hotel.address.cityName, hotel.media]);

    return (
        <motion.div 
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl transition-all duration-500 ease-in-out hover:shadow-2xl cursor-pointer bg-card" 
            onClick={() => onViewHotel(hotelOffer)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
             <AnimatePresence>
                {loadingPhoto ? (
                    <div className="absolute inset-0 bg-white flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                     photo && (
                        <motion.div
                            key={photo}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={photo}
                                data-ai-hint="hotel photo"
                                alt={`${hotel.name || 'Hotel'} image`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                                draggable={false}
                                priority
                                unoptimized={photo.includes('placehold.co')}
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x600.png'; }}
                            />
                        </motion.div>
                    )
                )}
            </AnimatePresence>

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
                    <Button variant="glass">
                        Ver Hotel
                    </Button>
                </div>
            </div>
        </motion.div>
    );
});

const HotelRotationSlot = ({ allHotels, onViewHotel, updateInterval }: { allHotels: AmadeusHotelOffer[], onViewHotel: (offer: AmadeusHotelOffer) => void, updateInterval: number }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const scheduleNextUpdate = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % allHotels.length);
        }, updateInterval);
    }, [allHotels.length, updateInterval]);

    useEffect(() => {
        if (allHotels.length > 1) {
            scheduleNextUpdate();
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [allHotels, scheduleNextUpdate, currentIndex]);

    const hotelToShow = allHotels[currentIndex];

    if (!hotelToShow) return <div className="aspect-[4/5] rounded-2xl bg-white" />;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={hotelToShow.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.5 }}
            >
                <HotelCard hotelOffer={hotelToShow} onViewHotel={onViewHotel} />
            </motion.div>
        </AnimatePresence>
    );
};


export const RecommendedHotels = memo(function RecommendedHotels() {
  const router = useRouter();
  const [allHotels, setAllHotels] = useState<AmadeusHotelOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndPrepareHotels = async () => {
        setLoading(true);
        const result = await getRecommendedHotels();
        if (result.success && result.data) {
            setAllHotels(shuffleArray(result.data));
        }
        setLoading(false);
    }
    fetchAndPrepareHotels();
  }, []);

  const handleViewHotel = useCallback((offer: AmadeusHotelOffer) => {
      const hotelId = offer.hotel.hotelId || offer.id;
      router.push(`/hotels/${hotelId}`);
  }, [router]);
  
  if (loading) {
      return (
          <div className="space-y-6">
               <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                   {[...Array(4)].map((_, i) => <div key={i} className="aspect-[4/5] rounded-2xl bg-gray-200 animate-pulse" />)}
               </div>
          </div>
      )
  }
  
  const hotelSlots = allHotels.length > 0 ? [
      { slotIndex: 2, interval: 30000 },
      { slotIndex: 0, interval: 45000 },
      { slotIndex: 1, interval: 55000 },
      { slotIndex: 3, interval: 65000 }
  ] : [];

  return (
    <div className="relative space-y-6">
      <div 
        className="glitch-container text-2xl font-bold font-headline text-foreground"
        data-text="Hoteles Recomendados Alrededor del Mundo"
      >
        <span data-text="Hoteles Recomendados Alrededor del Mundo">Hoteles Recomendados Alrededor del Mundo</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotelSlots.map(({ slotIndex, interval }) => {
              const hotelsForSlot = allHotels.filter((_, index) => index % 4 === slotIndex);
              return hotelsForSlot.length > 0 ? (
                  <HotelRotationSlot 
                      key={slotIndex} 
                      allHotels={hotelsForSlot}
                      onViewHotel={handleViewHotel}
                      updateInterval={interval}
                  />
              ) : null;
          })}
      </div>
    </div>
  );
});
