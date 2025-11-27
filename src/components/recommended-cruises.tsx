
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { recommendedCruises } from '@/lib/mock-cruises';
import type { CruisePackage } from '@/lib/types';
import Link from 'next/link';

const CruiseCard = ({ cruise }: { cruise: CruisePackage }) => (
    <Card className="bg-card/80 backdrop-blur-xl border rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 shadow-inner hover:shadow-card-3d">
        <div className="relative w-full h-56 overflow-hidden">
            <Image 
                src={cruise.image} 
                data-ai-hint={cruise.hint} 
                alt={cruise.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-2 right-2 z-20">
                <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-white bg-black/30 hover:bg-black/50 hover:text-white rounded-full">
                    <Heart className="h-4 w-4" />
                </Button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-2/3 soft-shadow-gradient pointer-events-none" />

            <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-bold text-xl font-headline text-white drop-shadow-md">{cruise.name}</h3>
                <p className="text-sm text-white/80 drop-shadow-md">{cruise.ship} - {cruise.duration}</p>
            </div>
        </div>
        <div className="p-4 flex flex-col flex-grow text-card-foreground">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs text-muted-foreground">Desde</p>
                    <p className="font-semibold text-2xl">${cruise.price}/persona</p>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-400 justify-end">
                        {[...Array(cruise.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-xs text-muted-foreground">({cruise.reviews} reviews)</p>
                </div>
            </div>
            <Button asChild size="sm" className="mt-4 w-full font-semibold">
                <Link href={`/cruises/${cruise.id}`}>Ver Crucero</Link>
            </Button>
        </div>
    </Card>
);


export function RecommendedCruises({ cruises = recommendedCruises }: { cruises?: CruisePackage[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold font-headline text-foreground">Cruceros Recomendados</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cruises.map((cruise, index) => (
          <CruiseCard key={index} cruise={cruise} />
        ))}
      </div>
    </div>
  );
}
