'use client';

import { useState, useEffect } from 'react';
import { AmadeusHotel, Room, AmadeusHotelOffer } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { RoomSelectionView, SelectedRoom } from './room-selection-view';
import { CheckoutView } from './checkout-view';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

type BookingStep = 'rooms' | 'checkout';

interface HotelBookingFlowProps {
  hotelOffer: AmadeusHotelOffer;
  adults: number;
  children: number;
}

export function HotelBookingFlow({ hotelOffer, adults, children }: HotelBookingFlowProps) {
  const [step, setStep] = useState<BookingStep>('rooms');
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);

  const handleRoomsSelected = (rooms: SelectedRoom[]) => {
    setSelectedRooms(rooms);
    setStep('checkout');
    window.scrollTo(0, 0);
  };

  const handleBackToRooms = () => {
    setStep('rooms');
    window.scrollTo(0, 0);
  }

  if (!hotelOffer) {
    return (
        <Card className="bg-destructive/20 border-destructive text-destructive-foreground p-4">
            <CardContent className="pt-6 text-center">
                <h3 className="font-bold">Error al Cargar Ofertas</h3>
                <p className="text-sm mt-2">No se encontró la información de la oferta del hotel.</p>
            </CardContent>
        </Card>
    )
  }
  
  const renderStep = () => {
    switch (step) {
      case 'rooms':
        return <RoomSelectionView hotelOffer={hotelOffer} onRoomsSelected={handleRoomsSelected} adults={adults} children={children} />;
      case 'checkout':
        if (!selectedRooms || selectedRooms.length === 0) {
            return <p>Error: No se ha seleccionado ninguna habitación. <Button onClick={handleBackToRooms}>Volver</Button></p>
        }
        const totalRooms = selectedRooms.reduce((acc, curr) => acc + curr.quantity, 0);
        return <CheckoutView hotelOffer={hotelOffer} selectedRoom={selectedRooms[0].room} adults={adults} children={children} numberOfRooms={totalRooms} onBack={handleBackToRooms} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
