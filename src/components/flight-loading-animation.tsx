'use client';

import { PlaneTakeoff } from "lucide-react";

interface FlightLoadingAnimationProps {
    originName: string;
    destinationName: string;
}

export function FlightLoadingAnimation({ originName, destinationName }: FlightLoadingAnimationProps) {
    const from = originName.split(',')[0] || "Origen";
    const to = destinationName.split(',')[0] || "Destino";

    return (
        <div className="flex flex-col items-center justify-center text-center py-16 space-y-8">
            <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-muted" />
                </div>
                <div className="plane-orbit">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                       <PlaneTakeoff className="w-12 h-12 text-primary -rotate-45" />
                    </div>
                </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-headline">De {from} a {to}</h2>
              <p className="text-muted-foreground mt-1">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
