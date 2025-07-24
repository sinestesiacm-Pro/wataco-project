'use client';

import { Plane } from "lucide-react";

interface FlightLoadingAnimationProps {
    originName: string;
    destinationName: string;
}

const cloudData = [
  { top: '10%', left: '-20vw', delay: '-8s', duration: '40s', scale: 0.8, opacity: 0.6 },
  { top: '65%', left: '10vw', delay: '-2s', duration: '35s', scale: 1.2, opacity: 0.8 },
  { top: '30%', left: '40vw', delay: '-5s', duration: '50s', scale: 0.7, opacity: 0.5 },
  { top: '55%', left: '70vw', delay: '-1s', duration: '30s', scale: 1.1, opacity: 0.7 },
  { top: '20%', left: '100vw', delay: '-6s', duration: '45s', scale: 0.9, opacity: 0.6 },
  { top: '70%', left: '130vw', delay: '-12s', duration: '55s', scale: 1.3, opacity: 0.8 },
  { top: '40%', left: '160vw', delay: '-9s', duration: '38s', scale: 0.8, opacity: 0.5 },
  { top: '60%', left: '190vw', delay: '-4s', duration: '42s', scale: 1.0, opacity: 0.7 },
];

const Cloud = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
    <div className={`cloud-container cloud-animation ${className || ''}`} style={style}>
        <div className="cloud-part" style={{ width: '120px', height: '40px', top: '10px' }}></div>
        <div className="cloud-part" style={{ width: '80px', height: '30px', left: '-20px', top: '20px' }}></div>
        <div className="cloud-part" style={{ width: '90px', height: '35px', right: '-15px', top: '15px' }}></div>
    </div>
);

export function FlightLoadingAnimation({ originName, destinationName }: FlightLoadingAnimationProps) {
    const from = originName.split(',')[0] || "Origen";
    const to = destinationName.split(',')[0] || "Destino";

    return (
        <div className="flex flex-col items-center justify-center text-center py-16 space-y-8 overflow-hidden w-full h-full">
            <div className="relative w-full h-52">
                <div className="absolute inset-0">
                    {cloudData.map((cloud, index) => (
                      <Cloud key={index} style={{
                          top: cloud.top,
                          left: cloud.left,
                          animationDelay: cloud.delay,
                          animationDuration: cloud.duration,
                          transform: `scale(${cloud.scale})`,
                          opacity: cloud.opacity
                      }} />
                    ))}
                </div>
                
                 <div style={{
                    position: 'absolute',
                    top: '50%',
                    width: '100%',
                    height: '2px',
                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)',
                }}>
                    <Plane className="w-12 h-12 text-white animate-fly-up-down" style={{
                        position: 'absolute',
                        top: '50%',
                        animationName: 'fly-path, fly-up-down',
                        animationDuration: '8s, 4s',
                        animationIterationCount: 'infinite, infinite',
                        animationTimingFunction: 'linear, ease-in-out',
                        transform: 'translateY(-50%) rotate(2deg)',
                        filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))'
                    }}/>
                </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-headline text-white drop-shadow-lg">De {from} a {to}</h2>
              <p className="text-white/80 mt-1 drop-shadow-lg">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
