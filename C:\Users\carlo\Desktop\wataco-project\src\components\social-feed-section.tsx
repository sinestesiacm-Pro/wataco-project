'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageSquare, Share2, Plus, Send, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useAuth } from '@/contexts/auth-context';

type Comment = {
  id: number;
  user: { name: string; avatar: string };
  text: string;
};

type SocialPost = {
  id: number;
  user: { name: string; avatar: string };
  image: string;
  hint: string;
  caption: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
};

const initialFeedItems: SocialPost[] = [
  {
    id: 1,
    user: { name: 'Elena G.', avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100' },
    image: 'https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hint: 'positano italy',
    caption: '¡Explorando las maravillas de la costa italiana! No puedo creer la belleza de este lugar. 🌴 #ViajeSoñado',
    likes: 124,
    comments: [
        { id: 1, user: { name: 'Carlos R.', avatar: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=100' }, text: '¡Qué foto increíble! Tengo que ir.'},
        { id: 2, user: { name: 'Ana M.', avatar: 'https://images.pexels.com/photos/3772506/pexels-photo-3772506.jpeg?auto=compress&cs=tinysrgb&w=100' }, text: '¡Disfruta mucho, Elena! Se ve espectacular.'},
    ],
    isLiked: false,
  },
  {
    id: 2,
    user: { name: 'Carlos R.', avatar: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=100' },
    image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hint: 'rome colosseum night',
    caption: 'Finalmente cumpliendo mi sueño de ver el Coliseo. Una experiencia que te cambia la vida. ✨',
    likes: 302,
    comments: [],
    isLiked: true,
  },
  {
    id: 3,
    user: { name: 'Ana M.', avatar: 'https://images.pexels.com/photos/3772506/pexels-photo-3772506.jpeg?auto=compress&cs=tinysrgb&w=100' },
    image: 'https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hint: 'kyoto japan',
    caption: 'Encontré el hotel perfecto en el corazón de Tokio gracias a B on travel. ¡Las vistas son espectaculares!',
    likes: 98,
    comments: [],
    isLiked: false,
  },
  {
    id: 4,
    user: { name: 'David S.', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100' },
    image: 'https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hint: 'california pier',
    caption: '¡Aventura en la carretera por la costa de California! Cada curva es una nueva postal. 🚗💨',
    likes: 215,
    comments: [],
    isLiked: false,
  }
];

export function SocialFeedSection() {
    const { user } = useAuth();
    const [feed, setFeed] = useState<SocialPost[]>(initialFeedItems);
    const [commentText, setCommentText] = useState('');
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [activePost, setActivePost] = useState<SocialPost | null>(null);

    const handleLike = (postId: number) => {
        setFeed(prevFeed =>
            prevFeed.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        isLiked: !post.isLiked,
                        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    };
                }
                return post;
            })
        );
    };

    const handleOpenComments = (post: SocialPost) => {
        setActivePost(post);
        setIsCommentsOpen(true);
    };
    
    const handleAddComment = () => {
        if (!commentText.trim() || !activePost || !user) return;
        
        const newComment: Comment = {
            id: Date.now(),
            user: { name: user.displayName || 'Tú', avatar: user.photoURL || '' },
            text: commentText,
        };

        setFeed(prevFeed =>
            prevFeed.map(post => {
                if (post.id === activePost.id) {
                    return {
                        ...post,
                        comments: [...post.comments, newComment],
                    };
                }
                return post;
            })
        );

        setActivePost(prevActivePost => {
            if (!prevActivePost) return null;
            return {
                ...prevActivePost,
                comments: [...prevActivePost.comments, newComment],
            };
        });

        setCommentText('');
    };


  return (
    <div className="relative">
      <div className="max-w-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-headline text-foreground">Comunidad de Viajeros</h2>
            <p className="text-muted-foreground mt-2">Conecta, comparte y descubre con otros aventureros.</p>
        </div>
        <div className="space-y-8">
          {feed.map((item) => (
            <Card key={item.id} className="rounded-3xl bg-card/80 backdrop-blur-xl border shadow-lg">
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
                  <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:text-primary" onClick={() => handleLike(item.id)}>
                    <Heart className="h-5 w-5" fill={item.isLiked ? 'currentColor' : 'none'} />
                    <span>{item.likes}</span>
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:text-primary" onClick={() => handleOpenComments(item)}>
                    <MessageSquare className="h-5 w-5" />
                    <span>{item.comments.length}</span>
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:text-primary">
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
        <Sheet open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
            <SheetContent side="bottom" className="h-[80vh] bg-background/80 backdrop-blur-2xl border-t flex flex-col rounded-t-3xl">
                <SheetHeader className="text-left p-4">
                    <SheetTitle className="font-headline text-2xl">Comentarios</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-grow px-4">
                     <div className="space-y-4">
                        {activePost?.comments.map(comment => (
                            <div key={comment.id} className="flex items-start gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.user.avatar} />
                                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="bg-muted/50 p-3 rounded-lg flex-grow">
                                    <p className="font-semibold text-sm">{comment.user.name}</p>
                                    <p className="text-sm">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                         {activePost?.comments.length === 0 && (
                            <p className="text-center text-muted-foreground py-8">No hay comentarios aún. ¡Sé el primero!</p>
                         )}
                    </div>
                </ScrollArea>
                 <div className="p-4 border-t mt-auto">
                    <div className="flex items-center gap-2">
                        <Input 
                            placeholder="Añade un comentario..." 
                            className="bg-muted/50 border-border"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                        />
                        <Button onClick={handleAddComment} disabled={!commentText.trim()}>
                            <Send className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    </div>
  );
}
