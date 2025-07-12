
'use client';

import { AmadeusHotelOffer, Room } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Tv, Wifi, Utensils, XCircle, Star, Users, BedDouble, Square, Coffee, Salad, Wine, Building } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';


const roomAmenityIcons: { [key: string]: LucideIcon } = {
  WIFI: Wifi,
  MINIBAR: Utensils,
  SAFE: Tv, // Placeholder, no hay icono 'SAFE'
  BALCONY: Tv, // Placeholder
  KITCHENETTE: Utensils,
  DESK: Tv, // Placeholder
};

const formatAmenity = (amenity: string) => {
  return amenity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

interface RoomSelectionViewProps {
  hotelOffer: AmadeusHotelOffer;
  onRoomSelected: (room: Room, numberOfRooms: number) => void;
  adults: number;
  children: number;
}

const RoomOption = ({ roomOffer, onSelect, isRecommended, adults, children }: { roomOffer: Room, onSelect: (numberOfRooms: number) => void, isRecommended: boolean, adults: number, children: number }) => {
    const isFreeCancellation = true; 
    const hasBreakfast = roomOffer.room.type !== 'STANDARD_ROOM';
    const [mealPlan, setMealPlan] = useState(hasBreakfast ? 'breakfast' : 'none');
    const [numberOfRooms, setNumberOfRooms] = useState(1);

    const totalGuests = adults + children;
    const guestsText = `${adults} adulto${adults > 1 ? 's' : ''}` + (children > 0 ? `, ${children} niño${children > 1 ? 's' : ''}` : '');

    return (
        <div className="flex flex-col md:flex-row flex-grow">
            {/* Options Column */}
            <div className="w-full md:w-1/2 p-4 flex flex-col">
                 <div className="space-y-4">
                    {isRecommended && (
                        <Badge variant="default" className="bg-accent hover:bg-accent/90 mb-2">
                            <Star className="mr-2 h-4 w-4 fill-white" /> Recomendado
                        </Badge>
                    )}
                     <div className="flex items-center gap-2 text-green-600 font-semibold">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>{isFreeCancellation ? 'Cancelación gratuita (hasta 24h antes)' : 'No reembolsable'}</span>
                    </div>
                    
                    <Separator />

                    <div>
                        <p className="font-semibold text-sm mb-3">Elige tu régimen de comidas:</p>
                        <RadioGroup value={mealPlan} onValueChange={setMealPlan}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="breakfast" id={`breakfast-${roomOffer.id}`} disabled={!hasBreakfast} />
                                <Label htmlFor={`breakfast-${roomOffer.id}`} className="flex items-center gap-2 text-muted-foreground has-[:disabled]:opacity-50">
                                   <Coffee className="h-4 w-4"/> Desayuno incluido
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="none" id={`none-${roomOffer.id}`} />
                                <Label htmlFor={`none-${roomOffer.id}`} className="flex items-center gap-2 text-muted-foreground">
                                   <Salad className="h-4 w-4"/> Solo alojamiento
                                </Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all-inclusive" id={`all-${roomOffer.id}`} disabled/>
                                <Label htmlFor={`all-${roomOffer.id}`} className="flex items-center gap-2 text-muted-foreground has-[:disabled]:opacity-50">
                                   <Wine className="h-4 w-4"/> Todo Incluido <span className="text-xs">(+ $150.00)</span>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                 </div>
                 <div className="flex-grow"></div>
            </div>
            
            {/* Price Column */}
            <div className="w-full md:w-1/2 p-4 flex flex-col bg-muted/30">
                <div className="text-right">
                    <p className="text-xs text-muted-foreground">Precio por noche</p>
                    <p className="text-3xl font-bold text-primary">${roomOffer.price.total}</p>
                    <p className="text-xs text-muted-foreground">Impuestos incluidos</p>
                </div>
                
                 <div className="flex flex-col gap-4 mt-auto pt-4">
                    <div>
                        <Label className="text-xs font-semibold">Habitaciones</Label>
                        <Select 
                            defaultValue="1" 
                            onValueChange={(value) => setNumberOfRooms(parseInt(value, 10))}
                            disabled={adults <= 1 && children === 0}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 habitación</SelectItem>
                            <SelectItem value="2">2 habitaciones</SelectItem>
                            <SelectItem value="3">3 habitaciones</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                    <Button size="lg" className="w-full" onClick={() => onSelect(numberOfRooms)}>
                        Continuar
                    </Button>
                    <div className="mt-2 text-left space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            {isFreeCancellation ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-destructive" />}
                            <span>{isFreeCancellation ? 'Cancelación gratuita' : 'No reembolsable'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {mealPlan === 'breakfast' ? <Coffee className="h-4 w-4 text-primary" /> : <Salad className="h-4 w-4 text-primary" />}
                            <span>{mealPlan === 'breakfast' ? 'Desayuno incluido' : 'Solo alojamiento'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Tarifa para {guestsText}</span>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    )
};


export function RoomSelectionView({ hotelOffer, onRoomSelected, adults, children }: RoomSelectionViewProps) {
  const rooms = hotelOffer.offers;

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-headline text-white">{hotelOffer.hotel.name} - Elige tu habitación</h2>
             <div className="w-32"></div>
       </div>

        <div className="hidden md:grid grid-cols-12 px-4 text-sm font-semibold text-muted-foreground uppercase">
            <div className="col-span-5">Tipo de Habitación</div>
            <div className="col-span-7 grid grid-cols-12">
                <div className="col-span-6">Opciones</div>
                <div className="col-span-6 text-right pr-4">Precio</div>
            </div>
        </div>

      {rooms.map((roomOffer, index) => (
        <Card key={roomOffer.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-12 flex-grow">

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
                <RoomOption 
                    roomOffer={roomOffer} 
                    onSelect={(numRooms) => onRoomSelected(roomOffer, numRooms)} 
                    isRecommended={index === 0}
                    adults={adults}
                    children={children}
                />
            </div>

          </div>
        </Card>
      ))}
    </div>
  );
}
