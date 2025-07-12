
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchFlights } from '@/app/actions';
import type { FlightData, FlightOffer, Dictionaries, FareDetailsBySegment } from '@/lib/types';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Loader2, ArrowLeft, Filter } from 'lucide-react';
import { FlightFilters } from '@/components/flight-filters';
import { BookingProgressHeader } from '@/components/booking-progress-header';
import { FlightSelectionList } from '@/components/flight-selection-list';
import { ReviewAndPay } from '@/components/review-and-pay';
import { Card, CardContent } from '@/components/ui/card';
import { FlightLoadingAnimation } from '@/components/flight-loading-animation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

type BookingStep = 'outbound' | 'return' | 'review';
export type FiltersState = {
  stops: number[];
  airlines: string[];
  bags: string[];
};

function FlightSelectionPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState<BookingStep>('outbound');
  const [selectedOutbound, setSelectedOutbound] = useState<FlightOffer | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<FlightOffer | null>(null);
  
  const [outboundAddons, setOutboundAddons] = useState(0);
  const [returnAddons, setReturnAddons] = useState(0);

  const [filters, setFilters] = useState<FiltersState>({ stops: [], airlines: [], bags: [] });

  const origin = searchParams.get('origin')!;
  const destination = searchParams.get('destination')!;
  const departureDate = searchParams.get('departureDate')!;
  const returnDate = searchParams.get('returnDate');
  const adults = parseInt(searchParams.get('adults') || '1', 10);
  const originQuery = searchParams.get('originQuery') || origin;
  const destinationQuery = searchParams.get('destinationQuery') || destination;

  useEffect(() => {
    const fetchInitialFlights = async () => {
      setLoading(true);
      setError(null);
      const result = await searchFlights({
        origin,
        destination,
        departureDate,
        returnDate: returnDate || undefined,
        adults,
      });

      if (result.success && result.data) {
        setFlightData(result.data);
      } else {
        setError(result.error || 'No se pudieron encontrar vuelos para esta ruta.');
      }
      setLoading(false);
    };

    if (origin && destination && departureDate) {
      fetchInitialFlights();
    }
  }, [origin, destination, departureDate, returnDate, adults]);

  const handleOutboundSelect = useCallback((flight: FlightOffer, addons: number) => {
    setSelectedOutbound(flight);
    setOutboundAddons(addons);
    if (returnDate) {
      setStep('return');
      toast({
        title: "Vuelo de Ida Seleccionado",
        description: "Ahora, por favor elige tu vuelo de vuelta.",
        variant: "success",
      });
    } else {
      setStep('review');
    }
    window.scrollTo(0, 0);
  }, [returnDate, toast]);

  const handleReturnSelect = useCallback((flight: FlightOffer, addons: number) => {
    setSelectedReturn(flight);
    setReturnAddons(addons);
    setStep('review');
    window.scrollTo(0, 0);
  }, []);
  
  const handleFilterChange = useCallback((newFilters: FiltersState) => {
    setFilters(newFilters);
  }, []);

  const getFlightsForStep = (step: BookingStep) => {
    if (!flightData) return [];
    // For round trips, Amadeus returns offers containing both itineraries.
    // So for the "return" step, we can show the same list. 
    // The selection in the UI will determine which one is the "return" flight for the final review.
    return flightData.data;
  };

  const applyFilters = (flights: FlightOffer[]) => {
    if (!filters) return flights;
    return flights.filter(flight => {
        // Stops filter
        const stopCount = flight.itineraries[0].segments.length - 1;
        const stopsFilter = filters.stops.length === 0 || 
                            (filters.stops.includes(2) ? stopCount >= 2 : filters.stops.includes(stopCount));
        
        // Airlines filter
        const airlineFilter = filters.airlines.length === 0 || 
                              filters.airlines.includes(flight.validatingAirlineCodes[0]);

        // Bags filter
        const bagsFilter = filters.bags.length === 0 || 
            (filters.bags.includes('carry-on') && (flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags?.quantity ?? 0) >= 0) ||
            (filters.bags.includes('checked') && (flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags?.quantity ?? 0) > 0);
        
        return stopsFilter && airlineFilter && bagsFilter;
    });
};


  const outboundFlights = useMemo(() => applyFilters(getFlightsForStep('outbound')), [flightData, filters]);
  const returnFlights = useMemo(() => {
     if (!selectedOutbound) return applyFilters(getFlightsForStep('return'));
     // Filter out the exact same flight if it's shown for return
     return applyFilters(getFlightsForStep('return')).filter(f => f.id !== selectedOutbound.id);
  }, [flightData, filters, selectedOutbound]);

  const availableAirlines = useMemo(() => {
    if (!flightData) return {};
    const carriers = new Set<string>();
    flightData.data.forEach(flight => {
        carriers.add(flight.validatingAirlineCodes[0]);
    });
    const result: Dictionaries['carriers'] = {};
    carriers.forEach(code => {
        if (flightData.dictionaries.carriers[code]) {
            result[code] = flightData.dictionaries.carriers[code];
        }
    });
    return result;
  }, [flightData]);


  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <FlightLoadingAnimation originName={originQuery} destinationName={destinationQuery} />
        </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-bold text-destructive">Error de Búsqueda</h2>
            <p className="text-muted-foreground mt-2">{error}</p>
             <Button asChild variant="outline" className="mt-4">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a la Búsqueda
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!flightData) {
      return null;
  }
  
  const renderStepContent = () => {
    switch (step) {
      case 'outbound':
        return (
          <FlightSelectionList
            flights={outboundFlights}
            dictionaries={flightData.dictionaries}
            onSelectFlight={handleOutboundSelect}
            title={`Vuelos de ida a ${destinationQuery}`}
          />
        );
      case 'return':
        return (
          <FlightSelectionList
            flights={returnFlights}
            dictionaries={flightData.dictionaries}
            onSelectFlight={handleReturnSelect}
            title={`Vuelos de vuelta a ${originQuery}`}
            selectedOutboundFlight={selectedOutbound}
          />
        );
      case 'review':
          if (!selectedOutbound) return <p>Error: Vuelo de ida no seleccionado.</p>
        return (
            <ReviewAndPay 
                outboundFlight={selectedOutbound}
                returnFlight={selectedReturn}
                dictionaries={flightData.dictionaries}
                addonsPrice={outboundAddons + returnAddons}
                onOutboundChange={() => {
                    setSelectedReturn(null);
                    setStep('outbound');
                }}
                onReturnChange={returnDate ? () => setStep('return') : undefined}
            />
        )
      default:
        return null;
    }
  }

  return (
    <div className={cn('min-h-screen w-full', 'bg-flights-gradient background-pan-animation')}>
      <div className="min-h-screen bg-transparent">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Button asChild variant="outline" className="mb-6 bg-transparent">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a la Búsqueda
                </Link>
            </Button>
          <BookingProgressHeader 
              step={step} 
              isRoundTrip={!!returnDate}
              origin={originQuery}
              destination={destinationQuery}
          />
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 mt-8">
              {step !== 'review' && (
                <>
                  <aside className="hidden lg:block lg:col-span-3">
                      <FlightFilters 
                          availableAirlines={availableAirlines}
                          onFilterChange={handleFilterChange}
                      />
                  </aside>
                  <div className="lg:hidden fixed bottom-6 right-6 z-50">
                    <Sheet>
                      <SheetTrigger asChild>
                         <Button size="lg" className="rounded-full shadow-lg">
                           <Filter className="mr-2 h-5 w-5"/>
                           Filtros
                         </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="h-[80vh]">
                        <FlightFilters 
                            availableAirlines={availableAirlines}
                            onFilterChange={handleFilterChange}
                        />
                      </SheetContent>
                    </Sheet>
                  </div>
                </>
              )}
              <main className={step !== 'review' ? 'lg:col-span-9' : 'lg:col-span-12'}>
                  {renderStepContent()}
              </main>
          </div>

        </div>
      </div>
    </div>
  );
}


export default function FlightSelectPageWrapper() {
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    }>
        <FlightSelectionPage />
    </Suspense>
  )
}
