export const CATEGORY_GRADIENTS: { [key: string]: [string, string] } = {
    'Comida': ['#FFB473', '#F97316'],
    'Salud': ['#38BDF8', '#0EA5E9'],
    'Tiendas': ['#C084FC', '#9333EA'],
    'Belleza': ['#FB7185', '#E11D48'],
    'Servicios': ['#4ADE80', '#22C55E'],
    'Mascotas': ['#FCA5A5', '#EF4444'],
    'Tech': ['#94A3B8', '#475569'],
    'Fitness': ['#7DD3FC', '#0284C7'],
    'Ocio': ['#A78BFA', '#7C3AED'],
    'Todos': ['#4ADE80', '#22C55E'],
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
