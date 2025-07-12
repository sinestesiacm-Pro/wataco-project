'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageSquare, Share2, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const feedItems = [
  {
    user: { name: 'Elena G.', avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=100' },
    image: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?fit=crop&w=1920&q=80',
    hint: 'travel couple',
    caption: '¡Explorando las maravillas de Bali! No puedo creer la belleza de este lugar. 🌴 #ViajeSoñado',
    likes: 124,
    comments: 12,
  },
  {
    user: { name: 'Carlos R.', avatar: 'https://images.unsplash.com/photo-1636377985931-898218afd306?w=100' },
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?fit=crop&w=1920&q=80',
    hint: 'egypt pyramids',
    caption: 'Finalmente cumpliendo mi sueño de ver las pirámides de Giza. Una experiencia que te cambia la vida. ✨',
    likes: 302,
    comments: 45,
  },
  {
    user: { name: 'Ana M.', avatar: 'https://images.unsplash.com/photo-1714415182234-0672970be61a?w=100' },
    image: 'https://placehold.co/1920x1080.png',
    hint: 'luxury hotel',
    caption: 'Encontré el hotel perfecto en los Alpes suizos gracias a Be On Trip. Las vistas son espectaculares.',
    likes: 98,
    comments: 8,
  },
  {
    user: { name: 'David S.', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100' },
    image: 'https://placehold.co/1920x1080.png',
    hint: 'road trip',
    caption: '¡Aventura en la carretera por la costa de California! Cada curva es una nueva postal. 🚗💨',
    likes: 215,
    comments: 22,
  }
];

export function SocialFeedSection() {
  return (
    <div className="relative">
      <div className="max-w-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {feedItems.map((item, index) => (
            <Card key={index} className="rounded-3xl bg-black/10 backdrop-blur-xl border border-white/20 text-foreground shadow-lg">
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
                <div className="flex justify-around items-center text-sm text-muted-foreground">
                  <Button variant="ghost" className="flex items-center gap-2 hover:text-primary">
                    <Heart className="h-5 w-5" />
                    <span>{item.likes}</span>
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2 hover:text-primary">
                    <MessageSquare className="h-5 w-5" />
                    <span>{item.comments}</span>
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2 hover:text-primary">
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
