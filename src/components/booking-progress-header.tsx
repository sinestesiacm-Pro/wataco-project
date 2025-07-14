
'use client';

import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Plane } from "lucide-react";

interface BookingProgressHeaderProps {
  step: 'outbound' | 'return' | 'review';
  isRoundTrip: boolean;
  origin: string;
  destination: string;
}

const Step = ({ title, isActive, isCompleted }: { title: string; isActive: boolean; isCompleted: boolean; }) => (
    <div className="flex items-center gap-2">
        {isCompleted ? (
            <CheckCircle className="h-6 w-6 text-success" />
        ) : (
            <Circle className={cn("h-6 w-6", isActive ? "text-primary fill-primary/20" : "text-white/70")} />
        )}
        <span className={cn("font-semibold", isActive ? "text-primary" : isCompleted ? "text-white" : "text-white/70")}>
            {title}
        </span>
    </div>
);

export function BookingProgressHeader({ step, isRoundTrip, origin, destination }: BookingProgressHeaderProps) {
  const outboundCompleted = step === 'return' || step === 'review';
  const returnCompleted = step === 'review' && isRoundTrip;

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-md text-white mb-8">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-headline flex items-center gap-3">
                <Plane className="h-6 w-6 text-primary" />
                <span>{origin} a {destination}</span>
            </h2>
             <p className="text-sm text-white/80 font-semibold">
                {isRoundTrip ? 'Ida y Vuelta' : 'Solo Ida'}
            </p>
        </div>
      <div className="flex items-center justify-around">
        <Step 
            title="1. Elige vuelo de ida" 
            isActive={step === 'outbound'} 
            isCompleted={outboundCompleted}
        />
        {isRoundTrip && (
            <>
             <div className="flex-grow h-px bg-white/20 mx-4"></div>
             <Step 
                title="2. Elige vuelo de vuelta" 
                isActive={step === 'return'}
                isCompleted={returnCompleted}
            />
            </>
        )}
        <div className="flex-grow h-px bg-white/20 mx-4"></div>
        <Step 
            title={isRoundTrip ? "3. Revisa tu viaje" : "2. Revisa tu viaje"}
            isActive={step === 'review'}
            isCompleted={false}
        />
      </div>
    </div>
  );
}
