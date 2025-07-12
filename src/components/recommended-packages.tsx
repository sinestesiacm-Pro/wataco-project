'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { Card } from './ui/card';

const recommendedPackages = [
  { name: 'Aventura en la Riviera Maya', description: 'Vuelo + 5 noches todo incluido', price: '750', image: 'https://images.unsplash.com/photo-1620615748664-9cc920e4150d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxyaXZpZXJhJTIwbWF5YSUyMGJlYWNofGVufDB8fHx8MTc1MjA4MzE0M3ww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'riviera maya beach', rating: 5, reviews: 812 },
  { name: 'Descubrimiento Cultural en Kioto', description: 'Vuelo + 7 noches con tours', price: '1800', image: 'https://images.unsplash.com/photo-1669954791579-15a45890449f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxreW90byUyMHRlbXBsZXxlbnwwfHx8fDE3NTIwODMxNDN8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'kyoto temple', rating: 5, reviews: 456 },
  { name: 'Patagonia Salvaje', description: 'Vuelo + traslados + 6 noches', price: '2200', image: 'https://images.unsplash.com/photo-1549472599-222886485e01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwYXRhZ29uaWElMjBtb3VudGFpbnN8ZW58MHx8fHwxNzUyMDgzMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'patagonia mountains', rating: 4, reviews: 673 },
  { name: 'Maravillas de Egipto', description: 'Vuelo + crucero por el Nilo', price: '1500', image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxlZ3lwdCUyMHB5cmFtaWRzfGVufDB8fHx8MTc1MjA4MzE0M3ww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'egypt pyramids', rating: 5, reviews: 1024 },
];

const PackageCard = ({ pkg }: { pkg: typeof recommendedPackages[0] }) => (
    <Card className="bg-black/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex gap-4 transition-all duration-300 hover:bg-black/20">
        <div className="relative w-28 h-28 flex-shrink-0">
            <Image 
                src={pkg.image} 
                data-ai-hint={pkg.hint} 
                alt={pkg.name} 
                fill 
                className="object-cover rounded-xl"
            />
        </div>
        <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg text-white">{pkg.name}</h3>
              <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-white hover:text-white">
                  <Heart className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-white/70">{pkg.description}</p>
            <p className="font-semibold text-primary text-xl mt-1">${pkg.price}/persona</p>
            <div className="flex items-center gap-2 mt-auto text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(pkg.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    {[...Array(5 - pkg.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-white/30" />)}
                </div>
                <p className="text-white/70">({pkg.reviews} reviews)</p>
            </div>
        </div>
    </Card>
);

export function RecommendedPackages() {
  return (
     <div className="space-y-6">
      <h2 className="text-3xl font-bold font-headline text-white">Paquetes Populares</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendedPackages.map((pkg, index) => (
          <PackageCard key={index} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
