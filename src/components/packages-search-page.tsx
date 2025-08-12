
'use client';
import { useState, useEffect, useRef } from 'react';
import { addDays, format } from 'date-fns';
import { searchPackages } from '@/app/actions';
import type { PackageData, Airport } from '@/lib/types';
import { searchAirports } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Users, Loader2, PlaneTakeoff, PlaneLanding, Minus, Plus, MapPin, Luggage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import React from 'react';
import type { DateRange } from 'react-day-picker';
import { useIsMobile } from '@/hooks/use-mobile';

const InputGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("relative flex flex-col w-full", className)}>{children}</div>
);

const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{children}</div>
);

export default function PackagesSearchPage() {
  const [origin, setOrigin] = useState('MAD');
  const [destination, setDestination] = useState('');
  const [originQuery, setOriginQuery] = useState('Madrid, Spain');
  const [destinationQuery, setDestinationQuery] = useState('');
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 14),
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const isMobile = useIsMobile();
  
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
  
  const travelerText = `${adults} pasajero${adults > 1 ? 's' : ''}`;

  const SuggestionsList = ({ type }: { type: 'origin' | 'destination' }) => (
    <div ref={suggestionsRef} className="absolute z-20 w-full mt-1 bg-background/80 backdrop-blur-xl border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
    <div className="bg-white/40 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20">
        <form onSubmit={handleSearch} className="flex flex-col gap-4 text-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup className='relative'>
                <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl" onClick={() => setActiveInput('origin')}>
                    <div className="flex items-center w-full">
                        <PlaneTakeoff className="h-6 w-6 mr-4 text-primary" />
                        <div>
                            <p className="text-xs text-gray-700">Desde</p>
                            <Input 
                                id="origin" type="text" value={originQuery} 
                                onChange={e => setOriginQuery(e.target.value)} 
                                onFocus={() => setActiveInput('origin')}
                                placeholder="Ciudad o aeropuerto" 
                                className="bg-transparent border-0 p-0 h-auto text-lg font-semibold text-gray-800 placeholder:text-gray-500 focus-visible:ring-0" 
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </Button>
                {activeInput === 'origin' && <SuggestionsList type="origin" />}
            </InputGroup>
            <InputGroup className='relative'>
                <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl" onClick={() => setActiveInput('destination')}>
                    <div className="flex items-center w-full">
                        <PlaneLanding className="h-6 w-6 mr-4 text-primary" />
                        <div>
                            <p className="text-xs text-gray-700">Hasta</p>
                            <Input 
                                id="destination" type="text" value={destinationQuery} 
                                onChange={e => setDestinationQuery(e.target.value)}
                                onFocus={() => setActiveInput('destination')} 
                                placeholder="Ciudad de destino" 
                                className="bg-transparent border-0 p-0 h-auto text-lg font-semibold text-gray-800 placeholder:text-gray-500 focus-visible:ring-0" 
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </Button>
                {activeInput === 'destination' && <SuggestionsList type="destination" />}
            </InputGroup>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl">
                        <div className="flex items-center w-full">
                            <CalendarIcon className="h-6 w-6 mr-4 text-gray-800" />
                            <div>
                                <p className="text-xs text-gray-700">Fechas</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {date?.from && date.to ? `${format(date.from, "dd LLL")} - ${format(date.to, "dd LLL")}`: "Elige tus fechas"}
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
            </InputGroup>
            <InputGroup>
                <Popover>
                <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl">
                        <div className="flex items-center w-full">
                            <Users className="h-6 w-6 mr-4 text-gray-800" />
                            <div>
                                <p className="text-xs text-gray-700">Pasajeros</p>
                                <p className="text-lg font-semibold text-gray-800">{travelerText}</p>
                            </div>
                        </div>
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
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.max(1, v - 1))} disabled={adults <= 1}>
                            <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-lg w-4 text-center">{adults}</span>
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => v + 1)} disabled={adults >= 8}>
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
        <Button type="submit" size="lg" className="w-full font-bold bg-primary hover:bg-primary/90 mt-1 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all h-14">
            <Luggage className="mr-2 h-5 w-5" /> Buscar Paquetes
        </Button>
        </form>
    </div>
  );
}
    
