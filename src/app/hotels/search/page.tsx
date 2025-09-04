
'use client';

import { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Filter, Settings2 } from "lucide-react";
import { searchHotels } from "@/app/actions";
import type { AmadeusHotelOffer } from "@/lib/types";
import { HotelResults } from "@/components/hotel-results";
import { HotelFilters } from "@/components/hotel-filters";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AITravelTips } from "@/components/ai-travel-tips";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import HotelSearchPage from "@/components/hotel-search-page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type HotelFiltersState = {
  priceRange: number[];
  stars: number[];
  amenities: string[];
};

function HotelResultsPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [hotels, setHotels] = useState<AmadeusHotelOffer[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<HotelFiltersState>({
      priceRange: [0, 1000],
      stars: [],
      amenities: [],
    });

    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const checkInDate = searchParams.get('checkInDate') || '';
    const checkOutDate = searchParams.get('checkOutDate') || '';
    const adults = searchParams.get('adults') || '1';
    const destinationName = searchParams.get('destinationName') || 'tu destino';
    
    const runSearch = useCallback(async () => {
        if (latitude && longitude && checkInDate && checkOutDate) {
            setLoading(true);
            setHotels(null);
            setError(null);
            const result = await searchHotels({
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                checkInDate,
                checkOutDate,
                adults: parseInt(adults, 10),
            });
            if(result.success && result.data) {
                setHotels(result.data);
            } else {
                setError(result.error || 'No se encontraron hoteles para tu búsqueda.');
            }
            setLoading(false);
        } else {
            setError("Parámetros de búsqueda incompletos. Por favor, realiza una nueva búsqueda.");
            setLoading(false);
        }
    }, [latitude, longitude, checkInDate, checkOutDate, adults]);


    useEffect(() => {
        runSearch();
    }, [runSearch]);
    
    const filteredHotels = useMemo(() => {
      if (!hotels) return null;
      
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
      
      return tempHotels;
    }, [hotels, filters]);


    const LoadingSkeleton = () => (
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-3">
               <div className="bg-black/20 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 space-y-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-20 w-full" />
                    <Separator className="bg-white/20"/>
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-32 w-full" />
               </div>
          </div>
          <main className="lg:col-span-9 space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="rounded-2xl overflow-hidden shadow-lg bg-black/10 backdrop-blur-xl border border-white/20 flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-1/3 xl:w-1/4 flex-shrink-0">
                       <Skeleton className="h-full w-full" />
                    </div>
                    <div className="flex flex-col flex-grow p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex-grow"></div>
                       <div className="flex justify-between items-center pt-4">
                           <div className="space-y-2">
                             <Skeleton className="h-4 w-20" />
                             <Skeleton className="h-8 w-24" />
                           </div>
                           <Skeleton className="h-12 w-32" />
                       </div>
                    </div>
                </Card>
              ))}
          </main>
      </div>
    );

    if(loading) {
        return (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Collapsible className="mb-6 bg-black/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl">
              <Skeleton className="h-12 w-1/2" />
            </Collapsible>
            <LoadingSkeleton />
          </div>
        );
    }

    if(error) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <Card className="bg-black/10 backdrop-blur-xl border border-white/20">
                    <CardContent className="pt-6 text-center text-white/90">
                        <h2 className="text-xl font-bold text-destructive">Error de Búsqueda</h2>
                        <p className=" mt-2">{error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Collapsible className="mb-6 bg-black/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl">
                <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold font-headline text-white">Hoteles en {destinationName}</h1>
                    <p className="text-white/80 mt-1">
                        {filteredHotels ? `${filteredHotels.length} resultados encontrados` : ''}
                    </p>
                </div>
                <CollapsibleTrigger asChild>
                    <Button variant="outline" className="text-white bg-transparent border-white/20 hover:bg-white/10 hover:text-white">
                    <Settings2 className="mr-2 h-4 w-4" />
                    Modificar Búsqueda
                    </Button>
                </CollapsibleTrigger>
                </div>
            <CollapsibleContent>
                <div className="mt-6 pt-6 border-t border-white/20">
                <HotelSearchPage />
                </div>
            </CollapsibleContent>
            </Collapsible>
        
        <div className="flex justify-end items-center mb-6">
              <AITravelTips destination={destinationName} destinationName={destinationName} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start">
                <div className="bg-black/20 backdrop-blur-2xl border border-white/20 rounded-2xl p-4">
                <HotelFilters 
                    filters={filters}
                    onFiltersChange={setFilters}
                />
                </div>
            </aside>
            <div className="lg:hidden fixed bottom-24 right-6 z-50">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" className="rounded-full shadow-lg w-auto h-auto p-4 bg-white/40 backdrop-blur-xl border border-white/20 text-white hover:bg-white/60">
                        <Filter className="mr-2 h-5 w-5"/>
                        Filtros
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90vw] max-w-md bg-black/30 backdrop-blur-2xl border-white/20 rounded-2xl text-white shadow-2xl p-0">
                    <DialogHeader className="p-6 pb-4 text-left">
                        <DialogTitle className="font-headline text-2xl">Filtros de Hotel</DialogTitle>
                        <DialogDescription className="text-white/80">Aplica filtros para refinar los resultados de tu búsqueda de hoteles.</DialogDescription>
                    </DialogHeader>
                        <ScrollArea className="h-full pr-4 py-4 pl-6">
                        <HotelFilters 
                            filters={filters}
                            onFiltersChange={setFilters}
                        />
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
                </div>
            <main className="lg:col-span-9">
            {filteredHotels && filteredHotels.length > 0 ? (
                <HotelResults hotels={filteredHotels} searchParams={searchParams} />
            ) : (
                <Card className="bg-black/10 backdrop-blur-xl border border-white/20">
                    <CardContent className="pt-6 text-center text-white/70">
                        <p>No se encontraron hoteles que coincidan con tus filtros.</p>
                        <p>Intenta ajustar o eliminar algunos filtros para ver más resultados.</p>
                    </CardContent>
                </Card>
            )}
            </main>
        </div>
        </div>
    )
}

export default function HotelSearchPageWrapper() {
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-hotels-gradient">
            <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
    }>
      <div className={cn('w-full min-h-screen pt-24 pb-24 md:pb-8', 'bg-hotels-gradient background-pan-animation')}>
        <HotelResultsPageContent />
      </div>
    </Suspense>
  )
}

    