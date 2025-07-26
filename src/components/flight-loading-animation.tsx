'use client';

import { Plane } from "lucide-react";
import React from 'react';
import { cn } from "@/lib/utils";

interface FlightLoadingAnimationProps {
    originName: string;
    destinationName: string;
}

const WelcomeAboardCloud = () => {
    // A large, deliberately positioned array to create a dense, full-screen word cloud.
    // Positions are in percentages to be responsive.
    const words = [
        { text: "Welcome", size: "text-4xl", opacity: "opacity-100", top: '45%', left: '50%', transform: 'translate(-50%, -50%)' },
        { text: "Bienvenido", size: "text-3xl", opacity: "opacity-95", top: '35%', left: '30%' },
        { text: "Bienvenue", size: "text-3xl", opacity: "opacity-90", top: '55%', left: '70%' },
        { text: "Willkommen", size: "text-2xl", opacity: "opacity-85", top: '20%', left: '10%' },
        { text: "Benvenuto", size: "text-2xl", opacity: "opacity-80", top: '70%', left: '25%' },
        { text: "Bem-vindo", size: "text-xl", opacity: "opacity-75", top: '15%', left: '80%' },
        { text: "Välkommen", size: "text-lg", opacity: "opacity-70", top: '85%', left: '5%' },
        { text: "Karibu", size: "text-2xl", opacity: "opacity-85", top: '5%', left: '30%' },
        { text: "어서 오세요", size: "text-3xl", opacity: "opacity-90", top: '60%', left: '5%' },
        { text: "ようこそ", size: "text-xl", opacity: "opacity-80", top: '90%', left: '85%' },
        { text: "歡迎", size: "text-3xl", opacity: "opacity-85", top: '10%', left: '55%' },
        { text: "Selamat datang", size: "text-lg", opacity: "opacity-75", top: '80%', left: '60%' },
        { text: "Fáilte", size: "text-2xl", opacity: "opacity-90", top: '25%', left: '45%' },
        { text: "Witamy", size: "text-xl", opacity: "opacity-80", top: '75%', left: '90%' },
        { text: "Hoş geldiniz", size: "text-2xl", opacity: "opacity-85", top: '40%', left: '90%' },
        { text: "Καλώς ήρθατε", size: "text-lg", opacity: "opacity-70", top: '5%', left: '5%' },
        { text: "Ласкаво просимо", size: "text-xl", opacity: "opacity-85", top: '95%', left: '50%', transform: 'translateX(-50%)' },
        { text: "Добро пожаловать", size: "text-2xl", opacity: "opacity-90", top: '50%', left: '15%' },
        { text: "أهلاً بك", size: "text-4xl", opacity: "opacity-95", top: '30%', left: '75%' },
        { text: "Siyakwamukela", size: "text-lg", opacity: "opacity-70", top: '88%', left: '30%' },
        { text: "Vítejte", size: "text-xl", opacity: "opacity-80", top: '65%', left: '40%' },
        { text: "Tervetuloa", size: "text-2xl", opacity: "opacity-85", top: '15%', left: '35%' },
        { text: "स्वआगत है", size: "text-3xl", opacity: "opacity-90", top: '80%', left: '75%' },
        { text: "Maligayang pagdating", size: "text-lg", opacity: "opacity-75", top: '68%', left: '65%' },
        { text: "Failte", size: "text-xl", opacity: "opacity-80", top: '5%', left: '85%' },
        { text: "Croeso", size: "text-2xl", opacity: "opacity-85", top: '92%', left: '15%' },
        { text: "Üdvözöljük", size: "text-lg", opacity: "opacity-70", top: '38%', left: '5%' },
        { text: "Barka da zuwa", size: "text-xl", opacity: "opacity-75", top: '58%', left: '85%' },
        { text: "Bine aţi venit", size: "text-lg", opacity: "opacity-70", top: '28%', left: '95%' },
        { text: "Velkomin", size: "text-xl", opacity: "opacity-80", top: '78%', left: '15%' },
        { text: "Sugeng rawuh", size: "text-lg", opacity: "opacity-75", top: '10%', left: '20%' },
        { text: "ברוכים הבאים", size: "text-3xl", opacity: "opacity-95", top: '85%', left: '45%' },
        { text: "வரவேற்பு", size: "text-2xl", opacity: "opacity-85", top: '35%', left: '55%' },
        { text: "Dobrodošli", size: "text-xl", opacity: "opacity-80", top: '60%', left: '50%' },
        { text: "Sveiki atvykę", size: "text-lg", opacity: "opacity-70", top: '95%', left: '75%' },
        { text: "Tere tulemast", size: "text-xl", opacity: "opacity-80", top: '2%', left: '70%' },
        { text: "Welkom", size: "text-2xl", opacity: "opacity-85", top: '70%', left: '5%' },
        { text: "Chào mừng", size: "text-lg", opacity: "opacity-75", top: '5%', left: '45%' },
        { text: "Benvinguts", size: "text-xl", opacity: "opacity-80", top: '90%', left: '30%' },
        { text: "Vitajte", size: "text-lg", opacity: "opacity-70", top: '25%', left: '25%' },
    ];

    return (
        <div className="relative w-full h-full">
            {words.map((word, index) => (
                <span
                    key={index}
                    className={cn(
                        "animate-zoom-fade whitespace-nowrap drop-shadow-lg absolute text-white",
                        word.size,
                        word.opacity
                    )}
                    style={{
                        top: word.top,
                        left: word.left,
                        right: word.right,
                        bottom: word.bottom,
                        transform: word.transform,
                        animationDuration: `${Math.random() * 5 + 8}s`,
                        animationDelay: `${Math.random() * -5}s`,
                    } as React.CSSProperties}
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
            <div className="relative w-full flex-grow flex items-center justify-center">
                <WelcomeAboardCloud />
            </div>
            <div className="relative z-10 bg-black/20 backdrop-blur-sm p-4 rounded-xl font-body mt-auto mb-4">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">De {from} a {to}</h2>
              <p className="text-white/80 mt-1 drop-shadow-lg">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
