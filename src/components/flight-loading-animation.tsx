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
        { text: "Welcome Aboard", size: "text-4xl", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%]", opacity: "opacity-100", duration: "8s", delay: "0s" },
        { text: "Bienvenido a bordo", size: "text-3xl", position: "top-1/2 left-1/2 -translate-x-[60%] -translate-y-[150%]", opacity: "opacity-90", duration: "9s", delay: "-0.5s" },
        { text: "Bem-vindo a bordo", size: "text-xl", position: "top-1/2 left-1/2 -translate-x-[50%] -translate-y-[220%]", opacity: "opacity-80", duration: "10s", delay: "-1s" },
        { text: "Bienvenue à bord", size: "text-2xl", position: "top-1/2 right-1/2 translate-x-[150%] -translate-y-[180%]", opacity: "opacity-90", duration: "9s", delay: "-1.5s" },
        { text: "Benvenuto a bordo", size: "text-lg", position: "top-1/2 right-1/2 translate-x-[180%] -translate-y-[100%]", opacity: "opacity-80", duration: "11s", delay: "-2s" },

        // Left Side
        { text: "Yolculuğa hoş geldiniz", size: "text-lg", position: "top-[30%] left-[5%]", opacity: "opacity-70", duration: "11s", delay: "-3.5s" },
        { text: "Bine aţi venit la bord", size: "text-lg", position: "top-[40%] left-[10%]", opacity: "opacity-80", duration: "9s", delay: "-2.5s" },
        { text: "ברוכים הבאים", size: "text-xl", position: "top-[65%] left-[8%]", opacity: "opacity-75", duration: "10s", delay: "-4s" },
        { text: "Välkommen", size: "text-xl", position: "bottom-[15%] left-[5%]", opacity: "opacity-60", duration: "15s", delay: "-7s" },
        { text: "Maligayang pagdating", size: "text-lg", position: "top-[70%] left-[15%]", opacity: "opacity-70", duration: "12s", delay: "-5s" },
        { text: "Добре дошли", size: "text-lg", position: "top-[20%] left-[25%]", opacity: "opacity-60", duration: "13s", delay: "-4.5s" },
        { text: "Barka da zuwa", size: "text-md", position: "top-[25%] left-[35%]", opacity: "opacity-50", duration: "14s", delay: "-5.5s" },

        // Right Side
        { text: "Vítejte na palubě", size: "text-lg", position: "top-[20%] right-[5%]", opacity: "opacity-70", duration: "11s", delay: "-2s" },
        { text: "ご搭乗ありがとうございます", size: "text-lg", position: "top-[45%] right-[8%]", opacity: "opacity-80", duration: "10s", delay: "-3s" },
        { text: "Selamat datang", size: "text-2xl", position: "top-[55%] right-[25%]", opacity: "opacity-90", duration: "8s", delay: "-4s" },
        { text: "Benvinguts a bord", size: "text-md", position: "top-[70%] right-[10%]", opacity: "opacity-70", duration: "13s", delay: "-6s" },
        { text: "स्वआगत है", size: "text-lg", position: "bottom-[25%] right-[12%]", opacity: "opacity-60", duration: "14s", delay: "-8s" },
        { text: "Croeso", size: "text-2xl", position: "bottom-[15%] right-[25%]", opacity: "opacity-90", duration: "9s", delay: "-9s" },
        
        // Center cluster
        { text: "어서 오세요", size: "text-2xl", position: "top-1/2 left-1/2 -translate-x-[150%] -translate-y-[50%]", opacity: "opacity-80", duration: "8s", delay: "-3s" },
        { text: "Fáilte romhat", size: "text-lg", position: "top-1/2 left-1/2 -translate-x-[100%] translate-y-[0%]", opacity: "opacity-70", duration: "11s", delay: "-4.2s" },
        { text: "اهلا بكم على متن الطائرة", size: "text-lg", position: "top-1/2 left-1/2 -translate-x-[120%] translate-y-[80%]", opacity: "opacity-70", duration: "11s", delay: "-6s" },
        { text: "欢迎登机", size: "text-3xl", position: "top-1/2 right-1/2 translate-x-[110%] -translate-y-[20%]", opacity: "opacity-90", duration: "9s", delay: "-1s" },
        { text: "Siyakwamukela", size: "text-lg", position: "top-[15%] left-[55%]", opacity: "opacity-70", duration: "12s", delay: "-3.8s" },
        { text: "Failte", size: "text-xl", position: "top-[10%] left-[45%]", opacity: "opacity-80", duration: "10s", delay: "-2.2s" },

        // Extra words for density
        { text: "Welkom", size: "text-lg", position: "top-[80%] left-[40%]", opacity: "opacity-60", duration: "13s", delay: "-10s" },
        { text: "Tervetuloa", size: "text-md", position: "bottom-[10%] left-[50%]", opacity: "opacity-50", duration: "15s", delay: "-12s" },
        { text: "Καλώς ήρθατε", size: "text-xl", position: "top-[85%] right-[20%]", opacity: "opacity-75", duration: "10s", delay: "-11s" },
        { text: "Üdvözöljük", size: "text-lg", position: "top-[5%] right-[30%]", opacity: "opacity-60", duration: "14s", delay: "-13s" },
        { text: "வரவேற்பு", size: "text-2xl", position: "bottom-[30%] left-[20%]", opacity: "opacity-80", duration: "9s", delay: "-14s" },
        { text: "Tere tulemast", size: "text-md", position: "top-[5%] left-[20%]", opacity: "opacity-50", duration: "16s", delay: "-15s" },
        { text: "Velkomin", size: "text-lg", position: "bottom-[5%] right-[40%]", opacity: "opacity-70", duration: "12s", delay: "-16s" },
        { text: "Ласкаво просимо", size: "text-xl", position: "top-[35%] right-[45%]", opacity: "opacity-85", duration: "10s", delay: "-17s" },
        { text: "Chào mừng", size: "text-2xl", position: "bottom-[40%] left-[30%]", opacity: "opacity-90", duration: "8s", delay: "-18s" },
        { text: "Selamat pagi", size: "text-lg", position: "top-[80%] right-[5%]", opacity: "opacity-70", duration: "13s", delay: "-19s" },
        { text: "Karibu", size: "text-2xl", position: "top-1/2 left-1/2 -translate-x-[40%] translate-y-[150%]", opacity: "opacity-80", duration: "10s", delay: "-2s" },
        { text: "Vitajte", size: "text-lg", position: "top-[60%] right-[40%]", opacity: "opacity-70", duration: "12s", delay: "-6.5s" },
        { text: "Sugeng rawuh", size: "text-md", position: "bottom-[10%] left-[10%]", opacity: "opacity-60", duration: "14s", delay: "-8.5s" },
        { text: "Maligayang pagdating", size: "text-xl", position: "top-[90%] left-[30%]", opacity: "opacity-80", duration: "9s", delay: "-3.5s" },
        { text: "ברוכים הבאים", size: "text-2xl", position: "top-[75%] left-[25%]", opacity: "opacity-85", duration: "10s", delay: "-5.5s" },
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
        <div className="flex flex-col items-center justify-center text-center py-16 w-full h-full overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
                <WelcomeAboardCloud />
            </div>
            <div className="relative z-10 bg-black/20 backdrop-blur-sm p-4 rounded-xl font-body mt-auto">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">De {from} a {to}</h2>
              <p className="text-white/80 mt-1 drop-shadow-lg">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
