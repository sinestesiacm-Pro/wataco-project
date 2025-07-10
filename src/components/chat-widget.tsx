'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Send, X, Loader2, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatWithTravelAssistant } from '@/ai/flows/chat-flow';
import { useAuth } from '@/contexts/auth-context';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: 'initial', text: '¡Hola! Soy TripGenius. ¿Cómo puedo ayudarte a planificar tu próxima aventura?', sender: 'ai' },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (viewportRef.current) {
      setTimeout(() => {
        if (viewportRef.current) {
           viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [messages]);


  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const history = newMessages
        .filter(m => m.id !== 'initial' && m.id !== 'error')
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          content: m.text,
        }));
      
      const result = await chatWithTravelAssistant({ 
        history: history.slice(0, -1), // Send all but the last message as history
        message: input // Send the last message as the new prompt
      });
      const aiMessage: Message = { id: (Date.now() + 1).toString(), text: result.response, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: 'error',
        text: 'Lo siento, no puedo responder en este momento. Por favor, inténtalo de nuevo más tarde.',
        sender: 'ai'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={cn("fixed bottom-6 right-6 z-50 transition-all duration-300", isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100')}>
        <Button
          size="icon"
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-2xl"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-8 w-8" />
        </Button>
      </div>

      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] max-w-sm transition-all duration-300 ease-in-out",
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        )}
      >
        <Card className="flex flex-col h-[60vh] shadow-2xl rounded-2xl bg-background/80 backdrop-blur-xl border">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-3">
               <Avatar className="h-8 w-8 border-2 border-primary/50">
                  <AvatarFallback className="bg-primary/20"><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
               </Avatar>
               <CardTitle className="font-headline text-lg">TripGenius</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow p-4 overflow-hidden">
            <ScrollArea className="h-full" viewportRef={viewportRef}>
              <div className="space-y-4 pr-4">
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex items-start gap-3", message.sender === 'user' && 'justify-end')}>
                    {message.sender === 'ai' && (
                       <Avatar className="h-8 w-8 border-2 border-primary/50">
                            <AvatarFallback className="bg-primary/20"><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
                       </Avatar>
                    )}
                    <div
                      className={cn(
                        'rounded-xl px-4 py-2 max-w-xs text-sm shadow-md',
                        message.sender === 'ai' ? 'bg-card' : 'bg-primary text-primary-foreground'
                      )}
                    >
                      {message.text}
                    </div>
                     {message.sender === 'user' && (
                       <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.photoURL || ''} />
                            <AvatarFallback>{user?.displayName?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                       </Avatar>
                    )}
                  </div>
                ))}
                {loading && (
                    <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 border-2 border-primary/50">
                            <AvatarFallback className="bg-primary/20"><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
                        </Avatar>
                        <div className="rounded-xl px-4 py-2 max-w-xs text-sm bg-card flex items-center shadow-md">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-4 bg-card/50">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Escribe tu pregunta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
                className="bg-background"
              />
              <Button onClick={handleSend} disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
