'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface RecommendedDestinationsProps {
  setDestination: (iata: string) => void;
}

const destinationsByContinent = {
  "Europe": [
    { city: "Rome", country: "Italy", priceFrom: "89", iata: "FCO", hint: "rome colosseum", image: "https://images.unsplash.com/photo-1668171321834-658179e37f5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxyb21lJTIwY29sb3NzZXVtfGVufDB8fHx8MTc1MjA2MjA4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Lisbon", country: "Portugal", priceFrom: "75", iata: "LIS", hint: "lisbon tram", image: "https://images.unsplash.com/photo-1571767750274-4795bdfcb642?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxsaXNib24lMjB0cmFtfGVufDB8fHx8MTc1MjA2MjA4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Paris", country: "France", priceFrom: "99", iata: "CDG", hint: "paris eiffel tower", image: "https://images.unsplash.com/photo-1553455427-c38fa28dc586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDB8fHx8MTc1MjA2MjA4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Amsterdam", country: "Netherlands", priceFrom: "105", iata: "AMS", hint: "amsterdam canals", image: "https://images.unsplash.com/photo-1639889957348-1b5daeabe0c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhbXN0ZXJkYW0lMjBjYW5hbHN8ZW58MHx8fHwxNzUyMDYyMDg0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  "South America": [
    { city: "Cartagena", country: "Colombia", priceFrom: "210", iata: "CTG", hint: "cartagena colombia", image: "https://images.unsplash.com/photo-1599933333385-a515c1b69824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYXJ0YWdlbmElMjBjb2xvbWJpYXxlbnwwfHx8fDE3NTIxNDEzODl8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Buenos Aires", country: "Argentina", priceFrom: "450", iata: "EZE", hint: "buenos aires obelisco", image: "https://images.unsplash.com/photo-1599557041284-7e2a5ebabc4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxidWVub3MlMjBhaXJlcyUyMG9iZWxpc2NvfGVufDB8fHx8MTc1MjE0MTQzMnww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Machu Picchu", country: "Peru", priceFrom: "320", iata: "CUZ", hint: "machu picchu", image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYWNodSUyMHBpY2NodXxlbnwwfHx8fDE3NTIxNDE0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Rio de Janeiro", country: "Brazil", priceFrom: "380", iata: "GIG", hint: "rio de janeiro", image: "https://images.unsplash.com/photo-1483729558449-69ef98d98823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyaW8lMjBkZSUyMGphbmVpcm98ZW58MHx8fHwxNzUyMTQyNDAyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  "Asia": [
    { city: "Tokyo", country: "Japan", priceFrom: "680", iata: "NRT", hint: "tokyo street", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHN0cmVldHxlbnwwfHx8fDE3NTIxNDE1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Bangkok", country: "Thailand", priceFrom: "550", iata: "BKK", hint: "bangkok temple", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiYW5na29rJTIwdGVtcGxlfGVufDB8fHx8MTc1MjE0MTUzM3ww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Seoul", country: "South Korea", priceFrom: "620", iata: "ICN", hint: "seoul palace", image: "https://images.unsplash.com/photo-1534275338945-80a58183c57a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzZW91bCUyMHBhbGFjZXxlbnwwfHx8fDE3NTIxNDI0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Singapore", country: "Singapore", priceFrom: "590", iata: "SIN", hint: "singapore marina bay", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzaW5nYXBvcmUlMjBtYXJpbmElMjBiYXl8ZW58MHx8fHwxNzUyMTQyNTAxfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
};

export function RecommendedDestinations({ setDestination }: RecommendedDestinationsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Inspire Your Next Trip</h2>
        <p className="text-muted-foreground mt-2">Discover popular destinations to spark your travel ideas.</p>
      </div>

      {Object.entries(destinationsByContinent).map(([continent, destinations]) => (
        <div key={continent} className="space-y-6">
          <h3 className="text-2xl font-bold font-headline text-gray-700 border-b-2 border-primary/20 pb-2">
            {continent}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Card
                key={dest.iata}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer border"
                onClick={() => setDestination(dest.iata)}
              >
                <div className="overflow-hidden relative">
                  <Image
                    src={dest.image}
                    data-ai-hint={dest.hint}
                    alt={dest.city}
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold font-headline text-white">{dest.city}</h3>
                    <p className="text-sm text-white/90">{dest.country}</p>
                  </div>
                </div>
                <CardContent className="p-4 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground font-body">
                    Flights from <span className="font-bold text-lg text-accent">{dest.priceFrom}€</span>
                  </p>
                  <Button size="sm" variant="outline" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    View Flights
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
