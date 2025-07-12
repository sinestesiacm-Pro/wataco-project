'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Ship, Star } from 'lucide-react';
import Link from 'next/link';
import { Card } from './ui/card';

const recommendedCruises = [
  { id: 'caribbean-1', name: 'Caribe Occidental', ship: 'Symphony of the Seas', duration: '7 Noches', image: 'https://images.unsplash.com/photo-1678377402066-f09f89c267d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjcnVpc2UlMjBzaGlwJTIwY2FyaWJiZWFufGVufDB8fHx8MTc1MjA4NDA0OHww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'cruise ship caribbean', rating: 5, reviews: 1150, price: '980' },
  { id: 'norway-1', name: 'Fiordos Noruegos', ship: 'MSC Euribia', duration: '8 Noches', image: 'https://images.unsplash.com/photo-1631892504412-609c3b7ab0e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxub3J3YXklMjBmam9yZHN8ZW58MHx8fHwxNzUyMDg0MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'norway fjords', rating: 5, reviews: 876, price: '1450' },
  { id: 'greece-1', name: 'Islas Griegas', ship: 'Celebrity Ascent', duration: '10 Noches', image: 'https://images.unsplash.com/photo-1701503873239-d94b133c5a39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxncmVlY2UlMjBzYW50b3Jpbml8ZW58MHx8fHwxNzUyMDg0MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'greece santorini', rating: 4, reviews: 921, price: '1990' },
  { id: 'alaska-1', name: 'Expedición a Alaska', ship: 'Norwegian Bliss', duration: '7 Noches', image: 'https://images.unsplash.com/photo-1559801849-fa456b5d9553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxhbGFza2ElMjBnbGFjaWVyfGVufDB8fHx8MTc1MjA4NDA0OHww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'alaska glacier', rating: 5, reviews: 1043, price: '1250' },
];

const CruiseCard = ({ cruise }: { cruise: typeof recommendedCruises[0] }) => (
    <Card className="bg-card rounded-2xl p-3 flex gap-4 transition-all duration-300 hover:bg-secondary/50">
        <div className="relative w-28 h-28 flex-shrink-0">
            <Image 
                src={cruise.image} 
                data-ai-hint={cruise.hint} 
                alt={cruise.name} 
                fill 
                className="object-cover rounded-xl"
            />
        </div>
        <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{cruise.name}</h3>
              <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0">
                  <Heart className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{cruise.ship} - {cruise.duration}</p>
            <p className="font-semibold text-primary text-xl mt-1">${cruise.price}/persona</p>
            <div className="flex items-center gap-2 mt-auto text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(cruise.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    {[...Array(5 - cruise.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-muted-foreground/30" />)}
                </div>
                <p className="text-muted-foreground">({cruise.reviews} reviews)</p>
            </div>
        </div>
    </Card>
);


export function RecommendedCruises() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-headline">Cruceros Populares</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendedCruises.map((cruise, index) => (
          <CruiseCard key={index} cruise={cruise} />
        ))}
      </div>
    </div>
  );
}
