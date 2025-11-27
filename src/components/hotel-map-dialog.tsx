
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

interface HotelMapDialogProps {
  hotelName: string;
}

export function HotelMapDialog({ hotelName }: HotelMapDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Since we're removing the interactive map, we'll show a placeholder.
  // The button will open a dialog explaining how to enable maps.

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-background/20 text-foreground border-border hover:bg-background/30 hover:text-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          Ver en Mapa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] h-auto flex flex-col p-0 rounded-3xl">
        <DialogHeader className="p-4 border-b flex-shrink-0">
          <DialogTitle>Ubicación de {hotelName}</DialogTitle>
           <DialogDescription className="flex items-center gap-2 text-amber-500">
             <AlertTriangle className="h-4 w-4" />
             El mapa interactivo está deshabilitado.
           </DialogDescription>
        </DialogHeader>
        <div className="flex-grow rounded-b-2xl overflow-hidden relative p-6 text-center">
            <Image 
                src="https://i.postimg.cc/P5QfVfRj/map-placeholder.png"
                alt="Mapa de marcador de posición"
                width={800}
                height={600}
                className="rounded-lg"
            />
            <p className="text-sm text-muted-foreground mt-4">
              Para habilitar los mapas interactivos, proporciona una clave de API de Google Maps con la facturación activada en tus variables de entorno.
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
