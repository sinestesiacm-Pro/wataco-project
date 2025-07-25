'use client';

import React from 'react';

const cloudData = [
  // Nubes grandes y lentas
  { top: '15%', left: '10%', scale: 1.5, duration: '120s', delay: '0s' },
  { top: '25%', left: '70%', scale: 1.2, duration: '150s', delay: '-20s' },
  { top: '60%', left: '5%', scale: 1.8, duration: '180s', delay: '-50s' },
  { top: '5%', left: '90%', scale: 1.6, duration: '160s', delay: '-30s' },

  // Nubes medianas
  { top: '40%', left: '85%', scale: 1.0, duration: '100s', delay: '-10s' },
  { top: '75%', left: '50%', scale: 1.3, duration: '130s', delay: '-70s' },
  { top: '80%', left: '0%', scale: 1.4, duration: '140s', delay: '-60s' },

  // Nubes pequeñas para detalle
  { top: '5%', left: '40%', scale: 0.8, duration: '90s', delay: '-5s' },
  { top: '85%', left: '25%', scale: 1.1, duration: '110s', delay: '-90s' },
  { top: '95%', left: '80%', scale: 0.9, duration: '95s', delay: '-40s' },
  { top: '50%', left: '30%', scale: 1.0, duration: '125s', delay: '-80s' },
];

const Cloud = ({ style }: { style?: React.CSSProperties }) => (
    <div className="cloud-container cloud-animation" style={style}>
        {/* Base de la nube */}
        <div className="cloud-part" style={{ top: '20px', left: '10px', width: '80px', height: '40px' }}></div>
        {/* Lóbulos superiores */}
        <div className="cloud-part" style={{ top: '0', left: '25px', width: '50px', height: '50px' }}></div>
        <div className="cloud-part" style={{ top: '5px', left: '50px', width: '40px', height: '40px' }}></div>
    </div>
);

export const AnimatedClouds = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {cloudData.map((cloud, index) => {
          const startX = `${-20 - (index % 5) * 20}vw`; // escalonar el inicio
          const endX = '120vw';
          return (
            <Cloud key={index} style={{
                top: cloud.top,
                left: cloud.left,
                animationDelay: cloud.delay,
                animationDuration: cloud.duration,
                transform: `scale(${cloud.scale})`,
                '--cloud-start-x': startX,
                '--cloud-end-x': endX,
            } as React.CSSProperties} />
          )
        })}
    </div>
);
