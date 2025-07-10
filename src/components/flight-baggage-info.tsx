'use client';

import type { FlightOffer } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React from 'react';

const PersonalBagIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M19.479,9.423h-3.335V8.01c0-1.583-1.28-2.864-2.864-2.864H10.72c-1.583,0-2.864,1.28-2.864,2.864v1.413H4.521 c-1.583,0-2.864,1.28-2.864,2.864v6.849c0,1.583,1.28,2.864,2.864,2.864h14.958c1.583,0,2.864-1.28,2.864-2.864v-6.849 C22.343,10.703,21.062,9.423,19.479,9.423z M9.269,8.01c0-0.809,0.655-1.464,1.464-1.464h2.543c0.809,0,1.464,0.655,1.464,1.464 v1.413H9.269V8.01z" />
    </svg>
);

const CarryOnIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M19.5,4.5h-3V3A1.5,1.5,0,0,0,15,1.5H9A1.5,1.5,0,0,0,7.5,3V4.5h-3A1.5,1.5,0,0,0,3,6V21a1.5,1.5,0,0,0,1.5,1.5h15A1.5,1.5,0,0,0,21,21V6A1.5,1.5,0,0,0,19.5,4.5ZM9,3h6V4.5H9Zm10.5,18H4.5V6h3V7.5a.75.75,0,0,0,1.5,0V6h6V7.5a.75.75,0,0,0,1.5,0V6h3Z" />
    </svg>
);

const CheckedBagIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M21,6H18V4a2,2,0,0,0-2-2H8A2,2,0,0,0,6,4V6H3A1,1,0,0,0,2,7V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V7A1,1,0,0,0,21,6ZM8,4h8V6H8Zm12,16H4V8H6V9a1,1,0,0,0,2,0V8h8V9a1,1,0,0,0,2,0V8h2Z" />
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
              <PersonalBagIcon className={cn("h-5 w-5", personalItemIncluded ? "text-primary" : "text-muted-foreground/30")} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>{personalItemText}</p></TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default">
               <CarryOnIcon className={cn("h-5 w-5", carryOnIncluded ? "text-primary" : "text-muted-foreground/30")} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>{carryOnText}</p></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default">
               <CheckedBagIcon className={cn("h-6 w-6", checkedBagsIncluded ? "text-primary" : "text-muted-foreground/30")} />
            </div>
          </TooltipTrigger>
          <TooltipContent><p>{checkedBagsText}</p></TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
