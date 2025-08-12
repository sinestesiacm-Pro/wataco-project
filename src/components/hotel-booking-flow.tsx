'use client';

import { useState, useEffect } from 'react';
import { getFirestoreHotelDetails } from '@/app/actions';
import { AmadeusHotelOffer, Room } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { RoomSelectionView } from './room-selection-view';
import { CheckoutView } from './checkout-view';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { MOCK_ROOMS_DATA } from '@/lib/mock-data';

type BookingStep = 'rooms' | 'checkout';

interface HotelBookingFlowProps {
  offerId: string;
  adults: number;
  children: number;
  checkInDate: string;
  checkOutDate: string;
}

export function HotelBookingFlow({ offerId, adults, children, checkInDate, checkOutDate }: HotelBookingFlowProps) {
  const [step, setStep] = useState<BookingStep>('rooms');
  const [hotelOffer, setHotelOffer] = useState<AmadeusHotelOffer | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getFirestoreHotelDetails(offerId);
        if (result.success && result.data) {
           const offersWithCorrectDates = MOCK_ROOMS_DATA.map(offer => ({
            ...offer,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
          }));

          const offerWithCorrectDates = {
            ...result.data,
            offers: offersWithCorrectDates,
          };
          setHotelOffer(offerWithCorrectDates);
        } else {
          setError(result.error || 'No se pudieron cargar los detalles del hotel.');
        }
      } catch (e: any) {
        setError(e.message || 'Ocurrió un error inesperado.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [offerId, checkInDate, checkOutDate]);

  const handleRoomSelected = (room: Room, numRooms: number) => {
    setSelectedRoom(room);
    setNumberOfRooms(numRooms);
    setStep('checkout');
    window.scrollTo(0, 0);
  };

  const handleBackToRooms = () => {
    setStep('rooms');
    window.scrollTo(0, 0);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !hotelOffer) {
    return (
        <Card className="bg-destructive/20 border-destructive text-destructive-foreground p-4">
            <CardContent className="pt-6 text-center">
                <h3 className="font-bold">Error al Cargar Ofertas</h3>
                <p className="text-sm mt-2">{error || 'Hotel no encontrado.'}</p>
            </CardContent>
        </Card>
    )
  }

  const renderStep = () => {
    switch (step) {
      case 'rooms':
        return <RoomSelectionView hotelOffer={hotelOffer} onRoomSelected={handleRoomSelected} adults={adults} children={children} />;
      case 'checkout':
        if (!selectedRoom) {
            return <p>Error: No se ha seleccionado ninguna habitación. <Button onClick={handleBackToRooms}>Volver</Button></p>
        }
        return <CheckoutView hotelOffer={hotelOffer} selectedRoom={selectedRoom} adults={adults} children={children} numberOfRooms={numberOfRooms} onBack={handleBackToRooms} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
