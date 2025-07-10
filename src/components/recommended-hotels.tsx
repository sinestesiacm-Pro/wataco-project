'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BedDouble } from 'lucide-react';

const recommendedHotels = [
  { name: 'Hotel de Lujo con Vistas al Mar', city: 'Cancún, México', price: '250', image: 'https://images.unsplash.com/photo-1669123548650-0e0200ef47f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxsdXh1cnklMjBob3RlbCUyMG9jZWFufGVufDB8fHx8MTc1MjA4MzA2NXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'luxury hotel ocean' },
  { name: 'Boutique Hotel en el Centro Histórico', city: 'Cuzco, Perú', price: '120', image: 'https://images.unsplash.com/photo-1687677929096-e55dd0bb17f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxib3V0aXF1ZSUyMGhvdGVsJTIwaGlzdG9yaWNhbHxlbnwwfHx8fDE3NTIwODMwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'boutique hotel historical' },
  { name: 'Resort Todo Incluido Familiar', city: 'Punta Cana, R. Dominicana', price: '300', image: 'https://images.unsplash.com/photo-1623718649591-311775a30c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxyZXNvcnQlMjBwb29sfGVufDB8fHx8MTc1MjA4MzA2NXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'resort pool' },
  { name: 'Apartamento Moderno con Terraza', city: 'Medellín, Colombia', price: '90', image: 'https://images.unsplash.com/photo-1678891527680-7bb2a6155cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBjaXR5fGVufDB8fHx8MTc1MjA4MzA2NXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'modern apartment city' },
];

export function RecommendedHotels() {
  return (
    <div className="space-y-8 mt-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Estancias Populares que te Encantarán</h2>
        <p className="text-muted-foreground mt-2">Hoteles con excelentes valoraciones para una experiencia única.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedHotels.map((hotel, index) => (
          <Card key={index} className="airplane-window overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border-0 flex flex-col bg-card">
            <div className="overflow-hidden relative h-full">
              <Image src={hotel.image} data-ai-hint={hotel.hint} alt={hotel.name} width={400} height={400} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-4 w-full">
                <h3 className="text-xl font-bold font-headline text-white">{hotel.name}</h3>
                <p className="text-sm text-white/90">{hotel.city}</p>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-white/90 font-body">
                        Desde <span className="font-bold text-lg text-tertiary">${hotel.price}</span>/noche
                    </p>
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                        <BedDouble className="mr-1.5 h-4 w-4" />
                        Ver Hotel
                    </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
