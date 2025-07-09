'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BedDouble } from 'lucide-react';

const recommendedHotels = [
  { name: 'Hotel de Lujo con Vistas al Mar', city: 'Cancún, México', price: '250', image: 'https://placehold.co/400x300.png', hint: 'luxury hotel ocean' },
  { name: 'Boutique Hotel en el Centro Histórico', city: 'Cuzco, Perú', price: '120', image: 'https://placehold.co/400x300.png', hint: 'boutique hotel historical' },
  { name: 'Resort Todo Incluido Familiar', city: 'Punta Cana, R. Dominicana', price: '300', image: 'https://placehold.co/400x300.png', hint: 'resort pool' },
  { name: 'Apartamento Moderno con Terraza', city: 'Medellín, Colombia', price: '90', image: 'https://placehold.co/400x300.png', hint: 'modern apartment city' },
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
          <Card key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border flex flex-col bg-card">
            <div className="overflow-hidden relative">
              <Image src={hotel.image} data-ai-hint={hotel.hint} alt={hotel.name} width={400} height={300} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold font-headline text-white">{hotel.name}</h3>
                <p className="text-sm text-white/90">{hotel.city}</p>
              </div>
            </div>
            <CardContent className="p-4 flex justify-between items-center bg-card">
              <p className="text-sm text-muted-foreground font-body">
                Desde <span className="font-bold text-lg text-accent">${hotel.price}</span>/noche
              </p>
              <Button size="sm" variant="secondary">
                <BedDouble className="mr-1.5 h-4 w-4" />
                Ver Hotel
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
