
'use client';

import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';

const baseWords = [
    { text: "Welcome Aboard", weight: 400 }, { text: "Bienvenido a bordo", weight: 400 },
    { text: "Willkommen an Bord", weight: 300 }, { text: "Bienvenue à bord", weight: 300 },
    { text: "Benvenuto a bordo", weight: 300 }, { text: "Bem-vindo a bordo", weight: 300 },
    { text: "ようこそ", weight: 400 }, { text: "歡迎光臨", weight: 400 },
    { text: "어서 오세요", weight: 300 }, { text: "Välkommen ombord", weight: 300 },
    { text: "Witamy na pokładzie", weight: 300 }, { text: "Welkom aan boord", weight: 300 },
    { text: "Dobrodošli na brodu", weight: 300 }, { text: "Fáilte ar bord", weight: 400 },
    { text: "Vítejte na palubě", weight: 300 }, { text: "ยินดีต้อนรับ", weight: 400 },
    { text: "Chào mừng", weight: 300 }, { text: "Καλώς ήρθατε", weight: 400 },
    { text: "Tervetuloa kyytiin", weight: 300 }, { text: "Hoş geldiniz", weight: 400 },
    { text: "Velkommen", weight: 300 }, { text: "Bun venit", weight: 300 },
    { text: "Siyakwamukela", weight: 300}, { text: "Maligayang pagdating", weight: 400},
    { text: "Sugeng rawuh", weight: 400}, { text: "Tervetuloa", weight: 300},
    { text: "aboard", weight: 300 }, { text: "welcome", weight: 300 },
];

const generateWords = (count: number, isMobile: boolean) => {
    const generated = [];
    const sizeOptions = isMobile 
        ? ['text-lg', 'text-xl', 'text-2xl'] 
        : ['text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'];
    const durationRange = { min: 25, max: 55 }; // Adjusted range for speed variation

    for (let i = 0; i < count; i++) {
        const base = baseWords[i % baseWords.length];
        const duration = Math.random() * (durationRange.max - durationRange.min) + durationRange.min;
        
        // This positioning ensures the screen is always full
        const leftPos = Math.random() * 200 - 50; // Range from -50vw to 150vw
        const topPos = Math.random() * 100;

        generated.push({
            ...base,
            size: sizeOptions[Math.floor(Math.random() * sizeOptions.length)],
            top: `${topPos}%`,
            left: `${leftPos}%`,
            animationDuration: `${duration}s`,
            animationDelay: `-${Math.random() * duration}s`, // Negative delay starts the animation mid-cycle
        });
    }
    return generated;
};


const Word = React.memo(function Word({ word }: { word: any }) {
    return (
        <span
            className={cn("whitespace-nowrap absolute text-white", word.size)}
            style={
                {
                    top: word.top,
                    left: word.left,
                    fontWeight: word.weight,
                    animationName: 'float-and-fade-ltr',
                    animationDuration: word.animationDuration,
                    animationDelay: word.animationDelay,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                } as React.CSSProperties
            }
        >
            {word.text}
        </span>
    );
});


const WelcomeAboardCloud = React.memo(function WelcomeAboardCloud() {
    const isMobile = useIsMobile();
    const wordCount = isMobile ? 240 : 400; // Increased count for density
    
    const words = useMemo(() => generateWords(wordCount, isMobile), [wordCount, isMobile]);

    return (
        <>
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                {words.map((word, index) => (
                    <Word key={`word-${index}`} word={word} />
                ))}
            </div>
        </>
    )
})

export function FlightLoadingAnimation({ originName, destinationName }: { originName: string; destinationName: string }) {
    const from = originName.split(',')[0] || "Origen";
    const to = destinationName.split(',')[0] || "Destino";

    return (
        <div className="relative flex flex-col items-center justify-center text-center w-full h-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
            <WelcomeAboardCloud />
            <div className="relative z-30 bg-white/20 backdrop-blur-md p-6 rounded-2xl font-body loading-route-box shadow-2xl border border-white/30">
              <h2 className="text-2xl font-bold text-gray-900 drop-shadow-lg">De {from} a {to}</h2>
              <p className="text-gray-700 mt-1 drop-shadow-lg font-medium">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
