'use client';

import React from 'react';
import { cn } from "@/lib/utils";

const words = [
    // Core phrases (central and prominent)
    { text: "Welcome Aboard", size: "text-4xl", opacity: "opacity-100", top: '45%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: '700', duration: '25s', delay: '0s' },
    { text: "Bienvenido a bordo", size: "text-3xl", opacity: "opacity-95", top: '35%', left: '30%', fontWeight: '600', duration: '30s', delay: '-5s' },
    { text: "Bienvenue à bord", size: "text-3xl", opacity: "opacity-90", top: '55%', left: '70%', fontWeight: '600', duration: '28s', delay: '-2s' },
    { text: "Willkommen an Bord", size: "text-2xl", opacity: "opacity-85", top: '20%', left: '10%', fontWeight: '500', duration: '35s', delay: '-10s' },
    { text: "Benvenuto a bordo", size: "text-2xl", opacity: "opacity-80", top: '70%', left: '25%', fontWeight: '500', duration: '32s', delay: '-8s' },
    { text: "Bem-vindo a bordo", size: "text-xl", opacity: "opacity-75", top: '15%', left: '80%', fontWeight: '400', duration: '40s', delay: '-12s' },

    // Extended phrases with negative and >100% positioning
    { text: "Välkommen ombord", size: "text-lg", opacity: "opacity-70", top: '85%', left: '-5%', fontWeight: '400', duration: '45s', delay: '-15s' },
    { text: "Karibu", size: "text-2xl", opacity: "opacity-85", top: '-5%', left: '30%', fontWeight: '600', duration: '33s', delay: '-3s' },
    { text: "어서 오세요", size: "text-3xl", opacity: "opacity-90", top: '60%', left: '-10%', fontWeight: '600', duration: '29s', delay: '-7s' },
    { text: "ようこそ", size: "text-xl", opacity: "opacity-80", top: '90%', right: '-5%', fontWeight: '500', duration: '38s', delay: '-14s' },
    { text: "歡迎光臨", size: "text-3xl", opacity: "opacity-85", top: '10%', left: '55%', fontWeight: '600', duration: '27s', delay: '-1s' },
    { text: "Selamat datang", size: "text-lg", opacity: "opacity-75", top: '105%', left: '60%', fontWeight: '400', duration: '42s', delay: '-18s' },
    { text: "Fáilte ar bord", size: "text-2xl", opacity: "opacity-90", top: '25%', left: '45%', fontWeight: '500', duration: '31s', delay: '-6s' },
    { text: "Witamy na pokładzie", size: "text-xl", opacity: "opacity-80", top: '75%', right: '-8%', fontWeight: '400', duration: '36s', delay: '-11s' },
    { text: "Hoş geldiniz", size: "text-2xl", opacity: "opacity-85", top: '40%', right: '-12%', fontWeight: '500', duration: '34s', delay: '-9s' },
    { text: "Καλώς ήρθατε", size: "text-lg", opacity: "opacity-70", top: '-8%', left: '5%', fontWeight: '400', duration: '48s', delay: '-20s' },
    { text: "Ласкаво просимо", size: "text-xl", opacity: "opacity-85", top: '110%', left: '50%', transform: 'translateX(-50%)', fontWeight: '500', duration: '37s', delay: '-13s' },
    { text: "Добро пожаловать", size: "text-2xl", opacity: "opacity-90", top: '50%', left: '15%', fontWeight: '600', duration: '26s', delay: '-4s' },
    { text: "أهلاً بك على متن الطائرة", size: "text-4xl", opacity: "opacity-95", top: '30%', left: '75%', fontWeight: '700', direction: 'rtl', duration: '24s', delay: '-2s' },
    { text: "Siyakwamukela", size: "text-lg", opacity: "opacity-70", top: '88%', left: '30%', fontWeight: '400', duration: '46s', delay: '-16s' },
    { text: "Vítejte na palubě", size: "text-xl", opacity: "opacity-80", top: '65%', left: '40%', fontWeight: '500', duration: '39s', delay: '-17s' },
    { text: "Tervetuloa", size: "text-2xl", opacity: "opacity-85", top: '15%', left: '35%', fontWeight: '500', duration: '30s', delay: '-5s' },
    { text: "स्वआगत है", size: "text-3xl", opacity: "opacity-90", top: '80%', left: '75%', fontWeight: '600', duration: '28s', delay: '-3s' },
    { text: "Maligayang pagdating", size: "text-lg", opacity: "opacity-75", top: '68%', left: '65%', fontWeight: '400', duration: '43s', delay: '-19s' },
    { text: "Failte", size: "text-xl", opacity: "opacity-80", top: '-2%', left: '85%', fontWeight: '500', duration: '35s', delay: '-10s' },
    { text: "Croeso ar fwrdd", size: "text-2xl", opacity: "opacity-85", top: '92%', left: '15%', fontWeight: '500', duration: '32s', delay: '-8s' },
    { text: "Üdvözöljük a fedélzeten", size: "text-lg", opacity: "opacity-70", top: '38%', left: '-15%', fontWeight: '400', duration: '50s', delay: '-22s' },
    { text: "Barka da zuwa", size: "text-xl", opacity: "opacity-75", top: '58%', left: '85%', fontWeight: '400', duration: '41s', delay: '-18s' },
    { text: "Bine aţi venit", size: "text-lg", opacity: "opacity-70", top: '28%', right: '-20%', fontWeight: '400', duration: '49s', delay: '-21s' },
    { text: "Velkomin", size: "text-xl", opacity: "opacity-80", top: '78%', left: '15%', fontWeight: '500', duration: '37s', delay: '-13s' },
    { text: "Sugeng rawuh", size: "text-lg", opacity: "opacity-75", top: '10%', left: '20%', fontWeight: '400', duration: '44s', delay: '-20s' },
    { text: "ברוכים הבאים", size: "text-3xl", opacity: "opacity-95", top: '85%', left: '45%', fontWeight: '600', direction: 'rtl', duration: '27s', delay: '-4s' },
    { text: "வரவேற்பு", size: "text-2xl", opacity: "opacity-85", top: '35%', left: '55%', fontWeight: '500', duration: '33s', delay: '-9s' },
    { text: "Dobrodošli", size: "text-xl", opacity: "opacity-80", top: '60%', left: '50%', fontWeight: '500', duration: '36s', delay: '-12s' },
    { text: "Sveiki atvykę", size: "text-lg", opacity: "opacity-70", top: '115%', left: '75%', fontWeight: '400', duration: '47s', delay: '-23s' },
    { text: "Tere tulemast", size: "text-2xl", opacity: "opacity-80", top: '-10%', left: '70%', fontWeight: '500', duration: '34s', delay: '-8s' },
    { text: "Welkom aan boord", size: "text-2xl", opacity: "opacity-85", top: '70%', left: '5%', fontWeight: '500', duration: '31s', delay: '-6s' },
    { text: "Chào mừng", size: "text-lg", opacity: "opacity-75", top: '5%', left: '45%', fontWeight: '400', duration: '45s', delay: '-21s' },
    { text: "Benvinguts a bord", size: "text-xl", opacity: "opacity-80", top: '90%', left: '30%', fontWeight: '500', duration: '38s', delay: '-14s' },
    { text: "Vitajte", size: "text-lg", opacity: "opacity-70", top: '25%', left: '25%', fontWeight: '400', duration: '46s', delay: '-22s' },
    { text: "Onthaal aan boord", size: "text-xl", opacity: "opacity-70", top: '50%', right: '105%', fontWeight: '400', duration: '40s', delay: '-16s' },
    { text: "Velkommen", size: "text-2xl", opacity: "opacity-80", top: '5%', left: '15%', fontWeight: '500', duration: '35s', delay: '-10s' },
    { text: "Mire se vini", size: "text-lg", opacity: "opacity-70", top: '108%', left: '10%', fontWeight: '400', duration: '49s', delay: '-24s' },
    { text: "ברוך הבא", size: "text-2xl", opacity: "opacity-80", top: '15%', left: '-18%', fontWeight: '500', direction: 'rtl', duration: '32s', delay: '-7s' },
    { text: "Ongi etorri", size: "text-xl", opacity: "opacity-75", top: '85%', right: '-10%', fontWeight: '400', duration: '42s', delay: '-18s' },
    { text: "Добре дошли", size: "text-2xl", opacity: "opacity-85", top: '75%', left: '50%', fontWeight: '500', duration: '33s', delay: '-9s' },
    { text: "Benvido a bordo", size: "text-lg", opacity: "opacity-70", top: '55%', left: '-12%', fontWeight: '400', duration: '48s', delay: '-23s' },
    { text: "Välkommen", size: "text-2xl", opacity: "opacity-80", top: '48%', left: '25%', fontWeight: '500', duration: '36s', delay: '-12s' },
    { text: "Tere tulemast pardale", size: "text-lg", opacity: "opacity-70", top: '25%', right: '-25%', fontWeight: '400', duration: '47s', delay: '-22s' },
    { text: "Maligayang pagdating sa board", size: "text-xl", opacity: "opacity-75", top: '65%', left: '20%', fontWeight: '400', duration: '43s', delay: '-19s' },
    { text: "Tervetuloa alukseen", size: "text-lg", opacity: "opacity-70", top: '70%', right: '-15%', fontWeight: '400', duration: '44s', delay: '-20s' },
    { text: "Soo dhawow", size: "text-2xl", opacity: "opacity-85", top: '85%', left: '20%', fontWeight: '500', duration: '34s', delay: '-8s' },
    { text: "Selamat di kapal", size: "text-lg", opacity: "opacity-70", top: '10%', right: '-10%', fontWeight: '400', duration: '50s', delay: '-25s' },
    { text: "ברוכים הבאים לעלות", size: "text-2xl", opacity: "opacity-80", top: '90%', left: '60%', fontWeight: '500', direction: 'rtl', duration: '37s', delay: '-13s' },
    { text: "Siyakwamukela ebhodini", size: "text-lg", opacity: "opacity-70", top: '35%', left: '-10%', fontWeight: '400', duration: '46s', delay: '-21s' },
    { text: "Dobrodošli na krovu", size: "text-xl", opacity: "opacity-75", top: '5%', left: '65%', fontWeight: '400', duration: '41s', delay: '-17s' },
    { text: "Üdv a fedélzeten", size: "text-lg", opacity: "opacity-70", top: '112%', left: '40%', fontWeight: '400', duration: '48s', delay: '-23s' },
    { text: "Vitajte na palube", size: "text-xl", opacity: "opacity-75", top: '50%', left: '40%', fontWeight: '400', duration: '39s', delay: '-15s' },
    { text: "Mire se erdhët në bord", size: "text-lg", opacity: "opacity-70", top: '20%', right: '-5%', fontWeight: '400', duration: '47s', delay: '-22s' },
    { text: "Welcome aboard", size: "text-xl", opacity: "opacity-75", top: '18%', left: '70%', fontWeight: '600', duration: '30s', delay: '-5s' },
    { text: "Benvenuto a bordo", size: "text-3xl", opacity: "opacity-90", top: '28%', left: '20%', fontWeight: '700', duration: '28s', delay: '-3s' },
    { text: "Dobrodošli na brodu", size: "text-2xl", opacity: "opacity-85", top: '18%', left: '30%', fontWeight: '600', duration: '33s', delay: '-9s' },
    { text: "Üdv a fedélzeten", size: "text-xl", opacity: "opacity-80", top: '82%', left: '-20%', fontWeight: '500', duration: '39s', delay: '-15s' },
    { text: "Vitajte na palube", size: "text-lg", opacity: "opacity-75", top: '38%', left: '60%', fontWeight: '400', duration: '44s', delay: '-20s' },
    { text: "Mire se erdhët në bord", size: "text-2xl", opacity: "opacity-85", top: '62%', right: '-15%', fontWeight: '600', duration: '31s', delay: '-7s' },
    { text: "Mirë se vjen", size: "text-xl", opacity: "opacity-80", top: '-3%', left: '40%', fontWeight: '500', duration: '36s', delay: '-12s' },
    { text: "Bienvenida a bordo", size: "text-3xl", opacity: "opacity-90", top: '95%', left: '-5%', fontWeight: '700', duration: '29s', delay: '-6s' },
    { text: "Willkommen", size: "text-2xl", opacity: "opacity-85", top: '45%', right: '-10%', fontWeight: '600', duration: '32s', delay: '-8s' },
    { text: "Bem-vindo", size: "text-xl", opacity: "opacity-80", top: '25%', left: '-2%', fontWeight: '500', duration: '38s', delay: '-14s' },
    { text: "Hoş geldin", size: "text-lg", opacity: "opacity-75", top: '75%', left: '35%', fontWeight: '400', duration: '43s', delay: '-19s' },
    { text: "Καλώς ορίσατε", size: "text-2xl", opacity: "opacity-85", top: '55%', right: '-25%', fontWeight: '600', duration: '33s', delay: '-9s' },
    { text: "أهلاً وسهلاً", size: "text-4xl", opacity: "opacity-95", top: '20%', right: '-20%', fontWeight: '700', direction: 'rtl', duration: '25s', delay: '-2s' },
    { text: "Powitanie", size: "text-xl", opacity: "opacity-80", top: '85%', left: '65%', fontWeight: '500', duration: '40s', delay: '-16s' },
    { text: "Tervetuloa kyytiin", size: "text-lg", opacity: "opacity-75", top: '40%', left: '20%', fontWeight: '400', duration: '45s', delay: '-21s' },
    { text: "Vítejte", size: "text-2xl", opacity: "opacity-85", top: '90%', left: '80%', fontWeight: '600', duration: '30s', delay: '-6s' },
    { text: "Benvinguda", size: "text-xl", opacity: "opacity-80", top: '10%', right: '-15%', fontWeight: '500', duration: '37s', delay: '-13s' },
    { text: "Fáilte", size: "text-lg", opacity: "opacity-75", top: '60%', left: '60%', fontWeight: '400', duration: '42s', delay: '-18s' },
    { text: "Croeso", size: "text-2xl", opacity: "opacity-85", top: '-5%', right: '5%', fontWeight: '600', duration: '31s', delay: '-7s' },
    { text: "Üdvözlet", size: "text-xl", opacity: "opacity-80", top: '95%', right: '-5%', fontWeight: '500', duration: '39s', delay: '-15s' },
    { text: "Chào đón", size: "text-lg", opacity: "opacity-75", top: '30%', left: '40%', fontWeight: '400', duration: '46s', delay: '-22s' },
    { text: "Velkommen ombord", size: "text-2xl", opacity: "opacity-85", top: '70%', left: '55%', fontWeight: '600', duration: '34s', delay: '-10s' },
    { text: "Mire se erdhe", size: "text-xl", opacity: "opacity-80", top: '50%', left: '-2%', fontWeight: '500', duration: '38s', delay: '-14s' },
    { text: "Добре дошла", size: "text-lg", opacity: "opacity-75", top: '88%', left: '50%', fontWeight: '400', duration: '44s', delay: '-20s' },
    { text: "Benvida a bordo", size: "text-2xl", opacity: "opacity-85", top: '12%', left: '45%', fontWeight: '600', duration: '35s', delay: '-11s' },
    { text: "Välkommen", size: "text-xl", opacity: "opacity-80", top: '33%', right: '-10%', fontWeight: '500', duration: '40s', delay: '-16s' },
    { text: "Tere tulemast laevale", size: "text-lg", opacity: "opacity-75", top: '66%', left: '30%', fontWeight: '400', duration: '47s', delay: '-23s' },
    { text: "Maligayang pagdating sakay", size: "text-2xl", opacity: "opacity-85", top: '92%', left: '40%', fontWeight: '600', duration: '36s', delay: '-12s' },
    { text: "Tervetuloa laivaan", size: "text-xl", opacity: "opacity-80", top: '3%', left: '55%', fontWeight: '500', duration: '41s', delay: '-17s' },
];

const WelcomeAboardCloud = () => {
    return (
        <div className="absolute inset-0">
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
                        animationDuration: word.duration,
                        animationDelay: word.delay,
                    } as React.CSSProperties}
                >
                    {word.text}
                </span>
            ))}
        </div>
    )
}

export function FlightLoadingAnimation({ originName, destinationName }: { originName: string; destinationName: string }) {
    const from = originName.split(',')[0] || "Origen";
    const to = destinationName.split(',')[0] || "Destino";

    return (
        <div className="relative flex flex-col items-center justify-center text-center w-full h-full overflow-hidden">
             <WelcomeAboardCloud />
            <div className="relative z-10 bg-black/20 backdrop-blur-sm p-4 rounded-xl font-body mt-auto mb-4">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">De {from} a {to}</h2>
              <p className="text-white/80 mt-1 drop-shadow-lg">Buscando entre más de 400 aerolíneas...</p>
            </div>
        </div>
    );
}
