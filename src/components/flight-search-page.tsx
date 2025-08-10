
'use client';
import { useState, useEffect, useRef } from 'react';
import { addDays, format, parse } from 'date-fns';
import type { Airport } from '@/lib/types';
import { searchAirports } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Users, Loader2, PlaneTakeoff, PlaneLanding, Minus, Plus, MapPin, X, Plane, ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Switch } from './ui/switch';
import React from 'react';
import type { DateRange } from 'react-day-picker';
import { useSearchParams, useRouter } from 'next/navigation';
import { Separator } from './ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

const InputGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("relative flex flex-col w-full", className)}>{children}</div>
);

const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{children}</div>
);

export default function FlightSearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  
  const [origin, setOrigin] = useState('MAD');
  const [destination, setDestination] = useState('BOG');
  const [originQuery, setOriginQuery] = useState('Madrid, España');
  const [destinationQuery, setDestinationQuery] = useState('Bogotá, Colombia');
  
  const [date, setDate] = useState<DateRange | undefined>({
      from: addDays(new Date(), 7),
      to: addDays(new Date(), 14),
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  
  const { toast } = useToast();

  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState<'origin' | 'destination' | null>(null);
  const debouncedOriginQuery = useDebounce(originQuery, 300);
  const debouncedDestinationQuery = useDebounce(destinationQuery, 300);
  
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const activeInputRef = useRef<'origin' | 'destination' | null>(null);

  useEffect(() => {
    // This effect handles auto-search from promotion cards
    const urlOrigin = searchParams.get('origin');
    const urlDestination = searchParams.get('destination');
    const urlFromDate = searchParams.get('from_date');
    const urlToDate = searchParams.get('to_date');
    const urlAdults = searchParams.get('adults');
    const urlOriginQuery = searchParams.get('origin_query');
    const urlDestinationQuery = searchParams.get('destination_query');
    const autoSearch = searchParams.get('autosearch');

    if (autoSearch === 'true' && urlOrigin && urlDestination && urlFromDate) {
      const query = new URLSearchParams({
        origin: urlOrigin,
        destination: urlDestination,
        departureDate: urlFromDate,
        adults: urlAdults || '1',
        originQuery: urlOriginQuery || urlOrigin,
        destinationQuery: urlDestinationQuery || urlDestination,
      });
      if (urlToDate) {
        query.set('returnDate', urlToDate);
      }
      router.push(`/flights/select?${query.toString()}`);
    }
  }, [searchParams, router]);


  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    setSuggestionsLoading(true);
    const result = await searchAirports(query);
    if (result.success && result.data) {
      if (activeInputRef.current) {
          setSuggestions(result.data);
      }
    } else {
      setSuggestions([]);
    }
    setSuggestionsLoading(false);
  };
  
  useEffect(() => {
    if (activeInputRef.current === 'origin') {
      fetchSuggestions(debouncedOriginQuery);
    }
  }, [debouncedOriginQuery]);

  useEffect(() => {
     if (activeInputRef.current === 'destination') {
      fetchSuggestions(debouncedDestinationQuery);
    }
  }, [debouncedDestinationQuery]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverContentRef.current && !popoverContentRef.current.contains(event.target as Node)) {
        setActiveInput(null);
        activeInputRef.current = null;
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSelectSuggestion = (airport: Airport, type: 'origin' | 'destination') => {
    const locationName = airport.address?.cityName || airport.name;
    const countryName = airport.address?.countryName || '';
    const query = [locationName, countryName].filter(Boolean).join(', ');

    if (type === 'origin') {
      setOrigin(airport.iataCode);
      setOriginQuery(query || locationName);
    } else {
      setDestination(airport.iataCode);
      setDestinationQuery(query || locationName);
    }
    setActiveInput(null);
    activeInputRef.current = null;
    setSuggestions([]);
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !date?.from || (isRoundTrip && !date?.to)) {
      toast({
        title: 'Información Faltante',
        description: 'Por favor, completa todos los detalles del vuelo requeridos.',
        variant: 'destructive',
      });
      return;
    }
    
    const query = new URLSearchParams({
        origin,
        destination,
        departureDate: format(date.from, 'yyyy-MM-dd'),
        adults: adults.toString(),
        originQuery,
        destinationQuery,
    });
    if (isRoundTrip && date.to) {
        query.set('returnDate', format(date.to, 'yyyy-MM-dd'))
    }
    if (children > 0) query.set('children', children.toString());
    if (infants > 0) query.set('infants', infants.toString());
    
    router.push(`/flights/select?${query.toString()}`);
  };

  const totalTravelers = adults + children + infants;
  const travelerText = `${totalTravelers} pasajero${totalTravelers > 1 ? 's' : ''}`;

  const renderSuggestions = (type: 'origin' | 'destination') => (
      <div ref={popoverContentRef} className="absolute z-20 w-full mt-1 bg-background/80 backdrop-blur-xl border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
        {suggestionsLoading ? (
          <div className="p-4 flex items-center justify-center text-sm text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Buscando...
          </div>
        ) : suggestions.length > 0 ? (
          suggestions.map((airport, index) => (
            <div
              key={`${airport.iataCode}-${airport.name}-${index}`}
              className="px-3 py-2 hover:bg-accent cursor-pointer border-b border-border last:border-b-0"
              onClick={() => handleSelectSuggestion(airport, type)}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div className="flex-grow">
                  <p className="font-semibold text-sm">
                    {airport.address?.cityName || airport.name}
                    {airport.address?.countryName ? `, ${airport.address.countryName}`: ''}
                  </p>
                  <p className="text-xs text-muted-foreground">{airport.name} ({airport.iataCode})</p>
                </div>
              </div>
            </div>
          ))
        ) : (
           <div className="p-4 text-center text-sm text-muted-foreground">No se encontraron resultados.</div>
        )}
      </div>
  );

  const handleSwapDestinations = () => {
    setOrigin(destination);
    setDestination(origin);
    setOriginQuery(destinationQuery);
    setDestinationQuery(originQuery);
  };

  return (
      <div className="bg-white/40 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20">
        <form onSubmit={handleManualSearch} className="flex flex-col gap-4 text-gray-800">
          
          <Popover open={!!activeInput} onOpenChange={(isOpen) => !isOpen && setActiveInput(null)}>
            <div className="space-y-4 relative">
              <PopoverTrigger asChild>
                  <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl" onClick={() => { setActiveInput('origin'); activeInputRef.current = 'origin'; }}>
                      <div className="flex items-center w-full">
                          <PlaneTakeoff className="h-6 w-6 mr-4 text-tertiary" />
                          <div>
                              <p className="text-xs text-gray-700">From</p>
                              <p className="text-lg font-semibold text-gray-800">{originQuery}</p>
                          </div>
                      </div>
                  </Button>
              </PopoverTrigger>
              
               <PopoverTrigger asChild>
                  <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl" onClick={() => { setActiveInput('destination'); activeInputRef.current = 'destination'; }}>
                       <div className="flex items-center w-full">
                          <MapPin className="h-6 w-6 mr-4 text-tertiary" />
                          <div>
                              <p className="text-xs text-gray-700">To</p>
                              <p className="text-lg font-semibold text-gray-800">{destinationQuery}</p>
                          </div>
                      </div>
                  </Button>
              </PopoverTrigger>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                <Button type="button" variant="ghost" size="icon" onClick={handleSwapDestinations} className="bg-white/50 hover:bg-white/80 rounded-full h-9 w-9">
                    <ArrowRightLeft className="h-4 w-4 text-gray-700" />
                </Button>
              </div>

            </div>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-transparent border-none shadow-none" align="start">
                {activeInput && renderSuggestions(activeInput)}
            </PopoverContent>
          </Popover>

          <div className="grid grid-cols-2 gap-4">
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl">
                      <div className="flex items-center w-full">
                          <CalendarIcon className="h-6 w-6 mr-4 text-gray-800" />
                          <div className="truncate">
                              <p className="text-xs text-gray-700">Dates</p>
                              <p className="text-base md:text-lg font-semibold text-gray-800 truncate">
                                {date?.from && date.to ? `${format(date.from, "dd LLL")} - ${format(date.to, "dd LLL")}` : "Elige tus fechas"}
                              </p>
                          </div>
                      </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 max-h-[80vh] overflow-y-auto" align="start">
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

              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl">
                      <div className="flex items-center w-full">
                          <Users className="h-6 w-6 mr-4 text-gray-800" />
                          <div>
                              <p className="text-xs text-gray-700">Travelers</p>
                              <p className="text-base md:text-lg font-semibold text-gray-800">{travelerText}</p>
                          </div>
                      </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)]" align="start">
                    <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Pasajeros</h4>
                        <p className="text-sm text-muted-foreground">
                        Selecciona el número de pasajeros.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Adultos</p>
                            <p className="text-xs text-muted-foreground">Mayores de 12 años</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.max(1, v - 1))} disabled={adults <= 1 || adults <= infants}>
                            <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-lg w-4 text-center">{adults}</span>
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.min(8, v + 1))} disabled={totalTravelers >= 8}>
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        </div>
                        <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Niños</p>
                            <p className="text-xs text-muted-foreground">De 2 a 11 años</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => Math.max(0, v - 1))} disabled={children <= 0}>
                            <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-lg w-4 text-center">{children}</span>
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => Math.min(8, v + 1))} disabled={totalTravelers >= 8}>
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        </div>
                        <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Bebés</p>
                            <p className="text-xs text-muted-foreground">Menores de 2 años</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setInfants(v => Math.max(0, v - 1))} disabled={infants <= 0}>
                            <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-lg w-4 text-center">{infants}</span>
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setInfants(v => Math.min(8, v + 1))} disabled={totalTravelers >= 8 || infants >= adults}>
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        </div>
                    </div>
                    </div>
                </PopoverContent>
              </Popover>
          </div>
          

          <Button
              type="submit"
              size="lg"
              className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all px-10"
          >
             Buscar Vuelos
          </Button>
        </form>
      </div>
  );
}
