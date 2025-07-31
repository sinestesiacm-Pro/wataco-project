'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, MessageSquare, Plus, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const userPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=500',
    caption: '¡Explorando las maravillas de Bali!',
    likes: 124,
    comments: 12,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1501908753894-275a33a392d4?w=500',
    caption: 'Aventura en la carretera por la costa de California.',
    likes: 215,
    comments: 22,
  },
];

const StatCounter = ({ value, label }: { value: string, label: string }) => (
    <div className="text-center">
        <p className="font-bold text-2xl text-white">{value}</p>
        <p className="text-xs text-white/70">{label}</p>
    </div>
);

export function SocialProfileSection() {
    const { user } = useAuth();
  
    if (!user) return null;

    const userInitial = user.displayName ? user.displayName[0].toUpperCase() : <Users className="h-5 w-5" />;

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <Card className="bg-black/20 backdrop-blur-xl border-none text-white shadow-lg">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <Avatar className="h-24 w-24 text-4xl border-4 border-primary">
                            <AvatarImage src={user.photoURL || ''} />
                            <AvatarFallback>{userInitial}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow text-center sm:text-left">
                            <h2 className="text-3xl font-bold font-headline">{user.displayName}</h2>
                            <p className="text-white/80 mt-1">Viajero apasionado | Amante de la fotografía | Explorando el mundo una ciudad a la vez.</p>
                             <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                                <Award className="h-5 w-5 text-amber-400" />
                                <span className="font-semibold text-amber-400">1,250 Puntos</span>
                            </div>
                        </div>
                    </div>
                    <Separator className="my-6 bg-white/20" />
                    <div className="flex justify-around">
                        <StatCounter value="12" label="Publicaciones" />
                        <StatCounter value="1.2k" label="Seguidores" />
                        <StatCounter value="340" label="Siguiendo" />
                    </div>
                </CardContent>
            </Card>

            {/* User's Feed */}
            <div className="flex justify-between items-center">
                 <h3 className="text-xl font-headline text-white">Mis Publicaciones</h3>
                 <Button asChild variant="outline" className="bg-transparent border-white/30 hover:bg-white/10">
                    <Link href="/?tab=Social">Ir al Feed Social</Link>
                 </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userPosts.map(post => (
                    <div key={post.id} className="relative group rounded-2xl overflow-hidden aspect-square shadow-lg hover:shadow-xl transition-all">
                        <Image src={post.image} alt={post.caption} fill className="object-cover" />
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                            <div className="flex items-center gap-2">
                                <Heart className="h-5 w-5" />
                                <span>{post.likes}</span>
                            </div>
                             <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                <span>{post.comments}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="relative group rounded-2xl overflow-hidden aspect-square flex items-center justify-center bg-black/20 border-2 border-dashed border-white/30 cursor-pointer hover:bg-black/30 transition-colors shadow-lg hover:shadow-xl">
                    <Plus className="h-10 w-10 text-white/50" />
                </div>
            </div>
        </div>
    );
}