'use client';

import React, { Suspense } from 'react';
import { Loader2 } from "lucide-react";
import { HotelBookingFlow } from '@/components/hotel-booking-flow';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { RecommendedHotels } from '@/components/recommended-hotels';

function HotelOffersPageContent() {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get('hotelId') || '';
  const adults = searchParams.get('adults') || '1';
  const children = searchParams.get('children') || '0';
  const checkInDate = searchParams.get('checkInDate');
  const checkOutDate = searchParams.get('checkOutDate');
  
  // Construct the back link to the hotel details page, not the search results
  const backLinkHref = `/hotels/${hotelId}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${adults}&children=${children}`;


  if (!hotelId || !checkInDate || !checkOutDate) {
    return <div className="text-center text-white">Parámetros de búsqueda no válidos.</div>;
  }

  return (
    <div className={cn('w-full min-h-screen pt-24 pb-24', 'bg-hotels-gradient background-pan-animation')}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
            <div>
                <Button asChild variant="outline" className="mb-6 bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
                  <Link href={backLinkHref}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a Detalles del Hotel
                  </Link>
                </Button>
                <HotelBookingFlow 
                  hotelId={hotelId} 
                  adults={parseInt(adults, 10)} 
                  children={parseInt(children, 10)}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                />
            </div>
        </div>
      </div>
    </div>
  );
}

export default function HotelOffersPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-hotels-gradient">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    }>
      <HotelOffersPageContent />
    </Suspense>
  );
}
