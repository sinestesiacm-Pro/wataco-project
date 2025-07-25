'use client';

import { Plane } from "lucide-react";

interface FlightLoadingAnimationProps {
    originName: string;
    destinationName: string;
}

const WelcomeAboardCloud = () => {
    const words = [
        // Center
        { text: "Welcome Aboard", size: "text-4xl", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", opacity: "opacity-100" },
        
        // Left side
        { text: "Bienvenido a bordo", size: "text-2xl", position: "top-[45%] left-[20%]", opacity: "opacity-80" },
        { text: "Bem-vindo a bordo", size: "text-lg", position: "top-[60%] left-[25%]", opacity: "opacity-70" },
        { text: "어서 오세요", size: "text-xl", position: "top-[30%] left-[30%]", opacity: "opacity-75" },

        // Right side
        { text: "Bienvenue à bord", size: "text-3xl", position: "top-[40%] right-[15%]", opacity: "opacity-90" },
        { text: "Benvenuto a bordo", size: "text-md", position: "top-[58%] right-[22%]", opacity: "opacity-60" },
        { text: "ご搭乗ありがとうございます", size: "text-lg", position: "top-[30%] right-[25%]", opacity: "opacity-70" },

        // Top side
        { text: "Willkommen an Bord", size: "text-xl", position: "top-[25%] left-[45%]", opacity: "opacity-70" },
        { text: "Добро пожаловать на борт", size: "text-lg", position: "top-[20%] left-[55%]", opacity: "opacity-60" },
        { text: "Welkom aan boord", size: "text-md", position: "top-[35%] left-[50%]", opacity: "opacity-65" },
        
        // Bottom side
        { text: "欢迎登机", size: "text-3xl", position: "bottom-[25%] right-[45%]", opacity: "opacity-90" },
        { text: "Välkommen ombord", size: "text-lg", position: "bottom-[35%] right-[55%]", opacity: "opacity-70" },
        { text: "أهلاً بكم على متن الطائرة", size: "text-xl", position: "bottom-[20%] left-[40%]", opacity: "opacity-80" },
        { text: "स्वआगत हैं", size: "text-2xl", position: "bottom-[15%] right-[30%]", opacity: "opacity-75" },
    ];

    return (
        <div className="relative w-full h-52 text-white font-headline">
            {words.map((word, index) => (
                <span
                    key={index}
                    className={`absolute whitespace-nowrap ${word.size} ${word.position} ${word.opacity} drop-shadow-lg`}
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
