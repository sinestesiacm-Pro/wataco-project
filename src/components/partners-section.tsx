'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';

interface Partner {
  name: string;
  domain: string;
}

interface PartnersSectionProps {
  title: string;
  partners: Partner[];
}

export function PartnersSection({ title, partners }: PartnersSectionProps) {
  // Duplicate partners for a seamless loop
  const extendedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="py-12 bg-transparent">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-headline font-semibold text-white/80 drop-shadow-lg">{title}</h2>
      </div>
      <div
        className="marquee"
        style={{ '--gap': '4rem' } as React.CSSProperties}
      >
        <div className="marquee-content">
          {extendedPartners.map((partner, index) => (
            <div key={`${partner.domain}-${index}`} className="partner-logo">
              <Image 
                src={`https://logo.clearbit.com/${partner.domain}`}
                alt={partner.name}
                width={140}
                height={50}
                className="object-contain h-14 w-auto transition-all duration-300 filter grayscale brightness-0 invert opacity-70 hover:opacity-100"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
