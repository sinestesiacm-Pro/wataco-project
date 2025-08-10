'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageSquare, Share2, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const feedItems = [
  {
    user: { name: 'Elena G.', avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100' },
    image: 'https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hint: 'positano italy',
    caption: '¡Explorando las maravillas de la costa italiana! No puedo creer la belleza de este lugar. 🌴 #ViajeSoñado',
    likes: 124,
    comments: 12,
  },
  {
    user: { name: 'Carlos R.', avatar: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=100' },
    image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hint: 'rome colosseum night',
    caption: 'Finalmente cumpliendo mi sueño de ver el Coliseo. Una experiencia que te cambia la vida. ✨',
    likes: 302,
    comments: 45,
  },
  {
    user: { name: 'Ana M.', avatar: 'https://images.pexels.com/photos/3772506/pexels-photo-3772506.jpeg?auto=compress&cs=tinysrgb&w=100' },
    image: 'https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hint: 'kyoto japan',
    caption: 'Encontré el hotel perfecto en el corazón de Tokio gracias a Be On Trip. ¡Las vistas son espectaculares!',
    likes: 98,
    comments: 8,
  },
  {
    user: { name: 'David S.', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100' },
    image: 'https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hint: 'california pier',
    caption: '¡Aventura en la carretera por la costa de California! Cada curva es una nueva postal. 🚗💨',
    likes: 215,
    comments: 22,
  }
];

export function SocialFeedSection() {
  return (
    <div className="relative">
      <div className="max-w-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-headline text-white">Comunidad de Viajeros</h2>
            <p className="text-white/80 mt-2">Conecta, comparte y descubre con otros aventureros.</p>
        </div>
        <div className="space-y-8">
          {feedItems.map((item, index) => (
            <Card key={index} className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={item.user.avatar} alt={item.user.name} />
                    <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">{item.user.name}</p>
                </div>
                <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-4">
                  <Image src={item.image} alt={item.hint} data-ai-hint={item.hint} fill className="object-cover" />
                </div>
                <p className="text-sm mb-4 px-2">{item.caption}</p>
                <div className="flex justify-around items-center text-sm text-white/70">
                  <Button variant="ghost" className="flex items-center gap-2 text-white hover:text-primary">
                    <Heart className="h-5 w-5" />
                    <span>{item.likes}</span>
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2 text-white hover:text-primary">
                    <MessageSquare className="h-5 w-5" />
                    <span>{item.comments}</span>
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2 text-white hover:text-primary">
                    <Share2 className="h-5 w-5" />
                    <span>Compartir</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
       <div className="fixed bottom-24 right-6 z-40 md:hidden">
            <Button size="lg" className="rounded-full shadow-lg w-16 h-16 bg-primary hover:bg-primary/90">
                <Plus className="h-8 w-8"/>
            </Button>
        </div>
    </div>
  );
}
