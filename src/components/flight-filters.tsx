'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from './ui/separator';
import type { Dictionaries } from '@/lib/types';
import type { FiltersState } from '@/app/flights/select/page';

interface FlightFiltersProps {
  availableAirlines: Dictionaries['carriers'];
  onFilterChange: (filters: FiltersState) => void;
}

const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div>
        <h3 className="text-lg font-semibold mb-3 font-headline">{title}</h3>
        <div className="space-y-3 pl-1">
            {children}
        </div>
    </div>
);

export function FlightFilters({ availableAirlines, onFilterChange }: FlightFiltersProps) {
  
  const handleStopChange = (value: string) => {
    const stopValue = parseInt(value, 10);
     onFilterChange({
        stops: [stopValue], // Assuming radio buttons for now
        airlines: [],
        bags: [],
    });
  };

  const handleAirlineChange = (checked: boolean, airlineCode: string) => {
    onFilterChange({
        stops: [],
        airlines: checked 
          ? [airlineCode] // Replace with real logic to append to array
          : [],
        bags: [],
    });
  };
  
  const handleBagsChange = (checked: boolean, bagType: string) => {
     onFilterChange({
        stops: [],
        airlines: [],
        bags: checked ? [bagType] : []
    });
  }

  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold font-headline">Filtrar por</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FilterSection title="Escalas">
            <RadioGroup onValueChange={handleStopChange}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="stops-0" />
                    <Label htmlFor="stops-0">Sin escalas</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="stops-1" />
                    <Label htmlFor="stops-1">1 escala</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="stops-2" />
                    <Label htmlFor="stops-2">2 o más escalas</Label>
                </div>
            </RadioGroup>
        </FilterSection>

        <Separator />

        <FilterSection title="Aerolíneas">
            {Object.entries(availableAirlines).slice(0, 5).map(([code, name]) => (
                 <div key={code} className="flex items-center space-x-2">
                    <Checkbox id={`airline-${code}`} onCheckedChange={(checked) => handleAirlineChange(!!checked, code)} />
                    <Label htmlFor={`airline-${code}`}>{name}</Label>
                </div>
            ))}
        </FilterSection>

        <Separator />

        <FilterSection title="Equipaje">
            <div className="flex items-center space-x-2">
                <Checkbox id="bags-carry-on" onCheckedChange={(checked) => handleBagsChange(!!checked, 'carry-on')} />
                <Label htmlFor="bags-carry-on">Equipaje de mano</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="bags-checked" onCheckedChange={(checked) => handleBagsChange(!!checked, 'checked')}/>
                <Label htmlFor="bags-checked">Equipaje facturado</Label>
            </div>
        </FilterSection>

        <Separator />
        
        <FilterSection title="Flexibilidad">
            <div className="flex items-center space-x-2">
                <Checkbox id="flex-no-change-fee" disabled />
                <Label htmlFor="flex-no-change-fee" className="text-muted-foreground">Sin cargos por cambio</Label>
            </div>
        </FilterSection>

      </CardContent>
    </Card>
  );
}
