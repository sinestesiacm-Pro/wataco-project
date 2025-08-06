
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { Card } from './ui/card';
import { recommendedCruises } from '@/lib/mock-cruises';
import type { CruisePackage } from '@/lib/types';
import Link from 'next/link';

const CruiseCard = ({ cruise }: { cruise: CruisePackage }) => (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex flex-col sm:flex-row gap-4 transition-all duration-300 hover:bg-white/20 text-white">
        <div className="relative w-full sm:w-28 h-28 flex-shrink-0">
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
              <h3 className="font-bold text-lg text-white">{cruise.name}</h3>
              <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-white hover:text-white">
                  <Heart className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-white/70">{cruise.ship} - {cruise.duration}</p>
            <p className="font-semibold text-primary text-xl mt-1">${cruise.price}/person</p>
            <div className="flex items-center gap-2 mt-auto text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(cruise.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    {[...Array(5 - cruise.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-white/30" />)}
                </div>
                <p className="text-white/70">({cruise.reviews} reviews)</p>
            </div>
             <Button asChild size="sm" className="mt-2 w-full sm:w-auto sm:ml-auto font-semibold">
                <Link href={`/cruises/${cruise.id}`}>View Cruise</Link>
             </Button>
        </div>
    </Card>
);


export function RecommendedCruises() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold font-headline text-white">Recommended Cruises</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendedCruises.map((cruise, index) => (
          <CruiseCard key={index} cruise={cruise} />
        ))}
      </div>
    </div>
  );
}

    