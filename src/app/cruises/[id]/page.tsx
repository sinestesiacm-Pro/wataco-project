'use client';

import React, { Suspense, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Ship, Star, Clock, Users, Anchor } from "lucide-react";
import Link from "next/link";
import { recommendedCruises } from '@/lib/mock-cruises';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CruiseItinerary } from '@/components/cruise-itinerary';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

function CruiseDetailPageContent({ id }: { id: string }) {
  const cruise = useMemo(() => recommendedCruises.find(c => c.id === id), [id]);

  if (!cruise) {
    notFound();
  }

  const renderStars = (rating: number) => {
    return [...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
    ));
  };

  return (
    <div className={cn('w-full min-h-screen pt-24 pb-24', 'bg-cruises-gradient background-pan-animation')}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-center">
            <Button asChild variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
               <Link href="/?tab=Cruises">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a Cruceros
               </Link>
            </Button>
        </div>

        <Card className="overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl">
          <div className="relative h-64 md:h-96 w-full">
              {cruise.videoUrl ? (
                <video
                  src={cruise.videoUrl}
                  poster={cruise.image}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
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
      </div>
    </div>
  );
}

export default function CruiseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  
  return (
     <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-cruises-gradient">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    }>
      <CruiseDetailPageContent id={id} />
    </Suspense>
  );
}
