
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FuselageSectionProps {
  images: string[];
  title: React.ReactNode;
  subtitle: string;
}

export function FuselageSection({ images, title, subtitle }: FuselageSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // When images change, reset to the first one
    setCurrentImageIndex(0);
    
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <section className="relative w-full min-h-[550px] sm:min-h-[600px] flex flex-col justify-center items-center text-center overflow-hidden">
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
          priority={index === 0}
          data-ai-hint="travel destination"
        />
      ))}
      <div 
        className="absolute inset-0"
        style={{ 
           backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      />
      <div className="relative px-4 w-full mt-[-150px] sm:mt-[-100px]">
         <h1 className="hero-title">{title}</h1>
         <p className="hero-subtitle">{subtitle}</p>
      </div>
    </section>
  );
}
