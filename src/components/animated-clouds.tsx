'use client';

import React from 'react';

const cloudData = [
  // Define cloud data here to keep the component self-contained
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
