'use client';
import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { searchFlights } from '@/app/actions';
import type { FlightData, Airport } from '@/lib/types';
import { searchAirports } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';

import { RecommendedDestinations } from '@/components/recommended-destinations';
import { FlightResults } from '@/components/flight-results';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Users, Loader2, PlaneTakeoff, PlaneLanding, Minus, Plus, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Switch } from './ui/switch';
import React from 'react';
import { HotelsSection } from './hotels-section';
import { ActivitiesSection } from './activities-section';

const InputGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex items-center">{children}</div>
);

const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{children}</div>
);


export default function FlightSearchPage() {
  const [origin, setOrigin] = useState('MAD');
  const [destination, setDestination] = useState('');
  const [originQuery, setOriginQuery] = useState('Madrid, Spain');
  const [destinationQuery, setDestinationQuery] = useState('');
  
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
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState<'origin' | 'destination' | null>(null);
  const debouncedOriginQuery = useDebounce(originQuery, 300);
  const debouncedDestinationQuery = useDebounce(destinationQuery, 300);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async (query: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setSuggestionsLoading(true);
      const result = await searchAirports(query);
      if (result.success && result.data) {
        setSuggestions(result.data);
      } else {
        setSuggestions([]);
      }
      setSuggestionsLoading(false);
    };

    if (activeInput === 'origin') {
      if (debouncedOriginQuery !== originQuery) setSuggestions([]);
      else fetchSuggestions(debouncedOriginQuery);
    } else if (activeInput === 'destination') {
        if (debouncedDestinationQuery !== destinationQuery) setSuggestions([]);
      else fetchSuggestions(debouncedDestinationQuery);
    }
  }, [debouncedOriginQuery, debouncedDestinationQuery, activeInput, originQuery, destinationQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setActiveInput(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSelectSuggestion = (airport: Airport, type: 'origin' | 'destination') => {
    const query = `${airport.address?.cityName || airport.name}, ${airport.address.countryName}`;
    if (type === 'origin') {
      setOrigin(airport.iataCode);
      setOriginQuery(query);
    } else {
      setDestination(airport.iataCode);
      setDestinationQuery(query);
    }
    setActiveInput(null);
    setSuggestions([]);
  };

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
      children,
      infants,
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
  
  const totalTravelers = adults + children + infants;
  const travelerText = `${totalTravelers} traveler${totalTravelers > 1 ? 's' : ''}`;

  const SuggestionsList = ({ type }: { type: 'origin' | 'destination' }) => (
    <div className="absolute z-10 w-full mt-1 bg-card border rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {suggestionsLoading ? (
        <div className="p-4 flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" /> Searching...
        </div>
      ) : (
        suggestions.map(airport => (
          <div
            key={`${airport.iataCode}-${airport.name}`}
            className="p-3 hover:bg-accent cursor-pointer border-b last:border-b-0"
            onClick={() => handleSelectSuggestion(airport, type)}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <div className="flex-grow">
                <p className="font-semibold text-sm">{airport.address?.cityName || airport.name}, {airport.address.countryName}</p>
                <p className="text-xs text-muted-foreground">{airport.name} ({airport.iataCode})</p>
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
          <h2 className="text-4xl lg:text-5xl font-bold font-headline text-center mb-4 text-gray-800">Your Next Adventure Awaits</h2>
          <p className="text-center text-muted-foreground font-body text-lg mb-8 max-w-2xl mx-auto">Effortlessly find and book the best flights to anywhere in the world.</p>
          
          <div className="bg-card/95 backdrop-blur-sm border p-4 sm:p-6 rounded-2xl shadow-2xl">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch id="trip-type" checked={isRoundTrip} onCheckedChange={handleTripTypeChange} />
                  <Label htmlFor="trip-type" className="text-sm font-semibold">{isRoundTrip ? 'Round Trip' : 'One Way'}</Label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                <div className='lg:col-span-4 relative' ref={activeInput === 'origin' ? suggestionsRef : null}>
                  <Label htmlFor="origin" className="text-sm font-semibold ml-2">From</Label>
                  <InputGroup>
                    <InputIcon><PlaneTakeoff className="h-4 w-4" /></InputIcon>
                    <Input id="origin" type="text" value={originQuery} 
                        onChange={e => setOriginQuery(e.target.value)} 
                        onFocus={() => { setActiveInput('origin'); setSuggestions([])}}
                        placeholder="Origin city or airport" 
                        className="mt-1 pl-10" 
                        autoComplete="off"
                    />
                  </InputGroup>
                   {activeInput === 'origin' && <SuggestionsList type="origin" />}
                </div>
                <div className='lg:col-span-4 relative' ref={activeInput === 'destination' ? suggestionsRef : null}>
                  <Label htmlFor="destination" className="text-sm font-semibold ml-2">To</Label>
                  <InputGroup>
                    <InputIcon><PlaneLanding className="h-4 w-4" /></InputIcon>
                    <Input id="destination" type="text" value={destinationQuery} 
                        onChange={e => setDestinationQuery(e.target.value)}
                        onFocus={() => { setActiveInput('destination'); setSuggestions([])}} 
                        placeholder="Destination city or airport" 
                        className="mt-1 pl-10" 
                        autoComplete="off"
                    />
                  </InputGroup>
                  {activeInput === 'destination' && <SuggestionsList type="destination" />}
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
                  <Label htmlFor="passengers" className="text-sm font-semibold ml-2">Passengers</Label>
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
                          <h4 className="font-medium leading-none">Travelers</h4>
                          <p className="text-sm text-muted-foreground">
                            Select the number of passengers.
                          </p>
                        </div>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Adults</p>
                              <p className="text-xs text-muted-foreground">Ages 12+</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.max(1, v - 1))} disabled={adults <= 1 || adults <= infants}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-bold text-lg w-4 text-center">{adults}</span>
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.min(8, v + 1))} disabled={totalTravelers >= 8}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Children</p>
                              <p className="text-xs text-muted-foreground">Ages 2-11</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => Math.max(0, v - 1))} disabled={children <= 0}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-bold text-lg w-4 text-center">{children}</span>
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => Math.min(8, v + 1))} disabled={totalTravelers >= 8}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Infants</p>
                              <p className="text-xs text-muted-foreground">Under 2</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setInfants(v => Math.max(0, v - 1))} disabled={infants <= 0}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-bold text-lg w-4 text-center">{infants}</span>
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setInfants(v => Math.min(8, v + 1))} disabled={totalTravelers >= 8 || infants >= adults}>
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
          {flightData && flightData.data.length > 0 && (
            <FlightResults flightData={flightData} destinationIata={destination} />
          )}
          {!loading && !flightData && (
             <>
                <RecommendedDestinations setDestination={setDestination} />
                <HotelsSection />
                <ActivitiesSection />
             </>
          )}
        </section>
      </div>
    </div>
  );
}
