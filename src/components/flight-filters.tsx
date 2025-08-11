'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from './ui/separator';
import type { Dictionaries, FareDetailsBySegment } from '@/lib/types';
import type { FiltersState } from '@/app/flights/select/page';
import { useDebounce } from '@/hooks/use-debounce';

interface FlightFiltersProps {
  availableAirlines: Dictionaries['carriers'];
  onFilterChange: (filters: FiltersState) => void;
}

const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div>
        <h3 className="text-lg font-semibold mb-3 font-headline text-white">{title}</h3>
        <div className="space-y-3 pl-1">
            {children}
        </div>
    </div>
);

export function FlightFilters({ availableAirlines, onFilterChange }: FlightFiltersProps) {
  const [filters, setFilters] = useState<FiltersState>({
    stops: [],
    airlines: [],
    bags: [],
  });

  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    onFilterChange(debouncedFilters);
  }, [debouncedFilters, onFilterChange]);

  const handleStopChange = useCallback((value: string) => {
    const stopValue = value ? [parseInt(value, 10)] : [];
    setFilters(prev => ({ ...prev, stops: stopValue }));
  }, []);

  const handleAirlineChange = useCallback((checked: boolean, airlineCode: string) => {
    setFilters(prev => {
      const newAirlines = checked
        ? [...prev.airlines, airlineCode]
        : prev.airlines.filter(code => code !== airlineCode);
      return { ...prev, airlines: newAirlines };
    });
  }, []);
  
  const handleBagsChange = useCallback((checked: boolean, bagType: string) => {
    setFilters(prev => {
        const newBags = checked
            ? [...prev.bags, bagType]
            : prev.bags.filter(type => type !== bagType);
        return { ...prev, bags: newBags };
    });
  }, []);

  return (
    <Card className="sticky top-24 shadow-none bg-transparent border-none text-white">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold font-headline text-white">Filtrar por</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-0">
        <FilterSection title="Escalas">
            <RadioGroup onValueChange={handleStopChange} className="text-white">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="stops-0" className="border-white/50 text-primary" />
                    <Label htmlFor="stops-0" className="text-white">Sin escalas</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="stops-1" className="border-white/50 text-primary" />
                    <Label htmlFor="stops-1" className="text-white">1 escala</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="stops-2" className="border-white/50 text-primary" />
                    <Label htmlFor="stops-2" className="text-white">2 o más escalas</Label>
                </div>
            </RadioGroup>
        </FilterSection>

        <Separator className="bg-white/20" />

        <FilterSection title="Aerolíneas">
            {availableAirlines && Object.entries(availableAirlines).slice(0, 5).map(([code, name]) => (
                 <div key={code} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`airline-${code}`} 
                      onCheckedChange={(checked) => handleAirlineChange(!!checked, code)} 
                      checked={filters.airlines.includes(code)}
                      className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor={`airline-${code}`} className="text-white">{name}</Label>
                </div>
            ))}
        </FilterSection>

        <Separator className="bg-white/20" />

        <FilterSection title="Equipaje">
            <div className="flex items-center space-x-2">
                <Checkbox 
                  id="bags-carry-on" 
                  onCheckedChange={(checked) => handleBagsChange(!!checked, 'carry-on')} 
                  checked={filters.bags.includes('carry-on')}
                  className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="bags-carry-on" className="text-white">Equipaje de mano</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox 
                  id="bags-checked" 
                  onCheckedChange={(checked) => handleBagsChange(!!checked, 'checked')}
                  checked={filters.bags.includes('checked')}
                  className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="bags-checked" className="text-white">Equipaje facturado</Label>
            </div>
        </FilterSection>

        <Separator className="bg-white/20" />
        
        <FilterSection title="Flexibilidad">
            <div className="flex items-center space-x-2">
                <Checkbox id="flex-no-change-fee" disabled className="disabled:opacity-40 border-white/30" />
                <Label htmlFor="flex-no-change-fee" className="text-white/60">Sin cargos por cambio</Label>
            </div>
        </FilterSection>

      </CardContent>
    </Card>
  );
}
