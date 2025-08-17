
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
             <div key={`${partner.domain}-${index}`} className="partner-logo glitch-container" style={{background: `url(https://logo.clearbit.com/${partner.domain})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
              <Image 
                src={`https://logo.clearbit.com/${partner.domain}`}
                alt={partner.name}
                width={160}
                height={60}
                className="object-contain h-16 w-auto transition-all duration-300"
                onError={(e) => { 
                  const target = e.target as HTMLImageElement;
                  const parent = target.parentElement;
                  if(parent && parent.style.backgroundImage) {
                    parent.style.backgroundImage = `url(https://images.kiwi.com/airlines/64/${partner.domain.split('.')[0]}.png)`;
                  }
                  target.src = `https://images.kiwi.com/airlines/64/${partner.domain.split('.')[0]}.png`;
                 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

    

    