'use client';

import React, { useState, Children, isValidElement } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatWidget } from './chat-widget';
import { cn } from '@/lib/utils';

export function FloatingActionButtons({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    // This logic is fragile. It assumes a specific structure.
    // Let's make it more robust.
    const filterButton = Children.toArray(children).find(child => {
        if (!isValidElement(child)) return false;
        // The child is the <Dialog> component. We need to find the trigger inside.
        const dialogTrigger = (child.props.children as React.ReactElement[])?.find(
            (c: React.ReactElement) => isValidElement(c) && c.type.displayName === 'DialogTrigger'
        );
        if (!dialogTrigger) return false;
        // The trigger's child is the <Button>.
        const button = dialogTrigger.props.children;
        if (!isValidElement(button)) return false;
        // The button's children contain the text.
        const buttonChildren = Children.toArray(button.props.children);
        return buttonChildren.some(c => typeof c === 'string' && c.trim() === 'Filtros');
    });


    return (
        <div className="lg:hidden fixed bottom-24 right-6 z-50 flex flex-col items-center gap-4">
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
