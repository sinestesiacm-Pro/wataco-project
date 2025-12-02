
'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getFirestoreHotelDetails } from '@/app/actions';
import { AmadeusHotel } from '@/lib/types';
import { HotelDetailsView } from '@/components/hotel-details-view';
import { AvailabilitySearch } from '@/components/availability-search';
import { addDays, format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';

function HotelDetailPageContent({ id }: { id: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [hotel, setHotel] = useState<AmadeusHotel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Check if we came from a search or are just viewing the hotel
    const cameFromSearch = searchParams.has('checkInDate');

    useEffect(() => {
      // If we have search params, redirect to the offers page directly.
      // This is the main fix for the broken flow.
      if (cameFromSearch) {
          const offerParams = new URLSearchParams(searchParams.toString());
          router.replace(`/hotels/${id}/offers?${offerParams.toString()}`);
      } else {
        // Otherwise, just fetch the hotel details for viewing.
        const fetchDetails = async () => {
            setLoading(true);
            const result = await getFirestoreHotelDetails(id);
            if (result.success && result.data) {
                setHotel(result.data);
            } else {
                setError(result.error || 'No se pudieron cargar los detalles del hotel.');
            }
            setLoading(false);
        };
        fetchDetails();
      }
    }, [id, cameFromSearch, searchParams, router]);

    const handleAvailabilitySearch = (searchData: { checkInDate: Date, checkOutDate: Date, adults: number, children: number, cityCode?: string, destinationName?: string }) => {
        if (!hotel) return;

        const params = new URLSearchParams({
            // Pass all necessary info for the search results page
            destinationName: hotel.address.cityName,
            checkInDate: format(searchData.checkInDate, 'yyyy-MM-dd'),
            checkOutDate: format(searchData.checkOutDate, 'yyyy-MM-dd'),
            adults: searchData.adults.toString(),
            children: searchData.children.toString(),
            cityCode: hotel.hotelId // Use a relevant code; hotelId or a mapped city code
        });

        router.push(`/hotels/search?${params.toString()}`);
    };

    if (loading || cameFromSearch) { // Show loader if loading or during the brief redirect
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !hotel) {
        return (
             <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Card className="bg-destructive/20 border-destructive text-destructive-foreground p-4">
                    <CardContent className="pt-6 text-center">
                        <h3 className="font-bold">Error al Cargar Hotel</h3>
                        <p className="text-sm mt-2">{error}</p>
                        <Button asChild variant="outline" className="mt-4 bg-transparent hover:bg-white/10">
                            <Link href="/?tab=Hotels">Volver a Hoteles</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    const initialData = {
        checkInDate: addDays(new Date(), 7),
        checkOutDate: addDays(new Date(), 14),
        adults: 2,
        children: 0,
    };

  return (
    <div className={cn('w-full min-h-screen pt-24 pb-24')}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-center">
            <Button asChild className="bg-card/80 backdrop-blur-xl border text-foreground hover:bg-accent shadow-lg">
            <Link href={'/?tab=Hotels'}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Hoteles
            </Link>
            </Button>
        </div>
        
        <HotelDetailsView hotel={hotel} />
        
        <AvailabilitySearch 
            onSearch={handleAvailabilitySearch} 
            initialData={initialData}
            showDestination={false} 
        />
      </div>
    </div>
  );
}

export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-hotels-gradient">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    }>
      <HotelDetailPageContent id={id} />
    </Suspense>
  );
}
