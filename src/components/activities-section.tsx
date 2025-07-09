'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const activities = [
  { name: 'Historic City Walking Tour', description: 'Explore the old town with a local guide.', image: 'https://placehold.co/400x300.png', hint: 'city walking tour' },
  { name: 'Local Cuisine Cooking Class', description: 'Learn to cook authentic regional dishes.', image: 'https://placehold.co/400x300.png', hint: 'cooking class' },
  { name: 'Adventure Park Zip-lining', description: 'Experience the thrill of zip-lining through the forest.', image: 'https://placehold.co/400x300.png', hint: 'ziplining adventure' },
  { name: 'Museum & Art Gallery Pass', description: 'Access the top cultural spots.', image: 'https://placehold.co/400x300.png', hint: 'art museum' },
];

export function ActivitiesSection() {
  return (
    <div className="space-y-8 mt-16">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Unforgettable Activities</h2>
        <p className="text-muted-foreground mt-2">Book tours, attractions, and unique experiences for your trip.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((activity, index) => (
          <Card key={index} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border flex flex-col">
            <div className="overflow-hidden relative">
              <Image src={activity.image} data-ai-hint={activity.hint} alt={activity.name} width={400} height={300} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
               <div className="absolute bottom-4 left-4">
                 <h3 className="text-xl font-bold font-headline text-white">{activity.name}</h3>
              </div>
            </div>
            <CardContent className="p-4 flex flex-col flex-grow">
              <p className="text-sm text-muted-foreground mb-4 flex-grow">{activity.description}</p>
              <Button variant="secondary" className="w-full">
                <Zap className="mr-2 h-4 w-4" />
                Book Experience
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
