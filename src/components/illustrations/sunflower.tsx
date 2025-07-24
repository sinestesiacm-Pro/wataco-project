import React from 'react';

export function Sunflower({ size, style }: { size: number, style: React.CSSProperties }) {
  return (
    <div
      className="sunflower-container"
      style={{ width: size, height: size, ...style }}
    >
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="sunflower-center" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#654321', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4a2c0f', stopOpacity: 1 }} />
          </radialGradient>
        </defs>
        {/* Petals */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
          <path
            key={angle}
            d="M50 0 C 40 25, 60 25, 50 0 Z"
            fill="currentColor"
            transform={`rotate(${angle} 50 50) translate(0, -20) scale(1.5, 2)`}
          />
        ))}
        {/* Center */}
        <circle cx="50" cy="50" r="20" fill="url(#sunflower-center)" />
      </svg>
    </div>
  );
}
