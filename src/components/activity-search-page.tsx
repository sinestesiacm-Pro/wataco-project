
'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { format, addDays } from 'date-fns';
import type { Airport } from '@/lib/types';
import { searchAirports } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Users, Loader2, MapPin, Zap, Minus, Plus, Baby } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import React from 'react';
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

export default function ActivitySearchPage() {
    const router = useRouter();
    const isMobile = useIsMobile();

    const [destination, setDestination] = useState<Airport | null>(null);
    const [destinationQuery, setDestinationQuery] = useState('');
    
    const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 7));
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [people, setPeople] = useState(2);
    
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
        const result = await searchAirports(query);
        if (result.success && result.data) {
          setSuggestions(result.data);
        } else {
          setSuggestions([]);
        }
        setSuggestionsLoading(false);
      }, []);

    useEffect(() => {
        if (isDestinationPopoverOpen) {
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

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Búsqueda en Desarrollo",
            description: "La búsqueda de actividades está en construcción. ¡Vuelve pronto!",
        });
    };
    
    const travelerText = `${people} persona${people > 1 ? 's' : ''}`;
        
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
                                    <p className="text-xs text-gray-700">Destino</p>
                                    <Input 
                                        id="destination" 
                                        type="text" 
                                        value={destinationQuery} 
                                        onChange={e => setDestinationQuery(e.target.value)}
                                        onFocus={() => setIsDestinationPopoverOpen(true)}
                                        onClick={handleInputClick}
                                        placeholder="Ej. Guatapé, Colombia" 
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
                                        <p className="text-xs text-gray-700">Fecha</p>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {date ? format(date, "dd LLL, yyyy") : "Elige una fecha"}
                                        </p>
                                    </div>
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="single"
                                selected={date}
                                onSelect={setDate}
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
                                        <p className="text-xs text-gray-700">Personas</p>
                                        <p className="text-lg font-semibold text-gray-800">{travelerText}</p>
                                    </div>
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="end">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Personas</h4>
                                    <p className="text-sm text-muted-foreground">¿Cuántos participarán?</p>
                                </div>
                                <div className="grid gap-4">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">Personas</p>
                                        <div className="flex items-center gap-2">
                                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setPeople(v => Math.max(1, v - 1))} disabled={people <= 1}>
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="font-bold text-lg w-4 text-center">{people}</span>
                                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setPeople(v => v + 1)}>
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
                    <Button type="submit" size="lg" className="h-14 font-bold rounded-2xl shadow-md hover:shadow-lg transition-all bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Zap className="mr-2 h-5 w-5" />
                        Buscar
                    </Button>
                </div>
            </div>
        </form>
    );
}
    