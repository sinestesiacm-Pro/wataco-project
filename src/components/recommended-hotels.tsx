
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import type { AmadeusHotelOffer } from '@/lib/types';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from './ui/skeleton';
import React from 'react';

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


const HotelCard = React.memo(function HotelCard({ hotel }: { hotel: Hotel }) {
    return (
        <Card className="rounded-2xl p-0 flex flex-col group transition-all duration-300 shadow-2xl bg-white/40 backdrop-blur-xl border-none hover:scale-105">
            <div className="relative w-full h-48 flex-shrink-0">
                 <Carousel className="w-full h-full rounded-t-2xl overflow-hidden">
                    <CarouselContent>
                        {(hotel.media || []).map((photo, index) => (
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
                <h3 className="font-bold text-lg">{hotel.nombre}</h3>
                <p className="text-sm text-gray-600">{hotel.ubicacion}</p>
                
                <div className="flex items-center gap-2 mt-2 text-sm">
                    <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(hotel.rating || 0)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                </div>
                
                <div className="flex-grow"></div>
                
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="text-xs text-gray-600">from</p>
                        <p className="font-semibold text-2xl text-white">${hotel.price}<span className="text-sm font-normal text-gray-700">/night</span></p>
                    </div>
                    <Button asChild className="font-semibold">
                        <Link href={`/hotels/${hotel.id}`}>View Hotel</Link>
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

export const RecommendedHotels = React.memo(function RecommendedHotels() {
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);
  const [displayedHotels, setDisplayedHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="space-y-6">
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
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
});
