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
    setLoading(true);
    setError(null);
    setTips(null);
    try {
      const result = await generateDestinationTravelTips({ destination: destinationName });
      setTips(result.tips);
    } catch (e) {
      setError('Could not generate travel tips. Please try again later.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => !isOpen && handleGenerateTips()}>
          <Wand2 className="mr-2 h-4 w-4" />
          AI Travel Tips for {destinationName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center">
            <Wand2 className="mr-2 h-6 w-6 text-primary" />
            AI Travel Tips for {destinationName}
          </DialogTitle>
          <DialogDescription>
            Discover insider tips for your trip, powered by AI.
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
            <ScrollArea className="h-72 w-full rounded-md border p-4">
              <div className="prose prose-sm dark:prose-invert whitespace-pre-wrap font-body">
                {tips}
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
