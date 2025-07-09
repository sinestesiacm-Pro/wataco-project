'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface RecommendedDestinationsProps {
  setDestination: (iata: string) => void;
}

const destinations = [
  { city: "Rome", country: "Italy", priceFrom: "89", iata: "FCO", hint: "rome colosseum" },
  { city: "Lisbon", country: "Portugal", priceFrom: "75", iata: "LIS", hint: "lisbon tram" },
  { city: "Paris", country: "France", priceFrom: "99", iata: "CDG", hint: "paris eiffel tower" },
  { city: "Amsterdam", country: "Netherlands", priceFrom: "105", iata: "AMS", hint: "amsterdam canals" },
];

export function RecommendedDestinations({ setDestination }: RecommendedDestinationsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Inspire Your Next Trip</h2>
        <p className="text-muted-foreground mt-2">Discover popular destinations to spark your travel ideas.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest) => (
          <Card
            key={dest.iata}
            className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer border"
            onClick={() => setDestination(dest.iata)}
          >
            <div className="overflow-hidden relative">
              <Image
                src={`https://placehold.co/400x300.png`}
                data-ai-hint={dest.hint}
                alt={dest.city}
                width={400}
                height={300}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                 <h3 className="text-2xl font-bold font-headline text-white">{dest.city}</h3>
                 <p className="text-sm text-white/90">{dest.country}</p>
              </div>
            </div>
            <CardContent className="p-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground font-body">
                Flights from <span className="font-bold text-lg text-accent">{dest.priceFrom}€</span>
              </p>
              <Button size="sm" variant="outline" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                 View Flights
                 <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
