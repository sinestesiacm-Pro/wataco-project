
'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HotelBookingFlow } from '@/components/hotel-booking-flow';
import { AmadeusHotelOffer } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

function HotelOffersPageContent({ id }: { id: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [offer, setOffer] = useState<AmadeusHotelOffer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // The offer object is passed via router state
        if (typeof window !== "undefined" && window.history.state?.offer) {
            setOffer(window.history.state.offer);
        } else {
            // Handle direct navigation case if needed, maybe redirect or show error
            console.error("No hotel offer data found in state. Please start from search.");
        }
        setLoading(false);
    }, [id]);


    // Reconstruct the search query string for the back button
    const backLinkHref = `/hotels/search?${searchParams.toString()}`;
    const adults = searchParams.get('adults') || '1';
    const children = searchParams.get('children') || '0';
    const checkInDate = searchParams.get('checkInDate');
    const checkOutDate = searchParams.get('checkOutDate');

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

     if (!checkInDate || !checkOutDate) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <Card>
                    <CardContent className="pt-6 text-center">
                        <p>Fechas de check-in o check-out no especificadas.</p>
                        <Button asChild variant="link">
                            <Link href="/?tab=Hotels">Volver a la búsqueda</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!offer) {
         return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <Card>
                    <CardContent className="pt-6 text-center">
                        <p>No se encontró la información de la oferta del hotel. Por favor, vuelve a la página de búsqueda.</p>
                        <Button asChild variant="link">
                            <Link href="/?tab=Hotels">Volver a la búsqueda</Link>
                        </Button>
                    </CardContent>
                </Card>
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
            hotelOffer={offer}
            adults={parseInt(adults, 10)} 
            children={parseInt(children, 10)}
        />
      </div>
    </div>
  );
}

export default function HotelOffersPage({ params }: { params: Promise<{ id: string }> }) {
  // Correctly unwrap the Promise-like params object with React.use()
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  
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
