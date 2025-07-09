'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const activities = [
  { name: 'Tour a Pie por la Ciudad Histórica', description: 'Explora el casco antiguo con un guía local.', image: 'https://images.unsplash.com/photo-1744658069386-b4801e3d0c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjaXR5JTIwd2Fsa2luZyUyMHRvdXJ8ZW58MHx8fHwxNzUyMDY3OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'city walking tour' },
  { name: 'Clase de Cocina Local', description: 'Aprende a cocinar auténticos platos regionales.', image: 'https://images.unsplash.com/photo-1634151739970-bba3910d0d36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjb29raW5nJTIwY2xhc3N8ZW58MHx8fHwxNzUyMDY3OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'cooking class' },
  { name: 'Tirolesa en Parque de Aventuras', description: 'Vive la emoción de la tirolesa por el bosque.', image: 'https://images.unsplash.com/photo-1692205959816-d75d4a7b89d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx6aXBsaW5pbmclMjBhZHZlbnR1cmV8ZW58MHx8fHwxNzUyMDY3OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'ziplining adventure' },
  { name: 'Pase para Museos y Galerías de Arte', description: 'Accede a los principales lugares culturales.', image: 'https://images.unsplash.com/photo-1524014444623-194fde519952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhcnQlMjBtdXNldW18ZW58MHx8fHwxNzUyMDY3OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'art museum' },
];

export function ActivitiesSection() {
  return (
    <div className="space-y-8 mt-16">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Actividades Inolvidables</h2>
        <p className="text-muted-foreground mt-2">Reserva tours, atracciones y experiencias únicas para tu viaje.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((activity, index) => (
          <Card key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border flex flex-col bg-card">
            <div className="overflow-hidden relative">
              <Image src={activity.image} data-ai-hint={activity.hint} alt={activity.name} width={400} height={300} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 group-hover:backdrop-blur-sm" />
               <div className="absolute bottom-4 left-4">
                 <h3 className="text-xl font-bold font-headline text-white">{activity.name}</h3>
              </div>
            </div>
            <CardContent className="p-4 flex flex-col flex-grow">
              <p className="text-sm text-muted-foreground mb-4 flex-grow">{activity.description}</p>
              <Button variant="secondary" className="w-full">
                <Zap className="mr-2 h-4 w-4" />
                Reservar Experiencia
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
