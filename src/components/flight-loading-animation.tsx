'use client';

import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";

const baseWords = [
    { text: "Welcome Aboard", weight: 700 },
    { text: "Bienvenido a bordo", weight: 700 },
    { text: "Willkommen an Bord", weight: 600 },
    { text: "Bienvenue à bord", weight: 600 },
    { text: "Benvenuto a bordo", weight: 500 },
    { text: "Bem-vindo a bordo", weight: 500 },
    { text: "ようこそ", weight: 600 },
    { text: "歡迎光臨", weight: 600 },
    { text: "어서 오세요", weight: 500 },
    { text: "Välkommen ombord", weight: 400 },
    { text: "Witamy na pokładzie", weight: 400 },
    { text: "Welkom aan boord", weight: 400 },
    { text: "Dobrodošli na brodu", weight: 400 },
    { text: "Fáilte ar bord", weight: 500 },
    { text: "Vítejte na palubě", weight: 400 },
    { text: "ยินดีต้อนรับ", weight: 500 },
    { text: "Chào mừng", weight: 400 },
    { text: "Καλώς ήρθατε", weight: 500 },
    { text: "Tervetuloa kyytiin", weight: 400 },
    { text: "Hoş geldiniz", weight: 500 },
    { text: "Velkommen", weight: 400 },
    { text: "Bun venit", weight: 400 },
    { text: "Siyakwamukela", weight: 400},
    { text: "Maligayang pagdating", weight: 500},
    { text: "Sugeng rawuh", weight: 500},
    { text: "Tervetuloa", weight: 400},
    { text: "aboard", weight: 300 },
    { text: "welcome", weight: 300 },
];

const generateWords = (count: number) => {
    const generated = [];
    for (let i = 0; i < count; i++) {
        const base = baseWords[i % baseWords.length];
        const sizeClass = ['text-sm', 'text-md', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl'];
        
        let leftPosition;
        if (i % 3 === 0) {
             leftPosition = `${Math.random() * 70 - 20}%`;
        } else {
             leftPosition = `${Math.random() * 70 + 50}%`;
        }

        generated.push({
            text: base.text,
            size: sizeClass[Math.floor(Math.random() * sizeClass.length)],
            top: `${Math.random() * 100}%`,
            left: leftPosition,
            fontWeight: base.weight.toString(),
            fadeDuration: `${Math.random() * 10 + 10}s`, // 10s to 20s
            moveDuration: `${Math.random() * 20 + 20}s`, // 20s to 40s
            delay: `-${Math.random() * 30}s`,
            translateYStart: `${Math.random() * 40 - 20}vh`, // from -20vh to 20vh
            translateYEnd: `${Math.random() * 40 - 20}vh`, // to -20vh to 20vh
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
                '--translate-y-start': word.translateYStart,
                '--translate-y-end': word.translateYEnd,
                animation: `
                    float-and-fade ${word.fadeDuration} linear ${word.delay} infinite,
                    move-and-scale ${word.moveDuration} linear ${word.delay} infinite
                `,
            } as React.CSSProperties}
        >
            {word.text}
        </span>
    );
});

const WelcomeAboardCloud = React.memo(function WelcomeAboardCloud() {
    const words = useMemo(() => generateWords(261), []);
    
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
