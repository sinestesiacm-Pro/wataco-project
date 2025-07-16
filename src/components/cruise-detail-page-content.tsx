'use client'; // ¡MUY IMPORTANTE! Esto lo convierte en un Client Component

import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Ship, Star, Clock, Anchor, Play, Pause } from "lucide-react";
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { CruiseItinerary } from '@/components/cruise-itinerary';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { CruisePackage } from '@/lib/types';

// Componente de Contenido (Client Component) - Recibe datos como props y maneja UI interactiva
export default function CruiseDetailPageContent({ cruise }: { cruise: CruisePackage }) {
    console.log('--- DEPURACIÓN VIDEO SOURCE (DESPUÉS DEL FIX DEFINITIVO - EN EL CLIENTE) ---');
    console.log('Valor de `cruise` recibido como prop:', cruise);
    console.log('Valor de `cruise.videoUrl` recibido en el hijo:', cruise?.videoUrl);
    console.log('Tipo de `cruise.videoUrl`:', typeof cruise?.videoUrl);
    console.log('--- FIN DEPURACIÓN VIDEO SOURCE (DESPUÉS DEL FIX DEFINITIVO) ---');
    
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const renderStars = (rating: number) => {
        return [...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
        ));
    };

    if (!cruise) {
        return (
            <div className="flex items-center justify-center h-full text-white">
                <p>Cargando detalles del crucero...</p>
            </div>
        )
    }

    return (
        <Card className="overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl">
            <div className="relative h-64 md:h-96 w-full">
                {cruise.videoUrl ? (
                    <>
                        <video
                            ref={videoRef}
                            src={cruise.videoUrl}
                            poster={cruise.image}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handlePlayPause}
                                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:text-white"
                            >
                                {isPlaying ? <Pause className="h-10 w-10"/> : <Play className="h-10 w-10"/>}
                            </Button>
                        </div>
                    </>
                ) : (
                    <Image
                        src={cruise.image}
                        data-ai-hint={cruise.hint}
                        alt={cruise.name}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 pointer-events-none">
                    <Badge variant="secondary" className="mb-2">{cruise.ship}</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold font-headline drop-shadow-lg">{cruise.name}</h1>
                </div>
            </div>
            <CardContent className="p-6 grid md:grid-cols-12 gap-8">
                <div className="md:col-span-4 space-y-6">
                    <Card className="bg-black/20 p-4">
                        <CardTitle className="text-xl mb-4">Detalles del Viaje</CardTitle>
                        <div className="space-y-3 text-white/80">
                            <div className="flex items-center gap-3"><Ship className="h-5 w-5 text-primary"/><span>{cruise.ship}</span></div>
                            <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary"/><span>{cruise.duration}</span></div>
                            <div className="flex items-center gap-3"><Anchor className="h-5 w-5 text-primary"/><span>{cruise.itinerary.length} paradas</span></div>
                            <div className="flex items-center gap-3">{renderStars(cruise.rating)}<span>({cruise.reviews} reviews)</span></div>
                        </div>
                    </Card>
                    <Card className="bg-black/20 p-4">
                        <CardTitle className="text-xl mb-2">Precio</CardTitle>
                        <p className="text-sm text-white/80">Desde</p>
                        <p className="text-4xl font-bold text-accent">${cruise.price}</p>
                        <p className="text-sm text-white/80">por persona</p>
                        <Button size="lg" className="w-full mt-4 bg-success hover:bg-success/90">Reservar Ahora</Button>
                    </Card>
                </div>
                <div className="md:col-span-8">
                    <h2 className="text-2xl font-bold font-headline mb-6">Itinerario del Crucero</h2>
                    <CruiseItinerary itinerary={cruise.itinerary} />
                </div>
            </CardContent>
        </Card>
    );
}
