
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
import { CalendarIcon, Users, Loader2, Minus, Plus, MapPin, BedDouble, X, Baby } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import React from 'react';
import { Card, CardContent } from './ui/card';
import type { DateRange } from 'react-day-picker';
import { useRouter, useSearchParams } from 'next/navigation';

const InputGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex flex-col w-full">{children}</div>
);

const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{children}</div>
);

type HotelFiltersState = {
  stars: number[];
  amenities: string[];
};

export default function HotelSearchPage() {
  const router = useRouter();

  const [destination, setDestination] = useState<Airport | null>(null);
  const [destinationQuery, setDestinationQuery] = useState('');
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 14),
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  
  const { toast } = useToast();

  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState<'destination' | null>(null);
  const debouncedDestinationQuery = useDebounce(destinationQuery, 300);
  const destinationRef = useRef<HTMLDivElement>(null);
  
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

  const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if ((!destination && !destinationQuery) || !date?.from || !date?.to) {
        toast({
            title: 'Información Faltante',
            description: 'Por favor, selecciona un destino y las fechas.',
            variant: 'destructive',
        });
        return;
      }
      
      const cityCode = destination?.iataCode || (destinationQuery.toLowerCase().includes('nueva york') ? 'NYC' : '');

       if (!cityCode) {
         toast({
            title: 'Destino no válido',
            description: 'Por favor, selecciona un destino de la lista o escribe un destino conocido.',
            variant: 'destructive',
        });
        return;
      }

      const params = new URLSearchParams({
        cityCode: cityCode,
        checkInDate: format(date.from, 'yyyy-MM-dd'),
        checkOutDate: format(date.to, 'yyyy-MM-dd'),
        adults: adults.toString(),
        children: children.toString(),
        destinationName: destinationQuery,
      });
      router.push(`/hotels/search?${params.toString()}`);
  }
  
  const totalGuests = adults + children;
  const travelerText = `${totalGuests} huésped${totalGuests > 1 ? 'es' : ''}`;


  const SuggestionsList = () => (
    <div className="absolute z-20 w-full mt-1 bg-background/80 backdrop-blur-xl border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
    <div className="p-6 rounded-3xl">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            <div className="w-full lg:col-span-5 relative" ref={destinationRef}>
                <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl" onClick={() => setActiveInput('destination')}>
                    <div className="flex items-center w-full">
                        <MapPin className="h-6 w-6 mr-4 text-primary" />
                        <div>
                            <p className="text-xs text-gray-700">Destination</p>
                            <Input 
                                id="destination" 
                                type="text" 
                                value={destinationQuery} 
                                onChange={e => setDestinationQuery(e.target.value)}
                                onFocus={() => setActiveInput('destination')}
                                placeholder="Ej. Nueva York" 
                                className="bg-transparent border-0 p-0 h-auto text-lg font-semibold text-gray-800 placeholder:text-gray-500 focus-visible:ring-0" 
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </Button>
                {activeInput === 'destination' && destinationQuery.length > 1 && <SuggestionsList />}
            </div>
            
            <div className="w-full lg:col-span-3">
                <Popover>
                <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl">
                        <div className="flex items-center w-full">
                            <CalendarIcon className="h-6 w-6 mr-4 text-gray-800" />
                            <div>
                                <p className="text-xs text-gray-700">Dates</p>
                                <p className="text-lg font-semibold text-gray-800">
                                {date?.from && date.to ? `${format(date.from, "dd LLL")} - ${format(date.to, "dd LLL")}` : "Elige tus fechas"}
                                </p>
                            </div>
                        </div>
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

            <div className="w-full lg:col-span-2">
                <Popover>
                <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl">
                        <div className="flex items-center w-full">
                            <Users className="h-6 w-6 mr-4 text-gray-800" />
                            <div>
                                <p className="text-xs text-gray-700">Guests</p>
                                <p className="text-lg font-semibold text-gray-800">{travelerText}</p>
                            </div>
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                    <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Huéspedes</h4>
                        <p className="text-sm text-muted-foreground">Selecciona el número de huéspedes.</p>
                    </div>
                        <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                        <p className="font-medium">Adultos</p>
                        <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.max(1, v - 1))} disabled={adults <= 1}>
                            <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-lg w-4 text-center">{adults}</span>
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => v + 1)}>
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        </div>
                        <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Baby className="h-5 w-5" />
                            <p className="font-medium">Niños</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => Math.max(0, v - 1))} disabled={children <= 0}>
                            <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-lg w-4 text-center">{children}</span>
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => v + 1)}>
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        </div>
                    </div>
                    </div>
                </PopoverContent>
                </Popover>
            </div>

            <div className="w-full lg:col-span-2">
            <Button type="submit" size="lg" className="w-full h-14 font-bold rounded-2xl shadow-md hover:shadow-lg transition-all bg-primary hover:bg-primary/90 text-primary-foreground">
                <BedDouble className="mr-2 h-5 w-5" />
                Buscar
            </Button>
            </div>
        </div>
        </form>
    </div>
  );
}
