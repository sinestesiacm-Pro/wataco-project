'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { searchCruises } from '@/app/actions';
import type { CruiseData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Users, Loader2, Minus, Plus, Ship, Sailboat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import React from 'react';
import { Label } from './ui/label';
import { Skeleton } from './ui/skeleton';
// import { CruiseResults } from './cruise-results'; // Will add this later if needed

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationRegion || !departureDate) {
      toast({
        title: 'Missing Information',
        description: 'Please select a destination and departure date.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setCruiseData(null);

    const result = await searchCruises({
      destinationRegion,
      departureDate: format(departureDate, 'yyyy-MM-dd'),
      adults,
    });

    if (result.success && result.data) {
      setCruiseData(result.data);
    } else {
      setCruiseData(null);
      toast({
        title: 'Search Not Available',
        description: result.error || 'Could not search for cruises at this time.',
        variant: 'destructive',
      });
    }

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
  
  const travelerText = `${adults} traveler${adults > 1 ? 's' : ''}`;
  
  const cruiseRegions = [
    { value: 'CARIBBEAN', label: 'Caribbean' },
    { value: 'ALASKA', label: 'Alaska' },
    { value: 'EUROPE', label: 'Europe' },
    { value: 'MEXICO', label: 'Mexico' },
    { value: 'HAWAII', label: 'Hawaii' },
    { value: 'BAHAMAS', label: 'Bahamas' },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold font-headline text-center mb-4 text-gray-800">Set Sail on Your Next Adventure</h2>
          <p className="text-center text-muted-foreground font-body text-lg mb-8 max-w-2xl mx-auto">Discover and book incredible cruise vacations around the world.</p>
          
          <div className="bg-card/95 backdrop-blur-sm border p-4 sm:p-6 rounded-2xl shadow-2xl">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                <div className='lg:col-span-5'>
                  <Label htmlFor="destination-region" className="text-sm font-semibold ml-2">Sailing To</Label>
                  <Select onValueChange={setDestinationRegion} value={destinationRegion}>
                    <SelectTrigger id="destination-region" className="mt-1">
                      <Sailboat className="h-4 w-4 text-muted-foreground mr-2" />
                      <SelectValue placeholder="Select a destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {cruiseRegions.map(region => (
                        <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="lg:col-span-3">
                  <Label htmlFor="departureDate" className="text-sm font-semibold ml-2">Sailing After</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal mt-1", !departureDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {departureDate ? format(departureDate, "MMM yyyy") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className='lg:col-span-2'>
                  <Label htmlFor="passengers" className="text-sm font-semibold ml-2">Guests</Label>
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
                          <h4 className="font-medium leading-none">Guests</h4>
                          <p className="text-sm text-muted-foreground">Select number of guests.</p>
                        </div>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Adults</p>
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
                <Button type="submit" disabled={loading} size="lg" className="w-full text-lg font-bold bg-accent hover:bg-accent/90 lg:col-span-2 h-full mt-1 text-accent-foreground rounded-xl shadow-md hover:shadow-lg transition-all">
                  {loading ? <Loader2 className="animate-spin" /> : <div className="flex items-center"><Ship className="mr-2 h-5 w-5" /> Find Cruises</div>}
                </Button>
              </div>
            </form>
          </div>
        </section>
        
        <section className="mt-8">
          {loading && <LoadingSkeleton />}
          {/* {cruiseData && <CruiseResults cruiseData={cruiseData} />} */}
          {!loading && !cruiseData && (
             <div className="text-center py-16">
                <Sailboat className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold">Your Ocean Adventure Awaits</h3>
                <p className="mt-2 text-muted-foreground">Use the search above to find your perfect cruise getaway.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
