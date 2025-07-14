'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getHotelDetails } from '@/app/actions';
import { AmadeusHotelOffer } from '@/lib/types';
import { HotelDetailsView } from '@/components/hotel-details-view';
import { AvailabilitySearch } from '@/components/availability-search';
import { addDays, format } from 'date-fns';

function HotelDetailPageContent({ id }: { id: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [hotelOffer, setHotelOffer] = useState<AmadeusHotelOffer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            const result = await getHotelDetails({ offerId: id });
            if (result.success && result.data) {
                setHotelOffer(result.data);
            } else {
                setError(result.error || 'No se pudieron cargar los detalles del hotel.');
            }
            setLoading(false);
        };
        fetchDetails();
    }, [id]);

    const handleAvailabilitySearch = (searchData: { checkInDate: Date, checkOutDate: Date, adults: number, children: number }) => {
        const params = new URLSearchParams({
            checkInDate: format(searchData.checkInDate, 'yyyy-MM-dd'),
            checkOutDate: format(searchData.checkOutDate, 'yyyy-MM-dd'),
            adults: searchData.adults.toString(),
            children: searchData.children.toString(),
        });
        router.push(`/hotels/${id}/offers?${params.toString()}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <Loader2 className="h-12 w-12 animate-spin text-white" />
            </div>
        );
    }

    if (error || !hotelOffer) {
        return <p className="text-destructive text-center py-10">{error}</p>;
    }
    
    // Get initial dates from URL or set defaults
    const urlCheckIn = searchParams.get('checkInDate');
    const urlCheckOut = searchParams.get('checkOutDate');
    const urlAdults = searchParams.get('adults');
    const urlChildren = searchParams.get('children');

    const initialData = {
        checkInDate: urlCheckIn ? new Date(urlCheckIn) : addDays(new Date(), 7),
        checkOutDate: urlCheckOut ? new Date(urlCheckOut) : addDays(new Date(), 14),
        adults: urlAdults ? parseInt(urlAdults, 10) : 2,
        children: urlChildren ? parseInt(urlChildren, 10) : 0,
    };

  return (
    <div className={cn('w-full min-h-screen pt-24 pb-24', 'bg-hotels-gradient background-pan-animation')}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-center">
            <Button asChild variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
            <Link href="/?tab=Hotels">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Hoteles
            </Link>
            </Button>
        </div>
        
        <HotelDetailsView hotelOffer={hotelOffer} />

        <AvailabilitySearch onSearch={handleAvailabilitySearch} initialData={initialData} />

      </div>
    </div>
  );
}

export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-hotels-gradient">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    }>
      <HotelDetailPageContent id={id} />
    </Suspense>
  );
}
