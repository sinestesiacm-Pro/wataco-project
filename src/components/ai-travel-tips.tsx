
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { generateDestinationTravelTips } from '@/ai/flows/travel-tips';
import { Wand2, Loader2 } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface AITravelTipsProps {
  destination: string;
  destinationName: string;
}

export function AITravelTips({ destination, destinationName }: AITravelTipsProps) {
  const [tips, setTips] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerateTips = async () => {
    // Only fetch if tips are not already loaded
    if (tips) return;

    setLoading(true);
    setError(null);
    try {
      const result = await generateDestinationTravelTips({ destination: destinationName });
      setTips(result.tips);
    } catch (e) {
      setError('No se pudieron generar los consejos de viaje. Por favor, inténtalo de nuevo más tarde.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
            handleGenerateTips();
        }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-white bg-transparent border-white/20 hover:bg-white/10 hover:text-white">
          <Wand2 className="mr-2 h-4 w-4" />
          Consejos de Viaje con IA para {destinationName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg text-white">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center text-white">
            <Wand2 className="mr-2 h-6 w-6 text-primary" />
            Consejos de Viaje con IA
          </DialogTitle>
          <DialogDescription className="text-white/80">
            Descubre consejos de expertos para tu viaje a {destinationName}, con la ayuda de IA.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {loading && (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {tips && (
            <ScrollArea className="h-72 w-full rounded-md border border-white/20 bg-black/20 p-4">
              <div className="prose prose-sm prose-invert whitespace-pre-wrap font-body text-white">
                {tips}
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
