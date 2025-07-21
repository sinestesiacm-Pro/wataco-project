
'use client';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';

const activities = [
  { id: 'city-tour-1', name: 'Tour por la Ciudad Histórica', description: 'Explora el casco antiguo.', image: 'https://images.unsplash.com/photo-1744658069386-b4801e3d0c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjaXR5JTIwd2Fsa2luZyUyMHRvdXJ8ZW58MHx8fHwxNzUyMDY3OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'city walking tour', rating: 5, reviews: 543, price: '50' },
  { id: 'cooking-class-1', name: 'Clase de Cocina Local', description: 'Aprende platos regionales.', image: 'https://images.unsplash.com/photo-1634151739970-bba3910d0d36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjb29raW5nJTIwY2xhc3N8ZW58MHx8fHwxNzUyMDY3OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'cooking class', rating: 5, reviews: 211, price: '85' },
  { id: 'zipline-1', name: 'Tirolesa de Aventura', description: 'Emoción en el bosque.', image: 'https://images.unsplash.com/photo-1692205959816-d75d4a7b89d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx6aXBsaW5pbmclMjBhZHZlbnR1cmV8ZW58MHx8fHwxNzUyMDY3OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'ziplining adventure', rating: 4, reviews: 345, price: '70' },
  { id: 'museum-pass-1', name: 'Pase para Museos de Arte', description: 'Accede a lugares culturales.', image: 'https://images.unsplash.com/photo-1524014444623-194fde519952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhcnQlMjBtdXNldW18ZW58MHx8fHwxNzUyMDY3OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'art museum', rating: 5, reviews: 689, price: '40' },
];

const ActivityCard = ({ activity }: { activity: typeof activities[0] }) => (
    <Card className="bg-white rounded-2xl p-3 flex gap-4 transition-all duration-300 hover:shadow-xl">
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
