
'use client';

import { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FuselageSectionProps {
  images: string[];
  title: React.ReactNode;
  subtitle: string;
}

// SOLUCIÓN: El componente se define FUERA del componente padre.
// Esto asegura que React lo trate como un tipo de componente estable y no lo vuelva a montar en cada render.
const BackgroundCarousel = ({ images }: { images: string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Cuando las imágenes cambian, reinicia el índice a 0.
    setCurrentImageIndex(0);
    
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <>
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
    </>
  );
};

// Se aplica React.memo como buena práctica para evitar re-renderizados si las props no cambian.
const FuselageSectionComponent = ({ images, title, subtitle }: FuselageSectionProps) => {
  return (
    <section className="relative w-full min-h-[550px] sm:min-h-[600px] flex flex-col justify-center items-center text-center overflow-hidden mask-fade">
      <BackgroundCarousel images={images} />
      <div 
        className="absolute inset-0"
        style={{ 
           backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      />
      <div className="relative z-10 px-4 w-full">
         <div className="relative mt-[-150px] sm:mt-[-100px]">
           <h1 className="hero-title">{title}</h1>
           <p className="hero-subtitle">{subtitle}</p>
         </div>
      </div>
    </section>
  );
}

export const FuselageSection = memo(FuselageSectionComponent);
