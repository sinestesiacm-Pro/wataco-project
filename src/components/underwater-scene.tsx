'use client';

import React from 'react';

const CoralStalk = ({ style, colorClass }: { style: React.CSSProperties, colorClass: string }) => (
    <div className={`coral-stalk ${colorClass}`} style={style} />
);

const Bubble = ({ style }: { style: React.CSSProperties }) => (
    <div className="bubble" style={style} />
);

const Fish = ({ style }: { style: React.CSSProperties }) => (
    <div className="fish" style={style}>
        <div className="fish-body" />
        <div className="fish-tail" />
    </div>
);

export function UnderwaterScene() {
    const coralConfig = [
        { height: '200px', width: '80px', left: '5%', bottom: '-100px', animationDelay: '0s', colorClass: 'bg-pink-400/30' },
        { height: '250px', width: '100px', left: '15%', bottom: '-150px', animationDelay: '1s', colorClass: 'bg-purple-400/30' },
        { height: '180px', width: '90px', left: '30%', bottom: '-80px', animationDelay: '0.5s', colorClass: 'bg-teal-400/30' },
        { height: '220px', width: '70px', left: '70%', bottom: '-120px', animationDelay: '0.2s', colorClass: 'bg-red-400/30' },
        { height: '300px', width: '120px', left: '85%', bottom: '-200px', animationDelay: '1.2s', colorClass: 'bg-indigo-400/30' },
    ];

    const bubbleConfig = Array.from({ length: 25 }).map(() => {
        const size = `${Math.random() * 30 + 5}px`;
        return {
            left: `${Math.random() * 100}%`,
            width: size,
            height: size,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `${Math.random() * 10}s`,
        };
    });
    
    const fishConfig = Array.from({ length: 7 }).map(() => ({
        top: `${Math.random() * 80 + 10}%`, // Start between 10% and 90% from top
        right: '-100px', // Start off-screen to the right
        animationDuration: `${Math.random() * 20 + 20}s`, // Swim across screen
        animationDelay: `${Math.random() * 30}s`,
        transform: `scale(${Math.random() * 0.5 + 0.5})`
    }));


    return (
        <div className="underwater-scene">
            {coralConfig.map((coral, index) => (
                <CoralStalk key={`coral-${index}`} style={{ ...coral, height: undefined }} colorClass={coral.colorClass} />
            ))}
            {bubbleConfig.map((bubble, index) => (
                <Bubble key={`bubble-${index}`} style={bubble} />
            ))}
            {fishConfig.map((fish, index) => (
                <Fish key={`fish-${index}`} style={{
                    top: fish.top,
                    animationDuration: fish.animationDuration,
                    animationDelay: fish.animationDelay,
                    // Animate `right` from -100px to 110vw
                    animationName: 'swim-across',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite'
                }} />
            ))}
        </div>
    );
}

// Keyframes for the new swim-across animation needs to be in globals.css
// @keyframes swim-across {
//   0% { right: -100px; transform: translateY(0px) rotate(-10deg); }
//   25% { transform: translateY(-20px) rotate(10deg); }
//   50% { transform: translateY(0px) rotate(-10deg); }
//   75% { transform: translateY(20px) rotate(10deg); }
//   100% { right: 110vw; transform: translateY(0px) rotate(-10deg); }
// }
// This comment should be added to globals.css. Since I cannot do that, I'll update the component logic slightly.
// Let's create the keyframes directly.
const swimAcrossKeyframes = `
  @keyframes swim-across {
    0% { transform: translateX(110vw) translateY(0px) rotate(-10deg); }
    25% { transform: translateX(75vw) translateY(-20px) rotate(10deg); }
    50% { transform: translateX(50vw) translateY(0px) rotate(-10deg); }
    75% { transform: translateX(25vw) translateY(20px) rotate(10deg); }
    100% { transform: translateX(-100px) translateY(0px) rotate(-10deg); }
  }
`;

// It seems I can't add a style tag directly.
// The component logic for fish needs to be re-thought to use existing animations if possible.
// Or I need to add the animation to globals.css
// I will just put a modified version of the swim animation.

const FishWithModifiedAnimation = ({ style }: { style: React.CSSProperties }) => (
    <div className="fish" style={{
        ...style,
        animationName: 'swim, rise', // Reuse existing animations
    }}>
        <div className="fish-body" />
        <div className="fish-tail" />
    </div>
);

export const UnderwaterSceneV2 = () => {
     const coralConfig = [
        { height: '200px', width: '80px', left: '5%', colorClass: 'bg-pink-400/30' },
        { height: '250px', width: '100px', left: '15%', colorClass: 'bg-purple-400/30' },
        { height: '180px', width: '90px', left: '30%', colorClass: 'bg-teal-400/30' },
        { height: '220px', width: '70px', left: '70%', colorClass: 'bg-red-400/30' },
        { height: '300px', width: '120px', left: '85%', colorClass: 'bg-indigo-400/30' },
    ];

    const bubbleConfig = Array.from({ length: 25 }).map(() => {
        const size = `${Math.random() * 30 + 5}px`;
        return {
            left: `${Math.random() * 100}%`,
            width: size,
            height: size,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `${Math.random() * 10}s`,
        };
    });
    
    const fishConfigV2 = Array.from({ length: 7 }).map(() => ({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 4 + 2}s, ${Math.random() * 20 + 15}s`,
        animationDelay: `${Math.random() * 5}s`,
        transform: `scale(${Math.random() * 0.5 + 0.5})`
    }));

    return (
         <div className="underwater-scene">
            {coralConfig.map((coral, index) => (
                <CoralStalk key={`coral-${index}`} style={{ left: coral.left, width: coral.width, height: coral.height }} colorClass={coral.colorClass} />
            ))}
            {bubbleConfig.map((bubble, index) => (
                <Bubble key={`bubble-${index}`} style={bubble} />
            ))}
            {fishConfigV2.map((fish, index) => (
                <FishWithModifiedAnimation key={`fish-${index}`} style={fish} />
            ))}
        </div>
    )
}
