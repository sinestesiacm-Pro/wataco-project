import React from 'react';

export function SouthAmericaSkyline() {
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
        <linearGradient id="sa-sky" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#FFC107" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F5F7FA" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1600" height="120" fill="url(#sa-sky)" />
      <g transform="translate(0, 100) scale(1, -1)" fill="#6D4C41" opacity="0.6">
        {/* Andes Mountains */}
        <path d="M0,20 L150,70 L300,30 L450,80 L600,40 L750,90 L900,20 Z" />
        <path d="M800,30 L950,80 L1100,40 L1250,70 L1400,30 L1550,60 L1600,20 Z" fill="#A1887F" />
        {/* Machu Picchu style silhouette */}
        <rect x="400" y="40" width="100" height="10" />
        <rect x="420" y="30" width="60" height="10" />
        <rect x="440" y="20" width="20" height="10" />
        {/* Palm Trees */}
        <path d="M100,10 L100,50 M100,50 C80,60 120,60 100,50 M100,45 C85,50 115,50 100,45" stroke="#2E7D32" strokeWidth="2" fill="none" />
        <path d="M1200,15 L1200,60 M1200,60 C1180,70 1220,70 1200,60 M1200,55 C1185,60 1215,60 1200,55" stroke="#2E7D32" strokeWidth="2.5" fill="none" />
        {/* Colonial Building */}
        <rect x="800" y="20" width="120" height="40" />
        <rect x="830" y="10" width="60" height="10" fill="#D7CCC8" />
        <path d="M850,60 A20,10 0 0,1 890,60" fill="#A1887F" />
      </g>
    </svg>
  );
}
