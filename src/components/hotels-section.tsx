'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BedDouble, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { searchHotels } from '@/app/actions';
import type { Hotel } from '@/lib/types';
import { Skeleton } from './ui/skeleton';

const HotelCardSkeleton = () => (
    <Card className="rounded-2xl overflow-hidden shadow-lg border bg-card">
        <Skeleton className="h-48 w-full" />
        <CardContent className="p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-10 w-1/3" />
            </div>
        </CardContent>
    </Card>
);

export function HotelsSection() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);

      // Using Bogotá as a default destination and future dates to ensure availability.
      const arrivalDate = new Date();
      arrivalDate.setDate(arrivalDate.getDate() + 30);
      const departureDate = new Date();
      departureDate.setDate(departureDate.getDate() + 37);
      
      const formatDate = (date: Date) => date.toISOString().split('T')[0];

      const result = await searchHotels({
        dest_id: '-581929', // Bogota, Colombia
        arrival_date: formatDate(arrivalDate),
        departure_date: formatDate(departureDate),
        adults: 1,
      });

      if (result.success && result.data) {
        setHotels(result.data.slice(0, 4)); // Limiting to 4 hotels for the section
      } else {
        setError(result.error || 'Could not fetch hotels.');
      }
      setLoading(false);
    };

    fetchHotels();
  }, []);

  return (
    <div className="space-y-8 mt-16">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Find Your Perfect Stay</h2>
        <p className="text-muted-foreground mt-2">From luxury resorts to cozy boutique hotels, book your accommodation with us.</p>
      </div>
      
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <HotelCardSkeleton key={i} />)}
        </div>
      )}

      {error && !loading && <p className="text-center text-destructive">{error}</p>}
      
      {!loading && !error && hotels.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <Card key={hotel.hotel_id} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border bg-card">
              <div className="overflow-hidden relative">
                <Image 
                  src={hotel.main_photo_url.replace('square60', 'square200')}
                  data-ai-hint="hotel room" 
                  alt={hotel.hotel_name} 
                  width={400} 
                  height={300} 
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 group-hover:backdrop-blur-sm" />
                {hotel.review_score && (
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400" />
                    {hotel.review_score.toFixed(1)}
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold font-headline text-lg truncate">{hotel.hotel_name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{`${hotel.city}, ${hotel.country_trans}`}</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm font-body">From <span className="font-bold text-xl text-accent">{hotel.price_breakdown.gross_price}</span></p>
                  <Button>
                    <BedDouble className="mr-2 h-4 w-4" />
                    View Hotel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
