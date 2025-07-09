
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';

interface HotelFiltersProps {
  onFilterChange: (filters: { stars: number[] }) => void;
}

const starOptions = [5, 4, 3, 2, 1];

export function HotelFilters({ onFilterChange }: HotelFiltersProps) {
  const [selectedStars, setSelectedStars] = useState<number[]>([]);

  useEffect(() => {
    onFilterChange({ stars: selectedStars });
  }, [selectedStars, onFilterChange]);

  const handleStarChange = (star: number, checked: boolean) => {
    setSelectedStars(prev => 
      checked ? [...prev, star] : prev.filter(s => s !== star)
    );
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Filter Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Star Rating</h3>
          <div className="space-y-2">
            {starOptions.map(star => (
              <div key={star} className="flex items-center space-x-2">
                <Checkbox
                  id={`star-${star}`}
                  onCheckedChange={(checked) => handleStarChange(star, checked as boolean)}
                  checked={selectedStars.includes(star)}
                />
                <Label htmlFor={`star-${star}`} className="flex items-center cursor-pointer">
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
      </CardContent>
    </Card>
  );
}
