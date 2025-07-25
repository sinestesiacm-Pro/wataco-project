'use client';

import React from 'react';

const cloudData = [
  // Nubes grandes y lentas
  { top: '10%', startX: '-20vw', endX: '110vw', delay: '0s', duration: '120s', scale: 2.2, opacity: 0.9 },
  { top: '65%', startX: '120vw', endX: '-30vw', delay: '-30s', duration: '150s', scale: 2.8, opacity: 0.8 },
  { top: '80%', startX: '-40vw', endX: '120vw', delay: '-60s', duration: '180s', scale: 2.5, opacity: 0.85 },
  
  // Nubes medianas
  { top: '25%', startX: '110vw', endX: '-25vw', delay: '-10s', duration: '90s', scale: 1.8, opacity: 0.9 },
  { top: '40%', startX: '-25vw', endX: '115vw', delay: '-45s', duration: '110s', scale: 2.0, opacity: 0.8 },

  // Nubes pequeñas y rápidas para efecto parallax
  { top: '5%', startX: '130vw', endX: '-40vw', delay: '-5s', duration: '60s', scale: 1.2, opacity: 0.95 },
  { top: '50%', startX: '-30vw', endX: '130vw', delay: '-20s', duration: '75s', scale: 1.5, opacity: 0.9 },
  { top: '90%', startX: '140vw', endX: '-50vw', delay: '-80s', duration: '100s', scale: 1.6, opacity: 0.8 },
];

const Cloud = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
    <div className={`cloud-container cloud-animation ${className || ''}`} style={style}>
        <div className="cloud-part"></div>
    </div>
);

export const AnimatedClouds = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {cloudData.map((cloud, index) => (
          <Cloud key={index} style={{
              top: cloud.top,
              animationDelay: cloud.delay,
              animationDuration: cloud.duration,
              transform: `scale(${cloud.scale})`,
              opacity: cloud.opacity,
              '--cloud-start-x': cloud.startX,
              '--cloud-end-x': cloud.endX,
          } as React.CSSProperties} />
        ))}
    </div>
);
