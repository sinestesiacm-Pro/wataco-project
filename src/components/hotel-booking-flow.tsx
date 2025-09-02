'use client';

import { useState, useEffect } from 'react';
import { getFirestoreHotelDetails } from '@/app/actions';
import { AmadeusHotelOffer, Room } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { RoomSelectionView, SelectedRoom } from './room-selection-view';
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
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);
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

  const handleRoomsSelected = (rooms: SelectedRoom[]) => {
    setSelectedRooms(rooms);
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
        return <RoomSelectionView hotelOffer={hotelOffer} onRoomsSelected={handleRoomsSelected} adults={adults} children={children} />;
      case 'checkout':
        if (!selectedRooms || selectedRooms.length === 0) {
            return <p>Error: No se ha seleccionado ninguna habitación. <Button onClick={handleBackToRooms}>Volver</Button></p>
        }
        // NOTE: The checkout view now needs to handle an array of rooms.
        // For simplicity of this demo, we'll pass the first selected room type and total rooms,
        // but a real implementation would need to update CheckoutView to show all selected room types.
        const totalRooms = selectedRooms.reduce((acc, curr) => acc + curr.quantity, 0);
        return <CheckoutView hotelOffer={hotelOffer} selectedRoom={selectedRooms[0].room} adults={adults} children={children} numberOfRooms={totalRooms} onBack={handleBackToRooms} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
