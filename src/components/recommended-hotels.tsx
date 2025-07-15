'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { Separator } from './ui/separator';

const recommendedHotels = [
  { id: 'HB001', name: 'Oceanview Resort', city: 'Cancún, México', price: '279', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=800&q=80', hint: 'luxury resort sunset', rating: 5, reviews: 1327 },
  { id: 'HB003', name: 'Mountain Escape', city: 'Bariloche, Argentina', price: '315', image: 'https://images.unsplash.com/photo-1575586232388-26154f2c8f8a?fit=crop&w=800&q=80', hint: 'mountain cabin dawn', rating: 5, reviews: 982 },
  { id: 'HB002', name: 'City Hotel', city: 'Bogotá, Colombia', price: '149', image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?fit=crop&w=800&q=80', hint: 'modern hotel room city', rating: 4, reviews: 3481 },
  { id: 'HB004', name: 'Boutique Hotel', city: 'Cuzco, Perú', price: '180', image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?fit=crop&w=800&q=80', hint: 'charming boutique hotel', rating: 5, reviews: 754 },
];

const HotelCard = ({ hotel }: { hotel: typeof recommendedHotels[0] }) => (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-0 flex flex-col group transition-all duration-300 hover:bg-white/20 hover:shadow-2xl">
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
        <CardContent className="p-4 flex flex-col flex-grow text-white">
            <h3 className="font-bold text-lg">{hotel.name}</h3>
            <p className="text-sm text-white/70">{hotel.city}</p>
            
            <div className="flex items-center gap-2 mt-2 text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(hotel.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-white/70">({hotel.reviews} reviews)</p>
            </div>
            
            <div className="flex-grow"></div>
            
            <Separator className="my-4 bg-white/20" />

            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs text-white/80">desde</p>
                    <p className="font-semibold text-2xl text-accent">${hotel.price}<span className="text-sm font-normal text-white/80">/noche</span></p>
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
      <h2 className="text-3xl font-bold font-headline text-white">Hoteles Recomendados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedHotels.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
