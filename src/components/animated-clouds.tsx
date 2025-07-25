'use client';

import React from 'react';

const cloudData = [
  { top: '15%', left: '-20vw', delay: '0s', duration: '120s', scale: 1.8, opacity: 0.8 },
  { top: '25%', left: '80vw', delay: '-20s', duration: '150s', scale: 2.2, opacity: 0.7 },
  { top: '70%', left: '10vw', delay: '-40s', duration: '130s', scale: 2.0, opacity: 0.75 },
  { top: '80%', left: '110vw', delay: '-60s', duration: '160s', scale: 1.9, opacity: 0.8 },
  { top: '5%', left: '40vw', delay: '-10s', duration: '100s', scale: 1.5, opacity: 0.8 },
  { top: '60%', left: '140vw', delay: '-80s', duration: '180s', scale: 2.5, opacity: 0.6 },
  { top: '40%', left: '-30vw', delay: '-30s', duration: '110s', scale: 2.0, opacity: 0.7 },
  { top: '85%', left: '50vw', delay: '-50s', duration: '140s', scale: 2.3, opacity: 0.75 },
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
