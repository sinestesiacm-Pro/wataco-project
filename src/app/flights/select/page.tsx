'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchFlights } from '@/app/actions';
import type { FlightData, FlightOffer } from '@/lib/types';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { FlightFilters } from '@/components/flight-filters';
import { BookingProgressHeader } from '@/components/booking-progress-header';
import { FlightSelectionList } from '@/components/flight-selection-list';
import { ReviewAndPay } from '@/components/review-and-pay';
import { Card, CardContent } from '@/components/ui/card';
import { FlightLoadingAnimation } from '@/components/flight-loading-animation';

type BookingStep = 'outbound' | 'return' | 'review';
export type FiltersState = {
  stops: number[];
  airlines: string[];
  bags: string[];
};

function FlightSelectionPage() {
  const searchParams = useSearchParams();

  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState<BookingStep>('outbound');
  const [selectedOutbound, setSelectedOutbound] = useState<FlightOffer | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<FlightOffer | null>(null);
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

  const handleOutboundSelect = useCallback((flight: FlightOffer) => {
    setSelectedOutbound(flight);
    if (returnDate) {
      setStep('return');
    } else {
      setStep('review');
    }
    window.scrollTo(0, 0);
  }, [returnDate]);

  const handleReturnSelect = useCallback((flight: FlightOffer) => {
    setSelectedReturn(flight);
    setStep('review');
    window.scrollTo(0, 0);
  }, []);
  
  const debouncedSetFilters = useDebounce(setFilters, 300);

  const handleFilterChange = useCallback((newFilters: FiltersState) => {
    debouncedSetFilters(newFilters);
  }, [debouncedSetFilters]);

  const getFlightsForStep = (step: BookingStep) => {
    if (!flightData) return [];
    // For round trips, Amadeus returns offers containing both itineraries.
    // So for the "return" step, we can show the same list. 
    // The selection in the UI will determine which one is the "return" flight for the final review.
    return flightData.data;
  };

  const applyFilters = (flights: FlightOffer[]) => {
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
  const returnFlights = useMemo(() => applyFilters(getFlightsForStep('return')), [flightData, filters]);
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
    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: "url('/gradient-mesh-background.svg')"}}>
      <div className="min-h-screen bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <BookingProgressHeader 
              step={step} 
              isRoundTrip={!!returnDate}
              origin={originQuery}
              destination={destinationQuery}
          />
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 mt-8">
              <aside className={`lg:col-span-3 ${step === 'review' ? 'hidden lg:block' : ''}`}>
                 <FlightFilters 
                  availableAirlines={availableAirlines}
                  onFilterChange={handleFilterChange}
                 />
              </aside>
              <main className={`lg:col-span-9 ${step === 'review' ? 'lg:col-span-12' : ''}`}>
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
