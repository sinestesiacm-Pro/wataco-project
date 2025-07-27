
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';

const recommendedHotels = [
  { id: 'HB001', name: 'Oceanview Resort', city: 'Cancún, México', price: '279', image: 'https://images.unsplash.com/photo-1607185654436-3bd5d7a897ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxsdXh1cnklMjByZXNvcnQlMjBzdW5zZXR8ZW58MHx8fHwxNzUyNTkyMjM1fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'luxury resort sunset', rating: 5, reviews: 1327 },
  { id: 'HB003', name: 'Mountain Escape', city: 'Bariloche, Argentina', price: '315', image: 'https://images.unsplash.com/photo-1743187571446-ab16931a5608?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxtb3VudGFpbiUyMGNhYmluJTIwZGF3bnxlbnwwfHx8fDE3NTI1OTIyMzR8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'mountain cabin dawn', rating: 5, reviews: 982 },
  { id: 'HB002', name: 'City Hotel', city: 'Bogotá, Colombia', price: '149', image: 'https://images.unsplash.com/photo-1621891334762-e186f94d3a1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtb2Rlcm4lMjBob3RlbCUyMHJvb20lMjBjaXR5fGVufDB8fHx8MTc1MjU5MjIzNHww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'modern hotel room city', rating: 4, reviews: 3481 },
  { id: 'HB004', name: 'Boutique Hotel', city: 'Cuzco, Perú', price: '180', image: 'https://images.unsplash.com/photo-1617062225480-ee3a56c2c0fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBzYWdyYWRhJTIwZmFtaWxpYXxlbnwwfHx8fDE3NTI1MTk1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'charming boutique hotel', rating: 5, reviews: 754 },
];

const HotelCard = ({ hotel }: { hotel: typeof recommendedHotels[0] }) => (
    <Card className="rounded-2xl p-0 flex flex-col group transition-all duration-300 shadow-2xl bg-white/40 backdrop-blur-xl border-none hover:scale-105">
        <div className="relative w-full h-48 flex-shrink-0">
            <Image 
                src={hotel.image} 
                data-ai-hint={hotel.hint} 
                alt={hotel.name} 
                fill 
                className="object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
            />
            <Button variant="ghost" size="icon" className="absolute top-3 right-3 w-8 h-8 flex-shrink-0 text-white bg-black/30 hover:bg-black/50 hover:text-white rounded-full">
                <Heart className="h-5 w-5" />
            </Button>
        </div>
        <CardContent className="p-4 flex flex-col flex-grow text-gray-800">
            <h3 className="font-bold text-lg">{hotel.name}</h3>
            <p className="text-sm text-gray-600">{hotel.city}</p>
            
            <div className="flex items-center gap-2 mt-2 text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(hotel.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-500">({hotel.reviews} reviews)</p>
            </div>
            
            <div className="flex-grow"></div>
            
            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-xs text-gray-600">desde</p>
                    <p className="font-semibold text-2xl text-white">${hotel.price}<span className="text-sm font-normal text-gray-700">/noche</span></p>
                </div>
                <Button asChild className="font-semibold">
                    <Link href={`/hotels/${hotel.id}`}>Ver Hotel</Link>
                </Button>
            </div>
        </CardContent>
    </Card>
);

export function RecommendedHotels() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold font-headline text-white drop-shadow-lg">Hoteles Recomendados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedHotels.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
