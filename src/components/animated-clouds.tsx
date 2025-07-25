'use client';

import React, { useEffect, useState } from 'react';

const Cloud = ({ style }: { style?: React.CSSProperties }) => (
    <div className="cloud-container cloud-animation relative w-[200px] h-[120px]" style={style}>
        {/* Estructura de 5 círculos basada en la imagen de referencia */}
        <div className="cloud-part" style={{ top: '20%', left: '25%', width: '100px', height: '100px' }}></div>
        <div className="cloud-part" style={{ top: '45%', left: '10%', width: '70px', height: '70px' }}></div>
        <div className="cloud-part" style={{ top: '45%', right: '10%', width: '70px', height: '70px' }}></div>
        <div className="cloud-part" style={{ bottom: '15%', left: '30%', width: '50px', height: '50px' }}></div>
        <div className="cloud-part" style={{ bottom: '15%', right: '30%', width: '50px', height: '50px' }}></div>
    </div>
);


type CloudData = {
    id: number;
    style: React.CSSProperties;
};

// Structured data for a chess-board like, parallax effect
const cloudDataConfig = [
    // Row 1 (Fastest)
    { id: 1, top: '5%', left: '0%', scale: 0.7, duration: '90s' },
    { id: 2, top: '8%', left: '30%', scale: 0.6, duration: '90s' },
    { id: 3, top: '6%', left: '60%', scale: 0.8, duration: '90s' },
    { id: 4, top: '7%', left: '90%', scale: 0.75, duration: '90s' },

    // Row 2 (Slower)
    { id: 5, top: '25%', left: '15%', scale: 0.9, duration: '120s' },
    { id: 6, top: '22%', left: '45%', scale: 1.0, duration: '120s' },
    { id: 7, top: '26%', left: '75%', scale: 0.85, duration: '120s' },
    { id: 8, top: '24%', left: '105%', scale: 0.95, duration: '120s' },

    // Row 3 (Slowest)
    { id: 9, top: '45%', left: '5%', scale: 1.1, duration: '180s' },
    { id: 10, top: '48%', left: '35%', scale: 1.2, duration: '180s' },
    { id: 11, top: '46%', left: '65%', scale: 1.0, duration: '180s' },
    { id: 12, top: '47%', left: '95%', scale: 1.15, duration: '180s' },
    
    // Row 4 (Medium)
    { id: 13, top: '65%', left: '20%', scale: 0.8, duration: '150s' },
    { id: 14, top: '62%', left: '50%', scale: 0.9, duration: '150s' },
    { id: 15, top: '66%', left: '80%', scale: 0.75, duration: '150s' },
    { id: 16, top: '64%', left: '110%', scale: 0.85, duration: '150s' },

    // Row 5 (Fastest, to complete the loop feel)
    { id: 17, top: '85%', left: '10%', scale: 0.7, duration: '95s' },
    { id: 18, top: '88%', left: '40%', scale: 0.65, duration: '95s' },
    { id: 19, top: '86%', left: '70%', scale: 0.75, duration: '95s' },
    { id: 20, top: '87%', left: '100%', scale: 0.6, duration: '95s' },
];


export const AnimatedClouds = () => {
    const [clouds, setClouds] = useState<CloudData[]>([]);

    useEffect(() => {
        const generatedClouds = cloudDataConfig.map(config => {
            const delay = Math.random() * -180; // Random start point in animation
            return {
                id: config.id,
                style: {
                    top: config.top,
                    left: config.left,
                    transform: `scale(${config.scale})`,
                    animationName: 'move-clouds',
                    animationDuration: config.duration,
                    animationDelay: `${delay}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                } as React.CSSProperties,
            };
        });
        setClouds(generatedClouds);
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {clouds.map(cloud => (
                <Cloud key={cloud.id} style={cloud.style} />
            ))}
        </div>
    );
};
