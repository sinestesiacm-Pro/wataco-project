
'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
        <div className="absolute z-20 w-full mt-1 bg-background/80 backdrop-blur-xl border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
                <div className="p-4 flex items-center justify-center text-sm text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" /> Buscando...
                </div>
            ) : suggestions.length > 0 ? (
                suggestions.map((airport, index) => (
                    <div
                        key={`${airport.iataCode}-${airport.name}-${index}`}
                        className="px-3 py-2 hover:bg-accent cursor-pointer border-b border-border last:border-b-0"
                        onClick={() => onSelect(airport)}
                    >
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <div className="flex-grow">
                                <p className="font-semibold text-sm">
                                    {airport.address?.cityName || airport.name}
                                    {airport.address?.countryName ? `, ${airport.address.countryName}` : ''}
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
});


export const FlightSearchClassic = React.memo(function FlightSearchClassic() {
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

  const [originSuggestions, setOriginSuggestions] = useState<Airport[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<Airport[]>([]);
  const [originLoading, setOriginLoading] = useState(false);
  const [destinationLoading, setDestinationLoading] = useState(false);
  
  const [isOriginPopoverOpen, setIsOriginPopoverOpen] = useState(false);
  const [isDestinationPopoverOpen, setIsDestinationPopoverOpen] = useState(false);

  const debouncedOriginQuery = useDebounce(originQuery, 300);
  const debouncedDestinationQuery = useDebounce(destinationQuery, 300);
  
  useEffect(() => {
    // This effect can be used to pre-fill the form from URL params if needed,
    // but the primary navigation logic is now in handleManualSearch.
  }, []);


  const fetchSuggestions = useCallback(async (query: string, type: 'origin' | 'destination') => {
    if (query.length < 2) {
      type === 'origin' ? setOriginSuggestions([]) : setDestinationSuggestions([]);
      return;
    }

    type === 'origin' ? setOriginLoading(true) : setDestinationLoading(true);

    const result = await searchAirports(query);
    if (result.success && result.data) {
        if (type === 'origin') setOriginSuggestions(result.data);
        else setDestinationSuggestions(result.data);
    } else {
        type === 'origin' ? setOriginSuggestions([]) : setDestinationSuggestions([]);
    }

    type === 'origin' ? setOriginLoading(false) : setDestinationLoading(false);
  }, []);
  
  useEffect(() => {
    if (isOriginPopoverOpen && debouncedOriginQuery) {
      fetchSuggestions(debouncedOriginQuery, 'origin');
    } else {
        setOriginSuggestions([]);
    }
  }, [debouncedOriginQuery, fetchSuggestions, isOriginPopoverOpen]);

  useEffect(() => {
     if (isDestinationPopoverOpen && debouncedDestinationQuery) {
      fetchSuggestions(debouncedDestinationQuery, 'destination');
    } else {
        setDestinationSuggestions([]);
    }
  }, [debouncedDestinationQuery, fetchSuggestions, isDestinationPopoverOpen]);
  
  const handleSelectSuggestion = useCallback((airport: Airport, type: 'origin' | 'destination') => {
    const locationName = airport.address?.cityName || airport.name;
    const countryName = airport.address?.countryName || '';
    const query = [locationName, countryName].filter(Boolean).join(', ');

    if (type === 'origin') {
      setOrigin(airport.iataCode);
      setOriginQuery(query || locationName);
      setOriginSuggestions([]);
      setIsOriginPopoverOpen(false);
    } else {
      setDestination(airport.iataCode);
      setDestinationQuery(query || locationName);
      setDestinationSuggestions([]);
      setIsDestinationPopoverOpen(false);
    }
  }, []);

  const handleManualSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const departureDate = date?.from;

    if (!origin || !destination || !departureDate) {
      toast({
        title: 'Información Faltante',
        description: 'Por favor, completa el origen, destino y fecha de salida.',
        variant: 'destructive',
      });
      return;
    }
    
    const query = new URLSearchParams({
        origin,
        destination,
        departureDate: format(departureDate, 'yyyy-MM-dd'),
        adults: adults.toString(),
        originQuery,
        destinationQuery,
    });
    
    if (isRoundTrip && date?.to) {
        query.set('returnDate', format(date.to, 'yyyy-MM-dd'))
    }
    if (children > 0) query.set('children', children.toString());
    if (infants > 0) query.set('infants', infants.toString());
    
    router.push(`/flights/select?${query.toString()}`);
  }, [origin, destination, date, isRoundTrip, adults, children, infants, originQuery, destinationQuery, router, toast]);

  const totalTravelers = useMemo(() => adults + children + infants, [adults, children, infants]);
  const travelerText = useMemo(() => `${totalTravelers} pasajero${totalTravelers > 1 ? 's' : ''}`, [totalTravelers]);
  
  const handleSwapDestinations = useCallback(() => {
    setOrigin(destination);
    setDestination(origin);
    setOriginQuery(destinationQuery);
    setDestinationQuery(originQuery);
  }, [origin, destination, originQuery, destinationQuery]);
  
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  return (
        <form onSubmit={handleManualSearch} className="flex flex-col gap-4 text-gray-800">
          
            <div className="relative">
                <div className="space-y-4">
                  <Popover open={isOriginPopoverOpen && originQuery.length > 1} onOpenChange={setIsOriginPopoverOpen}>
                    <PopoverTrigger asChild>
                      <div className="flex items-center w-full p-4 bg-white/70 hover:bg-white/90 rounded-2xl cursor-text">
                          <PlaneTakeoff className="h-6 w-6 mr-4 text-tertiary" />
                          <div>
                              <p className="text-xs text-gray-700">From</p>
                              <Input 
                                  id="origin" 
                                  type="text" 
                                  value={originQuery} 
                                  onChange={e => setOriginQuery(e.target.value)} 
                                  onFocus={() => setIsOriginPopoverOpen(true)}
                                  onClick={handleInputClick}
                                  placeholder="Ciudad o aeropuerto" 
                                  className="bg-transparent border-0 p-0 h-auto text-lg font-semibold text-gray-800 placeholder:text-gray-500 focus-visible:ring-0" 
                                  autoComplete="off"
                              />
                          </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-transparent border-none shadow-none" align="start">
                        <SuggestionsList 
                            suggestions={originSuggestions} 
                            isLoading={originLoading}
                            onSelect={(airport) => handleSelectSuggestion(airport, 'origin')}
                        />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover open={isDestinationPopoverOpen && destinationQuery.length > 1} onOpenChange={setIsDestinationPopoverOpen}>
                    <PopoverTrigger asChild>
                      <div className="flex items-center w-full p-4 bg-white/70 hover:bg-white/90 rounded-2xl cursor-text">
                          <MapPin className="h-6 w-6 mr-4 text-tertiary" />
                          <div>
                              <p className="text-xs text-gray-700">To</p>
                              <Input 
                                  id="destination" 
                                  type="text" 
                                  value={destinationQuery} 
                                  onChange={e => setDestinationQuery(e.target.value)}
                                  onFocus={() => setIsDestinationPopoverOpen(true)}
                                  onClick={handleInputClick}
                                  placeholder="Ciudad o aeropuerto" 
                                  className="bg-transparent border-0 p-0 h-auto text-lg font-semibold text-gray-800 placeholder:text-gray-500 focus-visible:ring-0" 
                                  autoComplete="off"
                              />
                          </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-transparent border-none shadow-none" align="start">
                         <SuggestionsList 
                            suggestions={destinationSuggestions}
                            isLoading={destinationLoading}
                            onSelect={(airport) => handleSelectSuggestion(airport, 'destination')}
                        />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                  <Button type="button" variant="ghost" size="icon" onClick={handleSwapDestinations} className="bg-white/50 hover:bg-white/80 rounded-full h-9 w-9">
                      <ArrowRightLeft className="h-4 w-4 text-gray-700" />
                  </Button>
                </div>
            </div>

          <div className="grid grid-cols-2 gap-4">
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/70 hover:bg-white/90 rounded-2xl">
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
                  <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/70 hover:bg-white/90 rounded-2xl">
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
              className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-sky-600 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all px-10"
          >
             Buscar Vuelos
          </Button>
        </form>
  );
});
