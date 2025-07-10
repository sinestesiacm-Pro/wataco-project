

'use client';
import { useState, useEffect, useRef } from 'react';
import { addDays, format } from 'date-fns';
import { searchFlights } from '@/app/actions';
import type { FlightData, Airport } from '@/lib/types';
import { searchAirports } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';

import { RecommendedDestinations } from '@/components/recommended-destinations';
import { FlightResults } from '@/components/flight-results';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Users, Loader2, PlaneTakeoff, PlaneLanding, Minus, Plus, MapPin, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Switch } from './ui/switch';
import React from 'react';
import type { DateRange } from 'react-day-picker';
import { HeroSection } from './hero-section';
import { FlightLoadingAnimation } from './flight-loading-animation';

const InputGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex items-center">{children}</div>
);

const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{children}</div>
);

const flightImages = [
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?fit=crop&w=1920&q=80',
];

export default function FlightSearchPage() {
  const [origin, setOrigin] = useState('MAD');
  const [destination, setDestination] = useState('');
  const [originQuery, setOriginQuery] = useState('Madrid, Spain');
  const [destinationQuery, setDestinationQuery] = useState('');
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 14),
  });

  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState<'origin' | 'destination' | null>(null);
  const debouncedOriginQuery = useDebounce(originQuery, 300);
  const debouncedDestinationQuery = useDebounce(destinationQuery, 300);
  const originRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const searchIdRef = useRef(0);

  useEffect(() => {
    const fetchSuggestions = async (query: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setSuggestionsLoading(true);
      const result = await searchAirports(query);
      if (result.success && result.data) {
        // Check activeInput again to prevent race conditions if user blurs input quickly
        if (activeInput) {
            setSuggestions(result.data);
        }
      } else {
        setSuggestions([]);
        toast({
            title: "Error de Búsqueda de Aeropuerto",
            description: result.error || "No se pudieron obtener las sugerencias.",
            variant: "destructive",
        });
      }
      setSuggestionsLoading(false);
    };

    if (activeInput === 'origin' && originQuery.length > 1) {
      fetchSuggestions(debouncedOriginQuery);
    } else if (activeInput === 'destination' && destinationQuery.length > 1) {
      fetchSuggestions(debouncedDestinationQuery);
    } else {
      setSuggestions([]); // Clear suggestions when no input is active or query is too short
    }
  }, [debouncedOriginQuery, debouncedDestinationQuery, activeInput, originQuery, destinationQuery, toast]);


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
      // For one-way, we only need a `from` date. Clear `to`.
      setDate(current => (current?.from ? { from: current.from, to: undefined } : undefined));
    } else {
      // When switching to round-trip, if there's no `to` date, add one.
      setDate(current => {
        if (current?.from && !current?.to) {
          return { from: current.from, to: addDays(current.from, 7) };
        }
        // If no dates at all, set default range
        if (!current?.from) {
            return { from: addDays(new Date(), 7), to: addDays(new Date(), 14) };
        }
        return current;
      });
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !date?.from || (isRoundTrip && !date?.to)) {
      toast({
        title: 'Información Faltante',
        description: 'Por favor, completa todos los detalles del vuelo requeridos.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setFlightData(null);

    const searchId = ++searchIdRef.current;

    const result = await searchFlights({
      origin,
      destination,
      departureDate: date.from ? format(date.from, 'yyyy-MM-dd') : '',
      returnDate: isRoundTrip && date.to ? format(date.to, 'yyyy-MM-dd') : undefined,
      adults,
      children,
      infants,
    });

    if (searchId !== searchIdRef.current) {
      return;
    }

    if (result.success && result.data) {
      setFlightData(result.data);
    } else {
      setFlightData(null); // Clear previous results on error
      toast({
        title: 'Error de Búsqueda',
        description: result.error || 'No se pudieron encontrar vuelos. Intenta otra búsqueda.',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };
  
  const handleCancelSearch = () => {
    searchIdRef.current++;
    setLoading(false);
  };

  const handleSetRecommendedDestination = (destination: { iata: string; query: string }) => {
    setDestination(destination.iata);
    setDestinationQuery(destination.query);
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
    <div className="w-full">
      <HeroSection
        images={flightImages}
        title={<>Tu Próxima Aventura<br />te Espera</>}
        subtitle="Encuentra y reserva sin esfuerzo los mejores vuelos a cualquier parte del mundo."
      >
        <div className="bg-card/80 backdrop-blur-2xl border p-4 sm:p-6 rounded-3xl shadow-2xl">
          <form onSubmit={handleSearch} className="space-y-4">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                <div className="lg:col-span-12">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Switch id="trip-type" checked={isRoundTrip} onCheckedChange={handleTripTypeChange} />
                            <Label htmlFor="trip-type" className="text-sm font-semibold">{isRoundTrip ? 'Ida y Vuelta' : 'Solo Ida'}</Label>
                        </div>
                    </div>
                </div>

                <div className='lg:col-span-4 relative' ref={originRef}>
                    <Label htmlFor="origin" className="text-sm font-semibold ml-2">Desde</Label>
                    <InputGroup>
                    <InputIcon><PlaneTakeoff className="h-4 w-4" /></InputIcon>
                    <Input id="origin" type="text" value={originQuery} 
                        onChange={e => setOriginQuery(e.target.value)} 
                        onFocus={() => setActiveInput('origin')}
                        placeholder="Ciudad o aeropuerto de origen" 
                        className="mt-1 pl-10" 
                        autoComplete="off"
                    />
                    </InputGroup>
                    {activeInput === 'origin' && <SuggestionsList type="origin" />}
                </div>

                <div className='lg:col-span-4 relative' ref={destinationRef}>
                    <Label htmlFor="destination" className="text-sm font-semibold ml-2">A</Label>
                    <InputGroup>
                    <InputIcon><PlaneLanding className="h-4 w-4" /></InputIcon>
                    <Input id="destination" type="text" value={destinationQuery} 
                        onChange={e => setDestinationQuery(e.target.value)}
                        onFocus={() => setActiveInput('destination')} 
                        placeholder="Ciudad o aeropuerto de destino" 
                        className="mt-1 pl-10" 
                        autoComplete="off"
                    />
                    </InputGroup>
                    {activeInput === 'destination' && <SuggestionsList type="destination" />}
                </div>

                <div className="lg:col-span-4">
                    <Label htmlFor="dates" className="text-sm font-semibold ml-2">{isRoundTrip ? 'Salida y Regreso' : 'Salida'}</Label>
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
                    </PopoverContent>
                    </Popover>
                </div>
                
                <div className='lg:col-span-10'>
                    <Label htmlFor="passengers" className="text-sm font-semibold ml-2">Pasajeros</Label>
                    <Popover>
                    <PopoverTrigger asChild>
                        <Button id="passengers" variant={"outline"} className="w-full justify-start text-left font-normal mt-1 hover:bg-primary/10">
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
                </div>

                <div className="lg:col-span-2 flex items-end">
                    {loading ? (
                    <Button
                        type="button"
                        size="lg"
                        className="w-full text-lg font-bold h-full mt-1 rounded-xl shadow-md bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={handleCancelSearch}
                    >
                        <X className="mr-2 h-5 w-5" />
                        Cancelar
                    </Button>
                    ) : (
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full text-lg font-bold bg-tertiary hover:bg-tertiary/90 h-full mt-1 text-tertiary-foreground rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                        Buscar
                    </Button>
                    )}
                </div>
            </div>
          </form>
        </div>
      </HeroSection>
      
      <div className="max-w-7xl mx-auto py-0 px-4 sm:px-6 lg:px-8">
        <section className="mt-8">
          {loading && <FlightLoadingAnimation originName={originQuery} destinationName={destinationQuery} />}
          {flightData && flightData.data.length > 0 && (
            <FlightResults flightData={flightData} destinationIata={destination} />
          )}
          {!loading && !flightData && (
             <div className="h-16" />
          )}
        </section>
      </div>
    </div>
  );
}
