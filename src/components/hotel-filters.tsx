
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Star, Coffee, UtensilsCrossed, Car, Waves, Dumbbell } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Separator } from './ui/separator';

interface HotelFiltersProps {
  onFilterChange: (filters: { stars: number[], amenities: string[], boardTypes: string[] }) => void;
}

const starOptions = [5, 4, 3, 2, 1];

const amenityOptions: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'SWIMMING_POOL', label: 'Swimming Pool', icon: Waves },
  { id: 'FITNESS_CENTER', label: 'Gym', icon: Dumbbell },
  { id: 'PARKING', label: 'Parking', icon: Car },
];

const boardOptions: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'BREAKFAST', label: 'Breakfast Included', icon: Coffee },
  { id: 'ALL_INCLUSIVE', label: 'All Inclusive', icon: UtensilsCrossed },
];


export function HotelFilters({ onFilterChange }: HotelFiltersProps) {
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedBoards, setSelectedBoards] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange({ 
      stars: selectedStars,
      amenities: selectedAmenities,
      boardTypes: selectedBoards,
    });
  }, [selectedStars, selectedAmenities, selectedBoards, onFilterChange]);

  const handleCheckboxChange = (
    value: string | number, 
    type: 'star' | 'amenity' | 'board'
  ) => {
    const updater = (prev: any[]) => 
      prev.includes(value as never) 
        ? prev.filter(item => item !== value) 
        : [...prev, value];

    if (type === 'star') setSelectedStars(updater);
    else if (type === 'amenity') setSelectedAmenities(updater);
    else if (type === 'board') setSelectedBoards(updater);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Filter Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-3 text-sm">Star Rating</h3>
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
          <h3 className="font-semibold mb-3 text-sm">Board</h3>
          <div className="space-y-2">
            {boardOptions.map(board => (
              <div key={board.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`board-${board.id}`}
                  onCheckedChange={() => handleCheckboxChange(board.id, 'board')}
                  checked={selectedBoards.includes(board.id)}
                />
                 <Label htmlFor={`board-${board.id}`} className="flex items-center cursor-pointer gap-2 text-sm">
                  <board.icon className="w-4 h-4 text-muted-foreground" />
                  {board.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />

        <div>
          <h3 className="font-semibold mb-3 text-sm">Amenities</h3>
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
