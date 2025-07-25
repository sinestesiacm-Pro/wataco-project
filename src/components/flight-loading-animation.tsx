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
        { text: "Welcome Aboard", size: "text-4xl", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", opacity: "opacity-100", duration: "10s", delay: "0s" },

        // Tier 1 (Largest & Most Prominent)
        { text: "Bienvenido a bordo", size: "text-3xl", position: "top-[45%] left-[20%]", opacity: "opacity-80", duration: "12s", delay: "-2s" },
        { text: "Bienvenue à bord", size: "text-2xl", position: "top-[30%] right-[10%]", opacity: "opacity-90", duration: "11s", delay: "-1.5s" },
        { text: "Willkommen an Bord", size: "text-2xl", position: "top-[25%] left-[45%]", opacity: "opacity-70", duration: "13s", delay: "-3s" },
        { text: "欢迎登机", size: "text-3xl", position: "bottom-[25%] right-[45%]", opacity: "opacity-90", duration: "10s", delay: "-5s" },
        { text: "Benvenuto a bordo", size: "text-xl", position: "top-[58%] right-[22%]", opacity: "opacity-60", duration: "15s", delay: "-4s" },

        // Tier 2 (Medium Size, Filling Gaps)
        { text: "Bem-vindo a bordo", size: "text-lg", position: "bottom-[35%] left-[15%]", opacity: "opacity-70", duration: "14s", delay: "-6.5s" },
        { text: "어서 오세요", size: "text-xl", position: "top-[30%] left-[30%]", opacity: "opacity-75", duration: "12s", delay: "-7s" },
        { text: "ご搭乗ありがとうございます", size: "text-lg", position: "top-[30%] right-[25%]", opacity: "opacity-70", duration: "16s", delay: "-8s" },
        { text: "Добро пожаловать на борт", size: "text-lg", position: "top-[20%] left-[55%]", opacity: "opacity-60", duration: "11s", delay: "-9s" },
        { text: "Welkom aan boord", size: "text-md", position: "top-[35%] left-[50%]", opacity: "opacity-65", duration: "13s", delay: "-10s" },
        { text: "Välkommen ombord", size: "text-lg", position: "bottom-[35%] right-[55%]", opacity: "opacity-70", duration: "14s", delay: "-11s" },
        { text: "أهلاً بكم على متن الطائرة", size: "text-xl", position: "bottom-[20%] left-[40%]", opacity: "opacity-80", duration: "12s", delay: "-12s" },
        { text: "स्वआगत हैं", size: "text-2xl", position: "bottom-[15%] right-[30%]", opacity: "opacity-75", duration: "15s", delay: "-13s" },

        // Tier 3 (Smaller, more numerous, adding density)
        { text: "Hoş geldiniz", size: "text-xl", position: "top-[15%] left-[25%]", opacity: "opacity-60", duration: "18s", delay: "-3s" },
        { text: "Witamy na pokładzie", size: "text-lg", position: "top-[18%] right-[18%]", opacity: "opacity-50", duration: "17s", delay: "-5s" },
        { text: "Chào mừng quý khách", size: "text-md", position: "top-[70%] left-[40%]", opacity: "opacity-70", duration: "19s", delay: "-7s" },
        { text: "ยินดีต้อนรับ", size: "text-2xl", position: "top-[75%] right-[30%]", opacity: "opacity-80", duration: "16s", delay: "-9s" },
        { text: "ברוכים הבאים", size: "text-xl", position: "bottom-[10%] left-[50%]", opacity: "opacity-65", duration: "20s", delay: "-1s" },
        { text: "Καλώς ήρθατε", size: "text-2xl", position: "bottom-[40%] left-[10%]", opacity: "opacity-75", duration: "18s", delay: "-11s" },
        { text: "Üdv a fedélzeten", size: "text-lg", position: "bottom-[45%] right-[15%]", opacity: "opacity-60", duration: "17s", delay: "-13s" },
        { text: "Tervetuloa laivaan", size: "text-md", position: "top-[5%] left-[50%]", opacity: "opacity-50", duration: "22s", delay: "-15s" },
        { text: "Vítejte na palubě", size: "text-xl", position: "bottom-[5%] right-[50%]", opacity: "opacity-70", duration: "21s", delay: "-17s" },
        { text: "Selamat datang", size: "text-2xl", position: "top-[80%] left-[15%]", opacity: "opacity-80", duration: "19s", delay: "-19s" },

        // Tier 4 (New Languages and Duplicates for Volume)
        { text: "Bine ați venit la bord", size: "text-lg", position: "top-[85%] left-[50%]", opacity: "opacity-70", duration: "20s", delay: "-20s" },
        { text: "Velkommen ombord", size: "text-xl", position: "top-[10%] right-[40%]", opacity: "opacity-60", duration: "21s", delay: "-21s" },
        { text: "Velkommen om bord", size: "text-md", position: "bottom-[10%] left-[10%]", opacity: "opacity-65", duration: "19s", delay: "-22s" },
        { text: "Karibu ndani", size: "text-lg", position: "top-[80%] right-[10%]", opacity: "opacity-75", duration: "18s", delay: "-23s" },
        { text: "Maligayang pagdating", size: "text-lg", position: "bottom-[30%] left-[25%]", opacity: "opacity-70", duration: "23s", delay: "-24s" },
        { text: "Selamat datang di kapal", size: "text-lg", position: "top-[5%] right-[10%]", opacity: "opacity-60", duration: "24s", delay: "-25s" },
        { text: "Benvinguts a bord", size: "text-md", position: "bottom-[40%] right-[30%]", opacity: "opacity-70", duration: "22s", delay: "-26s" },
        { text: "Vitajte na palube", size: "text-xl", position: "top-[50%] left-[5%]", opacity: "opacity-80", duration: "20s", delay: "-27s" },
        { text: "Dobrodošli na krovu", size: "text-md", position: "top-[65%] right-[45%]", opacity: "opacity-65", duration: "25s", delay: "-28s" },
        { text: "Velkomin um borð", size: "text-lg", position: "bottom-[15%] right-[70%]", opacity: "opacity-75", duration: "21s", delay: "-29s" },
        
        // Extra duplicates for volume and density
        { text: "Bienvenue à bord", size: "text-lg", position: "bottom-[10%] left-[30%]", opacity: "opacity-50", duration: "18s", delay: "-15s" },
        { text: "Willkommen an Bord", size: "text-md", position: "top-[15%] right-[5%]", opacity: "opacity-60", duration: "20s", delay: "-18s" },
        { text: "Welcome Aboard", size: "text-xl", position: "top-[80%] right-[40%]", opacity: "opacity-70", duration: "15s", delay: "-12s" },
        { text: "Benvenuto a bordo", size: "text-lg", position: "bottom-[25%] left-[5%]", opacity: "opacity-75", duration: "16s", delay: "-14s" },
        { text: "Vítejte na palubě", size: "text-md", position: "top-[20%] right-[70%]", opacity: "opacity-60", duration: "22s", delay: "-6s" },
        { text: "Добро пожаловать на борт", size: "text-md", position: "bottom-[50%] left-[40%]", opacity: "opacity-70", duration: "19s", delay: "-16s" },
        { text: "Bienvenido a bordo", size: "text-2xl", position: "top-[5%] left-[10%]", opacity: "opacity-70", duration: "14s", delay: "-1s" },
        { text: "Benvenuto a bordo", size: "text-xl", position: "bottom-[5%] right-[10%]", opacity: "opacity-65", duration: "17s", delay: "-3s" },
        { text: "Welkom aan boord", size: "text-lg", position: "top-[50%] right-[5%]", opacity: "opacity-70", duration: "13s", delay: "-5s" },
        { text: "歡迎登機", size: "text-2xl", position: "top-[70%] left-[10%]", opacity: "opacity-80", duration: "11s", delay: "-8s" },
        { text: "Welcome Aboard", size: "text-lg", position: "bottom-[30%] right-[10%]", opacity: "opacity-70", duration: "16s", delay: "-10s" },
        { text: "Bienvenue à bord", size: "text-xl", position: "top-[90%] left-[30%]", opacity: "opacity-85", duration: "12s", delay: "-13s" },
        { text: "Willkommen an Bord", size: "text-lg", position: "bottom-[40%] left-[50%]", opacity: "opacity-60", duration: "15s", delay: "-15s" },
        { text: "Välkommen ombord", size: "text-md", position: "top-[10%] left-[70%]", opacity: "opacity-70", duration: "18s", delay: "-17s" },
        { text: "Hoş geldiniz", size: "text-lg", position: "bottom-[60%] right-[5%]", opacity: "opacity-75", duration: "14s", delay: "-19s" },
        { text: "Καλώς ήρθατε", size: "text-xl", position: "top-[75%] left-[60%]", opacity: "opacity-80", duration: "16s", delay: "-21s" },
        { text: "Selamat datang", size: "text-lg", position: "bottom-[15%] left-[80%]", opacity: "opacity-70", duration: "19s", delay: "-23s" },
        { text: "어서 오세요", size: "text-lg", position: "top-[15%] right-[60%]", opacity: "opacity-75", duration: "13s", delay: "-25s" },
        { text: "Bem-vindo a bordo", size: "text-xl", position: "bottom-[70%] left-[5%]", opacity: "opacity-80", duration: "15s", delay: "-27s" },
        { text: "Witamy na pokładzie", size: "text-md", position: "top-[90%] right-[50%]", opacity: "opacity-60", duration: "20s", delay: "-29s" },
        { text: "ご搭乗ありがとうございます", size: "text-md", position: "bottom-[70%] right-[30%]", opacity: "opacity-70", duration: "22s", delay: "-30s" },
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
