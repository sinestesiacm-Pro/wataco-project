'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import type { AmadeusHotelOffer } from '@/lib/types';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from './ui/skeleton';
import React from 'react';
import { useRouter } from 'next/navigation';
import { HotelLoadingAnimation } from './hotel-loading-animation';

// Simplified hotel type for Firestore data
interface Hotel {
    id: string;
    nombre: string;
    ubicacion: string;
    descripcion: string;
    media: string[];
    rating: number; 
    price: number; 
}


const HotelCard = React.memo(function HotelCard({ hotel, onViewHotel }: { hotel: Hotel, onViewHotel: (hotelId: string, destinationName: string) => void }) {
    return (
        <Card className="rounded-2xl p-0 flex flex-col group transition-all duration-300 shadow-2xl bg-white/40 backdrop-blur-xl border-none hover:scale-105 overflow-hidden">
            <div className="relative w-full h-48 flex-shrink-0">
                 <Carousel className="w-full h-full">
                    <CarouselContent>
                        {(hotel.media && hotel.media.length > 0) ? hotel.media.map((photo, index) => (
                            <CarouselItem key={index}>
                                 <div className="relative h-48 w-full">
                                    <Image 
                                        src={photo}
                                        data-ai-hint="hotel photo" 
                                        alt={`${hotel.nombre} image ${index + 1}`}
                                        fill 
                                        className="object-cover"
                                        draggable={false}
                                    />
                                 </div>
                            </CarouselItem>
                        )) : (
                           <CarouselItem>
                                <div className="relative h-48 w-full bg-muted">
                                    <Image 
                                        src="https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800"
                                        data-ai-hint="hotel placeholder" 
                                        alt="Placeholder hotel image"
                                        fill 
                                        className="object-cover"
                                        draggable={false}
                                    />
                                </div>
                           </CarouselItem>
                        )}
                    </CarouselContent>
                     <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                     <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </Carousel>
                <div className="absolute top-0 right-0 p-3 z-10">
                    <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-white bg-black/30 hover:bg-black/50 hover:text-white rounded-full">
                        <Heart className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            <CardContent className="p-4 flex flex-col flex-grow text-white">
                 <h3 className="font-bold font-headline text-lg text-white">{hotel.nombre}</h3>
                 <div className="flex items-center gap-2 text-sm text-white/90">
                   <MapPin className="h-4 w-4" />
                   {hotel.ubicacion}
                 </div>
                 <div className="flex items-center gap-1 text-amber-400 mt-1">
                    {[...Array(hotel.rating || 0)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                 </div>
                <div className="flex-grow"></div>
                <div className="flex justify-between items-end mt-2">
                    <p className="font-semibold text-xl text-white drop-shadow-md">${hotel.price}<span className="text-sm font-normal">/noche</span></p>
                    <Button onClick={() => onViewHotel(hotel.id, hotel.ubicacion)} className="font-semibold bg-primary/80 backdrop-blur-sm border border-white/20 hover:bg-primary">
                        Ver Hotel
                    </Button>
                 </div>
            </CardContent>
        </Card>
    );
});

const HotelSkeleton = () => (
    <div className="rounded-2xl p-0 flex flex-col bg-white/40 backdrop-blur-xl border-none">
        <Skeleton className="w-full h-48 rounded-t-2xl" />
        <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-4 w-1/4" />
            <div className="flex justify-between items-end mt-4">
                <div className="space-y-1">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-8 w-24" />
                </div>
                <Skeleton className="h-10 w-28" />
            </div>
        </div>
    </div>
)

const shuffleArray = <T,>(array: T[]): T[] => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

const FullScreenHotelLoader = ({ destinationName }: { destinationName: string }) => (
    <div className="fixed inset-0 z-[200] w-full h-full">
        <HotelLoadingAnimation destinationName={destinationName} />
    </div>
);


export const RecommendedHotels = React.memo(function RecommendedHotels() {
  const router = useRouter();
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);
  const [displayedHotels, setDisplayedHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingHotelId, setLoadingHotelId] = useState<string | null>(null);
  const [loadingDestinationName, setLoadingDestinationName] = useState<string>('');


  const handleViewHotel = useCallback((hotelId: string, destinationName: string) => {
    setLoadingHotelId(hotelId);
    setLoadingDestinationName(destinationName);
    setTimeout(() => {
        router.push(`/hotels/${hotelId}`);
    }, 5000); // 5 second delay
  }, [router]);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const hotelsCollection = collection(db, 'hoteles');
        const hotelSnapshot = await getDocs(hotelsCollection);
        if (hotelSnapshot.empty) {
            setError("No se encontraron hoteles. Asegúrate de ejecutar el script de siembra: npx tsx src/lib/seed-hotels.ts");
        } else {
            const hotelsList = hotelSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Hotel));
            setAllHotels(hotelsList);
            setDisplayedHotels(shuffleArray([...hotelsList]).slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching hotels from Firestore:", err);
        setError("Ocurrió un error al cargar los hoteles. Revisa la configuración de Firebase y las reglas de seguridad de Firestore.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    if(allHotels.length === 0) return;

    const intervalId = setInterval(() => {
      setDisplayedHotels(shuffleArray([...allHotels]).slice(0, 4));
    }, 40000); // Rotate hotels every 40 seconds

    return () => clearInterval(intervalId);
  }, [allHotels]);

  return (
    <div className="relative space-y-6">
       {loadingHotelId && <FullScreenHotelLoader destinationName={loadingDestinationName} />}
      <h2 className="text-3xl font-bold font-headline text-white drop-shadow-lg">Hoteles Recomendados Alrededor del Mundo</h2>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <HotelSkeleton key={i} />)}
        </div>
      ) : error ? (
        <Card className="bg-destructive/20 border-destructive text-destructive-foreground p-4">
            <CardContent className="pt-6 text-center">
                <h3 className="font-bold">Error al Cargar Hoteles</h3>
                <p className="text-sm mt-2">{error}</p>
            </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} onViewHotel={handleViewHotel} />
          ))}
        </div>
      )}
    </div>
  );
});