'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  images: string[];
  title: React.ReactNode;
  subtitle: string;
  children: React.ReactNode;
}

export function HeroSection({ images, title, subtitle, children }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);

    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <section className="hero-section">
       {images.map((image, index) => (
        <Image
          key={`${image}-${index}`}
          src={image}
          alt={`Travel background ${index + 1}`}
          fill
          className={`hero-background-image ${index === currentImageIndex ? 'active' : ''}`}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          sizes="100vw"
          data-ai-hint="travel background"
        />
      ))}
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        {children}
      </div>
    </section>
  );
}
