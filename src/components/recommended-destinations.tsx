
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane } from 'lucide-react';
import { addMonths, addDays, format } from 'date-fns';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';

// Estas rutas se pueden obtener desde Firestore o un CMS en el futuro.
const flightRoutes = [
  { origin: 'MAD', originCity: 'Madrid', destination: 'EZE', destinationCity: 'Buenos Aires', hint: 'buenos aires obelisco', image: 'https://images.unsplash.com/photo-1672588371953-2accc9eb0d01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxidWVub3MlMjBhaXJlcyUyMG9iZWxpc2NvfGVufDB8fHx8MTc1MjA2NzgwMHww&ixlib=rb-4.1.0&q=80&w=1080', simulatedPrice: '950' },
  { origin: 'BOG', originCity: 'Bogotá', destination: 'GIG', destinationCity: 'Río de Janeiro', hint: 'rio de janeiro', image: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxyaW8lMjBkZSUyMGphbmVpcm98ZW58MHx8fHwxNzUyMDY3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080', simulatedPrice: '480' },
  { origin: 'PAR', originCity: 'París', destination: 'CTG', destinationCity: 'Cartagena', hint: 'cartagena colombia', image: 'https://images.unsplash.com/photo-1680579178966-8019436998e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjYXJ0YWdlbmElMjBjb2xvbWJpYXxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080', simulatedPrice: '820' },
  { origin: 'MIA', originCity: 'Miami', destination: 'SCL', destinationCity: 'Santiago', hint: 'santiago chile', image: 'https://images.unsplash.com/photo-1587527901949-ab0341793a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzYW50aWFnb3xlbnwwfHx8fDE3NTMwNDY4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080', simulatedPrice: '620' },
];

const DestinationCard = ({ route }: { route: typeof flightRoutes[0] }) => {
    const departureDateObj = addMonths(new Date(), 2);
    const returnDateObj = addDays(departureDateObj, 7);
    
    const departureDate = format(departureDateObj, 'yyyy-MM-dd');
    const returnDate = format(returnDateObj, 'yyyy-MM-dd');

    const buttonHref = `/?origin=${route.origin}&destination=${route.destination}&origin_query=${encodeURIComponent(route.originCity)}&destination_query=${encodeURIComponent(route.destinationCity)}&from_date=${departureDate}&to_date=${returnDate}&adults=1&autosearch=true`;

    return (
        <Card className="group rounded-3xl overflow-hidden bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-0">
                <div className="relative h-40">
                    <Image 
                        src={route.image} 
                        data-ai-hint={route.hint} 
                        alt={`${route.originCity} a ${route.destinationCity}`}
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="p-4 text-center">
                    <h3 className="font-bold font-headline text-xl text-secondary">{route.destinationCity}</h3>
                    <p className="text-sm text-muted-foreground">Desde {route.originCity}</p>
                    <p className="font-bold text-3xl text-primary my-2">${route.simulatedPrice}</p>
                    <Button asChild size="sm" className="font-semibold w-full">
                       <Link href={buttonHref}>
                         <Plane className="mr-2 h-4 w-4" />
                         Buscar Vuelo
                       </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export function RecommendedDestinations() {
  return (
    <div className="space-y-8 mt-16">
      <div className="text-center">
        <h2 className="text-4xl font-headline font-bold text-secondary">Ofertas que no Puedes Dejar Pasar</h2>
        <p className="text-lg text-muted-foreground mt-2">Hemos buscado los mejores precios en rutas populares para ti.</p>
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
