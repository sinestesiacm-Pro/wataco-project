'use client';

import { Plane } from "lucide-react";
import React from 'react';
import { cn } from "@/lib/utils";

const WelcomeAboardCloud = () => {
    const words = [
        // Core phrases (larger, more central)
        { text: "Welcome Aboard", size: "text-4xl", opacity: "opacity-100", top: '45%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: '700' },
        { text: "Bienvenido a bordo", size: "text-3xl", opacity: "opacity-95", top: '35%', left: '30%', fontWeight: '600' },
        { text: "Bienvenue à bord", size: "text-3xl", opacity: "opacity-90", top: '55%', left: '70%', fontWeight: '600' },
        
        // Increased density phrases (original set)
        { text: "Willkommen an Bord", size: "text-2xl", opacity: "opacity-85", top: '20%', left: '10%', fontWeight: '500' },
        { text: "Benvenuto a bordo", size: "text-2xl", opacity: "opacity-80", top: '70%', left: '25%', fontWeight: '500' },
        { text: "Bem-vindo a bordo", size: "text-xl", opacity: "opacity-75", top: '15%', left: '80%', fontWeight: '400' },
        { text: "Välkommen ombord", size: "text-lg", opacity: "opacity-70", top: '85%', left: '5%', fontWeight: '400' },
        { text: "Karibu", size: "text-2xl", opacity: "opacity-85", top: '5%', left: '30%', fontWeight: '600' },
        { text: "어서 오세요", size: "text-3xl", opacity: "opacity-90", top: '60%', left: '5%', fontWeight: '600' },
        { text: "ようこそ", size: "text-xl", opacity: "opacity-80", top: '90%', left: '85%', fontWeight: '500' },
        { text: "歡迎光臨", size: "text-3xl", opacity: "opacity-85", top: '10%', left: '55%', fontWeight: '600' },
        { text: "Selamat datang", size: "text-lg", opacity: "opacity-75", top: '80%', left: '60%', fontWeight: '400' },
        { text: "Fáilte ar bord", size: "text-2xl", opacity: "opacity-90", top: '25%', left: '45%', fontWeight: '500' },
        { text: "Witamy na pokładzie", size: "text-xl", opacity: "opacity-80", top: '75%', left: '90%', fontWeight: '400' },
        { text: "Hoş geldiniz", size: "text-2xl", opacity: "opacity-85", top: '40%', left: '90%', fontWeight: '500' },
        { text: "Καλώς ήρθατε", size: "text-lg", opacity: "opacity-70", top: '5%', left: '5%', fontWeight: '400' },
        { text: "Ласкаво просимо", size: "text-xl", opacity: "opacity-85", top: '95%', left: '50%', transform: 'translateX(-50%)', fontWeight: '500' },
        { text: "Добро пожаловать", size: "text-2xl", opacity: "opacity-90", top: '50%', left: '15%', fontWeight: '600' },
        { text: "أهلاً بك على متن الطائرة", size: "text-4xl", opacity: "opacity-95", top: '30%', left: '75%', fontWeight: '700', direction: 'rtl' },
        { text: "Siyakwamukela", size: "text-lg", opacity: "opacity-70", top: '88%', left: '30%', fontWeight: '400' },
        { text: "Vítejte na palubě", size: "text-xl", opacity: "opacity-80", top: '65%', left: '40%', fontWeight: '500' },
        { text: "Tervetuloa", size: "text-2xl", opacity: "opacity-85", top: '15%', left: '35%', fontWeight: '500' },
        { text: "स्वआगत है", size: "text-3xl", opacity: "opacity-90", top: '80%', left: '75%', fontWeight: '600' },
        { text: "Maligayang pagdating", size: "text-lg", opacity: "opacity-75", top: '68%', left: '65%', fontWeight: '400' },
        { text: "Failte", size: "text-xl", opacity: "opacity-80", top: '5%', left: '85%', fontWeight: '500' },
        { text: "Croeso ar fwrdd", size: "text-2xl", opacity: "opacity-85", top: '92%', left: '15%', fontWeight: '500' },
        { text: "Üdvözöljük a fedélzeten", size: "text-lg", opacity: "opacity-70", top: '38%', left: '5%', fontWeight: '400' },
        { text: "Barka da zuwa", size: "text-xl", opacity: "opacity-75", top: '58%', left: '85%', fontWeight: '400' },
        { text: "Bine aţi venit", size: "text-lg", opacity: "opacity-70", top: '28%', left: '95%', fontWeight: '400' },
        { text: "Velkomin", size: "text-xl", opacity: "opacity-80", top: '78%', left: '15%', fontWeight: '500' },
        { text: "Sugeng rawuh", size: "text-lg", opacity: "opacity-75", top: '10%', left: '20%', fontWeight: '400' },
        { text: "ברוכים הבאים", size: "text-3xl", opacity: "opacity-95", top: '85%', left: '45%', fontWeight: '600', direction: 'rtl' },
        { text: "வரவேற்பு", size: "text-2xl", opacity: "opacity-85", top: '35%', left: '55%', fontWeight: '500' },
        { text: "Dobrodošli", size: "text-xl", opacity: "opacity-80", top: '60%', left: '50%', fontWeight: '500' },
        { text: "Sveiki atvykę", size: "text-lg", opacity: "opacity-70", top: '95%', left: '75%', fontWeight: '400' },
        { text: "Tere tulemast", size: "text-2xl", opacity: "opacity-80", top: '2%', left: '70%', fontWeight: '500' },
        { text: "Welkom aan boord", size: "text-2xl", opacity: "opacity-85", top: '70%', left: '5%', fontWeight: '500' },
        { text: "Chào mừng", size: "text-lg", opacity: "opacity-75", top: '5%', left: '45%', fontWeight: '400' },
        { text: "Benvinguts a bord", size: "text-xl", opacity: "opacity-80", top: '90%', left: '30%', fontWeight: '500' },
        { text: "Vitajte", size: "text-lg", opacity: "opacity-70", top: '25%', left: '25%', fontWeight: '400' },
        { text: "Onthaal aan boord", size: "text-xl", opacity: "opacity-70", top: '50%', left: '80%', fontWeight: '400' },
        { text: "Velkommen", size: "text-2xl", opacity: "opacity-80", top: '5%', left: '15%', fontWeight: '500' },
        { text: "Mire se vini", size: "text-lg", opacity: "opacity-70", top: '95%', left: '10%', fontWeight: '400' },
        { text: "ברוך הבא", size: "text-2xl", opacity: "opacity-80", top: '15%', left: '5%', fontWeight: '500', direction: 'rtl' },
        { text: "Ongi etorri", size: "text-xl", opacity: "opacity-75", top: '85%', left: '95%', fontWeight: '400' },
        { text: "Добре дошли", size: "text-2xl", opacity: "opacity-85", top: '75%', left: '50%', fontWeight: '500' },
        { text: "Benvido a bordo", size: "text-lg", opacity: "opacity-70", top: '55%', left: '10%', fontWeight: '400' },
        { text: "Välkommen", size: "text-2xl", opacity: "opacity-80", top: '48%', left: '25%', fontWeight: '500' },
        { text: "Tere tulemast pardale", size: "text-lg", opacity: "opacity-70", top: '25%', left: '85%', fontWeight: '400' },
        { text: "Maligayang pagdating sa board", size: "text-xl", opacity: "opacity-75", top: '65%', left: '20%', fontWeight: '400' },
        { text: "Tervetuloa alukseen", size: "text-lg", opacity: "opacity-70", top: '70%', left: '80%', fontWeight: '400' },
        { text: "Soo dhawow", size: "text-2xl", opacity: "opacity-85", top: '85%', left: '20%', fontWeight: '500' },
        { text: "Selamat di kapal", size: "text-lg", opacity: "opacity-70", top: '10%', left: '90%', fontWeight: '400' },
        { text: "ברוכים הבאים לעלות", size: "text-2xl", opacity: "opacity-80", top: '90%', left: '60%', fontWeight: '500', direction: 'rtl' },
        { text: "Siyakwamukela ebhodini", size: "text-lg", opacity: "opacity-70", top: '35%', left: '10%', fontWeight: '400' },
        { text: "Dobrodošli na krovu", size: "text-xl", opacity: "opacity-75", top: '5%', left: '65%', fontWeight: '400' },
        { text: "Üdv a fedélzeten", size: "text-lg", opacity: "opacity-70", top: '80%', left: '40%', fontWeight: '400' },
        { text: "Vitajte na palube", size: "text-xl", opacity: "opacity-75", top: '50%', left: '40%', fontWeight: '400' },
        { text: "Mire se erdhët në bord", size: "text-lg", opacity: "opacity-70", top: '20%', left: '60%', fontWeight: '400' },

        // Extra elements for more density (doubled)
        { text: "Bem-vindo a bordo", size: "text-2xl", opacity: "opacity-80", top: '5%', left: '50%', fontWeight: '500' },
        { text: "Vítejte na palubě", size: "text-lg", opacity: "opacity-70", top: '12%', left: '15%', fontWeight: '400' },
        { text: "Welcome Aboard", size: "text-xl", opacity: "opacity-75", top: '18%', left: '70%', fontWeight: '600' },
        { text: "Benvenuto a bordo", size: "text-3xl", opacity: "opacity-90", top: '28%', left: '20%', fontWeight: '700' },
        { text: "Добро пожаловать", size: "text-lg", opacity: "opacity-60", top: '42%', left: '65%', fontWeight: '400' },
        { text: "Fáilte ar bord", size: "text-xl", opacity: "opacity-80", top: '50%', left: '90%', fontWeight: '500' },
        { text: "ようこそ", size: "text-2xl", opacity: "opacity-85", top: '62%', left: '30%', fontWeight: '600' },
        { text: "Hoş geldiniz", size: "text-lg", opacity: "opacity-70", top: '75%', left: '10%', fontWeight: '400' },
        { text: "أهلاً بك على متن الطائرة", size: "text-3xl", opacity: "opacity-95", top: '85%', left: '80%', fontWeight: '700', direction: 'rtl' },
        { text: "Karibu", size: "text-xl", opacity: "opacity-80", top: '95%', left: '20%', fontWeight: '500' },
        { text: "Willkommen an Bord", size: "text-lg", opacity: "opacity-70", top: '2%', left: '80%', fontWeight: '400' },
        { text: "Chào mừng", size: "text-2xl", opacity: "opacity-90", top: '8%', left: '40%', fontWeight: '600' },
        { text: "Tere tulemast", size: "text-xl", opacity: "opacity-75", top: '22%', left: '90%', fontWeight: '500' },
        { text: "Barka da zuwa", size: "text-lg", opacity: "opacity-65", top: '33%', left: '45%', fontWeight: '400' },
        { text: "Mire se vini", size: "text-2xl", opacity: "opacity-85", top: '48%', left: '5%', fontWeight: '600' },
        { text: "ברוכים הבאים", size: "text-xl", opacity: "opacity-80", top: '58%', left: '55%', fontWeight: '500', direction: 'rtl' },
        { text: "Sveiki atvykę", size: "text-lg", opacity: "opacity-70", top: '68%', left: '80%', fontWeight: '400' },
        { text: "Tervetuloa", size: "text-3xl", opacity: "opacity-95", top: '82%', left: '35%', fontWeight: '700' },
        { text: "Ласкаво просимо", size: "text-xl", opacity: "opacity-80", top: '92%', left: '65%', fontWeight: '500' },
        { text: "Benvinguts a bord", size: "text-lg", opacity: "opacity-70", top: '15%', left: '25%', fontWeight: '400' },
        { text: "Onthaal aan boord", size: "text-2xl", opacity: "opacity-85", top: '25%', left: '75%', fontWeight: '600' },
        { text: "Dobrodošli", size: "text-xl", opacity: "opacity-80", top: '38%', left: '85%', fontWeight: '500' },
        { text: "Vitajte", size: "text-lg", opacity: "opacity-70", top: '52%', left: '20%', fontWeight: '400' },
        { text: "Siyakwamukela", size: "text-2xl", opacity: "opacity-90", top: '65%', left: '95%', fontWeight: '600' },
        { text: "Welkom aan boord", size: "text-xl", opacity: "opacity-80", top: '78%', left: '20%', fontWeight: '500' },
        { text: "Välkommen ombord", size: "text-lg", opacity: "opacity-70", top: '88%', left: '55%', fontWeight: '400' },
        { text: "Mire se erdhët në bord", size: "text-2xl", opacity: "opacity-85", top: '98%', left: '80%', fontWeight: '600' },
        { text: "Sugeng rawuh", size: "text-lg", opacity: "opacity-70", top: '3%', left: '10%', fontWeight: '400' },
        { text: "Velkommen", size: "text-xl", opacity: "opacity-80", top: '10%', left: '95%', fontWeight: '500' },
        { text: "Καλώς ήρθατε", size: "text-2xl", opacity: "opacity-90", top: '20%', left: '50%', fontWeight: '600' },
        { text: "स्वआगत है", size: "text-lg", opacity: "opacity-70", top: '30%', left: '5%', fontWeight: '400' },
        { text: "Maligayang pagdating", size: "text-xl", opacity: "opacity-80", top: '40%', left: '30%', fontWeight: '500' },
        { text: "Добре дошли", size: "text-2xl", opacity: "opacity-85", top: '60%', left: '70%', fontWeight: '600' },
        { text: "வரவேற்பு", size: "text-lg", opacity: "opacity-70", top: '70%', left: '90%', fontWeight: '400' },
        { text: "Witamy na pokładzie", size: "text-xl", opacity: "opacity-80", top: '80%', left: '5%', fontWeight: '500' },
        { text: "Üdv a fedélzeten", size: "text-2xl", opacity: "opacity-85", top: '90%', left: '40%', fontWeight: '600' },
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
                        fontWeight: word.fontWeight,
                        direction: word.direction as any,
                        animationDuration: `${Math.random() * 40 + 20}s`,
                        animationDelay: `${Math.random() * -40}s`,
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
