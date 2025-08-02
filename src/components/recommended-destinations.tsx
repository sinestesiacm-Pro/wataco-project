
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';
import { addMonths, addDays, format } from 'date-fns';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

// Estas rutas se pueden obtener desde Firestore o un CMS en el futuro.
const flightRoutes = [
  { origin: 'MAD', originCity: 'Madrid', destination: 'BOG', destinationCity: 'Bogotá', hint: 'bogota monserrate', image: 'https://images.unsplash.com/photo-1568632234167-789922ea3cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxib2dvdGF8ZW58MHx8fHwxNzU0MTM3MzcxfDA&ixlib=rb-4.1.0&q=80&w=1080', simulatedPrice: '950' },
  { origin: 'MIA', originCity: 'Miami', destination: 'MDE', destinationCity: 'Medellín', hint: 'medellin comuna 13', image: 'https://images.unsplash.com/photo-1598227891897-23cc8627dd44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtZWRlbGxpbnxlbnwwfHx8fDE3NTQxMzcyODh8MA&ixlib=rb-4.1.0&q=80&w=1080', simulatedPrice: '480' },
  { origin: 'JFK', originCity: 'Nueva York', destination: 'CTG', destinationCity: 'Cartagena', hint: 'cartagena colombia old town', image: 'https://images.unsplash.com/photo-1534943441045-1009d7cb0bb9?w=500', simulatedPrice: '820' },
  { origin: 'MEX', originCity: 'Ciudad de México', destination: 'CLO', destinationCity: 'Cali', hint: 'cali colombia church', image: 'https://images.unsplash.com/flagged/photo-1576364255488-17bdd8cba58c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8Y2FsaXxlbnwwfHx8fDE3NTQxMzY2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080', simulatedPrice: '620' },
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
                    alt={`${route.originCity} a ${route.destinationCity}`}
                    fill 
                    className="object-cover"
                />
            </div>
            <div className="content-container">
                <h3 className="font-bold font-headline text-xl text-gray-900">{route.destinationCity}</h3>
                <p className="text-sm text-gray-700">Desde {route.originCity}</p>
                <p className="font-bold text-3xl text-white my-2 drop-shadow-lg">${route.simulatedPrice}</p>
                <Button asChild size="sm" className="font-semibold rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                   <Link href={buttonHref}>
                     <Plane className="mr-2 h-4 w-4" />
                     Buscar Vuelo
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
        <h2 className="text-4xl font-headline font-bold text-white drop-shadow-lg">El Riesgo es que te Quieras Quedar</h2>
        <p className="text-lg text-white mt-2 drop-shadow-lg">Descubre las mejores rutas para empezar tu aventura en Colombia.</p>
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
