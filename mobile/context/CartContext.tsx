import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { getHeaderColor } from '../lib/theme';

export interface CartItem {
    id: string | number;
    name: string;
    price?: number;
    img?: string;
    quantity: number;
    type: 'product' | 'service' | 'coupon';
    shop?: string;
}

export type ThemeMode = 'light' | 'dark' | 'auto';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string | number) => void;
    updateQuantity: (id: string | number, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    getTotal: () => number;
    themeColor: string;
    setThemeColor: (color: string) => void;
    isDarkMode: boolean;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    hasActiveOrder: boolean;
    setHasActiveOrder: (active: boolean) => void;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
    const [hasActiveOrder, setHasActiveOrder] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const themeColor = getHeaderColor(activeCategory);
    const setThemeColor = (color: string) => { };
    const systemColorScheme = useColorScheme();

    const isDarkMode = themeMode === 'auto'
        ? systemColorScheme === 'dark'
        : themeMode === 'dark';

    const addToCart = (item: CartItem) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: string | number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string | number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const getTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            getTotal,
            themeColor,
            setThemeColor,
            isDarkMode,
            themeMode,
            setThemeMode,
            hasActiveOrder,
            setHasActiveOrder,
            activeCategory,
            setActiveCategory
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
