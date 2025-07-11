
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Luggage } from 'lucide-react';
import { Card } from './ui/card';

const recommendedPackages = [
  { name: 'Aventura en la Riviera Maya', description: 'Vuelo + 5 noches todo incluido', price: '750', image: 'https://images.unsplash.com/photo-1620615748664-9cc920e4150d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxyaXZpZXJhJTIwbWF5YSUyMGJlYWNofGVufDB8fHx8MTc1MjA4MzE0M3ww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'riviera maya beach' },
  { name: 'Descubrimiento Cultural en Kioto', description: 'Vuelo + 7 noches con tours', price: '1800', image: 'https://images.unsplash.com/photo-1669954791579-15a45890449f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxreW90byUyMHRlbXBsZXxlbnwwfHx8fDE3NTIwODMxNDN8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'kyoto temple' },
  { name: 'Patagonia Salvaje', description: 'Vuelo + traslados + 6 noches', price: '2200', image: 'https://images.unsplash.com/photo-1743562904402-1c4938592041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwYXRhZ29uaWElMjBtb3VudGFpbnN8ZW58MHx8fHwxNzUyMDgzMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'patagonia mountains' },
  { name: 'Maravillas de Egipto', description: 'Vuelo + crucero por el Nilo', price: '1500', image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxlZ3lwdCUyMHB5cmFtaWRzfGVufDB8fHx8MTc1MjA4MzE0M3ww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'egypt pyramids' },
];

const PackageCard = ({ pkg }: { pkg: typeof recommendedPackages[0] }) => (
    <Card className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border-0 bg-transparent flex flex-col w-full">
        <div className="overflow-hidden relative h-80 rounded-2xl">
          <Image src={pkg.image} data-ai-hint={pkg.hint} alt={pkg.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
           <div className="absolute bottom-4 left-4 right-4">
             <h3 className="text-xl font-bold font-headline text-white">{pkg.name}</h3>
             <p className="text-sm text-white/80">{pkg.description}</p>
             <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-white/90 font-body">
                    Desde <span className="font-bold text-lg text-tertiary">${pkg.price}</span>
                </p>
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                    <Luggage className="mr-2 h-4 w-4" />
                    Ver Paquete
                </Button>
             </div>
          </div>
        </div>
    </Card>
);

export function RecommendedPackages() {
  return (
    <div className="space-y-8 mt-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Paquetes Destacados</h2>
        <p className="text-muted-foreground mt-2">Reserva tu Vuelo + Hotel y ahorra en tu próxima gran aventura.</p>
      </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedPackages.map((pkg, index) => (
          <PackageCard key={index} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
