'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { Card } from './ui/card';
import Link from 'next/link';

const recommendedHotels = [
  { id: 'HB001', name: 'Oceanview Resort', city: 'Cancún, México', price: '279', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=800&q=80', hint: 'luxury resort sunset', rating: 5, reviews: 1327 },
  { id: 'HB003', name: 'Mountain Escape', city: 'Bariloche, Argentina', price: '315', image: 'https://images.unsplash.com/photo-1575586232388-26154f2c8f8a?fit=crop&w=800&q=80', hint: 'mountain cabin dawn', rating: 5, reviews: 982 },
  { id: 'HB002', name: 'City Hotel', city: 'Bogotá, Colombia', price: '149', image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?fit=crop&w=800&q=80', hint: 'modern hotel room city', rating: 4, reviews: 3481 },
  { id: 'HB004', name: 'Boutique Hotel', city: 'Cuzco, Perú', price: '180', image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?fit=crop&w=800&q=80', hint: 'charming boutique hotel', rating: 5, reviews: 754 },
];

const HotelCard = ({ hotel }: { hotel: typeof recommendedHotels[0] }) => (
    <Link href={`/hotels/${hotel.id}`} className="group">
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex gap-4 transition-all duration-300 hover:bg-white/20 h-full">
            <div className="relative w-28 h-28 flex-shrink-0">
                <Image 
                    src={hotel.image} 
                    data-ai-hint={hotel.hint} 
                    alt={hotel.name} 
                    fill 
                    className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-col flex-grow text-white">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{hotel.name}</h3>
                  <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-white hover:text-white hover:bg-white/10">
                      <Heart className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-white/70">{hotel.city}</p>
                <p className="font-semibold text-primary text-xl mt-1">${hotel.price}/noche</p>
                <div className="flex items-center gap-2 mt-auto text-sm">
                    <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(hotel.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        {[...Array(5 - hotel.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-white/30" />)}
                    </div>
                    <p className="text-white/70">({hotel.reviews} reviews)</p>
                </div>
            </div>
        </Card>
    </Link>
);

export function RecommendedHotels() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold font-headline text-white">Hoteles Recomendados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendedHotels.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
