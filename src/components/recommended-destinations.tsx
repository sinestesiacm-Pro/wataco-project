
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface RecommendedDestinationsProps {
  setDestination: (destination: { iata: string; query: string }) => void;
}

const destinationsByContinent = {
  "Europa": [
    { city: "Roma", country: "Italia", priceFrom: "89", iata: "FCO", hint: "rome colosseum", image: "https://images.unsplash.com/photo-1659003732403-fef512570038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxyb21lJTIwY29sb3NzZXVtfGVufDB8fHx8MTc1MjA2MjA4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Lisboa", country: "Portugal", priceFrom: "75", iata: "LIS", hint: "lisbon tram", image: "https://images.unsplash.com/photo-1672928838827-55ac5492809a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxsaXNib24lMjB0cmFtfGVufDB8fHx8MTc1MjE1NDA2OHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "París", country: "Francia", priceFrom: "99", iata: "CDG", hint: "paris eiffel tower", image: "https://images.unsplash.com/photo-1570097703229-b195d6dd291f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDB8fHx8MTc1MjA2MjA4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Ámsterdam", country: "Países Bajos", priceFrom: "105", iata: "AMS", hint: "amsterdam canals", image: "https://images.unsplash.com/photo-1605378560246-47d003fc1731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhbXN0ZXJkYW0lMjBjYW5hbHN8ZW58MHx8fHwxNzUyMDYyMDg0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  "América del Sur": [
    { city: "Cartagena", country: "Colombia", priceFrom: "210", iata: "CTG", hint: "cartagena colombia", image: "https://images.unsplash.com/photo-1680579178966-8019436998e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjYXJ0YWdlbmElMjBjb2xvbWJpYXxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Buenos Aires", country: "Argentina", priceFrom: "450", iata: "EZE", hint: "buenos aires obelisco", image: "https://images.unsplash.com/photo-1703432509754-593319c08fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxidWVub3MlMjBhaXJlcyUyMG9iZWxpc2NvfGVufDB8fHx8MTc1MjA2NzgwMHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Machu Picchu", country: "Perú", priceFrom: "320", iata: "CUZ", hint: "machu picchu", image: "https://images.unsplash.com/photo-1664387518989-bb1d8574f078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtYWNodSUyMHBpY2NodXxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Río de Janeiro", country: "Brasil", priceFrom: "380", iata: "GIG", hint: "rio de janeiro", image: "https://images.unsplash.com/photo-1561577553-674ce32847a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxyaW8lMjBkZSUyMGphbmVpcm98ZW58MHx8fHwxNzUyMDY3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  "Asia": [
    { city: "Tokio", country: "Japón", priceFrom: "680", iata: "NRT", hint: "tokyo street", image: "https://images.unsplash.com/photo-1641149841853-badad172ade6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8dG9reW8lMjBzdHJlZXR8ZW58MHx8fHwxNzUyMDY3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Bangkok", country: "Tailandia", priceFrom: "550", iata: "BKK", hint: "bangkok temple", image: "https://images.unsplash.com/photo-1613672803979-a6edfc5a179b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxiYW5na29rJTIwdGVtcGxlfGVufDB8fHx8MTc1MjA2NzgwMXww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Seúl", country: "Corea del Sur", priceFrom: "620", iata: "ICN", hint: "seoul palace", image: "https://images.unsplash.com/photo-1628579101011-44f9b70810c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzZW91bCUyMHBhbGFjZXxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Singapur", country: "Singapur", priceFrom: "590", iata: "SIN", hint: "singapore marina bay", image: "https://images.unsplash.com/photo-1692512921273-cceb4f949e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8c2luZ2Fwb3JlJTIwbWFyaW5hJTIwYmF5fGVufDB8fHx8MTc1MjA2NzgwMXww&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
};

const ContinentDivider = ({ name, image, hint }: { name: string, image: string, hint: string }) => (
    <div className="relative group w-full h-32 my-12 rounded-2xl shadow-lg overflow-hidden">
        <Image
            src={image}
            alt={`Divider for ${name}`}
            data-ai-hint={hint}
            fill
            className="object-cover blur transition-all duration-300 group-hover:blur-none"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <h2 className="text-4xl font-headline font-bold text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>{name}</h2>
        </div>
    </div>
);

export function RecommendedDestinations({ setDestination }: RecommendedDestinationsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Inspira tu Próximo Viaje</h2>
        <p className="text-muted-foreground mt-2">Descubre destinos populares para despertar tus ideas de viaje.</p>
      </div>

      {Object.entries(destinationsByContinent).map(([continent, destinations]) => {
        let dividerImage, dividerHint;
        if (continent === "Europa") {
          dividerImage = "https://images.unsplash.com/photo-1693647760538-ccca8886f9b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxldXJvcGUlMjBsYW5kbWFya3N8ZW58MHx8fHwxNzUyMTU0MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080";
          dividerHint = "europe landmarks";
        } else if (continent === "América del Sur") {
          dividerImage = "https://images.unsplash.com/photo-1745799325366-1c2a6d6b421a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwYXRhZ29uaWElMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzUyMTU0MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080";
          dividerHint = "patagonia landscape";
        } else { // Asia
          dividerImage = "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxqYXBhbiUyMHRlbXBsZXxlbnwwfHx8fDE3NTIxNTQwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080";
          dividerHint = "japan temple";
        }
        
        return (
          <div key={continent} className="space-y-8">
            <ContinentDivider name={continent} image={dividerImage} hint={dividerHint} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="airplane-window-shade" />
                      <div className="airplane-window-content">
                          <div>
                            <h3 className="text-2xl font-bold font-headline text-white">{dest.city}</h3>
                            <p className="text-sm text-white/80 -mt-1">{dest.country}</p>
                          </div>
                          <div className="flex justify-between items-end w-full mt-4">
                              <p className="text-sm text-white/90 font-body">
                                  Desde <span className="font-bold text-xl text-tertiary">${dest.priceFrom}</span>
                              </p>
                              <Button 
                                  size="sm" 
                                  variant="secondary"
                                  className="bg-white/20 hover:bg-white/30 text-white rounded-full pointer-events-none text-xs"
                              >
                                  Ver Vuelos
                                  <ArrowRight className="ml-1.5 h-3 w-3" />
                              </Button>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  );
}
