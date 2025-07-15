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

export default function CruiseSearchPage() {
  const [destinationRegion, setDestinationRegion] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });
  const [adults, setAdults] = useState(2);
  
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
    <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
          <div className="w-full lg:col-span-5">
            <Label htmlFor="destination-region" className="text-sm font-semibold ml-2 text-white/80">Navegando Hacia</Label>
            <Select onValueChange={setDestinationRegion} value={destinationRegion}>
              <SelectTrigger id="destination-region" className="mt-1 bg-transparent text-white border-white/20">
                <Sailboat className="h-4 w-4 text-white/70 mr-2" />
                <SelectValue placeholder="Selecciona un destino" />
              </SelectTrigger>
              <SelectContent>
                {cruiseRegions.map(region => (
                  <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full lg:col-span-3">
            <Label htmlFor="departureDate" className="text-sm font-semibold ml-2 text-white/80">Navegando Después de</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal mt-1 bg-transparent text-white border-white/20", !departureDate && "text-white/70")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departureDate ? format(departureDate, "MMM yyyy") : <span>Elige una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full lg:col-span-2">
            <Label htmlFor="passengers" className="text-sm font-semibold ml-2 text-white/80">Huéspedes</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button id="passengers" variant={"outline"} className="w-full justify-start text-left font-normal mt-1 bg-transparent text-white border-white/20">
                  <Users className="mr-2 h-4 w-4 text-white/70" />
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
          <div className="w-full lg:col-span-2">
            {loading ? (
              <Button
                type="button"
                size="lg"
                className="w-full font-bold rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground h-10"
                onClick={handleCancelSearch}
              >
                <X className="mr-2 h-5 w-5" />
                Cancelar
              </Button>
            ) : (
              <Button type="submit" size="lg" className="w-full font-bold bg-success hover:bg-success/90 text-success-foreground rounded-xl shadow-md hover:shadow-lg transition-all h-10">
                <Ship className="mr-2 h-5 w-5" /> Buscar Cruceros
              </Button>
            )}
          </div>
        </div>
    </form>
  );
}
