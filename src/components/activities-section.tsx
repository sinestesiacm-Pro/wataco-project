
'use client';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';

const activities = [
  { id: 'guatape-tour-1', name: 'Excursión a Guatapé y El Peñol', description: 'Un día completo para explorar la piedra y el colorido pueblo.', image: 'https://images.unsplash.com/photo-1639534448069-a47cf42d7cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Z3VhdGFwZSUyMGNvbG9tYmlhfGVufDB8fHx8MTc1NDEzOTEzOXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'guatape colombia', rating: 5, reviews: 1532, price: '65' },
  { id: 'paraglide-chicamocha-1', name: 'Parapente en Chicamocha', description: 'Vuela sobre el segundo cañón más grande del mundo.', image: 'https://images.unsplash.com/photo-1627163627936-87219ad65d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwYXJhZ2xpZGluZyUyMGNhbnlvbnxlbnwwfHx8fDE3NTQxMzkxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'paragliding canyon', rating: 5, reviews: 612, price: '89' },
  { id: 'coffee-tour-1', name: 'Tour de Café en el Eje', description: 'Descubre el proceso del café, desde la semilla hasta la taza.', image: 'https://images.unsplash.com/photo-1414808549009-35951c724e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjb2xvbWJpYSUyMGNvZmZlZSUyMGZhcm18ZW58MHx8fHwxNzU0MTM5MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'colombia coffee farm', rating: 5, reviews: 489, price: '45' },
  { id: 'guatape-boat-1', name: 'Paseo en Barco por la Represa', description: 'Navega por las tranquilas aguas y descubre islas ocultas.', image: 'https://images.unsplash.com/photo-1727813660088-4e751f96700c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxndWF0YXBlJTIwbGFrZXxlbnwwfHx8fDE3NTQxMzkxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'guatape lake', rating: 4, reviews: 721, price: '30' },
  { id: 'guatape-paraglide-1', name: 'Parapente sobre Guatapé', description: 'Disfruta de una vista de pájaro de la represa y la Piedra.', image: 'https://images.unsplash.com/photo-1650925187474-d9f35641d41a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwYXJhZ2xpZGluZyUyMGxha2V8ZW58MHx8fHwxNzU0MTM5MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'paragliding lake', rating: 5, reviews: 345, price: '85' },
  { id: 'guatape-atv-1', name: 'Aventura en Cuatrimoto', description: 'Recorre senderos y caminos rurales con vistas espectaculares.', image: 'https://images.unsplash.com/photo-1597339042539-d02d316ccfef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxhdHYlMjB0cmFpbCUyMG1vdW50YWlufGVufDB8fHx8MTc1NDEzOTEzN3ww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'atv trail mountain', rating: 4, reviews: 218, price: '50' },
  { id: 'guatape-flyboard-1', name: 'Flyboard en la Represa', description: 'Siente la emoción de volar sobre el agua. ¡Pura adrenalina!', image: 'https://images.unsplash.com/photo-1738681350514-b8c02e4f92cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxmbHlib2FyZCUyMHdhdGVyJTIwc3BvcnR8ZW58MHx8fHwxNzU0MTM5MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'flyboard water sport', rating: 5, reviews: 150, price: '50' },
  { id: 'guatape-helicopter-1', name: 'Vuelo en Helicóptero', description: 'Una vista inolvidable de la Piedra del Peñol desde el aire.', image: 'https://images.unsplash.com/photo-1564985986493-418a1df31815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoZWxpY29wdGVyJTIwbGFrZSUyMHZpZXd8ZW58MHx8fHwxNzU0MTM5MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'helicopter lake view', rating: 5, reviews: 95, price: '120' },
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
        <p className="text-white/80 mt-2">Descubre aventuras inolvidables en tu próximo destino en Colombia.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}
