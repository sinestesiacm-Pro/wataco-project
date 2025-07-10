
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface RecommendedDestinationsProps {
  setDestination: (destination: { iata: string; query: string }) => void;
}

const destinationsByContinent = {
  "Europa": [
    { city: "Roma", country: "Italia", priceFrom: "89", iata: "FCO", hint: "rome colosseum", image: "https://images.unsplash.com/photo-1663143050642-69240b347b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxyb21lJTIwY29sb3NzZXVtfGVufDB8fHx8MTc1MjA2MjA4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Lisboa", country: "Portugal", priceFrom: "75", iata: "LIS", hint: "lisbon tram", image: "https://images.unsplash.com/photo-1590941761838-60179f0ed248?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxsaXNib24lMjB0cmFtfGVufDB8fHx8MTc1MjE1NDA2OHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "París", country: "Francia", priceFrom: "99", iata: "CDG", hint: "paris eiffel tower", image: "https://images.unsplash.com/photo-1730993175478-b634849f6536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDB8fHx8MTc1MjA2MjA4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Ámsterdam", country: "Países Bajos", priceFrom: "105", iata: "AMS", hint: "amsterdam canals", image: "https://images.unsplash.com/photo-1632463786665-b35954f9cc1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxhbXN0ZXJkYW0lMjBjYW5hbHN8ZW58MHx8fHwxNzUyMDYyMDg0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  "América del Sur": [
    { city: "Cartagena", country: "Colombia", priceFrom: "210", iata: "CTG", hint: "cartagena colombia", image: "https://images.unsplash.com/photo-1680579178966-8019436998e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjYXJ0YWdlbmElMjBjb2xvbWJpYXxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Buenos Aires", country: "Argentina", priceFrom: "450", iata: "EZE", hint: "buenos aires obelisco", image: "https://images.unsplash.com/photo-1672588371953-2accc9eb0d01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxidWVub3MlMjBhaXJlcyUyMG9iZWxpc2NvfGVufDB8fHx8MTc1MjA2NzgwMHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Machu Picchu", country: "Perú", priceFrom: "320", iata: "CUZ", hint: "machu picchu", image: "https://images.unsplash.com/photo-1703568092973-4192b759ed00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtYWNodSUyMHBpY2NodXxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Río de Janeiro", country: "Brasil", priceFrom: "380", iata: "GIG", hint: "rio de janeiro", image: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxyaW8lMjBkZSUyMGphbmVpcm98ZW58MHx8fHwxNzUyMDY3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  "Asia": [
    { city: "Tokio", country: "Japón", priceFrom: "680", iata: "NRT", hint: "tokyo street", image: "https://images.unsplash.com/photo-1611125162305-ea7550c59dff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0b2t5byUyMHN0cmVldHxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Bangkok", country: "Tailandia", priceFrom: "550", iata: "BKK", hint: "bangkok temple", image: "https://images.unsplash.com/photo-1691089185062-db320716e48b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxiYW5na29rJTIwdGVtcGxlfGVufDB8fHx8MTc1MjA2NzgwMXww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Seúl", country: "Corea del Sur", priceFrom: "620", iata: "ICN", hint: "seoul palace", image: "https://images.unsplash.com/photo-1601710124519-705a3571e43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzZW91bCUyMHBhbGFjZXxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Singapur", country: "Singapur", priceFrom: "590", iata: "SIN", hint: "singapore marina bay", image: "https://images.unsplash.com/photo-1686455746257-7f063846e3cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzaW5nYXBvcmUlMjBtYXJpbmElMjBiYXl8ZW58MHx8fHwxNzUyMDY3ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
};

const ContinentDivider = ({ name, image, hint }: { name: string; image: string; hint: string }) => (
    <div className="relative group w-full h-32 my-12 rounded-2xl shadow-lg overflow-hidden">
      <Image
        src={image}
        alt={`Divider for ${name}`}
        data-ai-hint={hint}
        fill
        className="object-cover blur group-hover:blur-none transition-all duration-300"
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
          dividerImage = "https://images.unsplash.com/photo-1734791187323-fd59d37ef358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxldXJvcGUlMjBsYW5kbWFya3N8ZW58MHx8fHwxNzUyMTU0MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080";
          dividerHint = "europe landmarks";
        } else if (continent === "América del Sur") {
          dividerImage = "https://images.unsplash.com/photo-1670761624726-c6f3bb48f575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxwYXRhZ29uaWElMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzUyMTU0MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080";
          dividerHint = "patagonia landscape";
        } else { // Asia
          dividerImage = "https://images.unsplash.com/photo-1532236395709-7d70320fec2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMXx8YXNpYXxlbnwwfHx8fDE3NTIxNTU3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080";
          dividerHint = "japan temple";
        }
        
        return (
          <div key={continent} className="space-y-8">
            <ContinentDivider name={continent} image={dividerImage} hint={dividerHint} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
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
