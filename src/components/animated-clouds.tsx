'use client';

import React, { useEffect, useState } from 'react';

const Cloud = ({ style }: { style?: React.CSSProperties }) => (
    <div className="cloud-container cloud-animation relative w-[200px] h-[120px]" style={style}>
        {/* Cuerpo principal de la nube - 7 Círculos */}
        <div className="cloud-part" style={{ top: '20%', left: '25%', width: '100px', height: '100px' }}></div>
        <div className="cloud-part" style={{ top: '35%', left: '10%', width: '70px', height: '70px' }}></div>
        <div className="cloud-part" style={{ top: '35%', right: '10%', width: '70px', height: '70px' }}></div>
        <div className="cloud-part" style={{ top: '55%', left: '20%', width: '60px', height: '60px' }}></div>
        <div className="cloud-part" style={{ top: '55%', right: '20%', width: '60px', height: '60px' }}></div>
        <div className="cloud-part" style={{ top: '50%', left: '0%', width: '50px', height: '50px' }}></div>
        <div className="cloud-part" style={{ top: '50%', right: '0%', width: '50px', height: '50px' }}></div>
    </div>
);

type CloudData = {
    id: number;
    style: React.CSSProperties;
};

export const AnimatedClouds = () => {
    const [cloudData, setCloudData] = useState<CloudData[]>([]);

    useEffect(() => {
        const generateCloudData = () => {
            return Array.from({ length: 20 }).map((_, i) => {
                const duration = Math.random() * 120 + 60; // 60s to 180s
                const delay = Math.random() * -180; // Start at various points in the animation
                const top = `${Math.random() * 100}%`;
                const scale = Math.random() * 0.8 + 0.5; // 0.5 to 1.3
                const initialX = Math.random() * 100; // Start at a random horizontal position

                return {
                    id: i,
                    style: {
                        top,
                        transform: `scale(${scale})`,
                        animationName: 'move-clouds',
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                        animationTimingFunction: 'linear',
                        animationIterationCount: 'infinite',
                        '--cloud-start-x': `${initialX}vw`,
                        '--cloud-end-x': `${initialX + 150}vw`, // Ensure it moves well off-screen
                    } as React.CSSProperties,
                };
            });
        };
        setCloudData(generateCloudData());
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {cloudData.map(cloud => (
                <Cloud key={cloud.id} style={cloud.style} />
            ))}
        </div>
    );
};
