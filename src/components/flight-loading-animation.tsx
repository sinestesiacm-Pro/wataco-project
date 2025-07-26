'use client';

import { Plane } from "lucide-react";
import React from 'react';
import { cn } from "@/lib/utils";

interface FlightLoadingAnimationProps {
    originName: string;
    destinationName: string;
}

const WelcomeAboardCloud = () => {
    const words = [
        // Core phrases
        { text: "Welcome Aboard", size: "text-4xl", opacity: "opacity-100", top: '45%', left: '50%', transform: 'translate(-50%, -50%)' },
        { text: "Bienvenido a bordo", size: "text-3xl", opacity: "opacity-95", top: '35%', left: '30%' },
        { text: "Bienvenue à bord", size: "text-3xl", opacity: "opacity-90", top: '55%', left: '70%' },
        
        // Increased density phrases (x3)
        { text: "Willkommen an Bord", size: "text-2xl", opacity: "opacity-85", top: '20%', left: '10%' },
        { text: "Benvenuto a bordo", size: "text-2xl", opacity: "opacity-80", top: '70%', left: '25%' },
        { text: "Bem-vindo a bordo", size: "text-xl", opacity: "opacity-75", top: '15%', left: '80%' },
        { text: "Välkommen ombord", size: "text-lg", opacity: "opacity-70", top: '85%', left: '5%' },
        { text: "Karibu", size: "text-2xl", opacity: "opacity-85", top: '5%', left: '30%' },
        { text: "어서 오세요", size: "text-3xl", opacity: "opacity-90", top: '60%', left: '5%' },
        { text: "ようこそ", size: "text-xl", opacity: "opacity-80", top: '90%', left: '85%' },
        { text: "歡迎光臨", size: "text-3xl", opacity: "opacity-85", top: '10%', left: '55%' },
        { text: "Selamat datang", size: "text-lg", opacity: "opacity-75", top: '80%', left: '60%' },
        { text: "Fáilte ar bord", size: "text-2xl", opacity: "opacity-90", top: '25%', left: '45%' },
        { text: "Witamy na pokładzie", size: "text-xl", opacity: "opacity-80", top: '75%', left: '90%' },
        { text: "Hoş geldiniz", size: "text-2xl", opacity: "opacity-85", top: '40%', left: '90%' },
        { text: "Καλώς ήρθατε", size: "text-lg", opacity: "opacity-70", top: '5%', left: '5%' },
        { text: "Ласкаво просимо", size: "text-xl", opacity: "opacity-85", top: '95%', left: '50%', transform: 'translateX(-50%)' },
        { text: "Добро пожаловать", size: "text-2xl", opacity: "opacity-90", top: '50%', left: '15%' },
        { text: "أهلاً بك على متن الطائرة", size: "text-4xl", opacity: "opacity-95", top: '30%', left: '75%' },
        { text: "Siyakwamukela", size: "text-lg", opacity: "opacity-70", top: '88%', left: '30%' },
        { text: "Vítejte na palubě", size: "text-xl", opacity: "opacity-80", top: '65%', left: '40%' },
        { text: "Tervetuloa", size: "text-2xl", opacity: "opacity-85", top: '15%', left: '35%' },
        { text: "स्वआगत है", size: "text-3xl", opacity: "opacity-90", top: '80%', left: '75%' },
        { text: "Maligayang pagdating", size: "text-lg", opacity: "opacity-75", top: '68%', left: '65%' },
        { text: "Failte", size: "text-xl", opacity: "opacity-80", top: '5%', left: '85%' },
        { text: "Croeso ar fwrdd", size: "text-2xl", opacity: "opacity-85", top: '92%', left: '15%' },
        { text: "Üdvözöljük a fedélzeten", size: "text-lg", opacity: "opacity-70", top: '38%', left: '5%' },
        { text: "Barka da zuwa", size: "text-xl", opacity: "opacity-75", top: '58%', left: '85%' },
        { text: "Bine aţi venit", size: "text-lg", opacity: "opacity-70", top: '28%', left: '95%' },
        { text: "Velkomin", size: "text-xl", opacity: "opacity-80", top: '78%', left: '15%' },
        { text: "Sugeng rawuh", size: "text-lg", opacity: "opacity-75", top: '10%', left: '20%' },
        { text: "ברוכים הבאים", size: "text-3xl", opacity: "opacity-95", top: '85%', left: '45%' },
        { text: "வரவேற்பு", size: "text-2xl", opacity: "opacity-85", top: '35%', left: '55%' },
        { text: "Dobrodošli", size: "text-xl", opacity: "opacity-80", top: '60%', left: '50%' },
        { text: "Sveiki atvykę", size: "text-lg", opacity: "opacity-70", top: '95%', left: '75%' },
        { text: "Tere tulemast", size: "text-xl", opacity: "opacity-80", top: '2%', left: '70%' },
        { text: "Welkom aan boord", size: "text-2xl", opacity: "opacity-85", top: '70%', left: '5%' },
        { text: "Chào mừng", size: "text-lg", opacity: "opacity-75", top: '5%', left: '45%' },
        { text: "Benvinguts a bord", size: "text-xl", opacity: "opacity-80", top: '90%', left: '30%' },
        { text: "Vitajte", size: "text-lg", opacity: "opacity-70", top: '25%', left: '25%' },
        // Filling gaps with more phrases
        { text: "Onthaal aan boord", size: "text-xl", opacity: "opacity-70", top: '50%', left: '80%' },
        { text: "Velkommen", size: "text-2xl", opacity: "opacity-80", top: '5%', left: '15%' },
        { text: "Mire se vini", size: "text-lg", opacity: "opacity-70", top: '95%', left: '10%' },
        { text: "ברוך הבא", size: "text-2xl", opacity: "opacity-80", top: '15%', left: '5%' },
        { text: "Ongi etorri", size: "text-xl", opacity: "opacity-75", top: '85%', left: '95%' },
        { text: "Добре дошли", size: "text-2xl", opacity: "opacity-85", top: '75%', left: '50%' },
        { text: "Benvido a bordo", size: "text-lg", opacity: "opacity-70", top: '55%', left: '10%' },
        { text: "Välkommen", size: "text-2xl", opacity: "opacity-80", top: '48%', left: '25%' },
        { text: "Tere tulemast pardale", size: "text-lg", opacity: "opacity-70", top: '25%', left: '85%' },
        { text: "Maligayang pagdating sa board", size: "text-xl", opacity: "opacity-75", top: '65%', left: '20%' },
        { text: "Tervetuloa alukseen", size: "text-lg", opacity: "opacity-70", top: '70%', left: '80%' },
        { text: "Soo dhawow", size: "text-2xl", opacity: "opacity-85", top: '85%', left: '20%' },
        { text: "Selamat di kapal", size: "text-lg", opacity: "opacity-70", top: '10%', left: '90%' },
        { text: "ברוכים הבאים לעלות", size: "text-2xl", opacity: "opacity-80", top: '90%', left: '60%' },
        { text: "Siyakwamukela ebhodini", size: "text-lg", opacity: "opacity-70", top: '35%', left: '10%' },
        { text: "Dobrodošli na krovu", size: "text-xl", opacity: "opacity-75", top: '5%', left: '65%' },
        { text: "Üdv a fedélzeten", size: "text-lg", opacity: "opacity-70", top: '80%', left: '40%' },
        { text: "Vitajte na palube", size: "text-xl", opacity: "opacity-75", top: '50%', left: '40%' },
        { text: "Mire se erdhët në bord", size: "text-lg", opacity: "opacity-70", top: '20%', left: '60%' },
        { text: "Tere tulemast laevale", size: "text-lg", opacity: "opacity-70", top: '95%', left: '80%' },
        { text: "Willkommen an Bord", size: "text-xl", opacity: "opacity-75", top: '60%', left: '95%' },
        { text: "Sveicināti uz klāja", size: "text-lg", opacity: "opacity-70", top: '40%', left: '45%' },
        { text: "Merħba abbord", size: "text-xl", opacity: "opacity-75", top: '75%', left: '10%' },
        { text: "Velkommen ombord", size: "text-xl", opacity: "opacity-75", top: '30%', left: '20%' },
        { text: "Bem-vindo a bordo", size: "text-2xl", opacity: "opacity-80", top: '80%', left: '85%' },
        { text: "Bun venit la bord", size: "text-lg", opacity: "opacity-70", top: '5%', left: '40%' },
        { text: "Добродошли на брод", size: "text-xl", opacity: "opacity-75", top: '90%', left: '40%' },
        { text: "Vítame vás na palube", size: "text-lg", opacity: "opacity-70", top: '60%', left: '60%' },
        { text: "Karibu kwenye bodi", size: "text-xl", opacity: "opacity-75", top: '15%', left: '25%' },
        { text: "Croeso ar fwrdd y llong", size: "text-lg", opacity: "opacity-70", top: '85%', left: '70%' },
        { text: "Benvido a bordo", size: "text-xl", opacity: "opacity-75", top: '50%', left: '5%' },
        { text: "Ongi etorri ontzira", size: "text-lg", opacity: "opacity-70", top: '20%', left: '95%' },
        { text: "Добре дошли на борда", size: "text-xl", opacity: "opacity-75", top: '95%', left: '25%' },
        { text: "Sugeng rawuh ing kapal", size: "text-lg", opacity: "opacity-70", top: '5%', left: '75%' },
        { text: "Maligayang pagdating sakay", size: "text-xl", opacity: "opacity-75", top: '70%', left: '45%' },
        { text: "Selamat datang di kapal", size: "text-lg", opacity: "opacity-70", top: '30%', left: '90%' },
        { text: "Mire se vini në bord", size: "text-xl", opacity: "opacity-75", top: '65%', left: '80%' },
        { text: "Tere tulemast pardal", size: "text-lg", opacity: "opacity-70", top: '80%', left: '10%' },
        { text: "ברוכים הבאים לסיפון", size: "text-xl", opacity: "opacity-75", top: '10%', left: '5%' },
        { text: "Siyakwamukela emkhunjini", size: "text-lg", opacity: "opacity-70", top: '55%', left: '30%' },
        { text: "Dobrodošli na palubi", size: "text-xl", opacity: "opacity-75", top: '45%', left: '85%' },
        { text: "Willkommen an Deck", size: "text-lg", opacity: "opacity-70", top: '25%', left: '70%' },
        { text: "Üdv a fedélzeten", size: "text-xl", opacity: "opacity-75", top: '90%', left: '5%' },
        { text: "Chào mừng lên tàu", size: "text-lg", opacity: "opacity-70", top: '70%', left: '95%' },
        { text: "Velkommen om bord", size: "text-xl", opacity: "opacity-75", top: '10%', left: '70%' },
        { text: "Dobrodošli na brodu", size: "text-lg", opacity: "opacity-70", top: '90%', left: '95%' },
        { text: "Sveiki atvykę į laivą", size: "text-xl", opacity: "opacity-75", top: '55%', left: '50%' },
        { text: "Merħba fuq il-gverta", size: "text-lg", opacity: "opacity-70", top: '15%', left: '95%' },
        { text: "Bun venit pe punte", size: "text-xl", opacity: "opacity-75", top: '5%', left: '25%' },
        { text: "Vítame vás na palubě", size: "text-lg", opacity: "opacity-70", top: '95%', left: '55%' },
        { text: "Добре дошли на палубата", size: "text-xl", opacity: "opacity-75", top: '35%', left: '80%' },
        { text: "Selamat datang di dek", size: "text-lg", opacity: "opacity-70", top: '50%', left: '65%' },
        { text: "Siyakwamukela emphemeni", size: "text-xl", opacity: "opacity-75", top: '20%', left: '40%' },
        { text: "Mire se erdhët në kuvertë", size: "text-lg", opacity: "opacity-70", top: '75%', left: '30%' },
        { text: "Tere tulemast tekile", size: "text-xl", opacity: "opacity-75", top: '40%', left: '15%' },
        { text: "ברוכים הבאים על הסיפון", size: "text-lg", opacity: "opacity-70", top: '60%', left: '85%' },
        { text: "Üdvözöljük a fedélzeten", size: "text-xl", opacity: "opacity-75", top: '80%', left: '25%' },
        { text: "Dobrodošli na krovu", size: "text-lg", opacity: "opacity-70", top: '10%', left: '45%' },
        { text: "Velkommen til dekks", size: "text-xl", opacity: "opacity-75", top: '25%', left: '5%' },
        { text: "Chào mừng quý khách", size: "text-lg", opacity: "opacity-70", top: '85%', left: '50%' },
        { text: "Bem-vindos a bordo", size: "text-xl", opacity: "opacity-75", top: '45%', left: '5%' },
        { text: "Fàilte air bòrd", size: "text-lg", opacity: "opacity-70", top: '5%', left: '95%' },
        { text: "Witamy na pokładzie", size: "text-2xl", opacity: "opacity-80", top: '65%', left: '5%' },
        { text: "Καλώς ορίσατε", size: "text-xl", opacity: "opacity-75", top: '35%', left: '40%' },
        { text: "Ласкаво просимо на борт", size: "text-2xl", opacity: "opacity-80", top: '20%', left: '75%' },
        { text: "أهلاً وسهلاً", size: "text-3xl", opacity: "opacity-85", top: '55%', left: '15%' },
        { text: "Maligayang pagdating sa barko", size: "text-lg", opacity: "opacity-70", top: '75%', left: '60%' },
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

    