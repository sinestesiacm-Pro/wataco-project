'use client';

import { Plane } from "lucide-react";

interface FlightLoadingAnimationProps {
    originName: string;
    destinationName: string;
}

const WelcomeAboardCloud = () => {
    const words = [
        { text: "Welcome Aboard", size: "text-4xl", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", opacity: "opacity-100" },
        { text: "Bienvenido a bordo", size: "text-2xl", position: "top-1/3 left-1/4", opacity: "opacity-80" },
        { text: "Willkommen an Bord", size: "text-xl", position: "top-2/3 left-1/2 -translate-x-3/4", opacity: "opacity-70" },
        { text: "Bienvenue à bord", size: "text-3xl", position: "top-1/4 right-1/4", opacity: "opacity-90" },
        { text: "Benvenuto a bordo", size: "text-lg", position: "top-1/2 right-1/4 translate-x-1/4", opacity: "opacity-60" },
        { text: "Bem-vindo a bordo", size: "text-2xl", position: "bottom-1/4 left-1/4", opacity: "opacity-80" },
        { text: "ご搭乗ありがとうございます", size: "text-xl", position: "bottom-1/3 right-1/4", opacity: "opacity-70" },
        { text: "Добро пожаловать на борт", size: "text-lg", position: "top-1/4 left-1/2 -translate-x-1/2", opacity: "opacity-60" },
        { text: "欢迎登机", size: "text-3xl", position: "bottom-1/4 right-1/2", opacity: "opacity-90" },
    ];

    return (
        <div className="relative w-full h-52 text-white font-headline">
            {words.map((word, index) => (
                <span
                    key={index}
                    className={`absolute whitespace-nowrap ${word.size} ${word.position} ${word.opacity}`}
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
            <div>
              <h2 className="text-2xl font-bold font-headline text-white drop-shadow-lg">De {from} a {to}</h2>
              <p className="text-white/80 mt-1 drop-shadow-lg">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
