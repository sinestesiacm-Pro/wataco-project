
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Star, Wifi, Car, Waves, Utensils, GlassWater, Wind, Dumbbell, Sparkles, Dog, Plane, Building2
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Separator } from './ui/separator';

interface HotelFiltersState {
  priceRange: number[];
  stars: number[];
  amenities: string[];
}

interface HotelFiltersProps {
  filters: HotelFiltersState;
  onFiltersChange: (filters: HotelFiltersState) => void;
}

const amenityOptions: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'WIFI', label: 'Wi-Fi Gratuito', icon: Wifi },
  { id: 'PARKING', label: 'Estacionamiento', icon: Car },
  { id: 'SWIMMING_POOL', label: 'Piscina', icon: Waves },
  { id: 'RESTAURANT', label: 'Restaurante', icon: Utensils },
  { id: 'BAR', label: 'Bar', icon: GlassWater },
  { id: 'AIR_CONDITIONING', label: 'Aire Acondicionado', icon: Wind },
  { id: 'FITNESS_CENTER', label: 'Gimnasio', icon: Dumbbell },
  { id: 'SPA', label: 'Spa', icon: Sparkles },
  { id: 'PETS_ALLOWED', label: 'Admite Mascotas', icon: Dog },
  { id: 'AIRPORT_SHUTTLE', label: 'Traslado Aeropuerto', icon: Plane },
];

const accommodationTypes: { id: string; label: string; }[] = [
    { id: 'HOTEL', label: 'Hotel' },
    { id: 'APARTMENT', label: 'Apartamento' },
    { id: 'HOSTEL', label: 'Hostel' },
    { id: 'VILLA', label: 'Villa' },
    { id: 'RURAL', label: 'Casa Rural' },
    { id: 'BED_AND_BREAKFAST', label: 'Bed & Breakfast' },
];

const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div>
        <h3 className="text-lg font-semibold mb-3 font-headline">{title}</h3>
        <div className="space-y-3 pl-1">
            {children}
        </div>
    </div>
);

export function HotelFilters({ filters, onFiltersChange }: HotelFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);

  useEffect(() => {
    setLocalPriceRange(filters.priceRange);
  }, [filters.priceRange]);

  const handleCheckboxChange = (
    value: string | number, 
    type: 'stars' | 'amenities'
  ) => {
    const list = filters[type] as any[];
    const newList = list.includes(value as never)
      ? list.filter(item => item !== value)
      : [...list, value];
    onFiltersChange({ ...filters, [type]: newList });
  };
  
  const handlePriceCommit = (value: number[]) => {
      onFiltersChange({...filters, priceRange: value});
  }

  return (
    <Card className="sticky top-24 shadow-none bg-transparent border-none">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold font-headline">Filtrar por</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-0">
      
      <FilterSection title="Tu presupuesto">
          <Slider
              value={localPriceRange}
              onValueChange={setLocalPriceRange}
              onValueCommit={handlePriceCommit}
              max={1000}
              step={10}
              className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>${localPriceRange[0]}</span>
              <span>${localPriceRange[1] === 1000 ? '1000+' : localPriceRange[1]}</span>
          </div>
      </FilterSection>
      
      <Separator />

      <FilterSection title="Clasificación por Estrellas">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(star => (
            <div key={star} className="flex items-center space-x-2">
              <Checkbox
                id={`star-${star}`}
                onCheckedChange={() => handleCheckboxChange(star, 'stars')}
                checked={filters.stars.includes(star)}
              />
              <Label htmlFor={`star-${star}`} className="flex items-center cursor-pointer gap-1">
                {[...Array(star)].map((_, i) => ( <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" /> ))}
                {[...Array(5 - star)].map((_, i) => ( <Star key={i} className="w-4 h-4 text-muted-foreground/30" /> ))}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>
      
      <Separator />
      
      <FilterSection title="Servicios">
        <div className="space-y-2">
          {amenityOptions.map(amenity => (
            <div key={amenity.id} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity.id}`}
                onCheckedChange={() => handleCheckboxChange(amenity.id, 'amenities')}
                checked={filters.amenities.includes(amenity.id)}
              />
              <Label htmlFor={`amenity-${amenity.id}`} className="flex items-center cursor-pointer gap-2 text-sm">
                <amenity.icon className="w-4 h-4 text-muted-foreground" />
                {amenity.label}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

    </CardContent>
    </Card>
  );
}
