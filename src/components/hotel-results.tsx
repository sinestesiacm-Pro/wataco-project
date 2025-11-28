
'use client';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
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
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
            <span className="text-sm font-semibold">{starCount}.0</span>
        </div>
    );
};

const formatAmenity = (amenity: string) => {
  return amenity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

const HotelCard = ({ offer, searchParams }: { offer: AmadeusHotelOffer, searchParams: URLSearchParams }) => {
    const router = useRouter();
    const [photos, setPhotos] = useState<string[]>([]);
    const [loadingPhotos, setLoadingPhotos] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoadingPhotos(true);
            const photoUrls = await getGooglePlacePhotos(`${offer.hotel.name}, ${offer.hotel.address.cityName}`);
            
            // Prioritize Google Photos, but use static media as a fallback
            const staticPhotos = (offer.hotel.media || [])
                .map(p => p.uri)
                .filter(uri => uri && uri.trim() !== '');

            const combinedPhotos = [...new Set([...photoUrls, ...staticPhotos])];

            setPhotos(combinedPhotos);
            setLoadingPhotos(false);
        };

        fetchPhotos();
    }, [offer.hotel.name, offer.hotel.address.cityName, offer.hotel.media]);

    const displayPhotos = photos.length > 0 ? photos : ['https://placehold.co/400x300.png'];

    const handleViewHotel = () => {
        const params = new URLSearchParams(searchParams.toString());
        // We use hotelId from the hotel object, which should be the Hotelbeds code or similar.
        const hotelId = offer.hotel.hotelId || offer.id;
        
        // Pass the offer via state to avoid fetching again on the details page.
        // This is a client-side navigation feature.
        const url = `/hotels/${hotelId}/offers?${params.toString()}`;
        router.push(url, { state: { offer } } as any);
    }

    return (
        <Card className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group bg-card/80 backdrop-blur-xl border flex flex-col md:flex-row">
            <div className="relative h-48 md:h-auto md:w-1/3 xl:w-1/4 flex-shrink-0">
                {loadingPhotos ? (
                    <Skeleton className="h-full w-full" />
                ) : (
                    <Carousel className="w-full h-full">
                        <CarouselContent>
                            {displayPhotos.map((photo, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative h-48 md:h-full w-full">
                                        <Image
                                            src={photo}
                                            data-ai-hint="hotel exterior"
                                            alt={`${offer.hotel.name || 'Hotel image'} ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50 hover:text-white" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50 hover:text-white" />
                    </Carousel>
                )}
            </div>
            
            <div className="flex flex-col flex-grow">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-semibold font-headline">{offer.hotel.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                            {renderStars(offer.hotel.rating)}
                            {offer.hotel.address && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    {offer.hotel.address.cityName}, {offer.hotel.address.countryCode}
                                </div>
                            )}
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
              
              <Separator className="mt-auto" />

              <div className="p-4 sm:p-6 bg-muted/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="text-center sm:text-left">
                    <p className="text-xs text-muted-foreground font-body">Precio por noche desde</p>
                    <p className="font-semibold text-3xl">
                      ${offer.offers?.[0]?.price?.total}
                    </p>
                </div>
                 <Button onClick={handleViewHotel} size="lg" className="font-semibold w-full sm:w-auto">
                    Ver Habitaciones
                 </Button>
              </div>
            </div>
        </Card>
    );
};

export function HotelResults({ hotels, searchParams }: HotelResultsProps) {
  return (
    <div className="space-y-4">
      {hotels.map((offer) => (
        <HotelCard key={`${offer.id}`} offer={offer} searchParams={searchParams} />
      ))}
    </div>
  );
}
