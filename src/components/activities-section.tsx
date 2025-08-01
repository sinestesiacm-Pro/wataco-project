
'use client';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';

const activities = [
  { id: 'atv-guatape-1', name: 'Paseo en Cuatrimoto', description: 'Aventura todoterreno de 45-50 min en Guatapé.', image: 'https://images.unsplash.com/photo-1620027653298-545b44fab76b?w=500', hint: 'atv adventure', rating: 5, reviews: 489, price: '70' },
  { id: 'jetski-guatape-1', name: 'Jetski en el Embalse', description: '30 min (2p) por $55 o 1 hora por $99.', image: 'https://images.unsplash.com/photo-1598028060898-c117093edfcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxndWF0YXBlfGVufDB8fHx8MTc1NDA4NDQ5MXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'guatape lake', rating: 5, reviews: 612, price: '55' },
  { id: 'paraglide-guatape-1', name: 'Vuelo en Parapente', description: '10 minutos de vuelo sobre Guatapé.', image: 'https://images.unsplash.com/photo-1565563445845-7c5fe4441e42?w=500', hint: 'paragliding flight', rating: 4, reviews: 315, price: '89' },
  { id: 'cooking-class-1', name: 'Clase de Cocina Local', description: 'Aprende platos típicos de la región antioqueña.', image: 'https://images.unsplash.com/photo-1634151739970-bba3910d0d36?w=500', hint: 'cooking class', rating: 5, reviews: 211, price: '85' },
];

const ActivityCard = ({ activity }: { activity: typeof activities[0] }) => (
    <Card className="bg-white rounded-2xl p-3 flex gap-4 transition-all duration-300 hover:shadow-xl shadow-lg border-none">
        <div className="relative w-28 h-28 flex-shrink-0">
            <Image 
                src={activity.image} 
                data-ai-hint={activity.hint} 
                alt={activity.name} 
                fill 
                className="object-cover rounded-xl"
            />
        </div>
        <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg text-gray-900">{activity.name}</h3>
              <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-gray-400 hover:text-destructive">
                  <Heart className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">{activity.description}</p>
            <p className="font-semibold text-primary text-xl mt-1">${activity.price}/persona</p>
            <div className="flex items-center gap-2 mt-auto text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(activity.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    {[...Array(5 - activity.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-gray-300" />)}
                </div>
                <p className="text-gray-500">({activity.reviews} reviews)</p>
            </div>
        </div>
    </Card>
);

export function ActivitiesSection() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-white">Actividades y Experiencias</h2>
        <p className="text-white/80 mt-2">Descubre aventuras inolvidables en tu próximo destino.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}
