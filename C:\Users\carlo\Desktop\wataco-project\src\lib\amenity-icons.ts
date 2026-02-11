'use client';
import { Wifi, Car, Waves, Utensils, GlassWater, Wind, Dumbbell, Sparkles, Dog, Plane, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const amenityIcons: { [key: string]: LucideIcon } = {
  SWIMMING_POOL: Waves,
  SPA: Sparkles,
  WIFI: Wifi,
  RESTAURANT: Utensils,
  PARKING: Car,
  FITNESS_CENTER: Dumbbell,
  BAR: GlassWater,
  AIR_CONDITIONING: Wind,
  PETS_ALLOWED: Dog,
  AIRPORT_SHUTTLE: Plane,
  BEACH_ACCESS: Waves,
  // Fallback icon
  DEFAULT: CheckCircle2,
};
