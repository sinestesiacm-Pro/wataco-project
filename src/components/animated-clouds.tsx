'use client';

import React from 'react';

const cloudData = [
  // Capa 1: Nubes grandes y lentas (Fondo)
  { top: '15%', left: '10%', scale: 1.8, duration: '180s', delay: '-5s' },
  { top: '60%', left: '5%', scale: 2.0, duration: '200s', delay: '-60s' },
  { top: '5%', left: '80%', scale: 1.7, duration: '220s', delay: '-120s' },

  // Capa 2: Nubes medianas a velocidad moderada
  { top: '25%', left: '70%', scale: 1.4, duration: '150s', delay: '-20s' },
  { top: '40%', left: '85%', scale: 1.2, duration: '160s', delay: '-80s' },
  { top: '75%', left: '50%', scale: 1.5, duration: '170s', delay: '-40s' },
  { top: '80%', left: '0%', scale: 1.6, duration: '190s', delay: '-100s' },
  
  // Capa 3: Nubes más pequeñas y ligeramente más rápidas (Primer plano)
  { top: '5%', left: '40%', scale: 1.0, duration: '110s', delay: '-15s' },
  { top: '85%', left: '25%', scale: 1.3, duration: '120s', delay: '-95s' },
  { top: '95%', left: '80%', scale: 1.1, duration: '130s', delay: '-50s' },
  { top: '50%', left: '30%', scale: 1.2, duration: '140s', delay: '-70s' },

  // --- Nubes Adicionales Intercaladas ---
  { top: '10%', left: '90%', scale: 1.5, duration: '185s', delay: '-35s' },
  { top: '35%', left: '5%', scale: 1.9, duration: '210s', delay: '-110s' },
  { top: '70%', left: '80%', scale: 1.3, duration: '165s', delay: '-75s' },
  { top: '90%', left: '15%', scale: 1.8, duration: '195s', delay: '-25s' },
  { top: '20%', left: '55%', scale: 1.1, duration: '115s', delay: '-55s' },
  { top: '55%', left: '65%', scale: 1.6, duration: '175s', delay: '-5s' },
  { top: '88%', left: '45%', scale: 1.4, duration: '155s', delay: '-130s' },
  { top: '2%', left: '20%', scale: 1.2, duration: '125s', delay: '-45s' },
  { top: '45%', left: '10%', scale: 1.7, duration: '205s', delay: '-150s' },
  { top: '80%', left: '95%', scale: 1.2, duration: '145s', delay: '-85s' },
];

const Cloud = ({ style }: { style?: React.CSSProperties }) => (
    <div className="cloud-container cloud-animation relative w-[200px] h-[120px]" style={style}>
        {/* Cuerpo principal de la nube */}
        <div className="cloud-part" style={{ top: '0%', left: '25%', width: '100px', height: '100px' }}></div>
        <div className="cloud-part" style={{ top: '30%', left: '5%', width: '70px', height: '70px' }}></div>
        <div className="cloud-part" style={{ top: '55%', left: '20%', width: '60px', height: '60px' }}></div>
        <div className="cloud-part" style={{ top: '50%', left: '0%', width: '50px', height: '50px' }}></div>
        <div className="cloud-part" style={{ top: '30%', right: '5%', width: '70px', height: '70px' }}></div>
        <div className="cloud-part" style={{ top: '55%', right: '20%', width: '60px', height: '60px' }}></div>
        <div className="cloud-part" style={{ top: '50%', right: '0%', width: '50px', height: '50px' }}></div>
    </div>
);


export const AnimatedClouds = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {cloudData.map((cloud, index) => {
          const startX = `-20vw`;
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
