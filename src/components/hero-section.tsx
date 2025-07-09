'use client';

import { useState, useEffect } from 'react';

interface HeroSectionProps {
  images: string[];
  title: React.ReactNode;
  subtitle: string;
  children: React.ReactNode;
}

export function HeroSection({ images, title, subtitle, children }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 15000);

        return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <section className="hero-section">
      {images.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className={`hero-background-slide ${index === currentImageIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
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
