
'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface Partner {
  name: string;
}

interface PartnersSectionProps {
  title: string;
  partners: Partner[];
}

export function PartnersSection({ title, partners }: PartnersSectionProps) {
  // Duplicate partners for a seamless loop
  const extendedPartners = [...partners, ...partners];

  return (
    <section className="py-12 bg-transparent">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-headline font-semibold text-white/80 drop-shadow-lg">{title}</h2>
      </div>
      <div
        className="marquee"
        style={{
          '--gap': '4rem',
        } as React.CSSProperties}
      >
        <div className="marquee-content">
          {extendedPartners.map((partner, index) => (
            <div key={`${partner.name}-${index}`} className="partner-logo">
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
