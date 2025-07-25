'use client';

import type { FlightOffer } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React from 'react';

const PersonalBagIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} {...props} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.5,6.5h-3V5.75A2.75,2.75,0,0,0,13.75,3h-3.5A2.75,2.75,0,0,0,7.5,5.75V6.5h-3A1.5,1.5,0,0,0,3,8v9a1.5,1.5,0,0,0,1.5,1.5h15A1.5,1.5,0,0,0,21,17V8A1.5,1.5,0,0,0,19.5,6.5Zm-9-0.75A1.25,1.25,0,0,1,11.75,4.5h.5a1.25,1.25,0,0,1,1.25,1.25V6.5h-3Z" />
    </svg>
);

const CarryOnIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} {...props} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16,4.5V3A1.5,1.5,0,0,0,14.5,1.5h-5A1.5,1.5,0,0,0,8,3v1.5H5.5A1.5,1.5,0,0,0,4,6V18a1.5,1.5,0,0,0,1.5,1.5h1A1.5,1.5,0,0,0,8,21a1.5,1.5,0,0,0,1.5-1.5h5A1.5,1.5,0,0,0,16,21a1.5,1.5,0,0,0,1.5-1.5h1A1.5,1.5,0,0,0,20,18V6A1.5,1.5,0,0,0,18.5,4.5H16ZM9.5,3h5V4.5h-5Zm8,15h-1a1.5,1.5,0,0,0-1.5,1.5,1.5,1.5,0,0,0-1.5-1.5h-5A1.5,1.5,0,0,0,8,19.5,1.5,1.5,0,0,0,6.5,18H5.5V6H8V8A.5.5,0,0,0,8.5,8.5h7a.5.5,0,0,0,.5-.5V6h2.5Z" />
    </svg>
);

const CheckedBagIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} {...props} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7,7H17a2,2,0,0,1,2,2V18a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V9A2,2,0,0,1,7,7ZM8.5,4h7a1.5,1.5,0,0,1,1.5,1.5V7h-10V5.5A1.5,1.5,0,0,1,8.5,4Zm1,15a1,1,0,1,0-1-1A1,1,0,0,0,9.5,19Zm6,0a1,1,0,1,0-1-1A1,1,0,0,0,15.5,19Z"/>
  </svg>
);


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
              <PersonalBagIcon className={cn("h-5 w-5", personalItemIncluded ? "stroke-primary fill-none" : "stroke-muted-foreground/30 fill-none")} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>{personalItemText}</p></TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default">
               <CarryOnIcon className={cn("h-5 w-5", carryOnIncluded ? "fill-primary" : "fill-muted-foreground/30")} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>{carryOnText}</p></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default">
               <CheckedBagIcon className={cn("h-7 w-7", checkedBagsIncluded ? "stroke-primary fill-none" : "stroke-muted-foreground/30 fill-none")} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>{checkedBagsText}</p></TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
