'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Ship } from 'lucide-react';
import Link from 'next/link';
import { Card } from './ui/card';

const recommendedCruises = [
  { id: 'caribbean-1', name: 'Caribe Occidental', ship: 'Symphony of the Seas', duration: '7 Noches', image: 'https://images.unsplash.com/photo-1678377402066-f09f89c267d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjcnVpc2UlMjBzaGlwJTIwY2FyaWJiZWFufGVufDB8fHx8MTc1MjA4NDA0OHww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'cruise ship caribbean' },
  { id: 'norway-1', name: 'Fiordos Noruegos', ship: 'MSC Euribia', duration: '8 Noches', image: 'https://images.unsplash.com/photo-1631892504412-609c3b7ab0e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxub3J3YXklMjBmam9yZHN8ZW58MHx8fHwxNzUyMDg0MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'norway fjords' },
  { id: 'greece-1', name: 'Islas Griegas', ship: 'Celebrity Ascent', duration: '10 Noches', image: 'https://images.unsplash.com/photo-1701503873239-d94b133c5a39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxncmVlY2UlMjBzYW50b3Jpbml8ZW58MHx8fHwxNzUyMDg0MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'greece santorini' },
  { id: 'alaska-1', name: 'Expedición a Alaska', ship: 'Norwegian Bliss', duration: '7 Noches', image: 'https://images.unsplash.com/photo-1559801849-fa456b5d9553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxhbGFza2ElMjBnbGFjaWVyfGVufDB8fHx8MTc1MjA4NDA0OHww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'alaska glacier' },
  { id: 'mediterranean-1', name: 'Mediterráneo Clásico', ship: 'Sun Princess', duration: '7 Noches', image: 'https://images.unsplash.com/photo-1559302500-7b6d5f958c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtZWRpdGVycmFuZWFuJTIwY29hc3R8ZW58MHx8fHwxNzUyMjM0NDg1fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'mediterranean coast' },
];

const CruiseCard = ({ cruise }: { cruise: typeof recommendedCruises[0] }) => (
    <Card className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white/10 backdrop-blur-md border-0 flex flex-col w-full">
        <div className="overflow-hidden relative h-80 rounded-2xl">
          <Image src={cruise.image} data-ai-hint={cruise.hint} alt={cruise.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
             <h3 className="text-xl font-bold font-headline text-white">{cruise.name}</h3>
             <p className="text-sm text-white/80">{cruise.ship}</p>
              <div className="flex items-center justify-between mt-4">
                <p className="font-bold text-md text-white/90">{cruise.duration}</p>
                <Button asChild variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                    <Link href={`/cruises/${cruise.id}`}>
                        <Ship className="mr-2 h-4 w-4" />
                        Ver Crucero
                    </Link>
                </Button>
            </div>
          </div>
        </div>
    </Card>
);


export function RecommendedCruises() {
  return (
    <div className="space-y-8 mt-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-white">Cruceros de Ensueño</h2>
        <p className="text-white/80 mt-2">Explora el mundo desde el mar con estas rutas espectaculares.</p>
      </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedCruises.map((cruise, index) => (
          <CruiseCard key={index} cruise={cruise} />
        ))}
      </div>
    </div>
  );
}
