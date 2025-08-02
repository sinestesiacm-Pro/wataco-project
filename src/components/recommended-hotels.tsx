
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { MOCK_HOTELS_DATA } from '@/lib/mock-data';
import type { AmadeusHotelOffer } from '@/lib/types';
import { useState, useEffect } from 'react';

const HotelCard = ({ hotel }: { hotel: AmadeusHotelOffer }) => (
    <Card className="rounded-2xl p-0 flex flex-col group transition-all duration-300 shadow-2xl bg-white/40 backdrop-blur-xl border-none hover:scale-105">
        <div className="relative w-full h-48 flex-shrink-0">
            <Image 
                src={hotel.hotel.media?.[0]?.uri || 'https://placehold.co/400x300.png'} 
                data-ai-hint="hotel exterior" 
                alt={hotel.hotel.name || 'Hotel'} 
                fill 
                className="object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
            />
            <Button variant="ghost" size="icon" className="absolute top-3 right-3 w-8 h-8 flex-shrink-0 text-white bg-black/30 hover:bg-black/50 hover:text-white rounded-full">
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
                {/* Reviews are not in this data structure, so we can mock them or hide them */}
                {/* <p className="text-gray-500">({hotel.reviews} reviews)</p> */}
            </div>
            
            <div className="flex-grow"></div>
            
            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-xs text-gray-600">desde</p>
                    <p className="font-semibold text-2xl text-white">${hotel.offers[0].price.total}<span className="text-sm font-normal text-gray-700">/noche</span></p>
                </div>
                <Button asChild className="font-semibold">
                    <Link href={`/hotels/${hotel.id}`}>Ver Hotel</Link>
                </Button>
            </div>
        </CardContent>
    </Card>
);

export function RecommendedHotels() {
  const [colombianHotels, setColombianHotels] = useState<AmadeusHotelOffer[]>([]);

  useEffect(() => {
    // Filter for Colombian hotels and then shuffle them
    const filtered = MOCK_HOTELS_DATA.filter(hotel => hotel.hotel.address.countryCode === 'CO');
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setColombianHotels(shuffled.slice(0, 4));
  }, []);


  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold font-headline text-white drop-shadow-lg">Hoteles Recomendados en Colombia</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {colombianHotels.map((hotel, index) => (
          <HotelCard key={hotel.id || index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
