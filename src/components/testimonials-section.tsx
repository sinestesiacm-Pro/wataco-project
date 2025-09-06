
'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState, memo } from 'react';
import React from 'react';

const testimonials = [
  {
    name: 'Elena García',
    location: 'Trip to Tokyo',
    avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc1MjE1NjYyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'woman portrait',
    rating: 5,
    text: 'An unforgettable experience! B on travel took care of everything. The flight was comfortable and the hotel exceeded our expectations. I will definitely book with them again!',
  },
  {
    name: 'Carlos Rodríguez',
    location: 'Caribbean Cruise',
    avatar: 'https://images.unsplash.com/photo-1636377985931-898218afd306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTIwNjg3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'man portrait',
    rating: 5,
    text: 'The booking process was incredibly simple. We found a fantastic cruise package at an unbeatable price. The activity recommendations were a great plus.',
  },
  {
    name: 'Ana Martínez',
    location: 'Getaway to Rome',
    avatar: 'https://images.unsplash.com/photo-1714415182234-0672970be61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHx3b21hbiUyMHNtaWxpbmd8ZW58MHx8fHwxNzUyMTU3Njk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'woman smiling',
    rating: 4,
    text: "The platform is very intuitive and easy to use. I loved the AI travel tips section, it gave me great ideas that I hadn't considered for my trip to Rome.",
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

const TestimonialCard = memo(function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
    return (
        <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col bg-white/40 backdrop-blur-xl border-none text-gray-800">
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
    );
});


export function TestimonialsSection() {
  return (
    <section className="py-16 text-center flex-grow flex flex-col justify-end pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-headline font-bold text-white drop-shadow-lg">What Our Travelers Say</h2>
                <p className="text-white mt-2 drop-shadow-lg">Real stories from unforgettable adventures.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} />
                ))}
            </div>
        </div>
    </section>
  );
}
