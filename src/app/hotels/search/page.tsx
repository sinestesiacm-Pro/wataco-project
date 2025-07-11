'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Filter } from "lucide-react";
import { searchHotels } from "@/app/actions";
import type { AmadeusHotelOffer } from "@/lib/types";
import { HotelResults } from "@/components/hotel-results";
import { HotelFilters } from "@/components/hotel-filters";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AITravelTips } from "@/components/ai-travel-tips";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type HotelFiltersState = {
  stars: number[];
  amenities: string[];
  priceRange: number[];
};

function HotelResultsPage() {
    const searchParams = useSearchParams();
    const [hotels, setHotels] = useState<AmadeusHotelOffer[] | null>(null);
    const [filteredHotels, setFilteredHotels] = useState<AmadeusHotelOffer[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const cityCode = searchParams.get('cityCode') || '';
    const checkInDate = searchParams.get('checkInDate') || '';
    const checkOutDate = searchParams.get('checkOutDate') || '';
    const adults = searchParams.get('adults') || '1';
    const children = searchParams.get('children') || '0';
    const destinationName = searchParams.get('destinationName') || 'tu destino';

    useEffect(() => {
        if (cityCode && checkInDate && checkOutDate) {
            setLoading(true);
            searchHotels({
                cityCode,
                checkInDate,
                checkOutDate,
                adults: parseInt(adults, 10),
            }).then(result => {
                if(result.success && result.data) {
                    setHotels(result.data);
                    setFilteredHotels(result.data);
                } else {
                    setError(result.error || 'No se encontraron hoteles para tu búsqueda.');
                }
                setLoading(false);
            })
        }
    }, [cityCode, checkInDate, checkOutDate, adults]);
    
    const handleFilterChange = (filters: HotelFiltersState) => {
        if (!hotels) return;

        let tempHotels = [...hotels];

        // Star rating filter
        if (filters.stars.length > 0) {
            tempHotels = tempHotels.filter(h => h.hotel.rating && filters.stars.includes(parseInt(h.hotel.rating)));
        }

        // Amenities filter
        if (filters.amenities.length > 0) {
            tempHotels = tempHotels.filter(h => {
                if (!h.hotel.amenities) return false;
                return filters.amenities.every(a => h.hotel.amenities?.includes(a));
            });
        }
        
        // Price range filter
        if (filters.priceRange) {
             tempHotels = tempHotels.filter(h => {
                const price = h.offers[0]?.price?.total ? parseFloat(h.offers[0].price.total) : 0;
                return price >= filters.priceRange[0] && price <= filters.priceRange[1];
             });
        }

        setFilteredHotels(tempHotels);
    };

    const LoadingSkeleton = () => (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-3">
               <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-9 space-y-4">
              {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-2xl" />
              ))}
          </div>
      </div>
    );

    if(loading) {
        return <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"><LoadingSkeleton /></div>;
    }

    if(error) {
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
    
    return (
        <div className="w-full bg-muted/30 min-h-screen">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-4xl font-bold font-headline">Hoteles en {destinationName}</h1>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-muted-foreground">
                        {filteredHotels ? `${filteredHotels.length} resultados encontrados` : ''}
                    </p>
                    <AITravelTips destination={cityCode} destinationName={destinationName} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <aside className="hidden lg:block lg:col-span-3">
                <HotelFilters onFilterChange={handleFilterChange} />
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
                        <HotelFilters onFilterChange={handleFilterChange} />
                      </SheetContent>
                    </Sheet>
                  </div>
              <main className="lg:col-span-9">
                {filteredHotels && filteredHotels.length > 0 ? (
                    <HotelResults hotels={filteredHotels} searchParams={searchParams} />
                ) : (
                    <Card>
                        <CardContent className="pt-6 text-center text-muted-foreground">
                            <p>No se encontraron hoteles que coincidan con tus filtros.</p>
                            <p>Intenta ajustar o eliminar algunos filtros para ver más resultados.</p>
                        </CardContent>
                    </Card>
                )}
              </main>
            </div>
          </div>
        </div>
    )
}

export default function HotelSearchPageWrapper() {
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    }>
        <HotelResultsPage />
    </Suspense>
  )
}
