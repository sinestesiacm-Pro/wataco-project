
'use client';

import React from 'react';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Users, Minus, Plus, BedDouble, Baby, MapPin } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { useIsMobile } from '@/hooks/use-mobile';
import { searchHotelDestinations } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';
import { Airport } from '@/lib/types';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';


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


interface AvailabilitySearchProps {
    onSearch: (data: { checkInDate: Date, checkOutDate: Date, adults: number, children: number, cityCode?: string, destinationName?: string }) => void;
    initialData: {
        checkInDate: Date;
        checkOutDate: Date;
        adults: number;
        children: number;
        cityCode?: string;
        destinationName?: string;
    };
    showDestination?: boolean;
}

export function AvailabilitySearch({ onSearch, initialData, showDestination = false }: AvailabilitySearchProps) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: initialData.checkInDate,
        to: initialData.checkOutDate,
    });
    const [adults, setAdults] = useState(initialData.adults);
    const [children, setChildren] = useState(initialData.children);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const isMobile = useIsMobile();
    
    // New state for destination search
    const [destination, setDestination] = useState<Airport | null>(initialData.cityCode ? { iataCode: initialData.cityCode, name: initialData.destinationName || '', subType: 'CITY' } : null);
    const [destinationQuery, setDestinationQuery] = useState(initialData.destinationName || '');
    const [suggestions, setSuggestions] = useState<Airport[]>([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [isDestinationPopoverOpen, setIsDestinationPopoverOpen] = useState(false);
    const debouncedDestinationQuery = useDebounce(destinationQuery, 300);


    const fetchSuggestions = React.useCallback(async (query: string) => {
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
        }
        setSuggestionsLoading(false);
      }, []);

    React.useEffect(() => {
        if (showDestination && isDestinationPopoverOpen) {
          fetchSuggestions(debouncedDestinationQuery);
        }
    }, [debouncedDestinationQuery, isDestinationPopoverOpen, fetchSuggestions, showDestination]);


    const handleSelectSuggestion = React.useCallback((airport: Airport) => {
        setDestination(airport);
        const query = [airport.address?.cityName, airport.address?.countryName].filter(Boolean).join(', ');
        setDestinationQuery(query || airport.name);
        setSuggestions([]);
        setIsDestinationPopoverOpen(false);
    }, []);

    const handleSearchClick = () => {
        if (date?.from && date?.to && (destination?.iataCode || !showDestination)) {
            onSearch({
                checkInDate: date.from,
                checkOutDate: date.to,
                adults,
                children,
                cityCode: destination?.iataCode,
                destinationName: destinationQuery
            });
        }
    };
    
    const totalGuests = adults + children;
    const travelerText = `${totalGuests} huésped${totalGuests > 1 ? 'es' : ''}`;
     const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.select();
    };

    return (
        <Card className="bg-card/40 backdrop-blur-xl border border-white/20 shadow-2xl">
            <CardHeader>
                <CardTitle className="text-foreground font-headline text-2xl">Consultar Disponibilidad y Precios</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    
                    {showDestination && (
                     <div className="lg:col-span-1 relative">
                        <label className="text-foreground/80 text-sm font-semibold mb-2 block">Destino</label>
                        <Popover open={isDestinationPopoverOpen && destinationQuery.length > 1} onOpenChange={setIsDestinationPopoverOpen}>
                            <PopoverTrigger asChild>
                                 <Input 
                                    id="destination" 
                                    type="text" 
                                    value={destinationQuery} 
                                    onChange={e => setDestinationQuery(e.target.value)}
                                    onFocus={() => setIsDestinationPopoverOpen(true)}
                                    onClick={handleInputClick}
                                    placeholder="Ej. Nueva York" 
                                    className="bg-background/20 text-foreground border-foreground/30 h-10" 
                                    autoComplete="off"
                                />
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
                    )}

                    {/* Date Picker */}
                    <div className="lg:col-span-1">
                        <label className="text-foreground/80 text-sm font-semibold mb-2 block">Fechas</label>
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal bg-background/20 text-foreground border-white/20 hover:bg-accent hover:text-foreground shadow-lg">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "d LLL, yy", {locale: es})} - {format(date.to, "d LLL, yy", {locale: es})}
                                            </>
                                        ) : (
                                            format(date.from, "d LLL, yy", {locale: es})
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
                                    numberOfMonths={isMobile ? 1 : 2}
                                    disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                                    locale={es}
                                />
                                <div className="p-2 border-t md:hidden">
                                    <Button className="w-full" onClick={()={() => setIsCalendarOpen(false)}}>Listo</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Guest Picker */}
                    <div className="lg:col-span-1">
                         <label className="text-foreground/80 text-sm font-semibold mb-2 block">Huéspedes</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal bg-background/20 text-foreground border-white/20 hover:bg-accent hover:text-foreground shadow-lg">
                                    <Users className="mr-2 h-4 w-4" />
                                    {travelerText}
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
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.max(1, v - 1))} disabled={adults <= 1}><Minus className="h-4 w-4" /></Button>
                                                <span className="font-bold text-lg w-4 text-center">{adults}</span>
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => v + 1)}><Plus className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2"><Baby className="h-5 w-5" /><p className="font-medium">Niños</p></div>
                                            <div className="flex items-center gap-2">
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => Math.max(0, v - 1))} disabled={children <= 0}><Minus className="h-4 w-4" /></Button>
                                                <span className="font-bold text-lg w-4 text-center">{children}</span>
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => v + 1)}><Plus className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Search Button */}
                    <div className="lg:col-span-1">
                        <Button size="lg" className="w-full bg-primary hover:bg-primary/90" onClick={handleSearchClick}>
                            <BedDouble className="mr-2 h-5 w-5" />
                            Buscar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

    