'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';
import { addMonths, addDays, format } from 'date-fns';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const flightRoutes = [
  { origin: 'JFK', originCity: 'New York', destination: 'CDG', destinationCity: 'Paris', hint: 'paris eiffel tower', image: 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=500', simulatedPrice: '750' },
  { origin: 'LHR', originCity: 'London', destination: 'NRT', destinationCity: 'Tokyo', hint: 'tokyo japan temple', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=500', simulatedPrice: '1100' },
  { origin: 'LAX', originCity: 'Los Angeles', destination: 'BKK', destinationCity: 'Bangkok', hint: 'bangkok thailand temple', image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=500', simulatedPrice: '980' },
  { origin: 'BOG', originCity: 'Bogotá', destination: 'MIA', destinationCity: 'Miami', hint: 'miami beach', image: 'https://images.unsplash.com/photo-1597535973747-951442d5dbc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtaWFtaXxlbnwwfHx8fDE3NTQ4NjMwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080', simulatedPrice: '350' },
  { origin: 'SYD', originCity: 'Sydney', destination: 'LAX', destinationCity: 'Los Angeles', hint: 'los angeles california', image: 'https://images.unsplash.com/photo-1503891450247-ee5f8ec46dc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bG9zJTIwYW5nZWxlc3xlbnwwfHx8fDE3NTQ5Mjk3MjF8MA&ixlib=rb-4.1.0&q=80&w=1080', simulatedPrice: '1300' },
];

const DestinationCard = ({ route }: { route: typeof flightRoutes[0] }) => {
    
    const buttonHref = `/?origin=${route.origin}&destination=${route.destination}&origin_query=${encodeURIComponent(route.originCity)}&destination_query=${encodeURIComponent(route.destinationCity)}&from_date=${format(addMonths(new Date(), 2), 'yyyy-MM-dd')}&to_date=${format(addDays(addMonths(new Date(), 2), 7), 'yyyy-MM-dd')}&adults=1&autosearch=true`;
    
    return (
        <div className="destination-card-oval flex-shrink-0 group">
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
                <h3 className="font-bold font-headline text-lg text-gray-900">{route.destinationCity}</h3>
                <p className="text-xs text-gray-700">From {route.originCity}</p>
                <p className="font-bold text-2xl text-white my-1 drop-shadow-lg">${route.simulatedPrice}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button asChild size="default" className="central-flight-button rounded-full font-semibold text-sm py-5 px-6 bg-accent/40 backdrop-blur-md text-white hover:bg-accent/80 shadow-2xl border border-white/20">
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
    <div className="space-y-4 mt-16">
      <div className="text-center">
        <h2 className="text-4xl font-headline font-bold text-white drop-shadow-lg">The World is Waiting for You</h2>
        <p className="text-lg text-white mt-2 drop-shadow-lg">Discover the best routes to start your next adventure.</p>
      </div>
      
      <div className="relative flex justify-center items-center h-[400px]">
        <div className="flex overflow-x-auto space-x-8 py-4 px-4 -mx-4 scrollbar-hide absolute inset-0 items-center justify-start md:justify-center">
            {flightRoutes.map((route, index) => (
                <DestinationCard key={index} route={route} />
            ))}
        </div>
      </div>
    </div>
  );
}
