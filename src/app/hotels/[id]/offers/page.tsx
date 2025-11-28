
'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HotelBookingFlow } from '@/components/hotel-booking-flow';

function HotelOffersPageContent({ id }: { id: string }) {
    const searchParams = useSearchParams();

    // Reconstruct the search query string for the back button
    const backLinkHref = `/hotels/search?${searchParams.toString()}`;
    const adults = searchParams.get('adults') || '1';
    const children = searchParams.get('children') || '0';
    const checkInDate = searchParams.get('checkInDate');
    const checkOutDate = searchParams.get('checkOutDate');

     if (!checkInDate || !checkOutDate) {
        return (
             <div className="text-center text-white">
                <p>Fechas de check-in o check-out no especificadas.</p>
                 <Button asChild variant="link">
                    <Link href="/?tab=Hotels">Volver a la búsqueda</Link>
                </Button>
            </div>
        )
    }

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
        
         <HotelBookingFlow 
            hotelId={id} 
            adults={parseInt(adults, 10)} 
            children={parseInt(children, 10)}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
        />
      </div>
    </div>
  );
}

export default function HotelOffersPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    }>
      <HotelOffersPageContent id={id} />
    </Suspense>
  );
}
