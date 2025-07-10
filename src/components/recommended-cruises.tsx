
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Ship } from 'lucide-react';

const recommendedCruises = [
  { name: 'Caribe Occidental', ship: 'Symphony of the Seas', duration: '7 Noches', image: 'https://images.unsplash.com/photo-1678377402066-f09f89c267d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjcnVpc2UlMjBzaGlwJTIwY2FyaWJiZWFufGVufDB8fHx8MTc1MjA4NDA0OHww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'cruise ship caribbean' },
  { name: 'Fiordos Noruegos', ship: 'MSC Euribia', duration: '8 Noches', image: 'https://images.unsplash.com/photo-1631892504412-609c3b7ab0e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxub3J3YXklMjBmam9yZHN8ZW58MHx8fHwxNzUyMDg0MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'norway fjords' },
  { name: 'Islas Griegas', ship: 'Celebrity Ascent', duration: '10 Noches', image: 'https://images.unsplash.com/photo-1701503873239-d94b133c5a39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxncmVlY2UlMjBzYW50b3Jpbml8ZW58MHx8fHwxNzUyMDg0MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'greece santorini' },
  { name: 'Expedición a Alaska', ship: 'Norwegian Bliss', duration: '7 Noches', image: 'https://images.unsplash.com/photo-1559801849-fa456b5d9553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxhbGFza2ElMjBnbGFjaWVyfGVufDB8fHx8MTc1MjA4NDA0OHww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'alaska glacier' },
  { name: 'Mediterráneo Clásico', ship: 'Sun Princess', duration: '7 Noches', image: 'https://images.unsplash.com/photo-1559302500-7b6d5f958c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtZWRpdGVycmFuZWFuJTIwY29hc3R8ZW58MHx8fHwxNzUyMjM0NDg1fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'mediterranean coast' },
];

export function RecommendedCruises() {
  return (
    <div className="space-y-8 mt-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Cruceros de Ensueño</h2>
        <p className="text-muted-foreground mt-2">Explora el mundo desde el mar con estas rutas espectaculares.</p>
      </div>
      <div className="flex space-x-8 pb-12 mt-8 overflow-x-auto scrollbar-hide -mx-4 px-4">
        {recommendedCruises.map((cruise, index) => (
          <div key={index} className="flex-shrink-0 w-[280px]">
            <div className="airplane-window">
                <div className="airplane-window-inner-bevel">
                    <div className="airplane-window-view">
                        <Image 
                            src={cruise.image} 
                            data-ai-hint={cruise.hint} 
                            alt={cruise.name} 
                            fill 
                            className="object-cover"
                        />
                         <div className="airplane-window-shade-container">
                            <div className="airplane-window-shade"></div>
                        </div>
                        <div className="airplane-window-content">
                            <div>
                            <h3 className="text-xl font-bold font-headline text-white">{cruise.name}</h3>
                            <p className="text-sm text-white/80">{cruise.ship}</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <p className="font-bold text-md text-white/90">{cruise.duration}</p>
                                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                                    <Ship className="mr-2 h-4 w-4" />
                                    Ver Crucero
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
