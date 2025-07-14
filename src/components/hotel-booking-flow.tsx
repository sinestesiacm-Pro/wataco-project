'use client';

import { useState, useEffect } from 'react';
import { getHotelDetails } from '@/app/actions';
import { AmadeusHotelOffer, Room } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { RoomSelectionView } from './room-selection-view';
import { CheckoutView } from './checkout-view';
import { Button } from './ui/button';

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
        const result = await getHotelDetails({ offerId });
        if (result.success && result.data) {
          // Manually override dates in the fetched offer with the ones from the search
          const offerWithCorrectDates = {
            ...result.data,
            offers: result.data.offers.map(offer => ({
              ...offer,
              checkInDate: checkInDate,
              checkOutDate: checkOutDate,
            }))
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
    return <p className="text-destructive text-center">{error || 'Hotel no encontrado.'}</p>;
  }

  const renderStep = () => {
    switch (step) {
      case 'rooms':
        return <RoomSelectionView hotelOffer={hotelOffer} onRoomSelected={handleRoomSelected} adults={adults} children={children} />;
      case 'checkout':
        if (!selectedRoom) {
            // This should not happen in normal flow, but it's a good fallback
            return <p>Error: No se ha seleccionado ninguna habitación. <Button onClick={handleBackToRooms}>Volver</Button></p>
        }
        return <CheckoutView hotelOffer={hotelOffer} selectedRoom={selectedRoom} adults={adults} children={children} numberOfRooms={numberOfRooms} onBack={handleBackToRooms} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
