
'use client';

import React from 'react';

export function SearchContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-card/80 backdrop-blur-xl border p-2 sm:p-4 rounded-3xl shadow-2xl w-full max-w-5xl mx-auto">
            {children}
        </div>
    );
}
