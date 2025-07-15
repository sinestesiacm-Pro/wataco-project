'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, Clock, PlaneTakeoff } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { recommendedPackages } from '@/lib/mock-packages';
import Link from 'next/link';
import type { PackageOffer } from '@/lib/types';

const PackageCard = ({ pkg }: { pkg: PackageOffer }) => (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:border-primary/50">
        <div className="relative h-56 w-full">
            <Image 
                src={pkg.image} 
                data-ai-hint={pkg.hint} 
                alt={pkg.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {pkg.special_offer && (
                 <Badge className="absolute top-3 right-3 text-sm" variant="destructive">{pkg.special_offer}</Badge>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
             <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-2xl font-headline drop-shadow-lg">{pkg.title}</h3>
                <p className="text-white/90 drop-shadow-md">{pkg.destination}</p>
            </div>
        </div>
        <CardContent className="p-4 flex flex-col flex-grow text-white">
            <div className="flex justify-between items-center text-sm text-white/80 mb-3">
                 <div className="flex items-center gap-2">
                    <PlaneTakeoff className="h-4 w-4" />
                    <span>Salida desde {pkg.origin}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{pkg.duration} Noches</span>
                </div>
            </div>

            <ul className="text-xs text-white/70 space-y-1 mb-4 list-disc list-inside">
                {pkg.includes.slice(0, 2).map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            
            <div className="flex-grow"></div>

            <div className="flex justify-between items-end">
                <div>
                     <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(pkg.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-white/70">({pkg.reviews} reviews)</p>
                    </div>
                    <p className="text-xs text-white/80 mt-1">Precio por persona desde</p>
                    <p className="font-bold text-2xl text-white">${pkg.price}</p>
                </div>
                <Button asChild className="font-semibold bg-success hover:bg-success/90" size="sm">
                   <Link href={`/packages/${pkg.id}`}>
                     Ver Paquete
                   </Link>
                </Button>
            </div>
        </CardContent>
    </Card>
);


export function RecommendedPackages() {
  return (
     <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-white">Paquetes Imperdibles</h2>
        <p className="text-white/80 mt-2">Experiencias completas al mejor precio, listas para que las descubras.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedPackages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
