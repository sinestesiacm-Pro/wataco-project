
'use client';

import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';
import { Hotel } from 'lucide-react';

const baseWords = [
    { text: "Welcome", weight: 400 }, { text: "Bienvenido", weight: 400 },
    { text: "Willkommen", weight: 300 }, { text: "Bienvenue", weight: 300 },
    { text: "Benvenuto", weight: 300 }, { text: "Bem-vindo", weight: 300 },
    { text: "ようこそ", weight: 400 }, { text: "歡迎光臨", weight: 400 },
    { text: "어서 오세요", weight: 300 }, { text: "Välkommen", weight: 300 },
    { text: "Witamy", weight: 300 }, { text: "Welkom", weight: 300 },
    { text: "Dobrodošli", weight: 300 }, { text: "Fáilte", weight: 400 },
    { text: "Vítejte", weight: 300 }, { text: "ยินดีต้อนรับ", weight: 400 },
    { text: "Chào mừng", weight: 300 }, { text: "Καλώς ήρθατε", weight: 400 },
    { text: "Tervetuloa", weight: 300 }, { text: "Hoş geldiniz", weight: 400 },
    { text: "Velkommen", weight: 300 }, { text: "Bun venit", weight: 300 },
    { text: "Siyakwamukela", weight: 300}, { text: "Maligayang pagdating", weight: 400},
    { text: "Sugeng rawuh", weight: 400},
];

const generateWords = (count: number, isMobile: boolean) => {
    const generated = [];
    const sizeOptions = isMobile 
        ? ['text-4xl', 'text-5xl', 'text-6xl'] 
        : ['text-5xl', 'text-6xl', 'text-7xl', 'text-8xl'];
    const durationRange = { min: 25, max: 80 };

    for (let i = 0; i < count; i++) {
        const base = baseWords[i % baseWords.length];
        const duration = Math.random() * (durationRange.max - durationRange.min) + durationRange.min;
        
        const leftPos = Math.random() * 150 - 25; // Range from -25vw to 125vw for better coverage
        const topPos = Math.random() * 100;

        generated.push({
            ...base,
            size: sizeOptions[Math.floor(Math.random() * sizeOptions.length)],
            top: `${topPos}%`,
            left: `${leftPos}%`,
            animationDuration: `${duration}s`,
            animationDelay: `-${Math.random() * duration}s`,
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


const WelcomeCloud = React.memo(function WelcomeCloud() {
    const isMobile = useIsMobile();
    const wordCount = isMobile ? 40 : 60; 
    
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

export function HotelLoadingAnimation({ destinationName }: { destinationName: string }) {

    return (
        <div className="relative flex flex-col items-center justify-center text-center w-full h-full overflow-hidden bg-hotels-background">
            <WelcomeCloud />
            <div className="relative z-30 bg-gray-800/40 backdrop-blur-md p-6 rounded-2xl font-body loading-route-box shadow-2xl border border-white/20 flex flex-col items-center">
              <Hotel className="h-10 w-10 text-white mb-4 drop-shadow-lg"/>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">Buscando los mejores hoteles en {destinationName}</h2>
              <p className="text-gray-300 mt-1 drop-shadow-lg font-medium">Esto puede tardar un momento...</p>
            </div>
        </div>
    );
}
