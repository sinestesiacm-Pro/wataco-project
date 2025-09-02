
'use client';

import { useState, useEffect } from 'react';
import { getFirestoreHotelDetails } from '@/app/actions';
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

// In a real app, this would be fetched or passed, but for this component we can create a mock
const createMockHotelOffer = (hotel: AmadeusHotel, rooms: Room[]): AmadeusHotelOffer => ({
    id: hotel.hotelId,
    type: 'hotel-offer',
    available: true,
    hotel,
    offers: rooms,
});

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
      try {
        const detailsResult = await getFirestoreHotelDetails(hotelId);
        if (!detailsResult.success || !detailsResult.data) {
          throw new Error(detailsResult.error || 'No se pudieron cargar los detalles del hotel.');
        }
        
        // As the offers are now passed from the search results page,
        // we can just use the details from Firestore and mock rooms for the offer object.
        // In a real scenario, the full offer object would be passed as a prop.
        const mockOffer = createMockHotelOffer(detailsResult.data, MOCK_ROOMS_DATA);
        setHotelOffer(mockOffer);

      } catch (e: any) {
        setError(e.message || 'Ocurrió un error inesperado.');
      } finally {
        setLoading(false);
      }
    };
    
    // Check if hotel offer data is passed via history state
    if (typeof window !== "undefined" && window.history.state?.offer) {
        setHotelOffer(window.history.state.offer);
        setLoading(false);
    } else {
        // Fallback to fetching if no state is present (e.g., direct navigation)
        fetchHotelData();
    }

  }, [hotelId]);

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
        const totalRooms = selectedRooms.reduce((acc, curr) => acc + curr.quantity, 0);
        return <CheckoutView hotelOffer={hotelOffer} selectedRoom={selectedRooms[0].room} adults={adults} children={children} numberOfRooms={totalRooms} onBack={handleBackToRooms} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
