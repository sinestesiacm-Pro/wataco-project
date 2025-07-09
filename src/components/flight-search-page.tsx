'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { searchFlights } from '@/app/actions';
import type { FlightData } from '@/lib/types';

import { RecommendedDestinations } from '@/components/recommended-destinations';
import { FlightResults } from '@/components/flight-results';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Users, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Switch } from './ui/switch';

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
      toast({
        title: 'Search Error',
        description: result.error || 'Could not find flights.',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };
  
  const LoadingSkeleton = () => (
    <div className="space-y-6 mt-8">
      <Skeleton className="h-12 w-1/3" />
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-48 w-full rounded-lg" />
      ))}
    </div>
  );

  return (
    <div className="w-full min-h-screen">
      <header className="bg-card shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <Icons.logo className="h-8 w-auto" />
          <h1 className="text-3xl font-bold font-headline text-foreground">BE ON TRIP</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-4xl font-bold font-headline text-center mb-2">Find Your Next Adventure</h2>
          <p className="text-center text-muted-foreground font-body text-lg mb-8">Book flights to anywhere in the world.</p>
          <RecommendedDestinations setDestination={setDestination} />
        </section>
        
        <section className="bg-card p-4 sm:p-6 rounded-2xl shadow-lg -mx-4 sm:mx-0 sticky top-[73px] z-30">
          <div className="flex items-center space-x-2 mb-4">
            <Switch id="trip-type" checked={isRoundTrip} onCheckedChange={handleTripTypeChange} />
            <Label htmlFor="trip-type" className="text-sm font-semibold">{isRoundTrip ? 'Round Trip' : 'One Way'}</Label>
          </div>
          <form onSubmit={handleSearch} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            <div className='lg:col-span-2'>
              <Label htmlFor="origin" className="text-sm font-semibold">Origin</Label>
              <Input id="origin" type="text" value={origin} onChange={e => setOrigin(e.target.value.toUpperCase())} placeholder="City or IATA" className="mt-1" maxLength={3} />
            </div>
            <div className='lg:col-span-2'>
              <Label htmlFor="destination" className="text-sm font-semibold">Destination</Label>
              <Input id="destination" type="text" value={destination} onChange={e => setDestination(e.target.value.toUpperCase())} placeholder="City or IATA" className="mt-1" maxLength={3} />
            </div>
            <div className="lg:col-span-3">
              <Label htmlFor="departureDate" className="text-sm font-semibold">Depart</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal mt-1", !departureDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                  </PopoverContent>
                </Popover>
            </div>
            <div className="lg:col-span-3">
              <Label htmlFor="returnDate" className="text-sm font-semibold">Return</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} disabled={!isRoundTrip} className={cn("w-full justify-start text-left font-normal mt-1", !returnDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus disabled={(date) => departureDate ? date < departureDate : false} />
                  </PopoverContent>
                </Popover>
            </div>
            <div className='lg:col-span-1'>
              <Label htmlFor="adults" className="text-sm font-semibold">Adults</Label>
              <Select value={adults.toString()} onValueChange={(val) => setAdults(parseInt(val))}>
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

            <Button type="submit" disabled={loading} size="lg" className="w-full text-lg font-bold bg-accent hover:bg-accent/90 lg:col-span-1">
              {loading ? <Loader2 className="animate-spin" /> : 'Search'}
            </Button>
          </form>
        </section>

        <section className="mt-8">
          {loading && <LoadingSkeleton />}
          {flightData && flightData.data.length > 0 && (
            <FlightResults flightData={flightData} destinationIata={destination} />
          )}
        </section>
      </main>
    </div>
  );
}
