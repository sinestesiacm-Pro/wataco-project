'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, Clock, PlaneTakeoff, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { recommendedPackages } from '@/lib/mock-packages';
import Link from 'next/link';
import type { PackageOffer } from '@/lib/types';
import React from 'react';

const PackageCard = React.memo(function PackageCard({ pkg }: { pkg: PackageOffer }) {
    return (
        <Link href={`/packages/${pkg.id}`} className="block group">
            <Card className="relative rounded-2xl overflow-hidden aspect-[4/5] transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
                {/* 1. Imagen de Fondo */}
                <Image 
                    src={pkg.image} 
                    data-ai-hint={pkg.hint} 
                    alt={pkg.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />

                {/* 2. Gradiente Oscuro Superpuesto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                
                {pkg.special_offer && (
                    <Badge className="absolute top-4 right-4 z-10" variant="destructive">{pkg.special_offer}</Badge>
                )}

                {/* 3. Contenido Superpuesto */}
                <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                    <div>
                        <h3 className="font-bold text-3xl font-headline drop-shadow-lg">{pkg.title}</h3>
                        <p className="text-white/90 drop-shadow-md">{pkg.destination}</p>
                    </div>

                    <div className="flex justify-between items-center text-sm mt-4">
                        <div className="flex items-center gap-2">
                            <PlaneTakeoff className="h-4 w-4" />
                            <span>Vuelo incluido</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{pkg.duration} Noches</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end mt-6">
                        <div>
                            <p className="text-xs">Desde</p>
                            <p className="font-bold text-4xl drop-shadow-xl">${pkg.price}</p>
                        </div>
                        <Button className="bg-success hover:bg-success/90 font-semibold" size="lg">
                            Ver Paquete
                            <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </Card>
        </Link>
    );
});


export function RecommendedPackages() {
  return (
     <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-foreground drop-shadow-lg">Paquetes Inolvidables</h2>
        <p className="text-muted-foreground mt-2 drop-shadow-lg">Experiencias completas al mejor precio, listas para que las descubras.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendedPackages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
