
'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { addDays, format } from 'date-fns';
import type { Airport } from '@/lib/types';
import { searchHotelDestinations } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Users, Loader2, Minus, Plus, MapPin, BedDouble, Baby } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import React from 'react';
import type { DateRange } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';


const SuggestionsList = React.memo(function SuggestionsList({ 
    suggestions, 
    isLoading, 
    onSelect 
}: { 
    suggestions: Airport[], 
    isLoading: boolean, 
    onSelect: (airport: Airport) => void 
}) {
    return (
        <div className="absolute z-20 w-full mt-1 bg-background/80 backdrop-blur-xl border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
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
                            onClick={() => onSelect(airport)}
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
});

const HotelSearchPage = React.memo(function HotelSearchPage() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [destination, setDestination] = useState<Airport | null>(null);
  const [destinationQuery, setDestinationQuery] = useState('');
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 14),
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  const { toast } = useToast();

  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [isDestinationPopoverOpen, setIsDestinationPopoverOpen] = useState(false);

  const debouncedDestinationQuery = useDebounce(destinationQuery, 300);
  
  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    setSuggestionsLoading(true);
    const result = await searchHotelDestinations(query);
    if (result.success && result.data) {
      setSuggestions(result.data);
    } else {
      setSuggestions([]);
      if (result.error) {
        toast({
            title: "Error de Búsqueda de Ciudad",
            description: result.error,
            variant: "destructive",
        });
      }
    }
    setSuggestionsLoading(false);
  }, [toast]);

  useEffect(() => {
    if (isDestinationPopoverOpen && debouncedDestinationQuery) {
      fetchSuggestions(debouncedDestinationQuery);
    }
  }, [debouncedDestinationQuery, isDestinationPopoverOpen, fetchSuggestions]);

  const handleSelectSuggestion = useCallback((airport: Airport) => {
    setDestination(airport);
    const query = [airport.address?.cityName, airport.address?.countryName].filter(Boolean).join(', ');
    setDestinationQuery(query || airport.name);
    setSuggestions([]);
    setIsDestinationPopoverOpen(false);
  }, []);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
      e.preventDefault();
      if (!destinationQuery || !date?.from || !date?.to) {
        toast({
            title: 'Información Faltante',
            description: 'Por favor, selecciona un destino y las fechas.',
            variant: 'destructive',
        });
        return;
      }

      const params = new URLSearchParams({
        destinationName: destinationQuery,
        checkInDate: format(date.from, 'yyyy-MM-dd'),
        checkOutDate: format(date.to, 'yyyy-MM-dd'),
        adults: adults.toString(),
        children: children.toString(),
      });
       if (destination?.iataCode) {
        params.set('cityCode', destination.iataCode);
      }
      router.push(`/hotels/search?${params.toString()}`);
  }, [destination, destinationQuery, date, adults, children, router, toast]);
  
  const totalGuests = useMemo(() => adults + children, [adults, children]);
  const travelerText = useMemo(() => `${totalGuests} huésped${totalGuests > 1 ? 'es' : ''}`, [totalGuests]);
    
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
        <div className="w-full lg:col-span-5 relative">
            <Popover open={isDestinationPopoverOpen && destinationQuery.length > 1} onOpenChange={setIsDestinationPopoverOpen}>
                <PopoverTrigger asChild>
                    <div className="flex items-center w-full p-4 bg-white/70 hover:bg-white/90 rounded-2xl cursor-text">
                        <MapPin className="h-6 w-6 mr-4 text-primary" />
                        <div>
                            <p className="text-xs text-gray-700">Destination</p>
                            <Input 
                                id="destination" 
                                type="text" 
                                value={destinationQuery} 
                                onChange={e => setDestinationQuery(e.target.value)}
                                onFocus={() => setIsDestinationPopoverOpen(true)}
                                onClick={handleInputClick}
                                placeholder="Ej. Nueva York" 
                                className="bg-transparent border-0 p-0 h-auto text-lg font-semibold text-gray-800 placeholder:text-gray-500 focus-visible:ring-0" 
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-transparent border-none shadow-none" align="start">
                    <SuggestionsList 
                        suggestions={suggestions}
                        isLoading={suggestionsLoading}
                        onSelect={handleSelectSuggestion}
                    />
                  </PopoverContent>
            </Popover>
        </div>
        
        <div className="w-full lg:col-span-3">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
                <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/70 hover:bg-white/90 rounded-2xl">
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
                    numberOfMonths={isMobile ? 1 : 2}
                    disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                />
                 <div className="p-2 border-t md:hidden">
                    <Button className="w-full" onClick={() => setIsCalendarOpen(false)}>Listo</Button>
                </div>
            </PopoverContent>
            </Popover>
        </div>

        <div className="w-full lg:col-span-2">
            <Popover>
            <PopoverTrigger asChild>
                <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/70 hover:bg-white/90 rounded-2xl">
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
  );
});

export default HotelSearchPage;
