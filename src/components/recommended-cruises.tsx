'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ship } from 'lucide-react';

const recommendedCruises = [
  { name: 'Caribe Occidental', ship: 'Symphony of the Seas', duration: '7 Noches', image: 'https://placehold.co/400x300.png', hint: 'cruise ship caribbean' },
  { name: 'Fiordos Noruegos', ship: 'MSC Euribia', duration: '8 Noches', image: 'https://placehold.co/400x300.png', hint: 'norway fjords' },
  { name: 'Islas Griegas', ship: 'Celebrity Ascent', duration: '10 Noches', image: 'https://placehold.co/400x300.png', hint: 'greece santorini' },
  { name: 'Expedición a Alaska', ship: 'Norwegian Bliss', duration: '7 Noches', image: 'https://placehold.co/400x300.png', hint: 'alaska glacier' },
];

export function RecommendedCruises() {
  return (
    <div className="space-y-8 mt-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Cruceros de Ensueño</h2>
        <p className="text-muted-foreground mt-2">Explora el mundo desde el mar con estas rutas espectaculares.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedCruises.map((cruise, index) => (
          <Card key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border flex flex-col bg-card">
            <div className="overflow-hidden relative">
              <Image src={cruise.image} data-ai-hint={cruise.hint} alt={cruise.name} width={400} height={300} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
               <div className="absolute bottom-4 left-4">
                 <h3 className="text-xl font-bold font-headline text-white">{cruise.name}</h3>
                 <p className="text-sm text-white/90">{cruise.ship}</p>
              </div>
            </div>
            <CardContent className="p-4 flex justify-between items-center bg-card">
                <p className="font-bold text-md text-accent">{cruise.duration}</p>
                <Button variant="secondary">
                  <Ship className="mr-2 h-4 w-4" />
                  Ver Crucero
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
