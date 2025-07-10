'use client';

import { useState, useEffect } from 'react';
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

interface HotelFiltersProps {
  onFilterChange: (filters: any) => void;
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
    <Card className="bg-card/50 shadow-none border-0">
        <CardHeader className="p-4">
            <CardTitle className="text-lg font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
            {children}
        </CardContent>
    </Card>
);

export function HotelFilters({ onFilterChange }: HotelFiltersProps) {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    stars: [] as number[],
    userRating: null as number | null,
    amenities: [] as string[],
    accommodationTypes: [] as string[],
    distance: null,
  });

  useEffect(() => {
    // This effect now correctly debounces the filter changes.
    const handler = setTimeout(() => {
      onFilterChange(filters);
    }, 500); // Debounce time of 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [filters, onFilterChange]);

  const handleCheckboxChange = (
    value: string | number, 
    type: 'stars' | 'amenities' | 'accommodationTypes'
  ) => {
    setFilters(prev => {
        const list = prev[type] as any[];
        const newList = list.includes(value as never)
            ? list.filter(item => item !== value)
            : [...list, value];
        return { ...prev, [type]: newList };
    });
  };

  return (
    <div className="sticky top-24 space-y-4">
      <Card>
        <CardHeader>
            <CardTitle className="text-xl font-bold">Filtrar Resultados</CardTitle>
        </CardHeader>
      </Card>

      <FilterSection title="Tu presupuesto">
          <Slider
              defaultValue={filters.priceRange}
              max={1000}
              step={10}
              onValueCommit={(value) => setFilters(prev => ({...prev, priceRange: value}))}
              className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1] === 1000 ? '1000+' : filters.priceRange[1]}</span>
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
                {[...Array(5 - star)].map((_, i) => ( <Star key={i} className="w-4 h-4 text-gray-300" /> ))}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>
      
      <Separator />

      <FilterSection title="Calificación de los usuarios">
         <RadioGroup 
            value={filters.userRating?.toString()} 
            onValueChange={(value) => setFilters(prev => ({...prev, userRating: value ? Number(value) : null}))}
            className="space-y-2"
        >
            <div className="flex items-center space-x-2"><RadioGroupItem value="9" id="r1" /><Label htmlFor="r1">Excelente: 9+</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="8" id="r2" /><Label htmlFor="r2">Muy bien: 8+</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="7" id="r3" /><Label htmlFor="r3">Bueno: 7+</Label></div>
        </RadioGroup>
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
      
      <Separator />

      <FilterSection title="Tipo de Alojamiento">
        <div className="space-y-2">
          {accommodationTypes.map(type => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type.id}`}
                onCheckedChange={() => handleCheckboxChange(type.id, 'accommodationTypes')}
                checked={filters.accommodationTypes.includes(type.id)}
              />
              <Label htmlFor={`type-${type.id}`} className="flex items-center cursor-pointer gap-2 text-sm">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      <FilterSection title="Distancia al centro">
         <RadioGroup disabled className="space-y-2">
            <div className="flex items-center space-x-2"><RadioGroupItem value="1" id="d1" /><Label htmlFor="d1">Menos de 1 km</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="3" id="d2" /><Label htmlFor="d2">Menos de 3 km</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="5" id="d3" /><Label htmlFor="d3">Menos de 5 km</Label></div>
         </RadioGroup>
      </FilterSection>

    </div>
  );
}
