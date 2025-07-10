'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FuselageSectionProps {
  images: string[];
  children: React.ReactNode;
}

export function FuselageSection({ images, children }: FuselageSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <section className="hero-section" style={{ height: 'auto', minHeight: '100vh' }}>
      {images.map((image, index) => (
        <Image
          key={`${image}-${index}`}
          src={image}
          alt={`Travel background ${index + 1}`}
          fill
          className={cn(
            'hero-background-image',
            index === currentImageIndex ? 'active' : ''
          )}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
          data-ai-hint="travel destination"
        />
      ))}
      <div 
        className="hero-overlay" 
        style={{ 
          backgroundColor: 'rgba(238, 242, 245, 0.8)', // Light fuselage color with opacity
          backdropFilter: 'blur(8px)' 
        }}
      />
      <div className="hero-content fuselage-background">
        {children}
      </div>
    </section>
  );
}
