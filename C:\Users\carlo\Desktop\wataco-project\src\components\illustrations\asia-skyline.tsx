import React from 'react';

export function AsiaSkyline() {
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
        <linearGradient id="asia-sky" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#FF8A80" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#8C9EFF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F5F7FA" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1600" height="120" fill="url(#asia-sky)" />
      <g transform="translate(0, 100) scale(1, -1)" fill="#424242" opacity="0.6">
        {/* Mount Fuji */}
        <path d="M100,10 L200,80 L0,80 Z" />
        <path d="M100,10 C120,30 80,30 100,10" fill="#E0E0E0" />
        {/* Pagoda 1 */}
        <path d="M400,10 L450,30 H350 Z" />
        <path d="M400,30 L460,50 H340 Z" />
        <path d="M400,50 L470,70 H330 Z" />
        <rect x="390" y="70" width="20" height="20" />
        {/* Pagoda 2 */}
        <path d="M700,15 L740,30 H660 Z" />
        <path d="M700,30 L750,45 H650 Z" />
        <rect x="695" y="45" width="10" height="30" />
        {/* Torii Gate */}
        <rect x="1000" y="20" width="10" height="50" />
        <rect x="1070" y="20" width="10" height="50" />
        <path d="M990,70 Q1040,80 1090,70" stroke="#B71C1C" strokeWidth="8" fill="none" />
        <rect x="990" y="60" width="100" height="8" fill="#B71C1C" />
        {/* Cherry Blossom Branch */}
        <path d="M1300,50 C1350,70 1400,60 1450,80" stroke="#757575" strokeWidth="2" fill="none" />
        <circle cx="1340" cy="65" r="3" fill="#FFCDD2" />
        <circle cx="1380" cy="60" r="4" fill="#FFCDD2" />
        <circle cx="1430" cy="75" r="3" fill="#FFCDD2" />
        <circle cx="1460" cy="85" r="4" fill="#FFCDD2" />
      </g>
    </svg>
  );
}
