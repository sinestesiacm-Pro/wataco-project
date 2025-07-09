'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RecommendedDestinationsProps {
  setDestination: (iata: string) => void;
}

const destinations = [
  { city: "Rome", country: "Italy", priceFrom: "89", iata: "FCO", hint: "rome italy" },
  { city: "Lisbon", country: "Portugal", priceFrom: "75", iata: "LIS", hint: "lisbon portugal" },
  { city: "Paris", country: "France", priceFrom: "99", iata: "CDG", hint: "paris france" },
  { city: "Amsterdam", country: "Netherlands", priceFrom: "105", iata: "AMS", hint: "amsterdam canals" },
];

export function RecommendedDestinations({ setDestination }: RecommendedDestinationsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {destinations.map((dest) => (
        <Card
          key={dest.iata}
          className="rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-card group cursor-pointer"
          onClick={() => setDestination(dest.iata)}
        >
          <div className="overflow-hidden">
            <Image
              src={`https://placehold.co/400x300.png`}
              data-ai-hint={dest.hint}
              alt={dest.city}
              width={400}
              height={300}
              className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold font-headline text-primary">{dest.city}, {dest.country}</h3>
            <p className="text-sm text-muted-foreground mt-1 font-body">
              Flights from <span className="font-bold text-accent">{dest.priceFrom}€</span>
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
             <Button className="w-full bg-primary/90 hover:bg-primary text-sm font-semibold transition-colors">
               View Flights
             </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
