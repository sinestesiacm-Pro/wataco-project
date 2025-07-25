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
        { text: "欢迎登机", size: "text-3xl", position: "top-[58%] left-1/2 -translate-x-1/2", opacity: "opacity-90", duration: "9s", delay: "-1s" },
        { text: "Karibu", size: "text-2xl", position: "top-[65%] left-1/2 -translate-x-[60%]", opacity: "opacity-80", duration: "10s", delay: "-2s" },

        // Left Side
        { text: "Bienvenido a bordo", size: "text-3xl", position: "top-[40%] left-[15%]", opacity: "opacity-90", duration: "10s", delay: "-0.5s" },
        { text: "Bem-vindo a bordo", size: "text-xl", position: "top-[48%] left-[18%]", opacity: "opacity-70", duration: "12s", delay: "-1.5s" },
        { text: "Bine aţi venit la bord", size: "text-lg", position: "top-[35%] left-[10%]", opacity: "opacity-80", duration: "9s", delay: "-2.5s" },
        { text: "Yolculuğa hoş geldiniz", size: "text-md", position: "top-[15%] left-[5%]", opacity: "opacity-70", duration: "11s", delay: "-3.5s" },
        { text: "Добре дошли", size: "text-lg", position: "top-[20%] left-[15%]", opacity: "opacity-60", duration: "13s", delay: "-4.5s" },
        { text: "Barka da zuwa", size: "text-md", position: "top-[25%] left-[20%]", opacity: "opacity-50", duration: "14s", delay: "-5.5s" },
        { text: "어서 오세요", size: "text-2xl", position: "top-[50%] left-[30%]", opacity: "opacity-80", duration: "8s", delay: "-3s" },
        { text: "ברוכים הבאים", size: "text-xl", position: "top-[65%] left-[10%]", opacity: "opacity-75", duration: "10s", delay: "-4s" },
        { text: "Maligayang pagdating", size: "text-lg", position: "top-[70%] left-[15%]", opacity: "opacity-70", duration: "12s", delay: "-5s" },
        { text: "اهلا بكم على متن الطائرة", size: "text-lg", position: "top-[58%] left-[35%]", opacity: "opacity-60", duration: "11s", delay: "-6s" },
        { text: "Välkommen", size: "text-xl", position: "bottom-[15%] left-[5%]", opacity: "opacity-50", duration: "15s", delay: "-7s" },


        // Right Side
        { text: "Bienvenue à bord", size: "text-2xl", position: "top-[30%] right-[10%]", opacity: "opacity-90", duration: "9s", delay: "-1s" },
        { text: "Vítejte na palubě", size: "text-xl", position: "top-[15%] right-[5%]", opacity: "opacity-70", duration: "11s", delay: "-2s" },
        { text: "ご搭乗ありがとうございます", size: "text-lg", position: "top-[45%] right-[8%]", opacity: "opacity-80", duration: "10s", delay: "-3s" },
        { text: "Selamat datang", size: "text-2xl", position: "top-[55%] right-[25%]", opacity: "opacity-90", duration: "8s", delay: "-4s" },
        { text: "Benvenuto a bordo", size: "text-xl", position: "top-[65%] right-[10%]", opacity: "opacity-80", duration: "12s", delay: "-5s" },
        { text: "Benvinguts a bord", size: "text-lg", position: "top-[72%] right-[15%]", opacity: "opacity-70", duration: "13s", delay: "-6s" },
        { text: "Tervetuloa", size: "text-xl", position: "bottom-[20%] right-[5%]", opacity: "opacity-80", duration: "10s", delay: "-7s" },
        { text: "स्वआगत हैं", size: "text-lg", position: "bottom-[15%] right-[15%]", opacity: "opacity-60", duration: "14s", delay: "-8s" },
        { text: "Croeso", size: "text-2xl", position: "bottom-[10%] right-[25%]", opacity: "opacity-90", duration: "9s", delay: "-9s" },

        // Top
        { text: "Failte", size: "text-xl", position: "top-[10%] left-[45%]", opacity: "opacity-80", duration: "10s", delay: "-2.2s" },
        { text: "Siyakwamukela", size: "text-lg", position: "top-[15%] left-[50%]", opacity: "opacity-70", duration: "12s", delay: "-3.8s" },
        { text: "Fáilte romhat", size: "text-lg", position: "top-[45%] left-[40%]", opacity: "opacity-70", duration: "11s", delay: "-4.2s" },
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
