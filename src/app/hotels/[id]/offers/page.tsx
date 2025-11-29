
'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AmadeusHotelOffer, Room } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { searchHotels } from '@/app/actions';
import { MOCK_ROOMS_DATA } from '@/lib/mock-data';
import { getFirestoreHotelDetails } from '@/app/actions';
import { RoomSelectionView, SelectedRoom } from '@/components/room-selection-view';
import { CheckoutView } from '@/components/checkout-view';


type BookingStep = 'rooms' | 'checkout';

function HotelOffersPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [step, setStep] = useState<BookingStep>('rooms');
    const [hotelOffer, setHotelOffer] = useState<AmadeusHotelOffer | null>(null);
    const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const hotelId = searchParams.get('hotelId') || '';
    const cityCode = searchParams.get('cityCode') || '';
    const checkInDate = searchParams.get('checkInDate') || '';
    const checkOutDate = searchParams.get('checkOutDate') || '';
    const adults = parseInt(searchParams.get('adults') || '1', 10);
    const children = parseInt(searchParams.get('children') || '0', 10);
    

    useEffect(() => {
        const fetchHotelData = async () => {
            setLoading(true);
            setError(null);
            
            if (typeof window !== "undefined" && window.history.state?.offer) {
                setHotelOffer(window.history.state.offer);
                setLoading(false);
                return;
            }

            if (hotelId && checkInDate && checkOutDate) {
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
                } catch (e: any) {
                    setError(e.message || 'An unexpected error occurred while fetching hotel data.');
                }
            } else {
                setError("Información de búsqueda incompleta. Por favor, vuelve a empezar.");
            }

            setLoading(false);
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
    };
    
    // Reconstruct the search query string for the back button
    const backLinkHref = `/hotels/search?${searchParams.toString()}`;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

     if (error || !hotelOffer) {
         return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <Card>
                    <CardContent className="pt-6 text-center">
                        <p className="text-destructive font-semibold">Error</p>
                        <p>{error || 'No se encontró la oferta del hotel.'}</p>
                        <Button asChild variant="link" className="mt-4">
                            <Link href="/?tab=Hotels">Volver a la búsqueda</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
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


  return (
    <div className={cn('w-full min-h-screen pt-24 pb-24')}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-center">
            <Button asChild className="bg-card/80 backdrop-blur-xl border text-foreground hover:bg-accent shadow-lg">
                <Link href={backLinkHref}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a los resultados
                </Link>
            </Button>
        </div>
        {renderStep()}
      </div>
    </div>
  );
}

export default function HotelOffersPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    }>
      <HotelOffersPageContent />
    </Suspense>
  );
}
