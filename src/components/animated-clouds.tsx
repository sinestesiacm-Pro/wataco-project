'use client';

import React from 'react';

const Cloud = ({ style }: { style?: React.CSSProperties }) => (
    <div className="cloud-container cloud-animation relative w-[200px] h-[120px]" style={style}>
        {/* Estructura de 5 círculos para una forma más orgánica */}
        <div className="cloud-part" style={{ top: '20%', left: '25%', width: '100px', height: '100px' }}></div>
        <div className="cloud-part" style={{ top: '45%', left: '10%', width: '70px', height: '70px' }}></div>
        <div className="cloud-part" style={{ top: '45%', right: '10%', width: '70px', height: '70px' }}></div>
        <div className="cloud-part" style={{ bottom: '15%', left: '30%', width: '50px', height: '50px' }}></div>
        <div className="cloud-part" style={{ bottom: '15%', right: '30%', width: '50px', height: '50px' }}></div>
    </div>
);


const cloudDataConfig = [
    // Fila 1 (Más rápida, más pequeña)
    { id: 1, top: '5%', left: '0%', scale: 0.6, duration: '90s', delay: '-10s' },
    { id: 2, top: '8%', left: '25%', scale: 0.5, duration: '90s', delay: '-50s' },
    { id: 3, top: '6%', left: '50%', scale: 0.65, duration: '90s', delay: '-90s' },
    { id: 4, top: '7%', left: '75%', scale: 0.55, duration: '90s', delay: '-130s' },

    // Fila 2 (Más lenta, más grande)
    { id: 5, top: '25%', left: '10%', scale: 0.9, duration: '150s', delay: '-5s' },
    { id: 6, top: '22%', left: '40%', scale: 1.0, duration: '150s', delay: '-70s' },
    { id: 7, top: '26%', left: '70%', scale: 0.85, duration: '150s', delay: '-120s' },
    { id: 8, top: '24%', left: '100%', scale: 0.95, duration: '150s', delay: '-160s' },

    // Fila 3 (Velocidad media)
    { id: 9, top: '45%', left: '5%', scale: 1.1, duration: '120s', delay: '-25s' },
    { id: 10, top: '48%', left: '35%', scale: 1.2, duration: '120s', delay: '-80s' },
    { id: 11, top: '46%', left: '65%', scale: 1.0, duration: '120s', delay: '-140s' },
    { id: 12, top: '47%', left: '95%', scale: 1.15, duration: '120s', delay: '-180s' },
    
    // Fila 4 (Similar a Fila 2)
    { id: 13, top: '65%', left: '15%', scale: 0.8, duration: '160s', delay: '-15s' },
    { id: 14, top: '62%', left: '45%', scale: 0.9, duration: '160s', delay: '-65s' },
    { id: 15, top: '66%', left: '75%', scale: 0.75, duration: '160s', delay: '-115s' },
    { id: 16, top: '64%', left: '105%', scale: 0.85, duration: '160s', delay: '-175s' },

    // Fila 5 (Similar a Fila 1)
    { id: 17, top: '85%', left: '10%', scale: 0.7, duration: '100s', delay: '-35s' },
    { id: 18, top: '88%', left: '40%', scale: 0.65, duration: '100s', delay: '-95s' },
    { id: 19, top: '86%', left: '70%', scale: 0.75, duration: '100s', delay: '-145s' },
    { id: 20, top: '87%', left: '100%', scale: 0.6, duration: '100s', delay: '-190s' },
];


export const AnimatedClouds = () => {
    const clouds = cloudDataConfig.map(config => ({
        id: config.id,
        style: {
            top: config.top,
            left: config.left,
            transform: `scale(${config.scale})`,
            animationName: 'move-clouds',
            animationDuration: config.duration,
            animationDelay: config.delay,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
        } as React.CSSProperties,
    }));

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {clouds.map(cloud => (
                <Cloud key={cloud.id} style={cloud.style} />
            ))}
        </div>
    );
};
