
'use client';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import type { Hotel, BookingDestination } from '@/lib/types';
import { searchHotels, searchBookingDestinations } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';

import { HotelResults } from '@/components/hotel-results';
import { HotelFilters } from '@/components/hotel-filters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Users, Loader2, Minus, Plus, MapPin, BedDouble } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import React from 'react';

const InputGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex items-center">{children}</div>
);

const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{children}</div>
);

export default function HotelSearchPage() {
  const [destination, setDestination] = useState<BookingDestination | null>(null);
  const [destinationQuery, setDestinationQuery] = useState('');
  
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek;
  });
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(() => {
    const twoWeeks = new Date();
    twoWeeks.setDate(twoWeeks.getDate() + 14);
    return twoWeeks;
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  
  const [hotelData, setHotelData] = useState<Hotel[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [suggestions, setSuggestions] = useState<BookingDestination[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const debouncedDestinationQuery = useDebounce(destinationQuery, 300);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<{ stars: number[] }>({ stars: [] });

  useEffect(() => {
    const fetchSuggestions = async (query: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setSuggestionsLoading(true);
      const result = await searchBookingDestinations(query);
      if (result.success && result.data) {
        setSuggestions(result.data);
      } else {
        setSuggestions([]);
      }
      setSuggestionsLoading(false);
    };

    fetchSuggestions(debouncedDestinationQuery);
  }, [debouncedDestinationQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSelectSuggestion = (destination: BookingDestination) => {
    setDestination(destination);
    setDestinationQuery(destination.label);
    setIsSuggestionsOpen(false);
    setSuggestions([]);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !checkInDate || !checkOutDate) {
      toast({
        title: 'Missing Information',
        description: 'Please select a destination and dates.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setHotelData(null);
    setFilters({ stars: [] });

    const result = await searchHotels({
      dest_id: destination.dest_id,
      arrival_date: format(checkInDate, 'yyyy-MM-dd'),
      departure_date: format(checkOutDate, 'yyyy-MM-dd'),
      adults,
    });

    if (result.success && result.data) {
      setHotelData(result.data);
    } else {
      setHotelData(null);
      toast({
        title: 'Search Error',
        description: result.error || 'Could not find hotels. Try another search.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };
  
  const handleFilterChange = useCallback((newFilters: { stars: number[] }) => {
    setFilters(newFilters);
  }, []);
  
  const filteredHotels = useMemo(() => {
    if (!hotelData) return null;
    return hotelData.filter(hotel => {
      if (filters.stars.length > 0 && !filters.stars.includes(hotel.stars || 0)) {
        return false;
      }
      return true;
    });
  }, [hotelData, filters]);

  const LoadingSkeleton = () => (
    <div className="grid md:grid-cols-12 gap-8 mt-8">
        <div className="md:col-span-3">
             <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
        <div className="md:col-span-9 space-y-4">
            {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-2xl" />
            ))}
        </div>
    </div>
  );
  
  const totalTravelers = adults + children;
  const travelerText = `${totalTravelers} guest${totalTravelers > 1 ? 's' : ''}`;

  const SuggestionsList = () => (
    <div className="absolute z-10 w-full mt-1 bg-card border rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {suggestionsLoading ? (
        <div className="p-4 flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" /> Searching...
        </div>
      ) : (
        suggestions.map((dest, index) => (
          <div
            key={`${dest.dest_id}-${index}`}
            className="p-3 hover:bg-accent cursor-pointer border-b last:border-b-0"
            onClick={() => handleSelectSuggestion(dest)}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <div className="flex-grow">
                <p className="font-semibold text-sm">{dest.label}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold font-headline text-center mb-4 text-gray-800">Find your perfect stay</h2>
          <p className="text-center text-muted-foreground font-body text-lg mb-8 max-w-2xl mx-auto">Search and book hotels from cozy boutiques to luxury resorts.</p>
          
          <div className="bg-card/95 backdrop-blur-sm border p-4 sm:p-6 rounded-2xl shadow-2xl">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                <div className='lg:col-span-5 relative' ref={suggestionsRef}>
                  <Label htmlFor="destination" className="text-sm font-semibold ml-2">Destination</Label>
                  <InputGroup>
                    <InputIcon><BedDouble className="h-4 w-4" /></InputIcon>
                    <Input id="destination" type="text" value={destinationQuery} 
                        onChange={e => { setDestinationQuery(e.target.value); setIsSuggestionsOpen(true); }}
                        onFocus={() => { setIsSuggestionsOpen(true); }}
                        placeholder="e.g. New York" 
                        className="mt-1 pl-10" 
                        autoComplete="off"
                    />
                  </InputGroup>
                   {isSuggestionsOpen && debouncedDestinationQuery && <SuggestionsList />}
                </div>
                
                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkInDate" className="text-sm font-semibold ml-2">Check-in</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal mt-1", !checkInDate && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, "MMM d, yyyy") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                  <Label htmlFor="checkOutDate" className="text-sm font-semibold ml-2">Check-out</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal mt-1", !checkOutDate && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, "MMM d, yyyy") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus disabled={(date) => checkInDate ? date <= checkInDate : false} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className='lg:col-span-2'>
                  <Label htmlFor="guests" className="text-sm font-semibold ml-2">Guests</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button id="guests" variant={"outline"} className="w-full justify-start text-left font-normal mt-1">
                        <Users className="mr-2 h-4 w-4" />
                        {travelerText}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="end">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Guests</h4>
                          <p className="text-sm text-muted-foreground">Select number of guests per room.</p>
                        </div>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Adults</p>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.max(1, v - 1))} disabled={adults <= 1}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-bold text-lg w-4 text-center">{adults}</span>
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => v + 1)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                             <p className="font-medium">Children</p>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => Math.max(0, v - 1))} disabled={children <= 0}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-bold text-lg w-4 text-center">{children}</span>
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => v + 1)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <Button type="submit" disabled={loading} size="lg" className="w-full text-lg font-bold bg-accent hover:bg-accent/90 lg:col-span-2 h-full mt-1 text-accent-foreground rounded-xl shadow-md hover:shadow-lg transition-all">
                  {loading ? <Loader2 className="animate-spin" /> : 'Search'}
                </Button>
              </div>
            </form>
          </div>
        </section>
        
        <section className="mt-8">
          {loading && <LoadingSkeleton />}
          {hotelData && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3">
                <HotelFilters onFilterChange={handleFilterChange} />
              </div>
              <div className="lg:col-span-9">
                <HotelResults hotels={filteredHotels} />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
