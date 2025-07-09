'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BedDouble, Star } from 'lucide-react';

const hotels = [
  { name: 'Luxury Beachfront Resort', location: 'Cancun, Mexico', rating: 4.8, price: '350', image: 'https://images.unsplash.com/photo-1614505241498-80a3ec936595?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMGJlYWNofGVufDB8fHx8MTc1MjA2Nzg2MHww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'luxury hotel beach' },
  { name: 'Cozy Mountain Lodge', location: 'Aspen, Colorado', rating: 4.9, price: '450', image: 'https://images.unsplash.com/photo-1641480224327-e0a577b72735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtb3VudGFpbiUyMGxvZGdlJTIwd2ludGVyfGVufDB8fHx8MTc1MjA2Nzg2MHww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'mountain lodge winter' },
  { name: 'Urban Chic Boutique Hotel', location: 'Tokyo, Japan', rating: 4.7, price: '280', image: 'https://images.unsplash.com/photo-1621891337421-af0e6b355e2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MHx8fHwxNzUyMDY3ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'modern hotel room' },
  { name: 'Historic City Center Hotel', location: 'Rome, Italy', rating: 4.6, price: '220', image: 'https://images.unsplash.com/photo-1656593447226-6e2abf722d2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxjbGFzc2ljJTIwaG90ZWwlMjBpdGFseXxlbnwwfHx8fDE3NTIwNjc4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'classic hotel italy' },
];

export function HotelsSection() {
  return (
    <div className="space-y-8 mt-16">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Find Your Perfect Stay</h2>
        <p className="text-muted-foreground mt-2">From luxury resorts to cozy boutique hotels, book your accommodation with us.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.map((hotel, index) => (
          <Card key={index} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border">
            <div className="overflow-hidden relative">
              <Image src={hotel.image} data-ai-hint={hotel.hint} alt={hotel.name} width={400} height={300} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400" />
                {hotel.rating}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold font-headline text-lg">{hotel.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{hotel.location}</p>
              <div className="flex justify-between items-center mt-4">
                 <p className="text-sm font-body">From <span className="font-bold text-xl text-accent">{hotel.price}€</span>/night</p>
                <Button>
                  <BedDouble className="mr-2 h-4 w-4" />
                  View Hotel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
