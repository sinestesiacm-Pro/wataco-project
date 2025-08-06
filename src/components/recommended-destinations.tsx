
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';
import { addMonths, addDays, format } from 'date-fns';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const flightRoutes = [
  { origin: 'JFK', originCity: 'New York', destination: 'CDG', destinationCity: 'Paris', hint: 'paris eiffel tower', image: 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=500', simulatedPrice: '750' },
  { origin: 'LHR', originCity: 'London', destination: 'NRT', destinationCity: 'Tokyo', hint: 'tokyo japan temple', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=500', simulatedPrice: '1100' },
  { origin: 'LAX', originCity: 'Los Angeles', destination: 'BKK', destinationCity: 'Bangkok', hint: 'bangkok thailand temple', image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=500', simulatedPrice: '980' },
  { origin: 'SYD', originCity: 'Sydney', destination: 'FCO', destinationCity: 'Rome', hint: 'rome colosseum', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500', simulatedPrice: '1350' },
];

const DestinationCard = ({ route }: { route: typeof flightRoutes[0] }) => {
    const departureDateObj = addMonths(new Date(), 2);
    const returnDateObj = addDays(departureDateObj, 7);
    
    const departureDate = format(departureDateObj, 'yyyy-MM-dd');
    const returnDate = format(returnDateObj, 'yyyy-MM-dd');

    const buttonHref = `/?origin=${route.origin}&destination=${route.destination}&origin_query=${encodeURIComponent(route.originCity)}&destination_query=${encodeURIComponent(route.destinationCity)}&from_date=${departureDate}&to_date=${returnDate}&adults=1&autosearch=true`;

    return (
        <div className="destination-card-oval">
            <div className="image-container">
                <Image 
                    src={route.image} 
                    data-ai-hint={route.hint} 
                    alt={`${route.originCity} to ${route.destinationCity}`}
                    fill 
                    className="object-cover"
                />
            </div>
            <div className="content-container">
                <h3 className="font-bold font-headline text-xl text-gray-900">{route.destinationCity}</h3>
                <p className="text-sm text-gray-700">From {route.originCity}</p>
                <p className="font-bold text-3xl text-white my-2 drop-shadow-lg">${route.simulatedPrice}</p>
                <Button asChild size="sm" className="font-semibold rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                   <Link href={buttonHref}>
                     <Plane className="mr-2 h-4 w-4" />
                     Find Flight
                   </Link>
                </Button>
            </div>
        </div>
    )
}

export function RecommendedDestinations() {
  return (
    <div className="space-y-8 mt-16">
      <div className="text-center">
        <h2 className="text-4xl font-headline font-bold text-white drop-shadow-lg">The World is Waiting for You</h2>
        <p className="text-lg text-white mt-2 drop-shadow-lg">Discover the best routes to start your next adventure.</p>
      </div>
      
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8"
      >
        {flightRoutes.map((route) => (
            <DestinationCard key={`${route.origin}-${route.destination}`} route={route} />
        ))}
      </div>
    </div>
  );
}

    