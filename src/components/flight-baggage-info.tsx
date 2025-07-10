'use client';

import type { FlightOffer } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Briefcase, Luggage } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlightBaggageInfoProps {
  flight: FlightOffer;
  className?: string;
}

export function FlightBaggageInfo({ flight, className }: FlightBaggageInfoProps) {
  // Assuming the first traveler's pricing details are representative for the offer.
  const travelerPricing = flight.travelerPricings[0];
  if (!travelerPricing) return null;

  // Most airlines include a personal item.
  const personalItemText = "1 Artículo personal";

  // Amadeus docs suggest `includedCheckedBags` is the most reliable source for checked luggage.
  const fareDetails = travelerPricing.fareDetailsBySegment[0];
  const checkedBags = fareDetails?.includedCheckedBags?.quantity ?? 0;
  const checkedBagsText = checkedBags > 0 ? `${checkedBags} Maleta(s) facturada(s)` : 'Equipaje facturado no incluido';

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3 text-muted-foreground", className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 cursor-default">
              <Briefcase className="h-5 w-5" />
              <span className="text-xs font-semibold">1</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{personalItemText}</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn(
              "flex items-center gap-1.5 cursor-default",
              checkedBags === 0 && "opacity-40"
            )}>
              <Luggage className="h-5 w-5" />
               <span className="text-xs font-semibold">{checkedBags}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{checkedBagsText}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
