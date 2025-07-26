'use client';

import { Plane } from "lucide-react";
import React from 'react';
import { cn } from "@/lib/utils";

interface FlightLoadingAnimationProps {
    originName: string;
    destinationName: string;
}

const WelcomeAboardCloud = () => {
    // A much larger and more diverse array to create density.
    // The layout is now controlled by Flexbox, so the exact position is less important than the order and size.
    const words = [
        { text: "Bienvenue", size: "text-2xl" },
        { text: "Welcome", size: "text-4xl", opacity: "opacity-100" },
        { text: "Willkommen", size: "text-xl" },
        { text: "Bienvenido", size: "text-3xl", opacity: "opacity-95" },
        { text: "Benvenuto", size: "text-2xl" },
        { text: "Bem-vindo", size: "text-xl" },
        { text: "Välkommen", size: "text-lg" },
        { text: "Karibu", size: "text-2xl" },
        { text: "어서 오세요", size: "text-3xl" },
        { text: "ようこそ", size: "text-xl" },
        { text: "歡迎", size: "text-3xl" },
        { text: "Selamat datang", size: "text-lg" },
        { text: "Fáilte", size: "text-2xl" },
        { text: "Witamy", size: "text-xl" },
        { text: "Hoş geldiniz", size: "text-2xl" },
        { text: "Καλώς ήρθατε", size: "text-lg" },
        { text: "Ласкаво просимо", size: "text-xl" },
        { text: "Добро пожаловать", size: "text-2xl" },
        { text: "أهلاً بك", size: "text-4xl" },
        { text: "Siyakwamukela", size: "text-lg" },
        { text: "Vítejte", size: "text-xl" },
        { text: "Tervetuloa", size: "text-2xl" },
        { text: "स्वआगत है", size: "text-3xl" },
        { text: "Maligayang pagdating", size: "text-lg" },
        { text: "Failte", size: "text-xl" },
        { text: "Croeso", size: "text-2xl" },
        { text: "Üdvözöljük", size: "text-lg" },
        { text: "Barka da zuwa", size: "text-xl" },
        { text: "Bine aţi venit", size: "text-lg" },
        { text: "Velkomin", size: "text-xl" },
        { text: "Sugeng rawuh", size: "text-lg" },
        { text: "ברוכים הבאים", size: "text-3xl" },
        { text: "வரவேற்பு", size: "text-2xl" },
        { text: "Dobrodošli", size: "text-xl" },
        { text: "Sveiki atvykę", size: "text-lg" },
        { text: "Tere tulemast", size: "text-xl" },
        { text: "Welkom", size: "text-2xl" },
        { text: "Chào mừng", size: "text-lg" },
        { text: "Benvinguts", size: "text-xl" },
        { text: "Vitajte", size: "text-lg" },
        { text: "Gaidīti", size: "text-xl" },
        { text: "Sveiki", size: "text-2xl" },
        { text: "Mire se vini", size: "text-lg" },
        { text: "Mirë se erdhët", size: "text-xl" },
        { text: "Wëllkomm", size: "text-2xl" },
    ];


    return (
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 px-4 text-white font-body leading-tight">
            {words.map((word, index) => (
                <span
                    key={index}
                    className={cn(
                        "animate-zoom-fade whitespace-nowrap drop-shadow-lg",
                        word.size,
                        word.opacity || "opacity-70"
                    )}
                    style={{
                        animationDuration: `${Math.random() * 5 + 8}s`, // 8s to 13s
                        animationDelay: `${Math.random() * -5}s`,     // -5s to 0s
                    }}
                >
                    {word.text}
                </span>
            ))}
        </div>
    );
};


export function FlightLoadingAnimation({ originName, destinationName }: FlightLoadingAnimationProps) {
    const from = originName.split(',')[0] || "Origen";
    const to = destinationName.split(',')[0] || "Destino";

    return (
        <div className="flex flex-col items-center justify-center text-center w-full h-full overflow-hidden">
            {/* Main container for the word cloud, ensuring it's centered and has space */}
            <div className="relative w-full flex-grow flex items-center justify-center py-8">
                <WelcomeAboardCloud />
            </div>
            {/* Bottom info section */}
            <div className="relative z-10 bg-black/20 backdrop-blur-sm p-4 rounded-xl font-body mt-auto mb-4">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">De {from} a {to}</h2>
              <p className="text-white/80 mt-1 drop-shadow-lg">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
