'use client';

import Image from 'next/image';
import type { PackageData, PackageOffer } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, BedDouble, Star, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from './ui/separator';

interface PackagesResultsProps {
  packagesData: PackageData;
}

const renderStars = (rating: string | undefined) => {
    const starCount = parseInt(rating || '0', 10);
    if (starCount === 0) return null;
    
    return (
        <div className="flex items-center">
            {[...Array(starCount)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
        </div>
    );
};

export function PackagesResults({ packagesData }: PackagesResultsProps) {
  const { data: packages, dictionaries } = packagesData;

  return (
    <div className="space-y-8">
       <h2 className="text-3xl font-headline font-bold text-gray-800">
          Se encontraron {packages.length} Oferta{packages.length > 1 ? 's' : ''} de Paquete
        </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {packages.map((pkg) => {
          const flight = pkg.flightOffer;
          const hotel = pkg.hotelOffer;
          const airlineCode = flight.itineraries[0].segments[0].carrierCode;
          const airlineName = dictionaries.carriers[airlineCode];

          return (
            <Card key={pkg.id} className="overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl border bg-card/95 backdrop-blur-sm flex flex-col">
                {/* Hotel Image and Info */}
                <div className="overflow-hidden relative">
                    <Image
                        src={hotel.hotel.media?.[0]?.uri || 'https://placehold.co/800x600.png'}
                        data-ai-hint="hotel exterior"
                        alt={hotel.hotel.name || 'Hotel image'}
                        width={800}
                        height={600}
                        className="h-56 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-2xl font-bold font-headline">{hotel.hotel.name}</h3>
                        <div className="flex items-center gap-2">
                         {renderStars(hotel.hotel.rating)}
                         <Badge variant="secondary">{hotel.hotel.address.cityName}</Badge>
                        </div>
                    </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Flight Info */}
                    <div className="flex items-center gap-4 mb-4">
                        <Image
                            src={`https://images.kiwi.com/airlines/64/${airlineCode}.png`}
                            alt={airlineName || airlineCode}
                            width={40}
                            height={40}
                            className="rounded-full bg-white p-1 shadow-md"
                        />
                        <div className="flex-grow">
                            <p className="font-semibold text-sm">{airlineName}</p>
                            <p className="text-xs text-muted-foreground">
                                {flight.itineraries[0].segments[0].departure.iataCode}
                                <ArrowRight className="inline mx-1 h-3 w-3" />
                                {flight.itineraries[0].segments.slice(-1)[0].arrival.iataCode}
                            </p>
                        </div>
                         <Badge variant="outline">Ida y Vuelta</Badge>
                    </div>

                    <Separator className="my-4"/>

                    <div className="flex-grow"/>

                    {/* Price and Booking */}
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <p className="text-xs text-muted-foreground">Precio del paquete por persona</p>
                            <p className="text-3xl font-bold font-headline text-tertiary">
                               ${pkg.price.total}
                            </p>
                        </div>
                        <Button size="lg">
                            Ver Oferta
                            <ArrowRight className="ml-2 h-5 w-5"/>
                        </Button>
                    </div>
                </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
