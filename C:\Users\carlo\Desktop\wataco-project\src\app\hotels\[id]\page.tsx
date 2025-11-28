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
import { addDays, format, parse } from 'date-fns';
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
    }, [id]);

    const handleAvailabilitySearch = (searchData: { checkInDate: Date, checkOutDate: Date, adults: number, children: number, cityCode?: string, destinationName?: string }) => {
        if (!hotel) return;

        const params = new URLSearchParams({
            destinationName: hotel.address.cityName,
            checkInDate: format(searchData.checkInDate, 'yyyy-MM-dd'),
            checkOutDate: format(searchData.checkOutDate, 'yyyy-MM-dd'),
            adults: searchData.adults.toString(),
            children: searchData.children.toString(),
        });
        if (hotel.address.countryCode) {
            params.set('cityCode', hotel.address.countryCode);
        }

        // Redirect to the search results page for this specific hotel
        router.push(`/hotels/search?${params.toString()}`);
    };
    
    const getInitialDate = (param: string | null, fallback: Date): Date => {
        if (!param) return fallback;
        try {
            // Ensure correct parsing for 'yyyy-MM-dd'
            return parse(param, 'yyyy-MM-dd', new Date());
        } catch {
            return fallback;
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !hotel) {
        return (
             <Card className="bg-destructive/20 border-destructive text-destructive-foreground p-4">
                <CardContent className="pt-6 text-center">
                    <h3 className="font-bold">Error al Cargar Hotel</h3>
                    <p className="text-sm mt-2">{error}</p>
                    <Button asChild variant="outline" className="mt-4">
                        <Link href="/?tab=Hotels">Volver</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

  return (
    <div className={cn('w-full min-h-screen pt-24 pb-24')}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-center">
            <Button asChild className="bg-card/80 backdrop-blur-xl border text-foreground hover:bg-accent shadow-lg">
            <Link href={cameFromSearch ? `/hotels/search?${searchParams.toString()}` : '/?tab=Hotels'}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
            </Link>
            </Button>
        </div>
        
        <HotelDetailsView hotel={hotel} />
        
        <AvailabilitySearch 
            onSearch={handleAvailabilitySearch} 
            initialData={{
                checkInDate: getInitialDate(searchParams.get('checkInDate'), addDays(new Date(), 7)),
                checkOutDate: getInitialDate(searchParams.get('checkOutDate'), addDays(new Date(), 14)),
                adults: parseInt(searchParams.get('adults') || '2'),
                children: parseInt(searchParams.get('children') || '0'),
            }}
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