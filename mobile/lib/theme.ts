export const CATEGORY_GRADIENTS: { [key: string]: [string, string] } = {
    'Comida': ['#FF9838', '#FB5B1B'],
    'Salud': ['#5EEAD4', '#0D9488'],
    'Tiendas': ['#A78BFA', '#7C3AED'],
    'Belleza': ['#F472B6', '#DB2777'],
    'Servicios': ['#6EE7B7', '#059669'],
    'Mascotas': ['#FCA5A5', '#EF4444'],
    'Tech': ['#94A3B8', '#475569'],
    'Fitness': ['#7DD3FC', '#0284C7'],
    'Todos': ['#C084FC', '#9333EA'],
};

export const getCategoryGradient = (categoryLabel: string): [string, string] => {
    return CATEGORY_GRADIENTS[categoryLabel] || CATEGORY_GRADIENTS['Todos'];
};

export const getCategoryColor = (categoryLabel: string): string => {
    return getCategoryGradient(categoryLabel)[1];
};

export const getHeaderColor = (categoryLabel: string): string => {
    return getCategoryGradient(categoryLabel)[1];
};
