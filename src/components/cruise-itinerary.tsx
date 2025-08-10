'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { CruiseItineraryItem } from '@/lib/types';
import { Anchor, Waves } from 'lucide-react';

export function CruiseItinerary({ itinerary }: { itinerary: CruiseItineraryItem[] }) {
  return (
    <div className="relative">
      {/* Vertical timeline */}
      <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-primary/30" />

      <div className="space-y-8">
        {itinerary.map((item, index) => (
          <div key={index} className="relative flex items-start gap-4">
            {/* Icon and Day Column */}
            <div className="flex-shrink-0 flex flex-col items-center z-10">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-white',
                  item.isAtSea ? 'bg-secondary' : 'bg-primary'
                )}
              >
                {item.isAtSea ? <Waves className="h-5 w-5" /> : <Anchor className="h-5 w-5" />}
              </div>
              <div className="text-center mt-1">
                <p className="text-xs font-semibold text-white/70">Día</p>
                <p className="text-lg font-bold">{item.day}</p>
              </div>
            </div>

            {/* Itinerary Details Card */}
            <div className="flex-grow pt-1 w-full">
              <div className="bg-black/20 rounded-lg p-4 transition-all hover:bg-black/30 w-full flex flex-col sm:flex-row gap-4 items-center">
                  {item.image && !item.isAtSea && (
                    <div className="relative w-full sm:w-32 aspect-[4/3] flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.port}
                        fill
                        sizes="(max-width: 640px) 100vw, 128px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-bold text-lg text-white">{item.port}</h3>
                    <p className="text-sm text-white/70">
                      {item.isAtSea ? 'Disfruta de las comodidades del barco.' : `${item.arrival} - ${item.departure}`}
                    </p>
                    {!item.isAtSea && item.countryCode && (
                      <Image
                        src={`https://flagcdn.com/w20/${item.countryCode}.png`}
                        alt={`${item.port} flag`}
                        width={20}
                        height={15}
                        className="inline-block ml-2"
                      />
                    )}
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
