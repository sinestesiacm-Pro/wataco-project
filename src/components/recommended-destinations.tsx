
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
  { origin: 'MAD', originCity: 'Madrid', destination: 'EZE', destinationCity: 'Buenos Aires', hint: 'buenos aires obelisco', image: 'https://images.unsplash.com/photo-1579296885368-2c23c0f4f7b2?fit=crop&w=1080&q=80', simulatedPrice: '950' },
  { origin: 'BOG', originCity: 'Bogotá', destination: 'GIG', destinationCity: 'Río de Janeiro', hint: 'rio de janeiro cristo redentor', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?fit=crop&w=1080&q=80', simulatedPrice: '480' },
  { origin: 'PAR', originCity: 'París', destination: 'CTG', destinationCity: 'Cartagena', hint: 'cartagena colombia old town', image: 'https://images.unsplash.com/photo-1569947113257-03b4183d735d?fit=crop&w=1080&q=80', simulatedPrice: '820' },
  { origin: 'MIA', originCity: 'Miami', destination: 'SCL', destinationCity: 'Santiago', hint: 'santiago chile andes', image: 'https://images.unsplash.com/photo-1528217504386-b48c41865c37?fit=crop&w=1080&q=80', simulatedPrice: '620' },
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
        <h2 className="text-4xl font-headline font-bold text-white drop-shadow-lg">Ofertas que no Puedes Dejar Pasar</h2>
        <p className="text-lg text-white mt-2 drop-shadow-lg">Hemos buscado los mejores precios en rutas populares para ti.</p>
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
