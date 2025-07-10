import React from 'react';

export function EuropeSkyline() {
  return (
    <svg
      width="100%"
      height="120"
      viewBox="0 0 1600 120"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="europe-sky" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#FFA07A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F5F7FA" stopOpacity="0" />
        </linearGradient>
        <filter id="europe-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="1600" height="120" fill="url(#europe-sky)" />
      <g transform="translate(0, 120) scale(1, -1)" fill="#4A5568" filter="url(#europe-soft-glow)" opacity="0.6">
        {/* Simplified Colosseum */}
        <path d="M150,20 C150,8 200,8 200,20 L200,60 H150 Z M160,25 h30 M160,35 h30 M160,45 h30" stroke="#4A5568" strokeWidth="2" fill="none" />
        <path d="M220,15 C220,5 280,5 280,15 L280,70 H220 Z M230,20 h40 M230,35 h40 M230,50 h40" stroke="#4A5568" strokeWidth="2" fill="none" />
        {/* Eiffel Tower */}
        <path d="M400,10 L420,80 L380,80 Z M390,40 L410,40" stroke="#4A5568" strokeWidth="3" fill="none" />
        <path d="M400,10 C405,5 395,5 400,10" fill="#4A5568" />
        {/* Brandenburg Gate */}
        <path d="M600,20 h100 v30 h-100 Z M610,20 v-10 h10 v10 M630,20 v-10 h10 v10 M650,20 v-10 h10 v10 M670,20 v-10 h10 v10 M690,20 v-10 h10 v10" stroke="#4A5568" strokeWidth="2" fill="none"/>
        <rect x="620" y="50" width="10" height="20" />
        <rect x="640" y="50" width="10" height="20" />
        <rect x="660" y="50" width="10" height="20" />
        <rect x="680" y="50" width="10" height="20" />
        {/* Windmill */}
        <circle cx="800" cy="50" r="5" />
        <path d="M800,50 L830,60" stroke="#4A5568" strokeWidth="2" />
        <path d="M800,50 L770,60" stroke="#4A5568" strokeWidth="2" />
        <path d="M800,50 L800,80" stroke="#4A5568" strokeWidth="2" />
        <path d="M800,50 L780,30" stroke="#4A5568" strokeWidth="2" />
        {/* Generic Cathedral */}
        <path d="M1000,10 L1020,50 L980,50 Z" />
        <rect x="990" y="50" width="20" height="40" />
        <path d="M1000,10 L1000,0" stroke="#4A5568" strokeWidth="3" />
        {/* Big Ben-like tower */}
        <rect x="1200" y="10" width="20" height="80" />
        <rect x="1195" y="10" width="30" height="10" />
        <circle cx="1210" cy="30" r="5" fill="#F5F7FA" />
      </g>
    </svg>
  );
}
