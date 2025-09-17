
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';
import { addMonths, addDays, format } from 'date-fns';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const flightRoutes = [
  { origin: 'JFK', originCity: 'New York', destination: 'CDG', destinationCity: 'Paris', hint: 'eiffel tower night', image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=500', simulatedPrice: '750' },
  { origin: 'LHR', originCity: 'London', destination: 'NRT', destinationCity: 'Tokyo', hint: 'shibuya crossing tokyo', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=500', simulatedPrice: '1100' },
  { origin: 'LAX', originCity: 'Los Angeles', destination: 'BKK', destinationCity: 'Bangkok', hint: 'bangkok temple night', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=500', simulatedPrice: '980' },
  { origin: 'BOG', originCity: 'Bogotá', destination: 'MIA', destinationCity: 'Miami', hint: 'miami beach aerial', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500', simulatedPrice: '350' },
  { origin: 'SYD', originCity: 'Sydney', destination: 'LAX', destinationCity: 'Los Angeles', hint: 'los angeles downtown', image: 'https://images.unsplash.com/photo-1549834125-72d362a3c0c3?w=500', simulatedPrice: '1300' },
];

const DestinationCard = ({ route }: { route: typeof flightRoutes[0] }) => {
    const router = useRouter();
    
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const departureDate = format(addMonths(new Date(), 2), 'yyyy-MM-dd');
        const returnDate = format(addDays(new Date(departureDate), 7), 'yyyy-MM-dd');

        const params = new URLSearchParams({
            origin: route.origin,
            destination: route.destination,
            departureDate: departureDate,
            returnDate: returnDate,
            adults: '1',
            originQuery: route.originCity,
            destinationQuery: route.destinationCity,
        });
        
        router.push(`/flights/select?${params.toString()}`);
    }
    
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
                <Button onClick={handleClick} size="default" className="central-flight-button rounded-full font-semibold text-sm py-5 px-6 bg-accent/40 backdrop-blur-md text-white hover:bg-accent/80 shadow-2xl border border-white/20">
                    <Plane className="mr-2 h-4 w-4" />
                    Find Flight
                </Button>
            </div>
        </div>
    )
}

export function RecommendedDestinations() {
  return (
    <div className="space-y-4 pt-16 pb-8">
      <div className="text-center">
        <h2 className="text-4xl font-headline font-bold text-white drop-shadow-lg">Explora Nuestros Destinos Más Populares</h2>
        <p className="text-lg text-white/80 mt-2 drop-shadow-lg">Descubre a dónde viajan nuestros exploradores.</p>
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
