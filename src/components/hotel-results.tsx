
'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin } from 'lucide-react';
import type { AmadeusHotelOffer } from '@/lib/types';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { getGooglePlacePhotos } from '@/app/actions';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface HotelResultsProps {
    hotels: AmadeusHotelOffer[];
    searchParams: URLSearchParams;
}

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

const HotelCard = ({ offer, searchParams }: { offer: AmadeusHotelOffer, searchParams: URLSearchParams }) => {
    const router = useRouter();
    const [photos, setPhotos] = useState<string[]>([]);
    const [loadingPhotos, setLoadingPhotos] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoadingPhotos(true);
            const photoUrls = await getGooglePlacePhotos(`${offer.hotel.name}, ${offer.hotel.address.cityName}`);
            
            const staticPhotos = (offer.hotel.media || [])
                .map(p => p.uri)
                .filter(uri => !!uri);

            // Combine and deduplicate, prioritizing Google Photos, and filter out empty strings
            const combinedPhotos = [...new Set([...photoUrls, ...staticPhotos])];
            const validPhotos = combinedPhotos.filter(p => p && p.trim() !== '');

            setPhotos(validPhotos);
            setLoadingPhotos(false);
        };

        if (offer.hotel.name && offer.hotel.address.cityName) {
          fetchPhotos();
        }
    }, [offer.hotel.name, offer.hotel.address.cityName, offer.hotel.media]);

    const displayPhotos = photos.length > 0 ? photos : ['https://placehold.co/800x600.png?text=Image+not+found'];

    const handleViewHotel = () => {
        const params = new URLSearchParams(searchParams.toString());
        const hotelId = offer.hotel.hotelId || offer.id;
        
        const url = `/hotels/${hotelId}/offers?${params.toString()}`;
        
        // Pass the offer data through router state to avoid re-fetching
        router.push(url, { state: { offer } } as any);
    }

    return (
        <Card className="rounded-2xl overflow-hidden transition-all duration-300 group aspect-[16/9] relative flex flex-col justify-end shadow-card-3d hover:scale-[1.02]">
            <div className="absolute inset-0">
                {loadingPhotos ? (
                    <Skeleton className="h-full w-full" />
                ) : (
                    <Carousel className="w-full h-full">
                        <CarouselContent>
                            {displayPhotos.map((photo, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative h-full w-full">
                                        <Image
                                            src={photo}
                                            data-ai-hint="hotel exterior"
                                            alt={`${offer.hotel.name || 'Hotel image'} ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {displayPhotos.length > 1 && (
                          <>
                            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50 hover:text-white" />
                            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50 hover:text-white" />
                          </>
                        )}
                    </Carousel>
                )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
            </div>
            
              <div className="relative p-6 text-white w-full">
                <h3 className="text-2xl font-semibold font-headline drop-shadow-md">{offer.hotel.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm drop-shadow-sm">
                    {renderStars(offer.hotel.rating)}
                    {offer.hotel.address && (
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {offer.hotel.address.cityName}
                        </div>
                    )}
                </div>
                 <div className="flex justify-between items-end mt-4">
                     <div className="text-white/90">
                        <p className="text-xs">Precio por noche desde</p>
                        <p className="font-semibold text-3xl drop-shadow-lg">
                          ${offer.offers?.[0]?.price?.total}
                        </p>
                    </div>
                     <Button onClick={handleViewHotel} size="lg" className="font-semibold bg-white/20 backdrop-blur-lg border-white/30 hover:bg-white/30 text-white">
                        Ver Habitaciones
                     </Button>
              </div>
            </div>
        </Card>
    );
};

export function HotelResults({ hotels, searchParams }: HotelResultsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {hotels.map((offer) => (
        <HotelCard key={`${offer.id}`} offer={offer} searchParams={searchParams} />
      ))}
    </div>
  );
}
