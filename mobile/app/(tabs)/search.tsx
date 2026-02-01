import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, FlatList, Keyboard, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { useCart } from '@/context/CartContext';
import { CATEGORIES, MOCK_SERVICES } from '@/constants/mockData';
import { Offer } from '@/lib/types';
import { getCategoryGradient, getCategoryColor } from '@/lib/theme';
import { NeumorphicIcon } from '@/components/NeumorphicIcon';

const { width } = Dimensions.get('window');

export default function SearchScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { addToCart, cartCount, themeColor, setThemeColor } = useCart();

    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [filteredResults, setFilteredResults] = useState<Offer[]>(MOCK_SERVICES);
    const [isSearching, setIsSearching] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    // Initial load from params
    useEffect(() => {
        if (params.category) {
            const catStr = params.category as string;
            const normalizedCat = catStr.charAt(0).toUpperCase() + catStr.slice(1).toLowerCase();
            setActiveCategory(normalizedCat);
            setIsSearching(true);
        }
        if (params.q) {
            setSearchQuery(params.q as string);
            setIsSearching(true);
        }
    }, [params]);

    // Filter Logic
    useEffect(() => {
        let results = MOCK_SERVICES;

        if (activeCategory !== 'Todos') {
            results = results.filter(item =>
                item.category === activeCategory ||
                (item.category && item.category.toLowerCase() === activeCategory.toLowerCase())
            );
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            results = results.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.subtitle.toLowerCase().includes(query)
            );
        }

        setFilteredResults(results);
    }, [searchQuery, activeCategory]);

    // Handlers
    const handleCategorySelect = (catLabel: string) => {
        setActiveCategory(catLabel);
        setIsSearching(true);
        setThemeColor(getCategoryColor(catLabel));
    };

    const handleSearchSubmit = () => {
        Keyboard.dismiss();
        setIsSearching(true);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setActiveCategory('Todos');
        setIsSearching(false);
        Keyboard.dismiss();
        router.setParams({ category: '', q: '' });
    };

    const handleAddToCart = (item: any) => {
        addToCart({
            id: item.id || Date.now() + Math.random(),
            name: item.title,
            price: item.price || 15.0,
            img: item.image,
            quantity: 1,
            type: 'service',
            shop: item.shop || item.title
        });
    };

    // Render Helpers
    const renderResultItem = ({ item }: { item: Offer }) => (
        <TouchableOpacity
            activeOpacity={0.95}
            style={styles.resultCard}
            onPress={() => router.push(`/details/${item.id}`)}
        >
            <Image source={{ uri: item.image }} style={styles.resultImage} resizeMode="cover" />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradientOverlay}
            />

            {item.discount && (
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                </View>
            )}

            <View style={styles.ratingBadge}>
                <MaterialIcons name="star" size={12} color="#FACC15" />
                <Text style={styles.ratingText}>{item.rating || 4.5}</Text>
            </View>

            <View style={styles.resultContent}>
                <Text style={styles.resultShop}>{item.subtitle}</Text>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <View style={styles.resultDetails}>
                    <View style={styles.detailRow}>
                        <MaterialIcons name="location-on" size={14} color="#CBD5E1" />
                        <Text style={styles.detailText}>{item.distance || '1.2km'}</Text>
                    </View>
                    <View style={styles.dotSeparator} />
                    <Text style={[styles.statusText, { color: item.isOpen ? '#22C55E' : '#94A3B8' }]}>
                        {item.isOpen ? 'Abierto' : 'Cerrado'}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.claimButton, { backgroundColor: themeColor, shadowColor: themeColor }]}
                    onPress={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                    }}
                >
                    <Text style={styles.claimText}>RECLAMAR</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const renderDashboard = () => (
        <View>
            {/* Main Categories Grid */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>CATEGORÍAS PRINCIPALES</Text>
                <View style={styles.categoriesGrid}>
                    {CATEGORIES.map((cat) => {
                        const glowColor = getCategoryColor(cat.label);
                        return (
                            <TouchableOpacity
                                key={cat.id}
                                style={styles.categoryGridItem}
                                onPress={() => handleCategorySelect(cat.label)}
                            >
                                <NeumorphicIcon
                                    icon={cat.icon}
                                    glowColor={glowColor}
                                    size={(width - 40 - 48) / 4} // Scale to grid
                                    iconSize={24}
                                    isActive={activeCategory === cat.label}
                                />
                                <Text style={styles.categoryGridLabel}>{cat.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {/* Popular Businesses */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>NEGOCIOS TOP</Text>
                <FlatList
                    data={(MOCK_SERVICES || []).slice(0, 4)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
                    keyExtractor={item => `pop-${item.id}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.popularCard}
                            onPress={() => router.push(`/details/${item.id}`)}
                        >
                            <Image source={{ uri: item.image }} style={styles.popularImage} />
                            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.gradientOverlay} />
                            <View style={styles.popularContent}>
                                <Text style={styles.popularCategory}>POPULAR</Text>
                                <Text style={styles.popularTitle} numberOfLines={1}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Feed */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>FEED DE OPORTUNIDADES</Text>
                <View style={{ paddingHorizontal: 20, gap: 16 }}>
                    {MOCK_SERVICES.slice(0, 3).map(item => (
                        <View key={`feed-${item.id}`}>
                            {renderResultItem({ item })}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Filter Modal - Moved to main return */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={filterModalVisible}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setFilterModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>FILTRAR BÚSQUEDA</Text>
                            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                                <MaterialIcons name="close" size={24} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.filterGroupTitle}>ORDENAR POR</Text>
                        <View style={styles.filterOptions}>
                            {['Más cercano', 'Mejor valorados', 'Novedades'].map(opt => (
                                <TouchableOpacity key={opt} style={styles.filterOption}>
                                    <Text style={styles.filterOptionText}>{opt}</Text>
                                    <View style={styles.radioOuter} />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={[styles.applyButton, { backgroundColor: themeColor }]}
                            onPress={() => setFilterModalVisible(false)}
                        >
                            <Text style={styles.applyButtonText}>APLICAR FILTROS</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            <View style={[styles.headerContainer, { backgroundColor: themeColor }]}>
                <SafeAreaView edges={['top']} style={styles.safeHeader}>
                    <View style={styles.topRow}>
                        <View>
                            <Text style={styles.headerBigTitle}>EXPLORAR</Text>
                            <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.7)' }]}>DESCUBRE TU CIUDAD</Text>
                        </View>
                        <View style={styles.headerActions}>
                            <TouchableOpacity style={styles.headerIconBtn} onPress={() => router.push('/checkout')}>
                                <MaterialIcons name="shopping-bag" size={24} color="#fff" />
                                {cartCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.headerIconBtn} onPress={() => router.push('/notifications')}>
                                <MaterialIcons name="notifications" size={24} color="#fff" />
                                <View style={styles.notifDot} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBar}>
                            <MaterialIcons name="search" size={24} color="#94A3B8" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="BUSCAR EN WATACO..."
                                placeholderTextColor="#94A3B8"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onSubmitEditing={handleSearchSubmit}
                                returnKeyType="search"
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery('')}>
                                    <MaterialIcons name="close" size={20} color="#94A3B8" />
                                </TouchableOpacity>
                            )}
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.goButton,
                                {
                                    backgroundColor: 'rgba(255,255,255,0.25)',
                                    borderColor: 'rgba(255,255,255,0.5)',
                                    borderWidth: 1.5,
                                }
                            ]}
                            onPress={handleSearchSubmit}
                        >
                            <Text style={styles.goText}>IR</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Tabs */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
                        <TouchableOpacity style={styles.filterBtn} onPress={() => setFilterModalVisible(true)}>
                            <MaterialIcons name="tune" size={20} color="#64748B" />
                        </TouchableOpacity>
                        {['Todos', ...CATEGORIES.map(c => c.label)].map((cat) => {
                            const glowColor = getCategoryColor(cat);
                            const isActive = activeCategory === cat;
                            return (
                                <TouchableOpacity
                                    key={cat}
                                    onPress={() => handleCategorySelect(cat)}
                                    style={[
                                        styles.tabItem,
                                        isActive && {
                                            backgroundColor: glowColor,
                                            borderColor: '#fff',
                                            shadowColor: glowColor,
                                            shadowOpacity: 0.6,
                                            shadowRadius: 10,
                                            elevation: 8
                                        }
                                    ]}
                                >
                                    <Text style={[
                                        styles.tabText,
                                        isActive && { color: '#fff', fontWeight: '900' }
                                    ]}>
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </SafeAreaView>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {isSearching || searchQuery.length > 0 ? (
                    <View style={styles.resultsContainer}>
                        {filteredResults.length > 0 ? (
                            filteredResults.map(item => (
                                <View key={item.id} style={{ marginBottom: 20 }}>
                                    {renderResultItem({ item })}
                                </View>
                            ))
                        ) : (
                            <View style={styles.emptyState}>
                                <View style={styles.emptyIcon}>
                                    <MaterialIcons name="search-off" size={40} color="#CBD5E1" />
                                </View>
                                <Text style={styles.emptyTitle}>SIN RESULTADOS</Text>
                                <Text style={styles.emptyText}>No encontramos nada para "{searchQuery}"</Text>
                                <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
                                    <Text style={styles.clearButtonText}>VER TODO</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ) : (
                    renderDashboard()
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    headerContainer: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        zIndex: 100,
    },
    safeHeader: {
        paddingBottom: 10,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        paddingTop: 10,
    },
    headerBigTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -1,
    },
    headerSubtitle: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 2,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 8,
    },
    headerIconBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        // Removed backgrounds for total minimalist look
    },
    iconBtn: {
        width: 44,
        height: 44,
        borderRadius: 16,
        backgroundColor: '#F1F5F9', // Still used in results possibly
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#F43F5E',
        height: 18,
        minWidth: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        borderWidth: 2,
        borderColor: '#fff',
    },
    badgeText: { color: '#fff', fontSize: 9, fontWeight: '900' },
    notifDot: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        backgroundColor: '#0EA5E9',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 16,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 50,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 13,
        fontWeight: '700',
        color: '#0F172A',
        height: '100%',
    },
    goButton: {
        backgroundColor: '#0EA5E9',
        borderRadius: 14,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goText: { color: '#fff', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    tabsContainer: {
        paddingHorizontal: 20,
        gap: 10,
        paddingBottom: 8,
    },
    filterBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    tabItem: {
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTabItem: {
        backgroundColor: '#0EA5E9',
        borderColor: '#0EA5E9',
    },
    tabText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    activeTabText: {
        color: '#fff',
    },
    scrollContent: {
        paddingBottom: 100, // For Bottom Nav
    },
    sectionContainer: {
        marginBottom: 30,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: 2,
        marginLeft: 20,
        marginBottom: 16,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        gap: 16,
    },
    categoryGridItem: {
        width: (width - 40 - 48) / 4,
        alignItems: 'center',
        gap: 8,
    },
    categoryIconBox: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    categoryGridLabel: {
        fontSize: 9,
        fontWeight: '900',
        color: '#64748B',
        textAlign: 'center',
    },
    neumorphicIconBox: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 32,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    glowRing: {
        position: 'absolute',
        width: '110%',
        height: '110%',
        borderRadius: 40,
        borderWidth: 2,
        opacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    whiteCenter: {
        width: '90%',
        height: '90%',
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    popularCard: {
        width: 200,
        height: 250,
        borderRadius: 32,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    popularImage: { width: '100%', height: '100%' },
    popularContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    popularCategory: {
        color: '#0EA5E9',
        fontSize: 9,
        fontWeight: '900',
        marginBottom: 4,
        letterSpacing: 1,
    },
    popularTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    resultsContainer: {
        padding: 20,
    },

    // Result Card Styles
    resultCard: {
        height: 250,
        borderRadius: 32,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
    },
    resultImage: { width: '100%', height: '100%' },
    gradientOverlay: { position: 'absolute', inset: 0 },
    discountBadge: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#F43F5E',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        zIndex: 10,
    },
    discountText: { color: '#fff', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    ratingBadge: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        zIndex: 10,
    },
    ratingText: { fontSize: 10, fontWeight: '900', color: '#0F172A' },
    resultContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        paddingRight: 120, // Add space for claim button
    },
    resultShop: {
        color: '#0EA5E9',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    resultTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '900',
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    resultDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    detailRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    detailText: { color: '#CBD5E1', fontSize: 11, fontWeight: '700' },
    dotSeparator: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#64748B' },
    statusText: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 },
    claimButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#0EA5E9',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
    },
    claimText: { color: '#fff', fontSize: 10, fontWeight: '900', letterSpacing: 1 },

    emptyState: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginBottom: 8 },
    emptyText: { fontSize: 14, color: '#64748B', marginBottom: 30 },
    clearButton: {
        backgroundColor: '#0EA5E9',
        paddingHorizontal: 30,
        paddingVertical: 14,
        borderRadius: 20,
    },
    clearButtonText: { color: '#fff', fontWeight: '900', fontSize: 12 },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: 1,
    },
    filterGroupTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#64748B',
        marginBottom: 16,
        letterSpacing: 1,
    },
    filterOptions: {
        gap: 12,
        marginBottom: 32,
    },
    filterOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    filterOptionText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#334155',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CBD5E1',
    },
    applyButton: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
});
