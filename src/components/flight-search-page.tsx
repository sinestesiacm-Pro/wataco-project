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
import { CalendarIcon, Users, Loader2, PlaneTakeoff, PlaneLanding, Minus, Plus, MapPin, X, Plane } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Switch } from './ui/switch';
import React from 'react';
import type { DateRange } from 'react-day-picker';
import { useSearchParams, useRouter } from 'next/navigation';

const InputGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("relative flex flex-col w-full", className)}>{children}</div>
);

const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{children}</div>
);

export default function FlightSearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [originQuery, setOriginQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  
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
  const originRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);

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


  useEffect(() => {
    const fetchSuggestions = async (query: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setSuggestionsLoading(true);
      const result = await searchAirports(query);
      if (result.success && result.data) {
        if (activeInput) {
            setSuggestions(result.data);
        }
      } else {
        setSuggestions([]);
      }
      setSuggestionsLoading(false);
    };

    if (activeInput === 'origin' && originQuery.length > 1) {
      fetchSuggestions(debouncedOriginQuery);
    } else if (activeInput === 'destination' && destinationQuery.length > 1) {
      fetchSuggestions(debouncedDestinationQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedOriginQuery, debouncedDestinationQuery, activeInput, originQuery, destinationQuery]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        originRef.current && !originRef.current.contains(target) &&
        destinationRef.current && !destinationRef.current.contains(target)
      ) {
        setActiveInput(null);
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
      setOriginQuery(query);
    } else {
      setDestination(airport.iataCode);
      setDestinationQuery(query);
    }
    setActiveInput(null);
    setSuggestions([]);
  };

  const handleTripTypeChange = (checked: boolean) => {
    setIsRoundTrip(checked);
    if (!checked) {
      setDate(current => (current?.from ? { from: current.from, to: undefined } : undefined));
    } else {
      setDate(current => {
        if (current?.from && !current?.to) {
          return { from: current.from, to: addDays(current.from, 7) };
        }
        if (!current?.from) {
            return { from: addDays(new Date(), 7), to: addDays(new Date(), 14) };
        }
        return current;
      });
    }
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

  const SuggestionsList = ({ type }: { type: 'origin' | 'destination' }) => (
    <div className="absolute z-20 w-full mt-1 bg-card border rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {suggestionsLoading ? (
        <div className="p-4 flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" /> Buscando...
        </div>
      ) : suggestions.length > 0 ? (
        suggestions.map((airport, index) => (
          <div
            key={`${airport.iataCode}-${airport.name}-${index}`}
            className="p-3 hover:bg-accent cursor-pointer border-b last:border-b-0"
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


  return (
      <form onSubmit={handleManualSearch} className="flex flex-col gap-4">
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <Switch id="trip-type" checked={isRoundTrip} onCheckedChange={handleTripTypeChange} />
                <Label htmlFor="trip-type" className="text-sm font-semibold">{isRoundTrip ? 'Ida y Vuelta' : 'Solo Ida'}</Label>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputGroup className="relative" ref={originRef}>
                <Label htmlFor="origin" className="text-sm font-semibold ml-2 mb-1">Desde</Label>
                <div className="relative flex items-center">
                    <InputIcon><PlaneTakeoff className="h-4 w-4" /></InputIcon>
                    <Input id="origin" type="text" value={originQuery} 
                        onChange={e => setOriginQuery(e.target.value)} 
                        onFocus={() => setActiveInput('origin')}
                        placeholder="Ciudad o aeropuerto" 
                        className="pl-10" 
                        autoComplete="off"
                    />
                </div>
                {activeInput === 'origin' && <SuggestionsList type="origin" />}
            </InputGroup>

            <InputGroup className='relative' ref={destinationRef}>
                <Label htmlFor="destination" className="text-sm font-semibold ml-2 mb-1">Hasta</Label>
                 <div className="relative flex items-center">
                    <InputIcon><PlaneLanding className="h-4 w-4" /></InputIcon>
                    <Input id="destination" type="text" value={destinationQuery} 
                        onChange={e => setDestinationQuery(e.target.value)}
                        onFocus={() => setActiveInput('destination')} 
                        placeholder="Ciudad o aeropuerto" 
                        className="pl-10" 
                        autoComplete="off"
                    />
                </div>
                {activeInput === 'destination' && <SuggestionsList type="destination" />}
            </InputGroup>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputGroup>
                <Label htmlFor="dates" className="text-sm font-semibold ml-2 mb-1">{isRoundTrip ? 'Salida y Regreso' : 'Salida'}</Label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="dates"
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to && isRoundTrip ? (
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
                        <div className="p-3 border-t">
                            <Button onClick={() => setIsCalendarOpen(false)} className="w-full">Listo</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </InputGroup>
        
            <InputGroup>
                <Label htmlFor="passengers" className="text-sm font-semibold ml-2 mb-1">Pasajeros</Label>
                <Popover>
                <PopoverTrigger asChild>
                    <Button id="passengers" variant={"outline"} className="w-full justify-start text-left font-normal">
                    <Users className="mr-2 h-4 w-4" />
                    {travelerText}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
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
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.max(1, v - 1))} disabled={adults <= 1 || adults <= infants}>
                            <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-lg w-4 text-center">{adults}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.min(8, v + 1))} disabled={totalTravelers >= 8}>
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
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => Math.max(0, v - 1))} disabled={children <= 0}>
                            <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-lg w-4 text-center">{children}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => Math.min(8, v + 1))} disabled={totalTravelers >= 8}>
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
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setInfants(v => Math.max(0, v - 1))} disabled={infants <= 0}>
                            <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-lg w-4 text-center">{infants}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setInfants(v => Math.min(8, v + 1))} disabled={totalTravelers >= 8 || infants >= adults}>
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        </div>
                    </div>
                    </div>
                </PopoverContent>
                </Popover>
            </InputGroup>
        </div>

        <Button
            type="submit"
            size="lg"
            className="w-full text-lg font-bold bg-success hover:bg-success/90 h-12 text-success-foreground rounded-xl shadow-md hover:shadow-lg transition-all"
        >
           <Plane className="mr-2 h-5 w-5" />
           Buscar Vuelos
        </Button>
      </form>
  );
}
