'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { AmadeusHotelOffer } from '@/lib/types';
import { Separator } from './ui/separator';
import { BedDouble, NotebookPen } from 'lucide-react';
import { HotelDetailsDialog } from './hotel-details-dialog';
import Image from 'next/image';

interface HotelResultPopoverProps {
  offer: AmadeusHotelOffer;
}

export function HotelResultPopover({ offer }: HotelResultPopoverProps) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          <BedDouble className="mr-2 h-4 w-4" />
          Ver Oferta
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="grid gap-4">
          <div className="h-40 w-full rounded-t-md overflow-hidden bg-muted">
             <Image 
                src="https://i.postimg.cc/P5QfVfRj/map-placeholder.png"
                alt="Mapa de marcador de posición"
                width={320}
                height={160}
                className="object-cover h-full w-full"
            />
          </div>
          <div className="p-4 pt-0 space-y-4">
            <div>
              <p className="text-xs text-muted-foreground font-body">Precio por noche</p>
              <p className="font-bold text-3xl text-tertiary">
                ${offer.offers?.[0]?.price?.total}
              </p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <HotelDetailsDialog offer={offer}>
                <Button variant="outline">
                    <NotebookPen className="mr-2 h-4 w-4" />
                    Ver Detalles
                </Button>
              </HotelDetailsDialog>
              <Button
                className="bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground"
                onClick={() =>
                  alert(
                    'La funcionalidad de reserva no está implementada en esta demostración.'
                  )
                }
              >
                Reservar Ahora
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
