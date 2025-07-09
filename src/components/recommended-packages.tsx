'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Luggage } from 'lucide-react';

const recommendedPackages = [
  { name: 'Aventura en la Riviera Maya', description: 'Vuelo + 5 noches todo incluido', price: '750', image: 'https://placehold.co/400x300.png', hint: 'riviera maya beach' },
  { name: 'Descubrimiento Cultural en Kioto', description: 'Vuelo + 7 noches con tours', price: '1800', image: 'https://placehold.co/400x300.png', hint: 'kyoto temple' },
  { name: 'Patagonia Salvaje', description: 'Vuelo + traslados + 6 noches', price: '2200', image: 'https://placehold.co/400x300.png', hint: 'patagonia mountains' },
  { name: 'Maravillas de Egipto', description: 'Vuelo + crucero por el Nilo', price: '1500', image: 'https://placehold.co/400x300.png', hint: 'egypt pyramids' },
];

export function RecommendedPackages() {
  return (
    <div className="space-y-8 mt-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Paquetes Destacados</h2>
        <p className="text-muted-foreground mt-2">Reserva tu Vuelo + Hotel y ahorra en tu próxima gran aventura.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedPackages.map((pkg, index) => (
          <Card key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border flex flex-col bg-card">
            <div className="overflow-hidden relative">
              <Image src={pkg.image} data-ai-hint={pkg.hint} alt={pkg.name} width={400} height={300} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
               <div className="absolute bottom-4 left-4">
                 <h3 className="text-xl font-bold font-headline text-white">{pkg.name}</h3>
              </div>
            </div>
            <CardContent className="p-4 flex flex-col flex-grow">
              <p className="text-sm text-muted-foreground mb-4 flex-grow">{pkg.description}</p>
              <div className="flex justify-between items-center">
                 <p className="text-sm text-muted-foreground font-body">
                    Desde <span className="font-bold text-lg text-accent">${pkg.price}</span>
                  </p>
                <Button variant="secondary">
                  <Luggage className="mr-2 h-4 w-4" />
                  Ver Paquete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
