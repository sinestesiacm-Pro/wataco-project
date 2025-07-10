'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface RecommendedDestinationsProps {
  setDestination: (destination: { iata: string; query: string }) => void;
}

const destinationsByContinent = {
  "Europa": [
    { city: "Roma", country: "Italia", priceFrom: "89", iata: "FCO", hint: "rome colosseum", image: "https://images.unsplash.com/photo-1666225908854-2495f1f4d83a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxyb21lJTIwY29sb3NzZXVtfGVufDB8fHx8MTc1MjA2MjA4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Lisboa", country: "Portugal", priceFrom: "75", iata: "LIS", hint: "lisbon tram", image: "https://images.unsplash.com/photo-1677624212523-562c75ae3517?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bGlzYm9uJTIwdHJhbXxlbnwwfHx8fDE3NTIwNjIwODR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "París", country: "Francia", priceFrom: "99", iata: "CDG", hint: "paris eiffel tower", image: "https://images.unsplash.com/photo-1609971757431-439cf7b4141b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDB8fHx8MTc1MjA2MjA4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Ámsterdam", country: "Países Bajos", priceFrom: "105", iata: "AMS", hint: "amsterdam canals", image: "https://images.unsplash.com/photo-1632463222597-dee01976d220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxhbXN0ZXJkYW0lMjBjYW5hbHN8ZW58MHx8fHwxNzUyMDYyMDg0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  "América del Sur": [
    { city: "Cartagena", country: "Colombia", priceFrom: "210", iata: "CTG", hint: "cartagena colombia", image: "https://images.unsplash.com/photo-1536308037887-165852797016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y2FydGFnZW5hJTIwY29sb21iaWF8ZW58MHx8fHwxNzUyMDY3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Buenos Aires", country: "Argentina", priceFrom: "450", iata: "EZE", hint: "buenos aires obelisco", image: "https://images.unsplash.com/photo-1638096881378-c30353b1ff81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxidWVub3MlMjBhaXJlcyUyMG9iZWxpc2NvfGVufDB8fHx8MTc1MjA2NzgwMHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Machu Picchu", country: "Perú", priceFrom: "320", iata: "CUZ", hint: "machu picchu", image: "https://images.unsplash.com/photo-1719016849700-8179f2c9f96d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxtYWNodSUyMHBpY2NodXxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Río de Janeiro", country: "Brasil", priceFrom: "380", iata: "GIG", hint: "rio de janeiro", image: "https://images.unsplash.com/photo-1626568941852-70bc179e493e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxyaW8lMjBkZSUyMGphbmVpcm98ZW58MHx8fHwxNzUyMDY3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  "Asia": [
    { city: "Tokio", country: "Japón", priceFrom: "680", iata: "NRT", hint: "tokyo street", image: "https://images.unsplash.com/photo-1587653263995-422546a7a569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHN0cmVldHxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Bangkok", country: "Tailandia", priceFrom: "550", iata: "BKK", hint: "bangkok temple", image: "https://images.unsplash.com/photo-1691089185062-db320716e48b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxiYW5na29rJTIwdGVtcGxlfGVufDB8fHx8MTc1MjA2NzgwMXww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Seúl", country: "Corea del Sur", priceFrom: "620", iata: "ICN", hint: "seoul palace", image: "https://images.unsplash.com/photo-1740799346223-01af399faa0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8c2VvdWwlMjBwYWxhY2V8ZW58MHx8fHwxNzUyMDY3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Singapur", country: "Singapur", priceFrom: "590", iata: "SIN", hint: "singapore marina bay", image: "https://images.unsplash.com/photo-1599919445953-c604dbd413a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzaW5nYXBvcmUlMjBtYXJpbmElMjBiYXl8ZW58MHx8fHwxNzUyMDY3ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
};

export function RecommendedDestinations({ setDestination }: RecommendedDestinationsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Inspira tu Próximo Viaje</h2>
        <p className="text-muted-foreground mt-2">Descubre destinos populares para despertar tus ideas de viaje.</p>
      </div>

      {Object.entries(destinationsByContinent).map(([continent, destinations]) => (
        <div key={continent} className="space-y-6">
          <h3 className="text-2xl font-bold font-headline text-gray-700 pb-2 bg-gradient-to-b from-transparent to-black/5 shadow-b-sm">
            {continent}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {destinations.map((dest) => (
              <div
                key={dest.iata}
                className="airplane-window"
                onClick={() => {
                  const query = `${dest.city}, ${dest.country}`;
                  setDestination({ iata: dest.iata, query });
                }}
              >
                <div className="airplane-window-inner-bevel">
                  <div className="airplane-window-view">
                    <Image
                        src={dest.image}
                        data-ai-hint={dest.hint}
                        alt={dest.city}
                        fill
                    />
                    <div className="airplane-window-shade" />
                    <div className="airplane-window-content">
                        <div>
                          <h3 className="text-xl font-bold font-headline text-white">{dest.city}</h3>
                          <p className="text-sm text-white/80">{dest.country}</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 mt-4">
                            <p className="text-sm text-white/90 font-body">
                                Desde <span className="font-bold text-lg text-tertiary">${dest.priceFrom}</span>
                            </p>
                            <Button 
                                size="sm" 
                                variant="secondary"
                                className="bg-white/20 hover:bg-white/30 text-white rounded-full pointer-events-none"
                            >
                                Ver Vuelos
                                <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
