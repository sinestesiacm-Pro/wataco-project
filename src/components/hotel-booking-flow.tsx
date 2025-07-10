'use client';

import { useState, useEffect } from 'react';
import { getHotelDetails } from '@/app/actions';
import { AmadeusHotelOffer, Room } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { HotelDetailsView } from './hotel-details-view';
import { RoomSelectionView } from './room-selection-view';
import { CheckoutView } from './checkout-view';
import { useSearchParams } from 'next/navigation';

type BookingStep = 'details' | 'rooms' | 'checkout';

interface HotelBookingFlowProps {
  offerId: string;
}

export function HotelBookingFlow({ offerId }: HotelBookingFlowProps) {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<BookingStep>('details');
  const [hotelOffer, setHotelOffer] = useState<AmadeusHotelOffer | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const adults = parseInt(searchParams.get('adults') || '1', 10);
  const children = parseInt(searchParams.get('children') || '0', 10);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getHotelDetails({ offerId });
        if (result.success && result.data) {
          setHotelOffer(result.data);
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
  }, [offerId]);

  const handleSelectRooms = () => {
    setStep('rooms');
    window.scrollTo(0, 0);
  };
  
  const handleRoomSelected = (room: Room) => {
    setSelectedRoom(room);
    setStep('checkout');
    window.scrollTo(0, 0);
  };

  const handleBackToDetails = () => {
    setStep('details');
    window.scrollTo(0, 0);
  }

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
      case 'details':
        return <HotelDetailsView hotelOffer={hotelOffer} onSeeRooms={handleSelectRooms} />;
      case 'rooms':
        return <RoomSelectionView hotelOffer={hotelOffer} onRoomSelected={handleRoomSelected} onBack={handleBackToDetails} adults={adults} children={children} />;
      case 'checkout':
        if (!selectedRoom) {
            // This should not happen in normal flow, but it's a good fallback
            return <p>Error: No se ha seleccionado ninguna habitación. <Button onClick={handleBackToRooms}>Volver</Button></p>
        }
        return <CheckoutView hotelOffer={hotelOffer} selectedRoom={selectedRoom} adults={adults} children={children} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
