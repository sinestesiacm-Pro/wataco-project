import { Category, Offer, Promotion } from "../lib/types";

export const CATEGORIES: Category[] = [
    { id: 'cat1', label: 'Todos', icon: 'grid-view', color: '#22C55E' },
    { id: 'cat2', label: 'Comida', icon: 'restaurant', color: '#F97316' },
    { id: 'cat3', label: 'Salud', icon: 'medical-services', color: '#0EA5E9' },
    { id: 'cat4', label: 'Tiendas', icon: 'storefront', color: '#9333EA' },
    { id: 'cat5', label: 'Belleza', icon: 'face-retouching-natural', color: '#E11D48' },
    { id: 'cat6', label: 'Servicios', icon: 'home', color: '#22C55E' },
    { id: 'cat7', label: 'Mascotas', icon: 'pets', color: '#EF4444' },
    { id: 'cat8', label: 'Tech', icon: 'smartphone', color: '#475569' },
    { id: 'cat9', label: 'Fitness', icon: 'sports-gymnastics', color: '#0284C7' },
];

export const PROMOTIONS: Promotion[] = [
    {
        id: 'p1',
        title: 'CARLOS, APROVECHA EL\n2X1 EN SUSHI 🍣',
        subtitle: 'Solo este fin de semana',
        footer: 'PEDIR AHORA',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
        color: '#F97316',
        tag: 'PREMIUM DEAL'
    },
    {
        id: 'p2',
        title: 'HAMBURGUESAS -\n50% OFF YA! 🔥',
        subtitle: 'En locales seleccionados',
        footer: 'VER OFERTAS',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
        color: '#EA580C',
        tag: 'SÚPER OFERTA'
    },
    {
        id: 'p3',
        title: 'ENVÍO GRATIS EN TU\nPRIMERA COMPRA 🛵',
        subtitle: 'Válido hoy por ser tu primer día',
        footer: 'APROVECHAR',
        image: 'https://images.unsplash.com/photo-1526367793999-111050a1f305?auto=format&fit=crop&q=80&w=800',
        color: '#6B21A8',
        tag: 'CORTESÍA'
    }
];

export const FEATURED_OFFERS: Offer[] = [
    {
        id: '1',
        title: 'Sushi Zen Master',
        subtitle: 'Japonesa • 1.2km',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
        discount: '-50% OFF',
        tagColor: 'w-orange',
        isOpen: true,
        rating: 4.8,
        category: 'Comida',
        price: 35.00,
        location: 'San Isidro, Lima',
        latitude: -12.0921,
        longitude: -77.0302
    },
    {
        id: '2',
        title: 'Pase Diario Gym Fit',
        subtitle: 'Fitness • 0.8km',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
        tag: 'GRATIS',
        tagColor: 'w-purple',
        expiresIn: '24h Left',
        category: 'Fitness',
        price: 0.00,
        location: 'Miraflores, Lima',
        latitude: -12.1190,
        longitude: -77.0285
    },
    {
        id: '3',
        title: 'Cena Romántica Italian',
        subtitle: 'Italiana • 2.5km',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800',
        discount: 'Vino Gratis',
        tagColor: 'w-red',
        rating: 4.9,
        category: 'Comida',
        price: 45.00,
        location: 'Barranco, Lima',
        latitude: -12.1485,
        longitude: -77.0210
    }
];

export const LIST_OFFERS: Offer[] = [
    // COMIDA
    {
        id: '101',
        title: 'Burger King',
        subtitle: 'Comida Rápida • 1.2km',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
        discount: '-30%',
        rating: 4.5,
        price: 12.50,
        originalPrice: 18.00,
        isOpen: true,
        distance: '1.2km',
        category: 'Comida',
        location: 'Surco, Lima',
        latitude: -12.1287,
        longitude: -76.9856
    },
    {
        id: '102',
        title: 'Starbucks Coffee',
        subtitle: 'Cafetería • 0.5km',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
        distance: '0.5km',
        category: 'Comida',
        price: 5.50
    },
    {
        id: '102b',
        title: 'La Pizzería Di Roma',
        subtitle: 'Pizza • 1.8km',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
        category: 'Comida',
        price: 15.00,
        rating: 4.6
    },

    // SALUD
    {
        id: '103',
        title: 'Clínica Dental Sonrisas',
        subtitle: 'Salud • 2.0km',
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
        discount: '-40%',
        rating: 4.9,
        isOpen: true,
        distance: '2.0km',
        category: 'Salud',
        price: 80.00
    },
    {
        id: '104',
        title: 'Dra. Elena Psicología',
        subtitle: 'Salud • 1.5km',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
        discount: '1ª Cita Gratis',
        rating: 5.0,
        isOpen: true,
        distance: '1.5km',
        category: 'Salud',
        price: 50.00
    },
    {
        id: '104b',
        title: 'Óptica Visión Clara',
        subtitle: 'Salud • 0.9km',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
        category: 'Salud',
        price: 120.00,
        rating: 4.7
    },

    // TIENDAS
    {
        id: '201',
        title: 'Moda Urban Style',
        subtitle: 'Tiendas • 0.5km',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
        category: 'Tiendas',
        price: 25.00,
        discount: '-20% Todo'
    },
    {
        id: '202',
        title: 'Librería El Ateneo',
        subtitle: 'Tiendas • 1.1km',
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
        category: 'Tiendas',
        price: 18.00,
        rating: 4.9
    },
    {
        id: '203',
        title: 'Gadget World',
        subtitle: 'Tiendas • 2.2km',
        image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800',
        category: 'Tiendas',
        price: 45.00,
        discount: 'Outlet'
    },

    // BELLEZA
    {
        id: '105',
        title: 'Studio Glamour',
        subtitle: 'Belleza • 0.3km',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
        discount: '2x1 Corte',
        rating: 4.7,
        isOpen: true,
        distance: '0.3km',
        category: 'Belleza',
        price: 25.00
    },
    {
        id: '105b',
        title: 'Nails & Co',
        subtitle: 'Belleza • 0.1km',
        image: 'https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Belleza',
        price: 35.00,
        rating: 4.8
    },
    {
        id: '105c',
        title: 'Barbería "El Clásico"',
        subtitle: 'Belleza • 1.2km',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
        category: 'Belleza',
        price: 20.00,
        rating: 4.9
    },

    // OCIO
    {
        id: '301',
        title: 'Cinepolis Premier',
        subtitle: 'Ocio • 1.5km',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
        category: 'Ocio',
        price: 12.00,
        discount: '2x1 Martes'
    },
    {
        id: '302',
        title: 'Bolera Extreme',
        subtitle: 'Ocio • 3.0km',
        image: 'https://images.unsplash.com/photo-1614032684758-a991f63d7014?auto=format&fit=crop&q=80&w=800',
        category: 'Ocio',
        price: 15.00,
        rating: 4.4
    },
    {
        id: '303',
        title: 'Escape Room Mistery',
        subtitle: 'Ocio • 0.7km',
        image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=800',
        category: 'Ocio',
        price: 22.00,
        rating: 4.9
    },

    // MASCOTAS
    {
        id: '401',
        title: 'Veterinaria Zoo',
        subtitle: 'Mascotas • 2.5km',
        image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800',
        category: 'Mascotas',
        price: 40.00,
        rating: 4.8
    },
    {
        id: '402',
        title: 'Pet Shop Delicias',
        subtitle: 'Mascotas • 0.4km',
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
        category: 'Mascotas',
        price: 10.00,
        discount: '-30% Alimentos'
    },
    {
        id: '403',
        title: 'Peluquería Canina',
        subtitle: 'Mascotas • 1.1km',
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
        category: 'Mascotas',
        price: 30.00,
        rating: 4.7
    },

    // TECH
    {
        id: '501',
        title: 'Apple Reseller',
        subtitle: 'Tech • 2.0km',
        image: 'https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?auto=format&fit=crop&q=80&w=800',
        category: 'Tech',
        price: 999.00,
        discount: 'Bonus $100'
    },
    {
        id: '502',
        title: 'Servicio Técnico Pro',
        subtitle: 'Tech • 0.8km',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
        category: 'Tech',
        price: 45.00,
        rating: 4.9
    },
    {
        id: '503',
        title: 'Gamer Zone Store',
        subtitle: 'Tech • 1.4km',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800',
        category: 'Tech',
        price: 60.00,
        discount: 'Pre-order'
    },

    // FITNESS
    {
        id: '601',
        title: 'Yoga Studio Namaste',
        subtitle: 'Fitness • 0.5km',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
        category: 'Fitness',
        price: 15.00,
        rating: 5.0
    },
    {
        id: '602',
        title: 'CrossFit Box X',
        subtitle: 'Fitness • 1.2km',
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800',
        category: 'Fitness',
        price: 20.00,
        rating: 4.8
    },
    {
        id: '603',
        title: 'Natación Olímpica',
        subtitle: 'Fitness • 3.5km',
        image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800',
        category: 'Fitness',
        price: 25.00,
        discount: 'Solo socios'
    },

    // SERVICIOS
    {
        id: '701',
        title: 'Limpieza Express Hogar',
        subtitle: 'Servicios • 0.8km',
        image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800',
        category: 'Servicios',
        price: 35.00,
        rating: 4.8
    },
    {
        id: '702',
        title: 'Pro Plomería 24/7',
        subtitle: 'Servicios • 1.2km',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800',
        category: 'Servicios',
        price: 50.00,
        rating: 4.7
    },
    {
        id: '703',
        title: 'Electricista Certificado',
        subtitle: 'Servicios • 2.0km',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
        category: 'Servicios',
        price: 45.00,
        rating: 4.6
    },
    {
        id: '704',
        title: 'Lavado de Alfombras VIP',
        subtitle: 'Servicios • 1.5km',
        image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800',
        category: 'Servicios',
        price: 25.00,
        rating: 4.9
    },
    {
        id: '705',
        title: 'Fumigación Hogar Seguro',
        subtitle: 'Servicios • 3.1km',
        image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Servicios',
        price: 60.00,
        rating: 4.5
    }
];

export const MOCK_SERVICES: Offer[] = [...FEATURED_OFFERS, ...LIST_OFFERS];

export const COUPONS = [
    { id: 1, shop: 'Bistro Central', offer: '-30%', detail: 'EN TU CUENTA FINAL', desc: 'Cocina de autor. Válido solo hoy.', timer: '08h 30m', code: 'BISTRO30', color: '#F43F5E', bg: '#FFF1F2', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400', tag: '¡ÚLTIMAS HORAS!' },
    { id: 2, shop: 'StreetWear Co.', offer: '$200', detail: 'DE REGALO', desc: 'En compras mayores a $999 MXN.', expiry: '30 Oct', code: 'STREET200', color: '#0EA5E9', bg: '#F0F9FF', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400', tag: 'MODA' },
    { id: 3, shop: 'Zen Spa Deluxe', offer: '2x1', detail: 'MASAJE RELAJANTE', desc: 'Tratamientos seleccionados.', timer: '2d 12h', code: 'ZEN2X1', color: '#10B981', bg: '#ECFDF5', img: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?auto=format&fit=crop&q=80&w=400', tag: 'BIENESTAR' },
    { id: 4, shop: 'Iron Gym', offer: '-15%', detail: 'MEMBRESÍA MENSUAL', desc: 'Acceso total a las instalaciones.', expiry: '05 Nov', code: 'IRON15', color: '#F59E0B', bg: '#FFFBEB', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400', tag: 'FITNESS' },
    { id: 5, shop: 'Paseo Canino', offer: 'Gratis', detail: 'PRIMER PASEO', desc: 'Confianza y cuidado para tu mascota.', timer: '15h 20m', code: 'DOGFREE', color: '#64748B', bg: '#F8FAFC', img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400', tag: 'PETS' },
    { id: 6, shop: 'Sushi Master', offer: '-20%', detail: 'ROLLS ESPECIALES', desc: 'Exclusivo pedidos online.', expiry: '12 Nov', code: 'SUSHI20', color: '#EF4444', bg: '#FEF2F2', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400', tag: 'COMIDA' }
];
