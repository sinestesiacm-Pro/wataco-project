'use client';

import { Plane } from "lucide-react";
import React from 'react';

interface FlightLoadingAnimationProps {
    originName: string;
    destinationName: string;
}

const WelcomeAboardCloud = () => {
    const words = [
        // Centerpiece
        { text: "Welcome Aboard", size: "text-4xl", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", opacity: "opacity-100", duration: "8s", delay: "0s" },

        // Tier 1 (Largest & Most Prominent)
        { text: "Bienvenido a bordo", size: "text-3xl", position: "top-[40%] left-[15%]", opacity: "opacity-80", duration: "10s", delay: "-1s" },
        { text: "Bienvenue à bord", size: "text-2xl", position: "top-[25%] right-[10%]", opacity: "opacity-90", duration: "9s", delay: "-0.5s" },
        { text: "Willkommen an Bord", size: "text-2xl", position: "top-[20%] left-[40%]", opacity: "opacity-70", duration: "11s", delay: "-2s" },
        { text: "欢迎登机", size: "text-3xl", position: "bottom-[20%] right-[40%]", opacity: "opacity-90", duration: "8s", delay: "-3s" },
        { text: "Benvenuto a bordo", size: "text-xl", position: "top-[65%] right-[20%]", opacity: "opacity-60", duration: "13s", delay: "-2.5s" },

        // Tier 2 (Medium Size, Filling Gaps)
        { text: "Bem-vindo a bordo", size: "text-lg", position: "bottom-[30%] left-[10%]", opacity: "opacity-70", duration: "12s", delay: "-4s" },
        { text: "어서 오세요", size: "text-xl", position: "top-[28%] left-[25%]", opacity: "opacity-75", duration: "10s", delay: "-5s" },
        { text: "ご搭乗ありがとうございます", size: "text-lg", position: "top-[35%] right-[25%]", opacity: "opacity-70", duration: "14s", delay: "-6s" },
        { text: "Добро пожаловать на борт", size: "text-lg", position: "top-[15%] left-[55%]", opacity: "opacity-60", duration: "9s", delay: "-7s" },
        { text: "Welkom aan boord", size: "text-md", position: "top-[40%] left-[55%]", opacity: "opacity-65", duration: "11s", delay: "-8s" },
        { text: "Välkommen ombord", size: "text-lg", position: "bottom-[40%] right-[55%]", opacity: "opacity-70", duration: "12s", delay: "-9s" },
        { text: "أهلاً بكم على متن الطائرة", size: "text-xl", position: "bottom-[15%] left-[35%]", opacity: "opacity-80", duration: "10s", delay: "-10s" },
        { text: "स्वआगत हैं", size: "text-2xl", position: "bottom-[10%] right-[25%]", opacity: "opacity-75", duration: "13s", delay: "-11s" },
        
        // New Additions for more density (25% more)
        { text: "Yolculuğa hoş geldiniz", size: "text-lg", position: "top-[5%] left-[10%]", opacity: "opacity-65", duration: "15s", delay: "-3.5s" },
        { text: "Karibu", size: "text-2xl", position: "top-[80%] left-[50%]", opacity: "opacity-70", duration: "10s", delay: "-4.5s" },
        { text: "ברוכים הבאים", size: "text-xl", position: "top-[75%] left-[25%]", opacity: "opacity-75", duration: "12s", delay: "-5.5s" },
        { text: "ยินดีต้อนรับ", size: "text-2xl", position: "top-[60%] right-[45%]", opacity: "opacity-80", duration: "9s", delay: "-6.5s" },
        { text: "Velkommen", size: "text-xl", position: "bottom-[5%] left-[5%]", opacity: "opacity-70", duration: "11s", delay: "-7.5s" },
    ];

    return (
        <div className="relative w-full h-96 text-white font-body">
            {words.map((word, index) => (
                <span
                    key={index}
                    className={`animate-zoom-fade absolute whitespace-nowrap drop-shadow-lg ${word.size} ${word.position} ${word.opacity}`}
                    style={{ animationDuration: word.duration, animationDelay: word.delay }}
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
        <div className="flex flex-col items-center justify-center text-center py-16 space-y-8 overflow-hidden w-full h-full">
            <WelcomeAboardCloud />
            <div className="relative z-10 bg-black/20 backdrop-blur-sm p-4 rounded-xl font-body">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">De {from} a {to}</h2>
              <p className="text-white/80 mt-1 drop-shadow-lg">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
