'use client';

import React from 'react';
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
        
        generated.push({
            text: base.text,
            size: sizeClass[Math.floor(Math.random() * sizeClass.length)],
            opacity: `opacity-${Math.floor(Math.random() * 8 + 2) * 10}`, // 20-90
            top: `${Math.random() * 140 - 20}%`, // -20% to 120%
            left: `${Math.random() * 140 - 20}%`, // -20% to 120%
            fontWeight: base.weight.toString(),
            duration: `${Math.random() * 40 + 20}s`, // 20s to 60s
            delay: `-${Math.random() * 40}s`
        });
    }
    return generated;
};

const words = generateWords(408); // Generate 408 elements (20% reduction from 510)

const WelcomeAboardCloud = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {words.map((word, index) => (
                <span
                    key={index}
                    className={cn(
                        "animate-zoom-fade whitespace-nowrap absolute text-white",
                        word.size,
                        word.opacity
                    )}
                    style={{
                        top: word.top,
                        left: word.left,
                        fontWeight: word.fontWeight,
                        animationDuration: word.duration,
                        animationDelay: word.delay,
                    } as React.CSSProperties}
                >
                    {word.text}
                </span>
            ))}
        </div>
    )
}

export function FlightLoadingAnimation({ originName, destinationName }: { originName: string; destinationName: string }) {
    const from = originName.split(',')[0] || "Origen";
    const to = destinationName.split(',')[0] || "Destino";

    return (
        <div className="relative flex flex-col items-center justify-center text-center w-full h-full overflow-hidden">
             <WelcomeAboardCloud />
            <div className="relative z-10 bg-black/20 backdrop-blur-sm p-4 rounded-xl font-body mt-auto mb-4">
              <h2 className="text-2xl font-bold text-white">De {from} a {to}</h2>
              <p className="text-white/80 mt-1">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
