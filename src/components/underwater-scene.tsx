'use client';
import React from 'react';
import { cn } from '@/lib/utils';

// More detailed SVG-based coral shapes
const Coral1 = ({ style }: { style: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" style={style} className="absolute bottom-0 filter blur-lg opacity-40">
        <path d="M50 100 C 20 100, 10 70, 30 50 S 40 20, 50 0 C 60 20, 70 50, 70 50 S 90 70, 80 100 Z" fill="rgba(255, 105, 180, 0.4)"/>
        <path d="M50 100 C 60 100, 70 80, 60 60 S 50 30, 50 0" fill="rgba(238, 130, 238, 0.3)" />
    </svg>
);

const Coral2 = ({ style }: { style: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" style={style} className="absolute bottom-0 filter blur-md opacity-50">
        <circle cx="50" cy="50" r="40" fill="rgba(60, 179, 113, 0.3)" />
        <circle cx="30" cy="30" r="25" fill="rgba(32, 178, 170, 0.4)" />
        <circle cx="70" cy="60" r="30" fill="rgba(0, 128, 128, 0.3)" />
    </svg>
);


const Bubble = ({ style }: { style: React.CSSProperties }) => (
    <div className="bubble" style={style} />
);

const fishColors = [
  'rgba(255, 152, 0, 0.4)', // Orange
  'rgba(0, 191, 255, 0.4)', // Deep Sky Blue
  'rgba(255, 215, 0, 0.4)', // Gold
];

const Fish = ({ style, color }: { style: React.CSSProperties, color: string }) => (
    <div className="fish" style={style}>
        <div className="fish-body" style={{ backgroundColor: color }} />
        <div className="fish-tail" style={{ borderRight: `20px solid ${color}` }}/>
    </div>
);

export function UnderwaterScene() {
    const config = {
      corals: [
        { Component: Coral1, style: { width: '150px', height: '150px', left: '5%', bottom: '-20px' } },
        { Component: Coral2, style: { width: '200px', height: '120px', left: '20%', bottom: '-40px' } },
        { Component: Coral1, style: { width: '120px', height: '120px', left: '80%', bottom: '-10px', transform: 'scaleX(-1)'} },
        { Component: Coral2, style: { width: '180px', height: '100px', left: '60%', bottom: '-30px' } },
      ],
      bubbles: Array.from({ length: 50 }).map(() => {
        const size = Math.random() * 20 + 5;
        return {
          style: {
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${Math.random() * 10 + 8}s`,
            animationDelay: `${Math.random() * 8}s`,
          }
        }
      }),
      fish: Array.from({ length: 7 }).map((_, i) => ({
        style: {
          left: '-150px', // Start fish off-screen
          top: `${Math.random() * 80 + 10}%`,
          animationDuration: `${Math.random() * 15 + 10}s`,
          animationDelay: `${Math.random() * 15}s`,
        },
        color: fishColors[i % fishColors.length],
      })),
    }

    return (
        <div className="underwater-scene h-full w-full">
            {config.corals.map((coral, index) => (
                <coral.Component key={`coral-${index}`} style={coral.style as React.CSSProperties} />
            ))}
            {config.bubbles.map((bubble, index) => (
                <Bubble key={`bubble-${index}`} style={bubble.style as React.CSSProperties} />
            ))}
            {config.fish.map((fish, index) => (
                <Fish key={`fish-${index}`} style={fish.style as React.CSSProperties} color={fish.color} />
            ))}
        </div>
    );
}
