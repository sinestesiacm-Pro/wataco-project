'use client';

import React from 'react';

const cloudData = [
  // Capa de fondo (más lentas, más grandes, más transparentes)
  { top: '5%', left: '-30vw', delay: '0s', duration: '120s', scale: 2.5, opacity: 0.3 },
  { top: '25%', left: '50vw', delay: '-20s', duration: '150s', scale: 3, opacity: 0.25 },
  { top: '70%', left: '-10vw', delay: '-40s', duration: '130s', scale: 2.8, opacity: 0.3 },
  { top: '80%', left: '80vw', delay: '-60s', duration: '160s', scale: 2.9, opacity: 0.28 },
  { top: '40%', left: '120vw', delay: '-80s', duration: '140s', scale: 2.7, opacity: 0.3 },
  
  // Capa media (velocidad y tamaño intermedios)
  { top: '15%', left: '10vw', delay: '-5s', duration: '80s', scale: 1.5, opacity: 0.6 },
  { top: '50%', left: '-20vw', delay: '-15s', duration: '90s', scale: 1.8, opacity: 0.55 },
  { top: '60%', left: '30vw', delay: '-25s', duration: '75s', scale: 1.6, opacity: 0.6 },
  { top: '35%', left: '80vw', delay: '-35s', duration: '85s', scale: 1.7, opacity: 0.5 },
  { top: '75%', left: '60vw', delay: '-45s', duration: '70s', scale: 1.5, opacity: 0.6 },
  { top: '5%', left: '140vw', delay: '-55s', duration: '95s', scale: 1.9, opacity: 0.55 },

  // Capa frontal (más rápidas, más pequeñas, más opacas)
  { top: '20%', left: '-15vw', delay: '-2s', duration: '50s', scale: 0.8, opacity: 0.8 },
  { top: '85%', left: '20vw', delay: '-8s', duration: '45s', scale: 1, opacity: 0.75 },
  { top: '5%', left: '40vw', delay: '-12s', duration: '60s', scale: 0.9, opacity: 0.8 },
  { top: '90%', left: '70vw', delay: '-18s', duration: '55s', scale: 1.1, opacity: 0.7 },
  { top: '30%', left: '100vw', delay: '-22s', duration: '58s', scale: 0.85, opacity: 0.8 },
  { top: '65%', left: '120vw', delay: '-28s', duration: '48s', scale: 1.2, opacity: 0.75 },
  { top: '10%', left: '160vw', delay: '-32s', duration: '62s', scale: 0.95, opacity: 0.8 },
  { top: '80%', left: '180vw', delay: '-38s', duration: '52s', scale: 1.05, opacity: 0.7 },
];

const Cloud = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
    <div className={`cloud-container cloud-animation ${className || ''}`} style={style}>
        <div className="cloud-part" style={{ width: '120px', height: '40px', top: '10px' }}></div>
        <div className="cloud-part" style={{ width: '80px', height: '30px', left: '-20px', top: '20px' }}></div>
        <div className="cloud-part" style={{ width: '90px', height: '35px', right: '-15px', top: '15px' }}></div>
    </div>
);


export const AnimatedClouds = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
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
);
