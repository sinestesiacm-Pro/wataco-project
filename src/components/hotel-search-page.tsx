
'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { addDays, format } from 'date-fns';
import type { AmadeusHotelOffer, Airport } from '@/lib/types';
import { searchHotels, searchHotelDestinations } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';

import { HotelResults } from '@/components/hotel-results';
import { HotelFilters } from '@/components/hotel-filters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Users, Loader2, Minus, Plus, MapPin, BedDouble, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import React from 'react';
import { RecommendedHotels } from './recommended-hotels';
import { Card, CardContent } from './ui/card';
import type { DateRange } from 'react-day-picker';
import { HeroSection } from './hero-section';

const InputGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex items-center">{children}</div>
);

const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{children}</div>
);

type HotelFiltersState = {
  stars: number[];
  amenities: string[];
};

const hotelImages = [
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=1920&q=80',
];

export default function HotelSearchPage() {
  const [destination, setDestination] = useState<Airport | null>(null);
  const [destinationQuery, setDestinationQuery] = useState('');
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 14),
  });
  const [adults, setAdults] = useState(1);
  
  const [hotelData, setHotelData] = useState<AmadeusHotelOffer[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState<'destination' | null>(null);
  const debouncedDestinationQuery = useDebounce(destinationQuery, 300);
  const destinationRef = useRef<HTMLDivElement>(null);
  
  const [filters, setFilters] = useState<HotelFiltersState>({ stars: [], amenities: [] });
  const isInitialSearch = useRef(true);
  const searchIdRef = useRef(0);

  const checkInDate = date?.from;
  const checkOutDate = date?.to;

  useEffect(() => {
    const fetchSuggestions = async (query: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setSuggestionsLoading(true);
      const result = await searchHotelDestinations(query);
      if (result.success && result.data) {
        if (activeInput) {
            setSuggestions(result.data);
        }
      } else {
        setSuggestions([]);
        toast({
            title: "Error de Búsqueda de Ciudad",
            description: result.error || "No se pudieron obtener las sugerencias.",
            variant: "destructive",
        });
      }
      setSuggestionsLoading(false);
    };

    if (activeInput === 'destination' && debouncedDestinationQuery) {
      fetchSuggestions(debouncedDestinationQuery);
    } else {
       setSuggestions([]);
    }
  }, [debouncedDestinationQuery, activeInput, toast]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setActiveInput(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSelectSuggestion = (airport: Airport) => {
    setDestination(airport);
    const query = [airport.address?.cityName, airport.address?.countryName].filter(Boolean).join(', ');
    setDestinationQuery(query || airport.name);
    setActiveInput(null);
    setSuggestions([]);
  };

  const handleSearch = useCallback(async () => {
    if (!destination || !checkInDate || !checkOutDate) {
      if (!isInitialSearch.current) {
        toast({
            title: 'Información Faltante',
            description: 'Por favor, selecciona un destino y las fechas.',
            variant: 'destructive',
        });
      }
      return;
    }

    setLoading(true);
    if (isInitialSearch.current) {
      setHotelData(null);
    }
    
    const searchId = ++searchIdRef.current;

    const result = await searchHotels({
      cityCode: destination.iataCode,
      checkInDate: format(checkInDate, 'yyyy-MM-dd'),
      checkOutDate: format(checkOutDate, 'yyyy-MM-dd'),
      adults,
      ratings: filters.stars,
      amenities: filters.amenities,
    });
    
    if (searchId !== searchIdRef.current) {
        return;
    }

    isInitialSearch.current = false;

    if (result.success && result.data) {
      setHotelData(result.data);
    } else {
      setHotelData([]); 
      toast({
        title: 'Error de Búsqueda',
        description: result.error || 'No se pudieron encontrar hoteles. Intenta otra búsqueda.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  }, [destination, checkInDate, checkOutDate, adults, filters, toast]);
  
  const handleCancelSearch = () => {
    searchIdRef.current++;
    setLoading(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!destination || !date?.from || !date?.to) {
        toast({
            title: 'Información Faltante',
            description: 'Por favor, selecciona un destino y las fechas.',
            variant: 'destructive',
        });
        return;
      }
      isInitialSearch.current = true;
      handleSearch();
  }

  const handleFilterChange = useCallback((newFilters: HotelFiltersState) => {
    setFilters(newFilters);
  }, []);
  
  useEffect(() => {
    if (!isInitialSearch.current) {
       const timer = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [filters, handleSearch]);

  const LoadingSkeleton = () => (
    <div className="grid md:grid-cols-12 gap-8 mt-8">
        <div className="md:col-span-3">
             <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
        <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-72 w-full rounded-2xl" />
            ))}
        </div>
    </div>
  );
  
  const travelerText = `${adults} adulto${adults > 1 ? 's' : ''}`;

  const SuggestionsList = () => (
    <div className="absolute z-20 w-full mt-1 bg-card border rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {suggestionsLoading ? (
        <div className="p-4 flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" /> Buscando...
        </div>
      ) : suggestions.length > 0 ? (
        suggestions.map((airport, index) => {
          const suggestionText = [airport.address?.cityName, airport.address?.countryName].filter(Boolean).join(', ');
          return (
            <div
              key={`${airport.iataCode}-${index}`}
              className="p-3 hover:bg-accent cursor-pointer border-b last:border-b-0"
              onClick={() => handleSelectSuggestion(airport)}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div className="flex-grow">
                  <p className="font-semibold text-sm">{suggestionText || airport.name}</p>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="p-4 text-center text-sm text-muted-foreground">No se encontraron resultados.</div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      <HeroSection
        images={hotelImages}
        title="Encuentra tu Estancia Perfecta"
        subtitle="Busca y reserva hoteles, desde boutiques acogedoras hasta resorts de lujo."
      >
        <div className="bg-card/80 backdrop-blur-2xl border p-4 sm:p-6 rounded-3xl shadow-2xl">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
              <div className='lg:col-span-5 relative' ref={destinationRef}>
                <Label htmlFor="destination" className="text-sm font-semibold ml-2">Destino</Label>
                <InputGroup>
                  <InputIcon><BedDouble className="h-4 w-4" /></InputIcon>
                  <Input id="destination" type="text" value={destinationQuery} 
                      onChange={e => setDestinationQuery(e.target.value)}
                      onFocus={() => setActiveInput('destination')}
                      placeholder="Ej. Nueva York" 
                      className="mt-1 pl-10" 
                      autoComplete="off"
                  />
                </InputGroup>
                 {activeInput === 'destination' && <SuggestionsList />}
              </div>
              
              <div className="lg:col-span-3">
                <Label htmlFor="dates" className="text-sm font-semibold ml-2">Entrada y Salida</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="dates"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "dd LLL, y")} -{" "}
                            {format(date.to, "dd LLL, y")}
                          </>
                        ) : (
                          format(date.from, "dd LLL, y")
                        )
                      ) : (
                        <span>Elige tus fechas</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                      disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className='lg:col-span-2'>
                <Label htmlFor="guests" className="text-sm font-semibold ml-2">Huéspedes</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="guests" variant={"outline"} className="w-full justify-start text-left font-normal mt-1">
                      <Users className="mr-2 h-4 w-4" />
                      {travelerText}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Adultos</h4>
                        <p className="text-sm text-muted-foreground">Selecciona el número de adultos.</p>
                      </div>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Adultos</p>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.max(1, v - 1))} disabled={adults <= 1}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-lg w-4 text-center">{adults}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => v + 1)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="lg:col-span-2 flex items-end">
                {loading && isInitialSearch.current ? (
                  <Button
                    type="button"
                    className="w-full font-bold rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={handleCancelSearch}
                  >
                    <X className="mr-2 h-5 w-5" />
                    Cancelar
                  </Button>
                ) : (
                  <Button type="submit" className="w-full font-bold bg-primary hover:bg-primary/90 rounded-xl shadow-md hover:shadow-lg transition-all">
                    Buscar
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </HeroSection>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mt-8">
          {loading && hotelData === null && <LoadingSkeleton />}
          
          {!loading && hotelData === null && (
              <RecommendedHotels />
          )}

          {hotelData !== null && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3">
                <HotelFilters onFilterChange={handleFilterChange} />
              </div>
              <div className="lg:col-span-9">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-96 w-full rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    hotelData.length > 0 ? (
                        <HotelResults hotels={hotelData} />
                    ) : (
                        <Card>
                            <CardContent className="pt-6 text-center text-muted-foreground">
                                <p>No se encontraron hoteles para tu búsqueda.</p>
                                <p>Intenta ajustar los filtros o buscar otro destino.</p>
                            </CardContent>
                        </Card>
                    )
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
