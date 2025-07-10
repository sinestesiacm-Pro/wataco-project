'use client';

import type { FlightOffer } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React from 'react';


const PersonalBagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"/><path d="M12 16A6 6 0 0 0 6 10H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2a6 6 0 0 0-6 6Z"/>
    </svg>
)

const CarryOnIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="16" height="18" x="4" y="3" rx="2" /><path d="M8 3v18"/><path d="M12 3v18"/>
    </svg>
)

const CheckedBagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="18" height="20" x="3" y="2" rx="2" /><path d="M8 2v20"/><path d="M16 2v20"/>
    </svg>
)

interface FlightBaggageInfoProps {
  flight: FlightOffer;
  className?: string;
}

export function FlightBaggageInfo({ flight, className }: FlightBaggageInfoProps) {
  const travelerPricing = flight.travelerPricings[0];
  if (!travelerPricing) return null;

  const fareDetails = travelerPricing.fareDetailsBySegment[0];
  const checkedBags = fareDetails?.includedCheckedBags?.quantity ?? 0;
  
  const personalItemIncluded = true;
  const carryOnIncluded = true; // Assuming carry-on is always included for this design
  const checkedBagsIncluded = checkedBags > 0;

  const personalItemText = "1 Artículo personal";
  const carryOnText = "1 Equipaje de mano";
  const checkedBagsText = checkedBagsIncluded ? `${checkedBags} Maleta(s) facturada(s)` : 'Equipaje facturado no incluido';

  return (
    <TooltipProvider>
      <div className={cn("flex items-end gap-1.5", className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default">
              <PersonalBagIcon className={cn("h-5 w-5", personalItemIncluded ? "text-primary" : "text-muted-foreground/30")} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>{personalItemText}</p></TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default">
               <CarryOnIcon className={cn("h-6 w-6", carryOnIncluded ? "text-primary" : "text-muted-foreground/30")} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>{carryOnText}</p></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default">
               <CheckedBagIcon className={cn("h-7 w-7", checkedBagsIncluded ? "text-primary" : "text-muted-foreground/30")} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>{checkedBagsText}</p></TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
