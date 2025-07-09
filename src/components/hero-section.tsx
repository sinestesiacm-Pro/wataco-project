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
    // Reset index to 0 every time the `images` prop changes.
    // This is crucial for when the user switches tabs.
    setCurrentImageIndex(0);

    if (images.length > 1) {
      const interval = setInterval(() => {
        // We use a functional update to ensure we always have the latest index.
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      // Cleanup the interval when the component unmounts or `images` changes.
      return () => clearInterval(interval);
    }
  }, [images]); // The dependency is the `images` array itself.

  return (
    <section className="hero-section">
       {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={`Travel background ${index + 1}`}
          fill
          className={`hero-background-image ${index === currentImageIndex ? 'active' : ''}`}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority={index === 0}
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
