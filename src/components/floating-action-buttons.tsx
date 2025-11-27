
'use client';

import React, { useState, Children, isValidElement } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatWidget } from './chat-widget';
import { cn } from '@/lib/utils';

export function FloatingActionButtons({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const filterButton = Children.toArray(children).find(
        (child) => isValidElement(child) && child.props.children.props.children.includes('Filtros')
    );

    return (
        <div className="lg:hidden fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
                        className="flex flex-col items-center gap-4"
                    >
                        {/* We need to wrap the filter trigger in a component that can accept a ref */}
                        <div>{filterButton}</div>
                        <ChatWidget isFab={true} />
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                size="icon"
                className={cn(
                    "rounded-full shadow-lg w-16 h-16 transition-transform duration-300",
                    isOpen ? "bg-destructive hover:bg-destructive/90 rotate-45" : "bg-primary hover:bg-primary/90"
                )}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <Plus className="h-8 w-8" />
            </Button>
        </div>
    );
}
