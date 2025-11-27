
'use client';

import { useState, useEffect } from 'react';
import { getFirestoreHotelDetails, searchHotels } from '@/app/actions';
import { AmadeusHotel, Room, AmadeusHotelOffer } from '@/lib/types';
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
  const [hotelOffer, setHotelOffer] = useState<AmadeusHotelOffer | null>(null);
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      setLoading(true);
      setError(null);
      
      if (typeof window !== "undefined" && window.history.state?.offer) {
          setHotelOffer(window.history.state.offer);
          setLoading(false);
          return;
      }

      console.warn("No offer data found in state, falling back to mock data for room selection.");
      try {
          const detailsResult = await getFirestoreHotelDetails(hotelId);
          if (!detailsResult.success || !detailsResult.data) {
            throw new Error(detailsResult.error || 'Could not load hotel details for mock offer.');
          }
          
          const mockOffer: AmadeusHotelOffer = {
              type: 'hotel-offer',
              id: hotelId,
              hotel: detailsResult.data,
              available: true,
              offers: MOCK_ROOMS_DATA.map(r => ({
                  ...r,
                  checkInDate: checkInDate,
                  checkOutDate: checkOutDate
              }))
          };
          setHotelOffer(mockOffer);
      } catch(e: any) {
          setError(e.message || 'An unexpected error occurred.');
      } finally {
          setLoading(false);
      }
    };
    
    fetchHotelData();
  }, [hotelId, checkInDate, checkOutDate]);

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
                <p className="text-sm mt-2">{error || 'Hotel no encontrado en la base de datos.'}</p>
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
