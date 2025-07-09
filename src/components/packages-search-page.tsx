'use client';
import { useState, useEffect, useRef } from 'react';
import { addDays, format } from 'date-fns';
import { searchPackages } from '@/app/actions';
import type { PackageData, Airport } from '@/lib/types';
import { searchAirports } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';

import { PackagesResults } from '@/components/packages-results';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Users, Loader2, PlaneTakeoff, PlaneLanding, Minus, Plus, MapPin, Luggage, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import React from 'react';
import { RecommendedPackages } from './recommended-packages';
import type { DateRange } from 'react-day-picker';
import { HeroSection } from './hero-section';

const InputGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex items-center">{children}</div>
);

const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{children}</div>
);

const packageImages = [
  'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0?fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?fit=crop&w=1920&q=80',
];

export default function PackagesSearchPage() {
  const [origin, setOrigin] = useState('MAD');
  const [destination, setDestination] = useState('');
  const [originQuery, setOriginQuery] = useState('Madrid, Spain');
  const [destinationQuery, setDestinationQuery] = useState('');
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 14),
  });
  const [adults, setAdults] = useState(1);
  
  const [packagesData, setPackagesData] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState<'origin' | 'destination' | null>(null);
  const debouncedOriginQuery = useDebounce(originQuery, 300);
  const debouncedDestinationQuery = useDebounce(destinationQuery, 300);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const searchIdRef = useRef(0);

  useEffect(() => {
    const fetchSuggestions = async (query: string, subType: 'CITY,AIRPORT' | 'CITY' = 'CITY,AIRPORT') => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setSuggestionsLoading(true);
      const result = await searchAirports(query);
      if (result.success && result.data) {
        const filteredData = subType === 'CITY' ? result.data.filter(a => a.subType === 'CITY') : result.data;
        setSuggestions(filteredData);
      } else {
        setSuggestions([]);
      }
      setSuggestionsLoading(false);
    };

    if (activeInput === 'origin') {
      if (debouncedOriginQuery !== originQuery) setSuggestions([]);
      else fetchSuggestions(debouncedOriginQuery);
    } else if (activeInput === 'destination') {
      if (debouncedDestinationQuery !== destinationQuery) setSuggestions([]);
      else fetchSuggestions(debouncedDestinationQuery, 'CITY');
    }
  }, [debouncedOriginQuery, debouncedDestinationQuery, activeInput, originQuery, destinationQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !date?.from || !date?.to) {
      toast({
        title: 'Información Faltante',
        description: 'Por favor, completa todos los detalles del paquete requeridos.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setPackagesData(null);

    const searchId = ++searchIdRef.current;

    const result = await searchPackages({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: format(date.from, 'yyyy-MM-dd'),
      returnDate: format(date.to, 'yyyy-MM-dd'),
      adults,
    });

    if (searchId !== searchIdRef.current) {
        return;
    }

    if (result.success && result.data) {
      setPackagesData(result.data);
    } else {
      setPackagesData(null);
      toast({
        title: 'Error de Búsqueda',
        description: result.error || 'No se pudieron encontrar paquetes. Intenta otra búsqueda.',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };
  
  const handleCancelSearch = () => {
    searchIdRef.current++;
    setLoading(false);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6 mt-8">
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-56 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
  
  const travelerText = `${adults} pasajero${adults > 1 ? 's' : ''}`;

  const SuggestionsList = ({ type }: { type: 'origin' | 'destination' }) => (
    <div className="absolute z-10 w-full mt-1 bg-card border rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {suggestionsLoading ? (
        <div className="p-4 flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" /> Buscando...
        </div>
      ) : (
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
      )}
    </div>
  );

  return (
    <div className="w-full">
      <HeroSection
        images={packageImages}
        title="Paquetes de Viaje Completos"
        subtitle="Reserva tu vuelo y hotel juntos para ahorrar."
      >
        <div className="bg-card/95 backdrop-blur-sm border p-4 sm:p-6 rounded-2xl shadow-2xl">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
              <div className='lg:col-span-3 relative' ref={activeInput === 'origin' ? suggestionsRef : null}>
                <Label htmlFor="origin" className="text-sm font-semibold ml-2">Desde</Label>
                <InputGroup>
                  <InputIcon><PlaneTakeoff className="h-4 w-4" /></InputIcon>
                  <Input id="origin" type="text" value={originQuery} 
                      onChange={e => setOriginQuery(e.target.value)} 
                      onFocus={() => { setActiveInput('origin'); setSuggestions([])}}
                      placeholder="Ciudad o aeropuerto de origen" 
                      className="mt-1 pl-10" 
                      autoComplete="off"
                  />
                </InputGroup>
                 {activeInput === 'origin' && <SuggestionsList type="origin" />}
              </div>
              <div className='lg:col-span-4 relative' ref={activeInput === 'destination' ? suggestionsRef : null}>
                <Label htmlFor="destination" className="text-sm font-semibold ml-2">A</Label>
                <InputGroup>
                  <InputIcon><PlaneLanding className="h-4 w-4" /></InputIcon>
                  <Input id="destination" type="text" value={destinationQuery} 
                      onChange={e => setDestinationQuery(e.target.value)}
                      onFocus={() => { setActiveInput('destination'); setSuggestions([])}} 
                      placeholder="Ciudad de destino" 
                      className="mt-1 pl-10" 
                      autoComplete="off"
                  />
                </InputGroup>
                {activeInput === 'destination' && <SuggestionsList type="destination" />}
              </div>
              <div className="lg:col-span-3">
                <Label htmlFor="dates" className="text-sm font-semibold ml-2">Fechas</Label>
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
                      {date?.from && date.to ? (
                          <>
                            {format(date.from, "dd LLL, y")} -{" "}
                            {format(date.to, "dd LLL, y")}
                          </>
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
                <Label htmlFor="passengers" className="text-sm font-semibold ml-2">Pasajeros</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="passengers" variant={"outline"} className="w-full justify-start text-left font-normal mt-1">
                      <Users className="mr-2 h-4 w-4" />
                      {travelerText}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                     <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Pasajeros</h4>
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
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => v + 1)} disabled={adults >= 8}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="lg:col-span-12 flex justify-end">
                {loading ? (
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full lg:w-auto font-bold mt-1 rounded-xl"
                    onClick={handleCancelSearch}
                  >
                    <X className="mr-2 h-5 w-5" />
                    Cancelar
                  </Button>
                ) : (
                  <Button type="submit" className="w-full lg:w-auto font-bold bg-accent hover:bg-accent/90 mt-1 text-accent-foreground rounded-xl shadow-md hover:shadow-lg transition-all">
                     <Luggage className="mr-2 h-5 w-5" /> Buscar Paquetes
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </HeroSection>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mt-8">
          {loading && <LoadingSkeleton />}
          {packagesData && packagesData.data.length > 0 && (
            <PackagesResults packagesData={packagesData} />
          )}
          {!loading && (!packagesData || packagesData.data.length === 0) && (
             <RecommendedPackages />
          )}
        </section>
      </div>
    </div>
  );
}
