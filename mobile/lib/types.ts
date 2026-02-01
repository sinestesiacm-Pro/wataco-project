export enum AuthMode {
    LOGIN = 'login',
    REGISTER = 'register'
}

export interface Category {
    id: string;
    label: string;
    icon: string;
    color: string;
}

export interface Offer {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    discount?: string;
    tag?: string; // e.g. "GRATIS", "POPULAR"
    tagColor?: string; // e.g. "w-purple", "w-orange"
    rating?: number;
    reviews?: number;
    distance?: string;
    price?: number;
    originalPrice?: number;
    isOpen?: boolean;
    expiresIn?: string;
    category?: string; // e.g. "Comida", "Salud", "Belleza"
    location?: string; // e.g. "San Isidro, Lima"
    latitude?: number;
    longitude?: number;
}

export interface User {
    name: string;
    avatar: string;
    location: string;
}

export interface Promotion {
    id: string;
    title: string;
    subtitle: string;
    footer?: string;
    image: string;
    color: string;
    gradientColors?: string[];
    tag?: string;
}
