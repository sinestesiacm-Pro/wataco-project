
'use client';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';

const activities = [
  { id: 'guatape-tour-1', name: 'Excursion to Guatapé & El Peñol', description: 'A full day to explore the iconic stone and the colorful town.', image: 'https://images.unsplash.com/photo-1639534448069-a47cf42d7cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Z3VhdGFwZSUyMGNvbG9tYmlhfGVufDB8fHx8MTc1NDEzOTEzOXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'guatape colombia', rating: 5, reviews: 1532, price: '65' },
  { id: 'paris-eiffel-1', name: 'Eiffel Tower Summit Experience', description: 'Skip the line and enjoy panoramic views of Paris from the top.', image: 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=500', hint: 'paris eiffel tower', rating: 5, reviews: 4580, price: '99' },
  { id: 'rome-colosseum-1', name: 'Colosseum Underground Tour', description: 'Explore restricted areas of the ancient Roman amphitheater.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500', hint: 'rome colosseum', rating: 5, reviews: 3120, price: '120' },
  { id: 'guatape-boat-1', name: 'Boat Tour on the Reservoir', description: 'Sail through the calm waters and discover hidden islands.', image: 'https://images.unsplash.com/photo-1727813660088-4e751f96700c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxndWF0YXBlJTIwbGFrZXxlbnwwfHx8fDE3NTQxMzkxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'guatape lake', rating: 4, reviews: 721, price: '30' },
  { id: 'kyoto-temples-1', name: 'Kyoto Temples & Gion Tour', description: 'Visit Kinkaku-ji, Fushimi Inari, and the geisha district of Gion.', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=500', hint: 'kyoto japan temple', rating: 5, reviews: 2890, price: '85' },
  { id: 'iceland-glacier-1', name: 'Icelandic Glacier Hike', description: 'Hike across a stunning blue ice glacier with a certified guide.', image: 'https://images.unsplash.com/photo-1597339042539-d02d316ccfef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxhdHYlMjB0cmFpbCUyMG1vdW50YWlufGVufDB8fHx8MTc1NDEzOTEzN3ww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'iceland glacier', rating: 5, reviews: 1250, price: '150' },
  { id: 'guatape-flyboard-1', name: 'Flyboard on the Reservoir', description: 'Feel the thrill of flying over the water. Pure adrenaline!', image: 'https://images.unsplash.com/photo-1738681350514-b8c02e4f92cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxmbHlib2FyZCUyMHdhdGVyJTIwc3BvcnR8ZW58MHx8fHwxNzU0MTM5MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'flyboard water sport', rating: 5, reviews: 150, price: '50' },
  { id: 'serengeti-safari-1', name: 'Serengeti Hot Air Balloon Safari', description: 'An unforgettable view of the Great Migration from the air.', image: 'https://images.unsplash.com/photo-1564985986493-418a1df31815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoZWxpY29wdGVyJTIwbGFrZSUyMHZpZXd8ZW58MHx8fHwxNzU0MTM5MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'serengeti safari tanzania', rating: 5, reviews: 950, price: '550' },
];

const ActivityCard = ({ activity }: { activity: typeof activities[0] }) => (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex gap-4 transition-all duration-300 hover:bg-white/20 shadow-lg">
        <div className="relative w-28 h-28 flex-shrink-0">
            <Image 
                src={activity.image} 
                data-ai-hint={activity.hint} 
                alt={activity.name} 
                fill 
                className="object-cover rounded-xl"
            />
        </div>
        <div className="flex flex-col flex-grow text-white">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{activity.name}</h3>
              <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-white/70 hover:text-white">
                  <Heart className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-white/80">{activity.description}</p>
            <p className="font-semibold text-accent text-xl mt-1">${activity.price}/person</p>
            <div className="flex items-center gap-2 mt-auto text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(activity.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    {[...Array(5 - activity.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-white/30" />)}
                </div>
                <p className="text-white/70">({activity.reviews} reviews)</p>
            </div>
        </div>
    </Card>
);

export function ActivitiesSection() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-white">Activities & Experiences</h2>
        <p className="text-white/80 mt-2">Discover unforgettable adventures on your next destination.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}
    
