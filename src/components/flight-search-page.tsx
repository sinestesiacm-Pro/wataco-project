'use client';
import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { searchFlights } from '@/app/actions';
import type { FlightData } from '@/lib/types';

import { RecommendedDestinations } from '@/components/recommended-destinations';
import { FlightResults } from '@/components/flight-results';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Users, Loader2, PlaneTakeoff, PlaneLanding, ArrowRightLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Switch } from './ui/switch';
import React from 'react';

const InputGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex items-center">{children}</div>
);

const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{children}</div>
);


export default function FlightSearchPage() {
  const [origin, setOrigin] = useState('MAD');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek;
  });
  const [returnDate, setReturnDate] = useState<Date | undefined>(() => {
    const twoWeeks = new Date();
    twoWeeks.setDate(twoWeeks.getDate() + 14);
    return twoWeeks;
  });
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [adults, setAdults] = useState(1);
  
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTripTypeChange = (checked: boolean) => {
    setIsRoundTrip(checked);
    if (!checked) {
      setReturnDate(undefined);
    } else {
        const twoWeeks = new Date();
        if (departureDate && departureDate > twoWeeks) {
            const nextDate = new Date(departureDate);
            nextDate.setDate(nextDate.getDate() + 7);
            setReturnDate(nextDate);
        } else {
            twoWeeks.setDate(twoWeeks.getDate() + 14);
            setReturnDate(twoWeeks);
        }
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !departureDate || (isRoundTrip && !returnDate)) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required flight details.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setFlightData(null);

    const result = await searchFlights({
      origin,
      destination,
      departureDate: format(departureDate, 'yyyy-MM-dd'),
      returnDate: isRoundTrip && returnDate ? format(returnDate, 'yyyy-MM-dd') : undefined,
      adults,
    });

    if (result.success && result.data) {
      setFlightData(result.data);
    } else {
      setFlightData(null); // Clear previous results on error
      toast({
        title: 'Search Error',
        description: result.error || 'Could not find flights. Try another search.',
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

  return (
    <div className="w-full min-h-screen">
      <header className="bg-card shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="https://firebasestorage.googleapis.com/v0/b/tripify-app.appspot.com/o/logo-with-text.png?alt=media" alt="Be On Trip Logo" width={160} height={40} priority />
          </div>
          {/* Future Nav Links can go here */}
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold font-headline text-center mb-4">Your Next Adventure Awaits</h2>
          <p className="text-center text-muted-foreground font-body text-lg mb-8 max-w-2xl mx-auto">Effortlessly find and book the best flights to anywhere in the world.</p>
          
          <div className="bg-card p-4 sm:p-6 rounded-2xl shadow-lg">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch id="trip-type" checked={isRoundTrip} onCheckedChange={handleTripTypeChange} />
                  <Label htmlFor="trip-type" className="text-sm font-semibold">{isRoundTrip ? 'Round Trip' : 'One Way'}</Label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                <div className='lg:col-span-4'>
                  <Label htmlFor="origin" className="text-sm font-semibold ml-2">From</Label>
                  <InputGroup>
                    <InputIcon><PlaneTakeoff className="h-4 w-4" /></InputIcon>
                    <Input id="origin" type="text" value={origin} onChange={e => setOrigin(e.target.value.toUpperCase())} placeholder="Origin (e.g. MAD)" className="mt-1 pl-10" maxLength={3} />
                  </InputGroup>
                </div>
                <div className='lg:col-span-4'>
                  <Label htmlFor="destination" className="text-sm font-semibold ml-2">To</Label>
                  <InputGroup>
                    <InputIcon><PlaneLanding className="h-4 w-4" /></InputIcon>
                    <Input id="destination" type="text" value={destination} onChange={e => setDestination(e.target.value.toUpperCase())} placeholder="Destination (e.g. FCO)" className="mt-1 pl-10" maxLength={3} />
                  </InputGroup>
                </div>
                <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departureDate" className="text-sm font-semibold ml-2">Depart</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal mt-1", !departureDate && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {departureDate ? format(departureDate, "MMM d") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                  <Label htmlFor="returnDate" className="text-sm font-semibold ml-2">Return</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} disabled={!isRoundTrip} className={cn("w-full justify-start text-left font-normal mt-1", !returnDate && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? format(returnDate, "MMM d") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus disabled={(date) => departureDate ? date < departureDate : false} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className='lg:col-span-2'>
                  <Label htmlFor="adults" className="text-sm font-semibold ml-2">Adults</Label>
                   <Select value={adults.toString()} onValuechange={(val) => setAdults(parseInt(val))}>
                      <SelectTrigger className="mt-1">
                        <Users className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Adults" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(8)].map((_, i) => (
                          <SelectItem key={i+1} value={(i+1).toString()}>{i+1}</SelectItem>
                        ))}
                      </SelectContent>
                  </Select>
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
          {flightData && flightData.data.length > 0 && (
            <FlightResults flightData={flightData} destinationIata={destination} />
          )}
          {!loading && !flightData && (
             <RecommendedDestinations setDestination={setDestination} />
          )}
        </section>
      </main>
    </div>
  );
}
