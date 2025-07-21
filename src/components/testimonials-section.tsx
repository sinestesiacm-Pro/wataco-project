
'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Elena García',
    location: 'Viaje a Tokio',
    avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc1MjE1NjYyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'woman portrait',
    rating: 5,
    text: '¡Una experiencia inolvidable! Be On Trip se encargó de todo. El vuelo fue cómodo y el hotel superó nuestras expectativas. ¡Definitivamente volveré a reservar con ellos!',
  },
  {
    name: 'Carlos Rodríguez',
    location: 'Crucero por el Caribe',
    avatar: 'https://images.unsplash.com/photo-1636377985931-898218afd306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTIwNjg3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'man portrait',
    rating: 5,
    text: 'El proceso de reserva fue increíblemente sencillo. Encontramos un paquete de crucero fantástico a un precio inmejorable. Las recomendaciones de actividades fueron un gran plus.',
  },
  {
    name: 'Ana Martínez',
    location: 'Escapada a Roma',
    avatar: 'https://images.unsplash.com/photo-1714415182234-0672970be61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx3b21hbiUyMHNtaWxpbmd8ZW58MHx8fHwxNzUyMTU3Njk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'woman smiling',
    rating: 4,
    text: 'La plataforma es muy intuitiva y fácil de usar. Me encantó la sección de consejos de viaje con IA, me dio ideas geniales que no había considerado para mi viaje a Roma.',
  },
];

const renderStars = (rating: number) => {
    return (
        <div className="flex items-center">
            {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
            {[...Array(5 - rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gray-300" />
            ))}
        </div>
    );
};

export function TestimonialsSection() {

  return (
    <section className="py-16 text-center flex-grow flex flex-col justify-end pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-headline font-bold text-white">Lo que dicen nuestros viajeros</h2>
                <p className="text-white/80 mt-2">Historias reales de aventuras inolvidables.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                <Card key={index} className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col bg-white/40 backdrop-blur-xl border-none">
                    <CardContent className="p-6 flex flex-col flex-grow text-left">
                    <div className="flex items-center mb-4">
                        <Avatar className="h-14 w-14 mr-4 border-2 border-primary">
                        <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.hint} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                        <h3 className="font-bold font-headline text-lg text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-700">{testimonial.location}</p>
                        </div>
                    </div>
                    <blockquote className="text-gray-800 italic flex-grow mb-4">"{testimonial.text}"</blockquote>
                    {renderStars(testimonial.rating)}
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>
    </section>
  );
}
