'use client';

import { AmadeusHotelOffer, Room } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Tv, Wifi, Utensils, Info, XCircle, Star, Users, BedDouble, Square } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Separator } from './ui/separator';

const roomAmenityIcons: { [key: string]: LucideIcon } = {
  WIFI: Wifi,
  MINIBAR: Utensils,
  SAFE: CheckCircle2,
  BALCONY: Tv,
  KITCHENETTE: Utensils,
  DESK: Tv,
};

const formatAmenity = (amenity: string) => {
  return amenity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

interface RoomSelectionViewProps {
  hotelOffer: AmadeusHotelOffer;
  onRoomSelected: (room: Room) => void;
  onBack: () => void;
}

const RoomOption = ({ roomOffer, onSelect, isRecommended }: { roomOffer: Room, onSelect: () => void, isRecommended: boolean }) => (
    <div className="flex flex-col md:flex-row border-t first:border-t-0">
        {/* Options Column */}
        <div className="w-full md:w-5/12 p-4 space-y-3">
             {isRecommended && (
                <Badge variant="default" className="bg-accent hover:bg-accent/90 mb-2">
                    <Star className="mr-2 h-4 w-4 fill-white" /> Recomendado
                </Badge>
            )}
            <div className="flex items-center gap-2 text-green-600 font-semibold">
                <CheckCircle2 className="h-5 w-5" />
                <span>Cancelación gratuita (hasta 24h antes)</span>
            </div>
            
            <Separator className="my-4"/>

            <div>
              <p className="font-semibold text-sm mb-2">Extras incluidos:</p>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-muted-foreground">
                    <XCircle className="h-5 w-5" />
                    <span>No incluye plan de comidas</span>
                </div>
              </div>
            </div>
            
        </div>
        
        {/* Price Column */}
        <div className="w-full md:w-7/12 p-4 flex flex-col items-end justify-center bg-muted/30">
            <div className="text-right mb-3">
                <p className="text-xs text-muted-foreground">Precio por noche</p>
                <p className="text-3xl font-bold text-primary">${roomOffer.price.total}</p>
                <p className="text-xs text-muted-foreground">Impuestos incluidos</p>
            </div>
            <Button size="lg" className="w-full" onClick={onSelect}>
                Continuar
            </Button>
        </div>
    </div>
);


export function RoomSelectionView({ hotelOffer, onRoomSelected, onBack }: RoomSelectionViewProps) {
  const rooms = hotelOffer.offers;

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Detalles
            </Button>
            <h2 className="hidden md:block text-2xl font-bold font-headline text-center">{hotelOffer.hotel.name} - Elige tu habitación</h2>
             <div className="w-32"></div>
       </div>

        <div className="hidden md:grid grid-cols-12 px-4 text-sm font-semibold text-muted-foreground uppercase">
            <div className="col-span-5">Tipo de Habitación</div>
            <div className="col-span-7 grid grid-cols-12">
                <div className="col-span-5">Opciones</div>
                <div className="col-span-7 text-right pr-4">Precio</div>
            </div>
        </div>

      {rooms.map((roomOffer, index) => (
        <Card key={roomOffer.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-12">

            {/* Room Type Column */}
            <div className="md:col-span-5 p-4">
               <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                 <Image
                    src={hotelOffer.hotel.media?.[3]?.uri || hotelOffer.hotel.media?.[0]?.uri || 'https://placehold.co/400x300.png'}
                    alt={`Habitación ${roomOffer.room.description.text}`}
                    fill
                    className="object-cover"
                    data-ai-hint="hotel room"
                  />
               </div>
               <h3 className="text-lg font-bold font-headline mb-3">{roomOffer.room.description.text}</h3>
               
               <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /><span>2 Huéspedes</span></div>
                    <div className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-primary" /><span>1 Cama Doble</span></div>
                    <div className="flex items-center gap-2"><Square className="h-4 w-4 text-primary" /><span>25 m²</span></div>
               </div>

               {roomOffer.room.amenities && (
                    <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                        {roomOffer.room.amenities.map(amenity => {
                            const Icon = roomAmenityIcons[amenity] || CheckCircle2;
                            return (
                                <div key={amenity} className="flex items-center gap-2">
                                    <Icon className="h-4 w-4 text-primary" />
                                    <span>{formatAmenity(amenity)}</span>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Options & Price Wrapper */}
            <div className="md:col-span-7 flex flex-col">
                {/* For this demo, we'll simulate one option per room type. A real app would map over different rate plans for the same room type. */}
                <RoomOption roomOffer={roomOffer} onSelect={() => onRoomSelected(roomOffer)} isRecommended={index === 0} />
            </div>

          </div>
        </Card>
      ))}
    </div>
  );
}
