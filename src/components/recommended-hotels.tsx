
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { MOCK_HOTELS_DATA } from '@/lib/mock-data';
import type { AmadeusHotelOffer } from '@/lib/types';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format, addDays } from 'date-fns';
import { getGooglePlacePhotos } from '@/app/actions';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
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


const HotelCard = React.memo(function HotelCard({ hotelOffer, onViewHotel }: { hotelOffer: AmadeusHotelOffer, onViewHotel: (offer: AmadeusHotelOffer) => void }) {
    const hotel = hotelOffer.hotel;
    const [photos, setPhotos] = useState<string[]>([]);
    const [loadingPhotos, setLoadingPhotos] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoadingPhotos(true);
            const query = `${hotel.name}, ${hotel.address.cityName}`;
            const googlePhotos = await getGooglePlacePhotos(query, 5);
            
            const staticPhotos = (hotel.media || []).map(p => p.uri).filter(Boolean);
            const displayPhotos = googlePhotos.length > 0 ? googlePhotos : staticPhotos.length > 0 ? staticPhotos : ['https://placehold.co/800x600.png'];
            
            setPhotos(displayPhotos);
            setLoadingPhotos(false);
        };

        fetchPhotos();
    }, [hotel.name, hotel.address.cityName, hotel.media]);

    return (
        <Card className="rounded-2xl p-0 flex flex-col group transition-all duration-300 shadow-inner hover:shadow-card-3d bg-card/80 backdrop-blur-xl border hover:scale-105 overflow-hidden">
            <div className="relative w-full h-56 flex-shrink-0">
                {loadingPhotos ? (
                    <Skeleton className="h-full w-full" />
                ) : (
                    <Carousel className="w-full h-full">
                        <CarouselContent>
                            {photos.map((photo, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative h-56 w-full">
                                        <Image
                                            src={photo}
                                            data-ai-hint="hotel photo"
                                            alt={`${hotel.name || 'Hotel'} image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                                            draggable={false}
                                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x600.png'; }}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {photos.length > 1 && (
                            <>
                                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </>
                        )}
                    </Carousel>
                )}
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
                    {renderStars(hotel.rating)}
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
        destinationName: offer.hotel.address.cityName,
        checkInDate: format(checkInDate, 'yyyy-MM-dd'),
        checkOutDate: format(checkOutDate, 'yyyy-MM-dd'),
        adults: '2',
        children: '0',
        cityCode: offer.hotel.hotelId // Using hotelId as a stand-in for cityCode
      });
      
      const hotelId = offer.hotel.hotelId || offer.id;
      // Navigate to the hotel detail page
      router.push(`/hotels/${hotelId}`);
  }, [router]);

  return (
    <div className="relative space-y-6">
      <div className="glitch-container">
        <h2 className="text-2xl font-bold font-headline text-foreground drop-shadow-lg" data-text="Hoteles Recomendados Alrededor del Mundo">
            <span>Hoteles Recomendados Alrededor del Mundo</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_HOTELS_DATA.slice(0, 4).map((hotelOffer) => (
            <HotelCard key={hotelOffer.id} hotelOffer={hotelOffer} onViewHotel={handleViewHotel} />
          ))}
      </div>
    </div>
  );
});
