'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Star, Waves, Dumbbell, Car } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Separator } from './ui/separator';

interface HotelFiltersProps {
  onFilterChange: (filters: { stars: number[], amenities: string[] }) => void;
}

const starOptions = [5, 4, 3, 2, 1];

const amenityOptions: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'SWIMMING_POOL', label: 'Piscina', icon: Waves },
  { id: 'FITNESS_CENTER', label: 'Gimnasio', icon: Dumbbell },
  { id: 'PARKING', label: 'Estacionamiento', icon: Car },
];

export function HotelFilters({ onFilterChange }: HotelFiltersProps) {
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange({ 
      stars: selectedStars,
      amenities: selectedAmenities,
    });
  }, [selectedStars, selectedAmenities, onFilterChange]);

  const handleCheckboxChange = (
    value: string | number, 
    type: 'star' | 'amenity'
  ) => {
    const updater = (prev: any[]) => 
      prev.includes(value as never) 
        ? prev.filter(item => item !== value) 
        : [...prev, value];

    if (type === 'star') setSelectedStars(updater);
    else if (type === 'amenity') setSelectedAmenities(updater);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Filtrar Resultados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-3 text-sm">Clasificación por Estrellas</h3>
          <div className="space-y-2">
            {starOptions.map(star => (
              <div key={star} className="flex items-center space-x-2">
                <Checkbox
                  id={`star-${star}`}
                  onCheckedChange={() => handleCheckboxChange(star, 'star')}
                  checked={selectedStars.includes(star)}
                />
                <Label htmlFor={`star-${star}`} className="flex items-center cursor-pointer gap-1">
                  {[...Array(star)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                   {[...Array(5 - star)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                  ))}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />
        
        <div>
          <h3 className="font-semibold mb-3 text-sm">Servicios</h3>
          <div className="space-y-2">
            {amenityOptions.map(amenity => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity.id}`}
                  onCheckedChange={() => handleCheckboxChange(amenity.id, 'amenity')}
                  checked={selectedAmenities.includes(amenity.id)}
                />
                <Label htmlFor={`amenity-${amenity.id}`} className="flex items-center cursor-pointer gap-2 text-sm">
                  <amenity.icon className="w-4 h-4 text-muted-foreground" />
                  {amenity.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
