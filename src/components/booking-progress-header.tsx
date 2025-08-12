
'use client';

import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Plane } from "lucide-react";
import React from "react";

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
            <Circle className={cn("h-6 w-6", isActive ? "text-primary fill-primary/20" : "text-gray-500")} />
        )}
        <span className={cn("font-semibold drop-shadow-lg", isActive ? "text-gray-800" : isCompleted ? "text-gray-800" : "text-gray-500")}>
            {title}
        </span>
    </div>
);

export const BookingProgressHeader = React.memo(function BookingProgressHeader({ step, isRoundTrip, origin, destination }: BookingProgressHeaderProps) {
  const outboundCompleted = step === 'return' || step === 'review';
  const returnCompleted = step === 'review' && isRoundTrip;

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/20 p-4 rounded-2xl shadow-md text-gray-800 mb-8">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-headline flex items-center gap-3 drop-shadow-lg">
                <Plane className="h-6 w-6 text-gray-800" />
                <span>{origin} a {destination}</span>
            </h2>
             <p className="text-sm text-gray-600 font-semibold drop-shadow-lg">
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
             <div className="flex-grow h-px bg-gray-400/20 mx-4"></div>
             <Step 
                title="2. Elige vuelo de vuelta" 
                isActive={step === 'return'}
                isCompleted={returnCompleted}
            />
            </>
        )}
        <div className="flex-grow h-px bg-gray-400/20 mx-4"></div>
        <Step 
            title={isRoundTrip ? "3. Revisa tu viaje" : "2. Revisa tu viaje"}
            isActive={step === 'review'}
            isCompleted={false}
        />
      </div>
    </div>
  );
});
