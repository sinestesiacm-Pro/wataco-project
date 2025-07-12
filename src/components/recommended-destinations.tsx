
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane } from 'lucide-react';
import { addMonths, addDays, format } from 'date-fns';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Estas rutas se pueden obtener desde Firestore o un CMS en el futuro.
const flightRoutes = [
  { origin: 'MAD', originCity: 'Madrid', destination: 'EZE', destinationCity: 'Buenos Aires', hint: 'buenos aires obelisco', image: 'https://images.unsplash.com/photo-1672588371953-2accc9eb0d01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxidWVub3MlMjBhaXJlcyUyMG9iZWxpc2NvfGVufDB8fHx8MTc1MjA2NzgwMHww&ixlib=rb-4.1.0&q=80&w=1080', simulatedPrice: '950' },
  { origin: 'BOG', originCity: 'Bogotá', destination: 'GIG', destinationCity: 'Río de Janeiro', hint: 'rio de janeiro', image: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxyaW8lMjBkZSUyMGphbmVpcm98ZW58MHx8fHwxNzUyMDY3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080', simulatedPrice: '480' },
  { origin: 'PAR', originCity: 'París', destination: 'CTG', destinationCity: 'Cartagena', hint: 'cartagena colombia', image: 'https://images.unsplash.com/photo-1680579178966-8019436998e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjYXJ0YWdlbmElMjBjb2xvbWJpYXxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080', simulatedPrice: '820' },
];

const DestinationCard = ({ route, isHovered }: { route: typeof flightRoutes[0], isHovered: boolean }) => {
    const departureDateObj = addMonths(new Date(), 2);
    const returnDateObj = addDays(departureDateObj, 7);
    
    const departureDate = format(departureDateObj, 'yyyy-MM-dd');
    const returnDate = format(returnDateObj, 'yyyy-MM-dd');

    const buttonHref = `/?origin=${route.origin}&destination=${route.destination}&origin_query=${encodeURIComponent(route.originCity)}&destination_query=${encodeURIComponent(route.destinationCity)}&from_date=${departureDate}&to_date=${returnDate}&adults=1&autosearch=true`;

    return (
        <div className={cn("flex-shrink-0 w-[280px] group", { 'is-hovered': isHovered })}>
            <div className="airplane-window">
                <div className="airplane-window-inner-bevel">
                    <div className="airplane-window-view">
                        <Image 
                            src={route.image} 
                            data-ai-hint={route.hint} 
                            alt={`${route.originCity} a ${route.destinationCity}`}
                            fill 
                            className="object-cover"
                        />
                         <div className="airplane-window-shade"></div>
                        <div className="airplane-window-content">
                            <div>
                                <h3 className="text-xl font-bold font-headline text-white">{route.originCity} <ArrowRight className="inline-block h-5 w-5 mx-1" /> {route.destinationCity}</h3>
                            </div>
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <p className="text-sm text-white/90 font-body">
                                    Desde <span className="font-bold text-lg text-accent">${route.simulatedPrice}</span>
                                </p>
                                <Button asChild size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                                   <Link href={buttonHref}>
                                     <Plane className="mr-2 h-4 w-4" />
                                     Ver Vuelos
                                   </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function RecommendedDestinations() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="space-y-8 mt-16">
      <div className="text-center">
        <h2 className="text-4xl font-headline font-bold">Ofertas que no Puedes Dejar Pasar</h2>
        <p className="text-lg text-muted-foreground mt-2">Hemos buscado los mejores precios en rutas populares para ti.</p>
      </div>
      
      <div 
        className="flex justify-center space-x-8 pb-12 mt-8 overflow-x-auto scrollbar-hide -mx-4 px-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {flightRoutes.map((route) => (
            <DestinationCard key={`${route.origin}-${route.destination}`} route={route} isHovered={isHovered} />
        ))}
      </div>
    </div>
  );
}
