'use client';

import React from 'react';
import { cn } from "@/lib/utils";

const words = [
    // Grandi e principali (peso 600-700)
    { text: "Welcome Aboard", size: "text-4xl", opacity: "opacity-100", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: '700', duration: '45s', delay: '0s' },
    { text: "Bienvenido a bordo", size: "text-3xl", opacity: "opacity-95", top: '30%', left: '25%', fontWeight: '600', duration: '50s', delay: '-5s' },
    { text: "Bienvenue à bord", size: "text-3xl", opacity: "opacity-90", top: '70%', left: '75%', fontWeight: '600', duration: '48s', delay: '-2s' },
    { text: "Willkommen an Bord", size: "text-2xl", opacity: "opacity-85", top: '15%', left: '15%', fontWeight: '500', duration: '55s', delay: '-10s' },
    { text: "Benvenuto a bordo", size: "text-2xl", opacity: "opacity-80", top: '80%', left: '30%', fontWeight: '500', duration: '52s', delay: '-8s' },
    
    // Lingue asiatiche
    { text: "ようこそ", size: "text-3xl", opacity: "opacity-90", top: '10%', left: '85%', fontWeight: '600', duration: '49s', delay: '-7s' },
    { text: "歡迎光臨", size: "text-2xl", opacity: "opacity-85", top: '40%', left: '90%', fontWeight: '600', duration: '53s', delay: '-3s' },
    { text: "어서 오세요", size: "text-xl", opacity: "opacity-80", top: '65%', left: '10%', fontWeight: '500', duration: '58s', delay: '-12s' },
    { text: "ยินดีต้อนรับ", size: "text-2xl", opacity: "opacity-85", top: '90%', left: '60%', fontWeight: '500', duration: '51s', delay: '-6s' },
    { text: "Chào mừng", size: "text-lg", opacity: "opacity-75", top: '5%', left: '40%', fontWeight: '400', duration: '60s', delay: '-15s' },
    
    // Lingue europee
    { text: "Bem-vindo a bordo", size: "text-xl", opacity: "opacity-75", top: '10%', left: '60%', fontWeight: '400', duration: '57s', delay: '-11s' },
    { text: "Välkommen ombord", size: "text-lg", opacity: "opacity-70", top: '90%', left: '5%', fontWeight: '300', duration: '65s', delay: '-20s' },
    { text: "Witamy na pokładzie", size: "text-xl", opacity: "opacity-80", top: '75%', left: '95%', fontWeight: '400', duration: '56s', delay: '-9s' },
    { text: "Καλώς ήρθατε", size: "text-2xl", opacity: "opacity-85", top: '5%', left: '10%', fontWeight: '500', duration: '54s', delay: '-13s' },
    { text: "Welkom aan boord", size: "text-xl", opacity: "opacity-80", top: '85%', left: '80%', fontWeight: '500', duration: '59s', delay: '-4s' },
    
    // Riempitivi più piccoli
    ...Array.from({ length: 15 }).map((_, i) => ({
        text: "aboard",
        size: "text-sm",
        opacity: `opacity-${Math.floor(Math.random() * 5 + 3) * 10}`, // 30-70
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        fontWeight: '300',
        duration: `${Math.random() * 30 + 40}s`, // 40-70s
        delay: `-${Math.random() * 20}s`
    })),
     ...Array.from({ length: 15 }).map((_, i) => ({
        text: "welcome",
        size: "text-md",
        opacity: `opacity-${Math.floor(Math.random() * 5 + 4) * 10}`, // 40-80
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        fontWeight: '400',
        duration: `${Math.random() * 25 + 45}s`, // 45-70s
        delay: `-${Math.random() * 25}s`
    })),

    // Altre frasi di medie dimensioni
    { text: "Dobrodošli na brodu", size: "text-lg", opacity: "opacity-70", top: '20%', left: '45%', fontWeight: '400', duration: '62s', delay: '-18s' },
    { text: "Fáilte ar bord", size: "text-xl", opacity: "opacity-80", top: '45%', left: '5%', fontWeight: '500', duration: '58s', delay: '-14s' },
    { text: "Tervetuloa", size: "text-2xl", opacity: "opacity-85", top: '60%', left: '60%', fontWeight: '500', duration: '51s', delay: '-6s' },
    { text: "Vítejte na palubě", size: "text-lg", opacity: "opacity-75", top: '95%', left: '20%', fontWeight: '400', duration: '63s', delay: '-22s' },
    { text: "ברוכים הבאים", size: "text-2xl", opacity: "opacity-90", top: '55%', left: '35%', fontWeight: '600', direction: 'rtl', duration: '48s', delay: '-1s' },

    // Aggiungi più elementi per una maggiore densità
    { text: "aboard", size: "text-lg", opacity: "opacity-60", top: '5%', left: '5%', fontWeight: '300', duration: '68s', delay: '-25s' },
    { text: "aboard", size: "text-md", opacity: "opacity-50", top: '95%', left: '95%', fontWeight: '300', duration: '70s', delay: '-30s' },
    { text: "welcome", size: "text-xl", opacity: "opacity-70", top: '15%', left: '80%', fontWeight: '400', duration: '60s', delay: '-10s' },
    { text: "aboard", size: "text-sm", opacity: "opacity-40", top: '85%', left: '15%', fontWeight: '300', duration: '75s', delay: '-35s' },

    { text: "Sugeng rawuh", size: "text-xl", opacity: "opacity-75", top: '25%', left: '70%', fontWeight: '400', duration: '64s', delay: '-17s' },
    { text: "Tervetuloa kyytiin", size: "text-lg", opacity: "opacity-70", top: '40%', left: '20%', fontWeight: '400', duration: '66s', delay: '-21s' },
    { text: "Maligayang pagdating", size: "text-xl", opacity: "opacity-80", top: '75%', left: '50%', fontWeight: '500', duration: '57s', delay: '-8s' },
    { text: "Siyakwamukela", size: "text-md", opacity: "opacity-60", top: '50%', left: '90%', fontWeight: '400', duration: '69s', delay: '-28s' },
    { text: "Hoş geldiniz", size: "text-2xl", opacity: "opacity-85", top: '5%', left: '25%', fontWeight: '500', duration: '55s', delay: '-5s' },
    
    // Più lingue europee
    { text: "Velkommen", size: "text-2xl", opacity: "opacity-85", top: '35%', left: '85%', fontWeight: '500', duration: '53s', delay: '-11s' },
    { text: "Tervetuloa", size: "text-xl", opacity: "opacity-80", top: '65%', left: '40%', fontWeight: '500', duration: '59s', delay: '-14s' },
    { text: "Powitanie", size: "text-lg", opacity: "opacity-75", top: '80%', left: '65%', fontWeight: '400', duration: '62s', delay: '-19s' },
    { text: "Bun venit", size: "text-xl", opacity: "opacity-75", top: '20%', left: '95%', fontWeight: '400', duration: '61s', delay: '-16s' },

    // Riempitivi finali per massima densità
     ...Array.from({ length: 40 }).map((_, i) => ({
        text: "aboard",
        size: `text-${['sm', 'md', 'lg'][Math.floor(Math.random() * 3)]}`,
        opacity: `opacity-${Math.floor(Math.random() * 6 + 2) * 10}`, // 20-70
        top: `${Math.random() * 110 - 5}%`, // Include posizioni negative e >100
        left: `${Math.random() * 110 - 5}%`,
        fontWeight: `${[300, 400][Math.floor(Math.random() * 2)]}`,
        duration: `${Math.random() * 40 + 30}s`, // 30-70s
        delay: `-${Math.random() * 30}s`
    })),
    ...Array.from({ length: 40 }).map((_, i) => ({
        text: "welcome",
        size: `text-${['lg', 'xl', '2xl'][Math.floor(Math.random() * 3)]}`,
        opacity: `opacity-${Math.floor(Math.random() * 5 + 4) * 10}`, // 40-80
        top: `${Math.random() * 110 - 5}%`,
        left: `${Math.random() * 110 - 5}%`,
        fontWeight: `${[400, 500, 600][Math.floor(Math.random() * 3)]}`,
        duration: `${Math.random() * 30 + 35}s`, // 35-65s
        delay: `-${Math.random() * 35}s`
    })),
];


const WelcomeAboardCloud = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {words.map((word, index) => (
                <span
                    key={index}
                    className={cn(
                        "animate-zoom-fade whitespace-nowrap absolute text-white drop-shadow-lg",
                        word.size,
                        word.opacity
                    )}
                    style={{
                        top: word.top,
                        left: word.left,
                        right: word.right,
                        bottom: word.bottom,
                        transform: word.transform,
                        fontWeight: word.fontWeight,
                        direction: word.direction as any,
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
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">De {from} a {to}</h2>
              <p className="text-white/80 mt-1 drop-shadow-lg">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
