'use client';

import type { FlightOffer } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React from 'react';

const PersonalBagIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M19.5,6.5h-3V5.75A2.75,2.75,0,0,0,13.75,3h-3.5A2.75,2.75,0,0,0,7.5,5.75V6.5h-3A1.5,1.5,0,0,0,3,8v9a1.5,1.5,0,0,0,1.5,1.5h15A1.5,1.5,0,0,0,21,17V8A1.5,1.5,0,0,0,19.5,6.5Zm-9-0.75A1.25,1.25,0,0,1,11.75,4.5h.5a1.25,1.25,0,0,1,1.25,1.25V6.5h-3Z" />
    </svg>
);

const CarryOnIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M16,4.5V3A1.5,1.5,0,0,0,14.5,1.5h-5A1.5,1.5,0,0,0,8,3v1.5H5.5A1.5,1.5,0,0,0,4,6V18a1.5,1.5,0,0,0,1.5,1.5h1A1.5,1.5,0,0,0,8,21a1.5,1.5,0,0,0,1.5-1.5h5A1.5,1.5,0,0,0,16,21a1.5,1.5,0,0,0,1.5-1.5h1A1.5,1.5,0,0,0,20,18V6A1.5,1.5,0,0,0,18.5,4.5H16ZM9.5,3h5V4.5h-5Zm8,15h-1a1.5,1.5,0,0,0-1.5,1.5,1.5,1.5,0,0,0-1.5-1.5h-5A1.5,1.5,0,0,0,8,19.5,1.5,1.5,0,0,0,6.5,18H5.5V6H8V8A.5.5,0,0,0,8.5,8.5h7a.5.5,0,0,0,.5-.5V6h2.5Z" />
    </svg>
);

const CheckedBagIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M19,4.5H17V3a2,2,0,0,0-2-2H9A2,2,0,0,0,7,3V4.5H5a2,2,0,0,0-2,2V20a2,2,0,0,0,2,2H6.5a1.5,1.5,0,0,0,0,3h1.5a1.5,1.5,0,0,0,0-3H16a1.5,1.5,0,0,0,0,3h1.5a1.5,1.5,0,0,0,0-3H19a2,2,0,0,0,2-2V6.5A2,2,0,0,0,19,4.5ZM8.5,3A.5.5,0,0,1,9,2.5h6A.5.5,0,0,1,15.5,3V4.5h-7ZM19.5,20a.5.5,0,0,1-.5.5H17.5a1.5,1.5,0,0,0,0-3H19a.5.5,0,0,1,.5.5V20Zm0-2.5a.5.5,0,0,1-.5.5H5a.5.5,0,0,1-.5-.5V6.5a.5.5,0,0,1,.5-.5H7v1A.5.5,0,0,0,7.5,7h9a.5.5,0,0,0,.5-.5v-1h2a.5.5,0,0,1,.5.5Z"/>
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
              <PersonalBagIcon className={cn("h-5 w-5", personalItemIncluded ? "text-success" : "text-muted-foreground/30")} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>{personalItemText}</p></TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default">
               <CarryOnIcon className={cn("h-5 w-5", carryOnIncluded ? "text-success" : "text-muted-foreground/30")} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>{carryOnText}</p></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default">
               <CheckedBagIcon className={cn("h-6 w-6", checkedBagsIncluded ? "text-success" : "text-muted-foreground/30")} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>{checkedBagsText}</p></TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
