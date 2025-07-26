'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageSquare, Share2, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const feedItems = [
  {
    user: { name: 'Elena G.', avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=100' },
    image: 'https://images.unsplash.com/photo-1623556710453-d76c4ea26d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx0cmF2ZWwlMjBjb3VwbGV8ZW58MHx8fHwxNzUzNTYzNTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'travel couple',
    caption: '¡Explorando las maravillas de Bali! No puedo creer la belleza de este lugar. 🌴 #ViajeSoñado',
    likes: 124,
    comments: 12,
  },
  {
    user: { name: 'Carlos R.', avatar: 'https://images.unsplash.com/photo-1636377985931-898218afd306?w=100' },
    image: 'https://images.unsplash.com/photo-1675589291893-eeefa8f2b7a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxlZ3lwdCUyMHB5cmFtaWRzfGVufDB8fHx8MTc1MzQ4MzI1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'egypt pyramids',
    caption: 'Finalmente cumpliendo mi sueño de ver las pirámides de Giza. Una experiencia que te cambia la vida. ✨',
    likes: 302,
    comments: 45,
  },
  {
    user: { name: 'Ana M.', avatar: 'https://images.unsplash.com/photo-1714415182234-0672970be61a?w=100' },
    image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwwfHx8fDE3NTM1NjM1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'luxury hotel',
    caption: 'Encontré el hotel perfecto en los Alpes suizos gracias a Be On Trip. Las vistas son espectaculares.',
    likes: 98,
    comments: 8,
  },
  {
    user: { name: 'David S.', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100' },
    image: 'https://images.unsplash.com/flagged/photo-1552470470-959579335ea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxyb2FkJTIwdHJpcHxlbnwwfHx8fDE3NTM1NjM1MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
