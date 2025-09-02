
'use client';

import { useState, useEffect } from 'react';
import { getFirestoreHotelDetails, getHotelOffers } from '@/app/actions';
import { AmadeusHotel, Room } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { RoomSelectionView, SelectedRoom } from './room-selection-view';
import { CheckoutView } from './checkout-view';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { MOCK_ROOMS_DATA } from '@/lib/mock-data';

type BookingStep = 'rooms' | 'checkout';

interface HotelBookingFlowProps {
  hotelId: string;
  adults: number;
  children: number;
  checkInDate: string;
  checkOutDate: string;
}

export function HotelBookingFlow({ hotelId, adults, children, checkInDate, checkOutDate }: HotelBookingFlowProps) {
  const [step, setStep] = useState<BookingStep>('rooms');
  const [hotel, setHotel] = useState<AmadeusHotel | null>(null);
  const [roomOffers, setRoomOffers] = useState<Room[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch hotel static details from Firestore first
        const detailsResult = await getFirestoreHotelDetails(hotelId);
        if (!detailsResult.success || !detailsResult.data) {
          throw new Error(detailsResult.error || 'No se pudieron cargar los detalles del hotel.');
        }
        setHotel(detailsResult.data);

        // Then, fetch real-time room offers from Amadeus
        const offersResult = await getHotelOffers(hotelId, checkInDate, checkOutDate, adults);
        if (offersResult.success && offersResult.data) {
          setRoomOffers(offersResult.data);
        } else {
          // If Amadeus fails, fallback to mock data for demo purposes
          console.warn("Amadeus API failed, falling back to mock room data.");
          setRoomOffers(MOCK_ROOMS_DATA);
        }

      } catch (e: any) {
        setError(e.message || 'Ocurrió un error inesperado.');
      } finally {
        setLoading(false);
      }
    };
    fetchHotelData();
  }, [hotelId, checkInDate, checkOutDate, adults]);

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
        <Loader2 className="h-10 w-10 animate-spin text-white" />
      </div>
    );
  }

  if (error || !hotel) {
    return (
        <Card className="bg-destructive/20 border-destructive text-destructive-foreground p-4">
            <CardContent className="pt-6 text-center">
                <h3 className="font-bold">Error al Cargar Ofertas</h3>
                <p className="text-sm mt-2">{error || 'Hotel no encontrado.'}</p>
            </CardContent>
        </Card>
    )
  }
  
  // Construct a temporary AmadeusHotelOffer object to pass to children components
  const hotelOfferForDisplay = {
    id: hotelId,
    type: 'hotel-offer' as const,
    available: true,
    hotel: hotel,
    offers: roomOffers,
  };


  const renderStep = () => {
    switch (step) {
      case 'rooms':
        return <RoomSelectionView hotelOffer={hotelOfferForDisplay} onRoomsSelected={handleRoomsSelected} adults={adults} children={children} />;
      case 'checkout':
        if (!selectedRooms || selectedRooms.length === 0) {
            return <p>Error: No se ha seleccionado ninguna habitación. <Button onClick={handleBackToRooms}>Volver</Button></p>
        }
        const totalRooms = selectedRooms.reduce((acc, curr) => acc + curr.quantity, 0);
        return <CheckoutView hotelOffer={hotelOfferForDisplay} selectedRoom={selectedRooms[0].room} adults={adults} children={children} numberOfRooms={totalRooms} onBack={handleBackToRooms} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
