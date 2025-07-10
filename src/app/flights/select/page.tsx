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
  
  const handleFilterChange = useCallback((newFilters: FiltersState) => {
    setFilters(newFilters);
  }, []);

  const getFlightsForStep = (step: BookingStep) => {
    if (!flightData) return [];
    // For simplicity, this example assumes the API returns separate offers for one-way parts of a round trip.
    // A real implementation would need more complex logic to pair outbound/return flights.
    // Here, we simulate by filtering based on the first segment's departure airport.
    if (step === 'outbound') {
      return flightData.data.filter(f => f.itineraries[0]?.segments[0]?.departure.iataCode === origin);
    }
    if (step === 'return' && returnDate) {
      return flightData.data.filter(f => f.itineraries[0]?.segments[0]?.departure.iataCode === destination);
    }
    return [];
  };

  const applyFilters = (flights: FlightOffer[]) => {
    return flights.filter(flight => {
      const stopsFilter = filters.stops.length === 0 || filters.stops.includes(flight.itineraries[0].segments.length - 1);
      const airlineFilter = filters.airlines.length === 0 || filters.airlines.includes(flight.itineraries[0].segments[0].carrierCode);
      const bagsFilter = filters.bags.length === 0 || 
        (filters.bags.includes('carry-on') && (flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags?.quantity ?? 0) >= 0) || // Assuming carry-on is always included
        (filters.bags.includes('checked') && (flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags?.quantity ?? 0) > 0);
      return stopsFilter && airlineFilter && bagsFilter;
    });
  };

  const outboundFlights = useMemo(() => applyFilters(getFlightsForStep('outbound')), [flightData, filters, origin]);
  const returnFlights = useMemo(() => applyFilters(getFlightsForStep('return')), [flightData, filters, destination]);
  const availableAirlines = useMemo(() => flightData?.dictionaries.carriers || {}, [flightData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Buscando los mejores vuelos...</p>
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
    <div className="bg-muted/40 min-h-screen">
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
