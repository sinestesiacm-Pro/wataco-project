
'use client';

import React from 'react';

export function SearchContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-10">
            <div className="bg-card/80 backdrop-blur-xl border p-2 sm:p-4 rounded-3xl shadow-2xl w-full mx-auto">
                {children}
            </div>
        </div>
    );
}
