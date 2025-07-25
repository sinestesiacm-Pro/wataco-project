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

        // More languages, better distribution
        { text: "Bienvenido a bordo", size: "text-3xl", position: "top-[45%] left-[10%]", opacity: "opacity-80", duration: "10s", delay: "-1s" },
        { text: "Bienvenue à bord", size: "text-2xl", position: "top-[30%] right-[8%]", opacity: "opacity-90", duration: "9s", delay: "-0.5s" },
        { text: "Willkommen an Bord", size: "text-2xl", position: "top-[20%] left-[35%]", opacity: "opacity-70", duration: "11s", delay: "-2s" },
        { text: "欢迎登机", size: "text-3xl", position: "bottom-[25%] right-[40%]", opacity: "opacity-90", duration: "8s", delay: "-3s" },
        { text: "Benvenuto a bordo", size: "text-xl", position: "top-[68%] right-[15%]", opacity: "opacity-60", duration: "13s", delay: "-2.5s" },
        { text: "Bem-vindo a bordo", size: "text-lg", position: "bottom-[35%] left-[8%]", opacity: "opacity-70", duration: "12s", delay: "-4s" },
        { text: "어서 오세요", size: "text-xl", position: "top-[35%] left-[30%]", opacity: "opacity-75", duration: "10s", delay: "-5s" },
        { text: "ご搭乗ありがとうございます", size: "text-lg", position: "top-[40%] right-[20%]", opacity: "opacity-70", duration: "14s", delay: "-6s" },
        { text: "Добро пожаловать на борт", size: "text-lg", position: "top-[15%] left-[55%]", opacity: "opacity-60", duration: "9s", delay: "-7s" },
        { text: "Welkom aan boord", size: "text-md", position: "top-[60%] left-[58%]", opacity: "opacity-65", duration: "11s", delay: "-8s" },
        { text: "Välkommen ombord", size: "text-lg", position: "bottom-[45%] right-[55%]", opacity: "opacity-70", duration: "12s", delay: "-9s" },
        { text: "أهلاً بكم على متن الطائرة", size: "text-xl", position: "bottom-[18%] left-[38%]", opacity: "opacity-80", duration: "10s", delay: "-10s" },
        { text: "स्वआगत हैं", size: "text-2xl", position: "bottom-[15%] right-[10%]", opacity: "opacity-75", duration: "13s", delay: "-11s" },
        { text: "Yolculuğa hoş geldiniz", size: "text-lg", position: "top-[8%] left-[8%]", opacity: "opacity-65", duration: "15s", delay: "-3.5s" },
        { text: "Karibu", size: "text-2xl", position: "top-[80%] left-[55%]", opacity: "opacity-70", duration: "10s", delay: "-4.5s" },
        { text: "ברוכים הבאים", size: "text-xl", position: "top-[78%] left-[25%]", opacity: "opacity-75", duration: "12s", delay: "-5.5s" },
        { text: "ยินดีต้อนรับ", size: "text-2xl", position: "top-[60%] right-[40%]", opacity: "opacity-80", duration: "9s", delay: "-6.5s" },
        { text: "Velkommen", size: "text-xl", position: "bottom-[8%] left-[5%]", opacity: "opacity-70", duration: "11s", delay: "-7.5s" },
        { text: "Καλώς ήρθατε", size: "text-lg", position: "top-[10%] right-[25%]", opacity: "opacity-60", duration: "14s", delay: "-12s" },
        { text: "Fáilte romhat", size: "text-xl", position: "bottom-[40%] left-[45%]", opacity: "opacity-70", duration: "10s", delay: "-13s" },
        { text: "Selamat datang", size: "text-2xl", position: "top-[75%] right-[30%]", opacity: "opacity-80", duration: "11s", delay: "-14s" },
        { text: "Tervetuloa", size: "text-lg", position: "bottom-[20%] right-[5%]", opacity: "opacity-75", duration: "12s", delay: "-15s" },
        { text: "Vítejte na palubě", size: "text-xl", position: "top-[5%] right-[5%]", opacity: "opacity-65", duration: "10s", delay: "-16s" },
        { text: "Bine ați venit la bord", size: "text-lg", position: "bottom-[55%] left-[5%]", opacity: "opacity-70", duration: "13s", delay: "-17s" },
        { text: "Maligayang pagdating", size: "text-xl", position: "bottom-[10%] left-[20%]", opacity: "opacity-80", duration: "9s", delay: "-18s" },
        
        // Added more languages for density
        { text: "Siyakwamukela", size: "text-lg", position: "top-[8%] right-[45%]", opacity: "opacity-60", duration: "15s", delay: "-19s" },
        { text: "Ласкаво просимо", size: "text-xl", position: "bottom-[8%] right-[70%]", opacity: "opacity-75", duration: "11s", delay: "-20s" },
        { text: "Tere tulemast", size: "text-md", position: "top-[55%] left-[20%]", opacity: "opacity-65", duration: "13s", delay: "-21s" },
        { text: "Croeso", size: "text-2xl", position: "top-[90%] right-[10%]", opacity: "opacity-80", duration: "10s", delay: "-22s" },
        { text: "Mire se vini", size: "text-lg", position: "bottom-[60%] right-[10%]", opacity: "opacity-70", duration: "12s", delay: "-23s" },
        { text: "Добре дошли", size: "text-xl", position: "top-[15%] left-[15%]", opacity: "opacity-75", duration: "11s", delay: "-24s" },
        { text: "Üdvözöljük", size: "text-lg", position: "bottom-[90%] left-[50%]", opacity: "opacity-65", duration: "14s", delay: "-25s" },
        { text: "Benvinguts a bord", size: "text-md", position: "top-[88%] left-[75%]", opacity: "opacity-70", duration: "10s", delay: "-26s" },
        { text: "Barka da zuwa", size: "text-xl", position: "bottom-[70%] right-[80%]", opacity: "opacity-80", duration: "9s", delay: "-27s" },
        { text: "Failte", size: "text-2xl", position: "top-[5%][85%]", opacity: "opacity-75", duration: "12s", delay: "-28s" },
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
