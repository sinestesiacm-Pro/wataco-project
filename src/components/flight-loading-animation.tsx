'use client';

import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';

const baseWords = [
    { text: "Welcome Aboard", weight: 500 },
    { text: "Bienvenido a bordo", weight: 500 },
    { text: "Willkommen an Bord", weight: 400 },
    { text: "Bienvenue à bord", weight: 400 },
    { text: "Benvenuto a bordo", weight: 300 },
    { text: "Bem-vindo a bordo", weight: 300 },
    { text: "ようこそ", weight: 400 },
    { text: "歡迎光臨", weight: 400 },
    { text: "어서 오세요", weight: 300 },
    { text: "Välkommen ombord", weight: 300 },
    { text: "Witamy na pokładzie", weight: 300 },
    { text: "Welkom aan boord", weight: 300 },
    { text: "Dobrodošli na brodu", weight: 300 },
    { text: "Fáilte ar bord", weight: 400 },
    { text: "Vítejte na palubě", weight: 300 },
    { text: "ยินดีต้อนรับ", weight: 400 },
    { text: "Chào mừng", weight: 300 },
    { text: "Καλώς ήρθατε", weight: 400 },
    { text: "Tervetuloa kyytiin", weight: 300 },
    { text: "Hoş geldiniz", weight: 400 },
    { text: "Velkommen", weight: 300 },
    { text: "Bun venit", weight: 300 },
    { text: "Siyakwamukela", weight: 300},
    { text: "Maligayang pagdating", weight: 400},
    { text: "Sugeng rawuh", weight: 400},
    { text: "Tervetuloa", weight: 300},
    { text: "aboard", weight: 300 },
    { text: "welcome", weight: 300 },
];

const generateWords = (count: number, isMobile: boolean) => {
    const generated = [];
    for (let i = 0; i < count; i++) {
        const base = baseWords[i % baseWords.length];
        const sizeClassOptions = ['text-sm', 'text-md', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl'];
        
        const mobileDurationRange = { min: 15, max: 35 };
        const desktopDurationRange = { min: 15, max: 50 };
        const durationRange = isMobile ? mobileDurationRange : desktopDurationRange;

        const mobileTranslateYRange = { min: -10, max: 10 };
        const desktopTranslateYRange = { min: -20, max: 20 };
        const translateYRange = isMobile ? mobileTranslateYRange : desktopTranslateYRange;
        
        generated.push({
            text: base.text,
            size: sizeClassOptions[Math.floor(Math.random() * sizeClassOptions.length)],
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontWeight: base.weight.toString(),
            '--translate-y-start': `${Math.random() * (translateYRange.max - translateYRange.min) + translateYRange.min}vh`,
            '--translate-y-end': `${Math.random() * (translateYRange.max - translateYRange.min) + translateYRange.min}vh`,
            animation: `float-and-fade ${Math.random() * (durationRange.max - durationRange.min) + durationRange.min}s linear -${Math.random() * 50}s infinite`,
        });
    }
    return generated;
};


const Word = React.memo(function Word({ word }: { word: any }) {
    return (
        <span
            className={cn(
                "whitespace-nowrap absolute text-white",
                word.size
            )}
            style={{
                top: word.top,
                left: word.left,
                fontWeight: word.fontWeight,
                '--translate-y-start': word['--translate-y-start'],
                '--translate-y-end': word['--translate-y-end'],
                animation: word.animation,
            } as React.CSSProperties}
        >
            {word.text}
        </span>
    );
});

const WelcomeAboardCloud = React.memo(function WelcomeAboardCloud() {
    const isMobile = useIsMobile();
    const wordCount = isMobile ? 60 : 209;
    
    const words = useMemo(() => generateWords(wordCount, isMobile), [wordCount, isMobile]);
    
    return (
        <>
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                {words.map((word, index) => (
                    <Word key={index} word={word} />
                ))}
            </div>
        </>
    )
})


export function FlightLoadingAnimation({ originName, destinationName }: { originName: string; destinationName: string }) {
    const from = originName.split(',')[0] || "Origen";
    const to = destinationName.split(',')[0] || "Destino";

    return (
        <div className="relative flex flex-col items-center justify-center text-center w-full h-full overflow-hidden">
            <WelcomeAboardCloud />
            <div className="relative z-30 bg-black/20 backdrop-blur-sm p-4 rounded-xl font-body mt-auto mb-4">
              <h2 className="text-2xl font-bold text-white">De {from} a {to}</h2>
              <p className="text-white/80 mt-1">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
