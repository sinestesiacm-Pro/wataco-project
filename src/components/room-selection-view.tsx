'use client';

import { AmadeusHotelOffer, Room } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Tv, Wifi, Utensils, Info } from 'lucide-react';
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
}

interface RoomSelectionViewProps {
  hotelOffer: AmadeusHotelOffer;
  onRoomSelected: (room: Room) => void;
  onBack: () => void;
}

export function RoomSelectionView({ hotelOffer, onRoomSelected, onBack }: RoomSelectionViewProps) {
  const rooms = hotelOffer.offers;

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Detalles
            </Button>
            <h2 className="text-2xl font-bold font-headline text-center">{hotelOffer.hotel.name} - Elige tu habitación</h2>
            <div className="w-32"></div>
       </div>

      {rooms.map((roomOffer) => (
        <Card key={roomOffer.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-4 relative h-48 md:h-full min-h-[200px]">
              <Image
                src={hotelOffer.hotel.media?.[3]?.uri || hotelOffer.hotel.media?.[0]?.uri || 'https://placehold.co/400x300.png'}
                alt={`Habitación ${roomOffer.room.description.text}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="md:col-span-8 flex flex-col">
                <div className="p-6 flex-grow">
                    <CardTitle className="text-xl font-headline mb-2">{roomOffer.room.description.text}</CardTitle>
                    
                    {roomOffer.room.amenities && (
                        <div className="flex flex-wrap items-center gap-4 my-3 text-sm text-muted-foreground">
                            {roomOffer.room.amenities.map(amenity => {
                                const Icon = roomAmenityIcons[amenity] || CheckCircle2;
                                return (
                                    <div key={amenity} className="flex items-center gap-1.5">
                                        <Icon className="h-4 w-4" />
                                        <span>{formatAmenity(amenity)}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    <div className="space-y-2 mt-4 text-sm">
                        <div className="flex items-center gap-2 text-green-600">
                           <CheckCircle2 className="h-4 w-4" /> 
                           <span>Cancelación gratuita (simulado)</span>
                        </div>
                         <div className="flex items-center gap-2 text-muted-foreground">
                           <Info className="h-4 w-4" /> 
                           <span>Sin pago por adelantado (simulado)</span>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="p-6 bg-muted/30 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-muted-foreground">Precio por noche</p>
                        <p className="text-2xl font-bold text-primary">${roomOffer.price.total}</p>
                    </div>
                    <Button size="lg" onClick={() => onRoomSelected(roomOffer)}>
                        Continuar
                    </Button>
                </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
