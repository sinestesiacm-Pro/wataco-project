'use client';

import { Cloud, Plane } from "lucide-react";

interface FlightLoadingAnimationProps {
    originName: string;
    destinationName: string;
}

export function FlightLoadingAnimation({ originName, destinationName }: FlightLoadingAnimationProps) {
    const from = originName.split(',')[0] || "Origen";
    const to = destinationName.split(',')[0] || "Destino";

    return (
        <div className="flex flex-col items-center justify-center text-center py-16 space-y-8 overflow-hidden">
            <div className="relative w-full max-w-md h-48">
                <div className="flight-path">
                    <Plane className="plane-animation w-12 h-12 text-tertiary" />
                </div>
                {/* Clouds */}
                <Cloud className="cloud-animation w-16 h-16 text-primary/30 absolute" style={{ top: '10%', left: '80%', animationDelay: '0s' }} />
                <Cloud className="cloud-animation w-20 h-20 text-primary/40 absolute" style={{ top: '65%', left: '110%', animationDelay: '-2s' }} />
                <Cloud className="cloud-animation w-12 h-12 text-primary/20 absolute" style={{ top: '30%', left: '140%', animationDelay: '-4s' }} />
                <Cloud className="cloud-animation w-24 h-24 text-primary/50 absolute" style={{ top: '55%', left: '170%', animationDelay: '-6s' }} />
                <Cloud className="cloud-animation w-16 h-16 text-primary/30 absolute" style={{ top: '20%', left: '200%', animationDelay: '-8s' }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-headline">De {from} a {to}</h2>
              <p className="text-muted-foreground mt-1">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
