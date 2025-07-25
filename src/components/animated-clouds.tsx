'use client';

import React from 'react';

const cloudData = [
  // Large, slow clouds
  { top: '10%', startX: '-20vw', endX: '110vw', delay: '0s', duration: '120s', scale: 2.2, opacity: 0.9 },
  { top: '65%', startX: '120vw', endX: '-30vw', delay: '-30s', duration: '150s', scale: 2.8, opacity: 0.8 },
  { top: '80%', startX: '-40vw', endX: '120vw', delay: '-60s', duration: '180s', scale: 2.5, opacity: 0.85 },
  
  // Medium clouds
  { top: '25%', startX: '110vw', endX: '-25vw', delay: '-10s', duration: '90s', scale: 1.8, opacity: 0.9 },
  { top: '40%', startX: '-25vw', endX: '115vw', delay: '-45s', duration: '110s', scale: 2.0, opacity: 0.8 },

  // Small, faster clouds for parallax
  { top: '5%', startX: '130vw', endX: '-40vw', delay: '-5s', duration: '60s', scale: 1.2, opacity: 0.95 },
  { top: '50%', startX: '-30vw', endX: '130vw', delay: '-20s', duration: '75s', scale: 1.5, opacity: 0.9 },
  { top: '90%', startX: '140vw', endX: '-50vw', delay: '-80s', duration: '100s', scale: 1.6, opacity: 0.8 },
];

const Cloud = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
    <div className={`cloud-container cloud-animation ${className || ''}`} style={style}>
        {/* Main cloud body */}
        <div className="cloud-part" style={{ width: '120px', height: '40px', top: '10px' }}></div>
        {/* Left puff */}
        <div className="cloud-part" style={{ width: '80px', height: '30px', left: '-20px', top: '20px' }}></div>
        {/* Right puff */}
        <div className="cloud-part" style={{ width: '90px', height: '35px', right: '-15px', top: '15px' }}></div>
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
