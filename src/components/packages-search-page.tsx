
'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
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
                suggestions.map((airport, index) => (
                    <div
                        key={`${airport.iataCode}-${airport.name}-${index}`}
                        className="p-3 hover:bg-accent cursor-pointer border-b last:border-b-0"
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
            ) : null}
        </div>
    );
});


const PackagesSearchPage = React.memo(function PackagesSearchPage() {
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

  const [originSuggestions, setOriginSuggestions] = useState<Airport[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<Airport[]>([]);
  const [originLoading, setOriginLoading] = useState(false);
  const [destinationLoading, setDestinationLoading] = useState(false);

  const [isOriginPopoverOpen, setIsOriginPopoverOpen] = useState(false);
  const [isDestinationPopoverOpen, setIsDestinationPopoverOpen] = useState(false);
  
  const debouncedOriginQuery = useDebounce(originQuery, 300);
  const debouncedDestinationQuery = useDebounce(destinationQuery, 300);
  const searchIdRef = useRef(0);

  const fetchSuggestions = useCallback(async (query: string, type: 'origin' | 'destination') => {
      if (query.length < 2) {
        type === 'origin' ? setOriginSuggestions([]) : setDestinationSuggestions([]);
        return;
      }
      type === 'origin' ? setOriginLoading(true) : setDestinationLoading(true);
      const result = await searchAirports(query);
      if (result.success && result.data) {
        const filteredData = type === 'destination' ? result.data.filter(a => a.subType === 'CITY') : result.data;
        if (type === 'origin') setOriginSuggestions(filteredData);
        else setDestinationSuggestions(filteredData);
      } else {
        type === 'origin' ? setOriginSuggestions([]) : setDestinationSuggestions([]);
      }
      type === 'origin' ? setOriginLoading(false) : setDestinationLoading(false);
    }, []);

  useEffect(() => {
    if (isOriginPopoverOpen) {
      fetchSuggestions(debouncedOriginQuery, 'origin');
    }
  }, [debouncedOriginQuery, isOriginPopoverOpen, fetchSuggestions]);

  useEffect(() => {
    if (isDestinationPopoverOpen) {
      fetchSuggestions(debouncedDestinationQuery, 'destination');
    }
  }, [debouncedDestinationQuery, isDestinationPopoverOpen, fetchSuggestions]);

  
  const handleSelectSuggestion = useCallback((airport: Airport, type: 'origin' | 'destination') => {
    const locationName = airport.address?.cityName || airport.name;
    const countryName = airport.address?.countryName || '';
    const query = [locationName, countryName].filter(Boolean).join(', ');

    if (type === 'origin') {
      setOrigin(airport.iataCode);
      setOriginQuery(query);
      setIsOriginPopoverOpen(false);
    } else {
      setDestination(airport.iataCode);
      setDestinationQuery(query);
      setIsDestinationPopoverOpen(false);
    }
  }, []);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
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
  }, [origin, destination, date, adults, toast]);
  
  const travelerText = `${adults} pasajero${adults > 1 ? 's' : ''}`;
    
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20">
        <form onSubmit={handleSearch} className="flex flex-col gap-4 text-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='relative'>
                <Popover open={isOriginPopoverOpen && originQuery.length > 1} onOpenChange={setIsOriginPopoverOpen}>
                    <PopoverTrigger asChild>
                        <div className="flex items-center w-full p-4 bg-white/70 hover:bg-white/90 rounded-2xl cursor-text">
                            <PlaneTakeoff className="h-6 w-6 mr-4 text-primary" />
                            <div>
                                <p className="text-xs text-gray-700">Desde</p>
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
                      <SuggestionsList suggestions={originSuggestions} isLoading={originLoading} onSelect={(airport) => handleSelectSuggestion(airport, 'origin')} />
                    </PopoverContent>
                </Popover>
            </div>
            <div className='relative'>
                <Popover open={isDestinationPopoverOpen && destinationQuery.length > 1} onOpenChange={setIsDestinationPopoverOpen}>
                    <PopoverTrigger asChild>
                        <div className="flex items-center w-full p-4 bg-white/70 hover:bg-white/90 rounded-2xl cursor-text">
                            <PlaneLanding className="h-6 w-6 mr-4 text-primary" />
                            <div>
                                <p className="text-xs text-gray-700">Hasta</p>
                                <Input 
                                    id="destination" 
                                    type="text" 
                                    value={destinationQuery} 
                                    onChange={e => setDestinationQuery(e.target.value)}
                                    onFocus={() => setIsDestinationPopoverOpen(true)}
                                    onClick={handleInputClick}
                                    placeholder="Ciudad de destino" 
                                    className="bg-transparent border-0 p-0 h-auto text-lg font-semibold text-gray-800 placeholder:text-gray-500 focus-visible:ring-0" 
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-transparent border-none shadow-none" align="start">
                      <SuggestionsList suggestions={destinationSuggestions} isLoading={destinationLoading} onSelect={(airport) => handleSelectSuggestion(airport, 'destination')} />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/70 hover:bg-white/90 rounded-2xl">
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
            </div>
            <div>
                <Popover>
                <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/70 hover:bg-white/90 rounded-2xl">
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
            </div>
        </div>
        <Button type="submit" size="lg" className="w-full font-bold bg-primary hover:bg-primary/90 mt-1 text-primary-foreground rounded-xl shadow-md hover:shadow-lg transition-all h-14">
            <Luggage className="mr-2 h-5 w-5" /> Buscar Paquetes
        </Button>
        </form>
    </div>
  );
});
export default PackagesSearchPage;
    

    
