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
import { Skeleton } from './ui/skeleton';
import { RecommendedCruises } from './recommended-cruises';
import { HeroSection } from './hero-section';

const cruiseImages = [
  'https://images.unsplash.com/photo-1583389932503-5345753a9925?fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1590898361197-f0c6a51fee3c?fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723a996f3d1?fit=crop&w=1920&q=80',
];

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
  
  const cruiseRegions = [
    { value: 'CARIBBEAN', label: 'Caribe' },
    { value: 'ALASKA', label: 'Alaska' },
    { value: 'EUROPE', label: 'Europa' },
    { value: 'MEXICO', label: 'México' },
    { value: 'HAWAII', label: 'Hawái' },
    { value: 'BAHAMAS', label: 'Bahamas' },
  ];

  return (
    <div className="w-full">
      <HeroSection
        images={cruiseImages}
        title="Embárcate en tu Próxima Aventura"
        subtitle="Descubre y reserva increíbles vacaciones en crucero por todo el mundo."
      >
        <div className="bg-card/95 backdrop-blur-sm border p-4 sm:p-6 rounded-2xl shadow-2xl">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
              <div className='lg:col-span-5'>
                <Label htmlFor="destination-region" className="text-sm font-semibold ml-2">Navegando Hacia</Label>
                <Select onValueChange={setDestinationRegion} value={destinationRegion}>
                  <SelectTrigger id="destination-region" className="mt-1">
                    <Sailboat className="h-4 w-4 text-muted-foreground mr-2" />
                    <SelectValue placeholder="Selecciona un destino" />
                  </SelectTrigger>
                  <SelectContent>
                    {cruiseRegions.map(region => (
                      <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="lg:col-span-3">
                <Label htmlFor="departureDate" className="text-sm font-semibold ml-2">Navegando Después de</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal mt-1", !departureDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departureDate ? format(departureDate, "MMM yyyy") : <span>Elige una fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className='lg:col-span-2'>
                <Label htmlFor="passengers" className="text-sm font-semibold ml-2">Huéspedes</Label>
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
              <div className="lg:col-span-2 flex items-end">
                {loading ? (
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full font-bold rounded-xl"
                    onClick={handleCancelSearch}
                  >
                    <X className="mr-2 h-5 w-5" />
                    Cancelar
                  </Button>
                ) : (
                  <Button type="submit" className="w-full font-bold bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl shadow-md hover:shadow-lg transition-all">
                    <Ship className="mr-2 h-5 w-5" /> Buscar
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
          {/* {cruiseData && <CruiseResults cruiseData={cruiseData} />} */}
          {!loading && !cruiseData && (
             <RecommendedCruises />
          )}
        </section>
      </div>
    </div>
  );
}
