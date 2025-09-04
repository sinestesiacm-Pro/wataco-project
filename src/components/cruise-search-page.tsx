
'use client';
import { useState, useRef } from 'react';
import { format } from 'date-fns';
import { searchCruises } from '@/app/actions';
import type { CruiseData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Users, Loader2, Minus, Plus, Ship, Sailboat, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import React from 'react';
import { Label } from './ui/label';
import { recommendedCruises } from '@/lib/mock-cruises';
import { useIsMobile } from '@/hooks/use-mobile';

export default function CruiseSearchPage() {
  const [destinationRegion, setDestinationRegion] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });
  const [adults, setAdults] = useState(2);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const [cruiseData, setCruiseData] = useState<CruiseData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const searchIdRef = useRef(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationRegion || !departureDate) {
      toast({
        title: 'Información Faltante',
        description: 'Por favor, selecciona un destino y fecha de salida.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setCruiseData(null);
    
    const searchId = ++searchIdRef.current;

    const result = await searchCruises({
      destinationRegion,
      departureDate: format(departureDate, 'yyyy-MM-dd'),
      adults,
    });
    
    if (searchId !== searchIdRef.current) {
        return;
    }

    if (result.success && result.data) {
      setCruiseData(result.data);
    } else {
      setCruiseData(null);
      toast({
        title: 'Búsqueda no Disponible',
        description: result.error || 'No se pudieron buscar cruceros en este momento.',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };
  
  const handleCancelSearch = () => {
    searchIdRef.current++;
    setLoading(false);
  };
  
  const travelerText = `${adults} pasajero${adults > 1 ? 's' : ''}`;
  
  const cruiseRegions = [
    { value: 'CARIBBEAN', label: 'Caribe' },
    { value: 'ALASKA', label: 'Alaska' },
    { value: 'EUROPE', label: 'Europa' },
    { value: 'GREECE', label: 'Islas Griegas' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/20">
        <form onSubmit={handleSearch} className="flex flex-col gap-4 text-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select onValueChange={setDestinationRegion} value={destinationRegion}>
                    <SelectTrigger className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl text-lg">
                         <div className="flex items-center w-full">
                            <Sailboat className="h-6 w-6 mr-4 text-gray-800" />
                            <div>
                                <p className="text-xs text-gray-700">Destination</p>
                                <SelectValue placeholder="Select a destination" className="font-semibold text-gray-800"/>
                            </div>
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        {cruiseRegions.map(region => (
                        <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
             <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-white/50 hover:bg-white/70 rounded-2xl">
                      <div className="flex items-center w-full">
                          <CalendarIcon className="h-6 w-6 mr-4 text-gray-800" />
                          <div className="truncate">
                              <p className="text-xs text-gray-700">Sailing After</p>
                              <p className="text-base md:text-lg font-semibold text-gray-800 truncate">
                                {departureDate ? format(departureDate, "MMMM yyyy") : "Choose a month"}
                              </p>
                          </div>
                      </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar 
                        mode="single" 
                        selected={departureDate} 
                        onSelect={setDepartureDate} 
                        initialFocus
                        disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))} 
                    />
                    <div className="p-2 border-t md:hidden">
                        <Button className="w-full" onClick={() => setIsCalendarOpen(false)}>Done</Button>
                    </div>
                </PopoverContent>
              </Popover>

            <Button type="submit" size="lg" className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-sky-600 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all px-10">
                 {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin"/> : <Ship className="mr-2 h-5 w-5" />}
                 Buscar Cruceros
            </Button>
        </form>
    </div>
  );
}
