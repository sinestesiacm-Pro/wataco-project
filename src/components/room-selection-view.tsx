'use client';

import { AmadeusHotelOffer, Room } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Tv, Wifi, Utensils, XCircle, Star, Users, BedDouble, Square, Coffee, Salad, Wine, Building, Minus, Plus, ShoppingCart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Separator } from './ui/separator';
import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const roomAmenityIcons: { [key: string]: LucideIcon } = {
  WIFI: Wifi,
  MINIBAR: Utensils,
  SAFE: Tv,
  BALCONY: Tv,
  KITCHENETTE: Utensils,
  DESK: Tv,
};

const formatAmenity = (amenity: string) => {
  return amenity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export type SelectedRoom = {
    room: Room;
    quantity: number;
}

interface RoomOptionProps {
  roomOffer: Room;
  onAdd: () => void;
  onRemove: () => void;
  quantity: number;
  isRecommended: boolean;
}

const RoomOption = React.memo(function RoomOption({ roomOffer, onAdd, onRemove, quantity, isRecommended }: RoomOptionProps) {
    const isFreeCancellation = true; 
    const roomCapacity = parseInt(roomOffer.room.type.split('_')[0] || '2');
    const roomTypeName = roomOffer.room.description.text;

    return (
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col md:flex-row bg-card text-card-foreground rounded-2xl">
            <div className="md:col-span-5 p-6 flex flex-col justify-between md:w-1/2">
                <div>
                   <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                     <Image
                        src={roomOffer.room.photo || 'https://placehold.co/400x300.png'}
                        alt={`Habitación ${roomTypeName}`}
                        fill
                        className="object-cover"
                        data-ai-hint="hotel room"
                      />
                   </div>
                   <h3 className="text-xl font-bold font-headline mb-2">{roomTypeName}</h3>
                   {isRecommended && (
                        <Badge variant="default" className="bg-accent hover:bg-accent/90 mb-2">
                            <Star className="mr-2 h-4 w-4 fill-white" /> Opción recomendada
                        </Badge>
                   )}
                   
                   <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /><span>Hasta {roomCapacity} Huéspedes</span></div>
                        <div className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-primary" /><span>{roomOffer.room.bedType || '1 Cama Doble'}</span></div>
                        <div className="flex items-center gap-2"><Square className="h-4 w-4 text-primary" /><span>{roomOffer.room.size || '25'} m²</span></div>
                         <div className="flex items-center gap-2 text-green-600 font-semibold">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>{isFreeCancellation ? 'Cancelación gratuita' : 'No reembolsable'}</span>
                        </div>
                   </div>

                   {roomOffer.room.amenities && (
                        <div className="space-y-1 mt-4 text-sm text-muted-foreground">
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
            </div>

            <div className="md:col-span-7 flex flex-col bg-muted/20 md:w-1/2 p-6 justify-between">
                <div className="text-right text-card-foreground">
                    <p className="text-xs text-muted-foreground">Precio por noche</p>
                    <p className="text-3xl font-bold text-card-foreground">${parseFloat(roomOffer.price.total).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Impuestos incluidos</p>
                </div>
                 <div className="flex flex-col items-center gap-4 mt-auto pt-4">
                     <p className="font-semibold">Seleccionar cantidad:</p>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={onRemove} disabled={quantity === 0}>
                            <Minus className="h-5 w-5" />
                        </Button>
                        <span className="font-bold text-2xl w-8 text-center">{quantity}</span>
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={onAdd}>
                            <Plus className="h-5 w-5" />
                        </Button>
                    </div>
                 </div>
            </div>
        </Card>
    )
});


interface RoomSelectionViewProps {
  hotelOffer: AmadeusHotelOffer;
  onRoomsSelected: (rooms: SelectedRoom[]) => void;
  adults: number;
  children: number;
}


export function RoomSelectionView({ hotelOffer, onRoomsSelected, adults, children }: RoomSelectionViewProps) {
  const rooms = hotelOffer.offers;
  const totalGuests = adults + children;

  const [selectedRooms, setSelectedRooms] = useState<{[roomId: string]: SelectedRoom}>({});

  const handleAddRoom = useCallback((roomOffer: Room) => {
    setSelectedRooms(prev => {
        const existing = prev[roomOffer.id];
        const newQuantity = (existing?.quantity || 0) + 1;
        return {
            ...prev,
            [roomOffer.id]: { room: roomOffer, quantity: newQuantity }
        };
    });
  }, []);

  const handleRemoveRoom = useCallback((roomOffer: Room) => {
      setSelectedRooms(prev => {
        const existing = prev[roomOffer.id];
        if (!existing || existing.quantity === 0) return prev;
        
        const newQuantity = existing.quantity - 1;
        if (newQuantity === 0) {
            const newSelection = {...prev};
            delete newSelection[roomOffer.id];
            return newSelection;
        } else {
            return {
                ...prev,
                [roomOffer.id]: { ...existing, quantity: newQuantity }
            };
        }
      });
  }, []);

  const { totalCapacity, totalPrice, selectionArray } = useMemo(() => {
    const selectionArray = Object.values(selectedRooms);
    let totalCapacity = 0;
    let totalPrice = 0;
    
    selectionArray.forEach(selection => {
        const roomCapacity = parseInt(selection.room.room.type.split('_')[0] || '2');
        totalCapacity += roomCapacity * selection.quantity;
        totalPrice += parseFloat(selection.room.price.total) * selection.quantity;
    });

    return { totalCapacity, totalPrice, selectionArray };
  }, [selectedRooms]);

  const canProceed = totalCapacity >= totalGuests && selectionArray.length > 0;
  
  const guestsText = useMemo(() => `${adults} adulto${adults > 1 ? 's' : ''}` + (children > 0 ? `, ${children} niño${children > 1 ? 's' : ''}` : ''), [adults, children]);


  return (
    <div className="space-y-6 pb-32"> {/* Padding at bottom for summary bar */}
       <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-headline text-white">{hotelOffer.hotel.name} - Elige tu habitación</h2>
       </div>
       <p className="text-white/80 -mt-6">Has buscado para <span className="font-bold">{guestsText}</span>. Selecciona una o más habitaciones para alojar a todo tu grupo.</p>

      {rooms.map((roomOffer, index) => {
         const roomCapacity = parseInt(roomOffer.room.type.split('_')[0] || '2');
         const isRecommended = totalGuests > 2 && roomCapacity >= 4 && index === 0;

        return (
           <RoomOption 
                key={roomOffer.id}
                roomOffer={roomOffer}
                onAdd={() => handleAddRoom(roomOffer)}
                onRemove={() => handleRemoveRoom(roomOffer)}
                quantity={selectedRooms[roomOffer.id]?.quantity || 0}
                isRecommended={isRecommended}
           />
        )
      })}

      <AnimatePresence>
        {selectionArray.length > 0 && (
            <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 200, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:max-w-4xl z-50"
            >
                <Card className="bg-primary/90 backdrop-blur-lg border-2 border-primary-foreground/50 text-primary-foreground p-4 shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <ShoppingCart className="h-8 w-8 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold">Tu Selección</h3>
                                <p className="text-sm opacity-80">
                                   {selectionArray.map(s => `${s.quantity}x ${s.room.room.description.text}`).join(', ')}
                                </p>
                            </div>
                        </div>
                        <Separator orientation="vertical" className="h-12 hidden md:block bg-primary-foreground/30" />
                        <div className="text-center">
                            <p className="font-bold text-xl">${totalPrice.toFixed(2)}</p>
                            <p className="text-xs opacity-80">Capacidad para {totalCapacity} huéspedes</p>
                        </div>
                        <Button 
                            size="lg" 
                            className="w-full md:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 disabled:opacity-70"
                            disabled={!canProceed}
                            onClick={() => onRoomsSelected(selectionArray)}
                        >
                            {canProceed ? 'Reservar' : `Faltan ${totalGuests - totalCapacity} plazas`}
                        </Button>
                    </div>
                </Card>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
