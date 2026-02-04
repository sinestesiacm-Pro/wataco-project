import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, FlatList, Keyboard, Dimensions, Modal, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';

import { useCart } from '@/context/CartContext';
import { CATEGORIES, MOCK_SERVICES } from '@/constants/mockData';
import { Offer } from '@/lib/types';
import { getCategoryGradient, getCategoryColor } from '@/lib/theme';
import { NeumorphicIcon } from '@/components/NeumorphicIcon';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const mapStyleDark = [
    { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
    { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] },
    { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] },
    { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },
    { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] },
    { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] },
    { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] },
    { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] },
    { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] },
    { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] },
    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] },
    { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }
];

export default function SearchScreen() {
    const router = useRouter();
    const isFocused = useIsFocused();
    const params = useLocalSearchParams();
    const { addToCart, cartCount, themeColor, setThemeColor, isDarkMode, activeCategory, setActiveCategory } = useCart();

    const mapRef = useRef<MapView>(null);
    const tabsScrollRef = useRef<ScrollView>(null);

    // Auto-scroll categories
    useEffect(() => {
        const index = CATEGORIES.findIndex(c => c.label === activeCategory);
        if (index !== -1 && tabsScrollRef.current && isFocused) {
            // Approximation of tab width (around 120px each with gap)
            tabsScrollRef.current.scrollTo({ x: index * 120, animated: true });
        }
    }, [activeCategory, isFocused]);

    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState<Offer[]>(MOCK_SERVICES);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
    const [locationLabel, setLocationLabel] = useState('Detectando ubicación...');

    // Detailed Filters
    const [sortBy, setSortBy] = useState('Recomendados');
    const [priceRange, setPriceRange] = useState<string | null>(null);
    const [onlyOpen, setOnlyOpen] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationLabel('Ubicación predeterminada');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location);

            // Reverse geocode to get city name
            try {
                const reverseGeocoded = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });
                if (reverseGeocoded.length > 0) {
                    const place = reverseGeocoded[0];
                    setLocationLabel(`${place.district || place.city || 'Tu zona'}, ${place.region || 'Lima'}`.toUpperCase());
                }
            } catch (error) {
                console.log("Geocode error:", error);
                setLocationLabel("Ubicación actual");
            }

            // Animate map to user
            mapRef.current?.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000);
        })();
    }, []);

    // Initial load from params (only on first mount with specific link)
    useEffect(() => {
        if (params.category && isFocused) {
            const catStr = params.category as string;
            const normalizedCat = catStr.charAt(0).toUpperCase() + catStr.slice(1).toLowerCase();
            if (activeCategory !== normalizedCat) {
                setActiveCategory(normalizedCat);
            }
        }
        if (params.q && params.q !== searchQuery) {
            setSearchQuery(params.q as string);
        }
    }, [params, isFocused]); // Still sync with params but only when focused

    // Filter Logic
    useEffect(() => {
        let results = [...MOCK_SERVICES];

        // 1. Category Filter
        if (activeCategory !== 'Todos') {
            results = results.filter(item =>
                item.category === activeCategory ||
                (item.category && item.category.toLowerCase() === activeCategory.toLowerCase())
            );
        }

        // 2. Search Query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            results = results.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.subtitle.toLowerCase().includes(query)
            );
        }

        // 3. Price Filter (Mock Logic)
        if (priceRange) {
            // In a real app we'd have price data, using category for mock mapping
            if (priceRange === '€') results = results.filter(i => (i.category === 'Comida' || i.category === 'Café'));
            if (priceRange === '€€€') results = results.filter(i => (i.category === 'Premium' || i.category === 'Spa'));
        }

        // 4. Open Only
        if (onlyOpen) {
            results = results.filter(item => item.isOpen);
        }

        // 5. Sorting
        if (sortBy === 'Más cercano') {
            // Mock sort by id length as distance proxy
            results.sort((a, b) => a.id.length - b.id.length);
        } else if (sortBy === 'Mejor valorados') {
            results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }

        setFilteredResults(results);
    }, [searchQuery, activeCategory, sortBy, priceRange, onlyOpen]);

    // Handlers
    const handleMyLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        let location = await Location.getCurrentPositionAsync({});
        mapRef.current?.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }, 1000);
    };

    const handleCategorySelect = (catLabel: string) => {
        setActiveCategory(catLabel);
    };

    const handleSearchSubmit = () => {
        Keyboard.dismiss();
        // setIsSearching(true); // Removed as isSearching is from context
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setActiveCategory('Todos');
        // setIsSearching(false); // Removed as isSearching is from context
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
            style={[styles.resultCard, isDarkMode && styles.resultCardDark]}
            onPress={() => {
                const lat = -12.1190 + (parseInt(item.id.replace(/\D/g, '') || '0') % 50 - 25) * 0.0002;
                const lon = -77.0285 + (parseInt(item.id.replace(/\D/g, '') || '0') % 50 - 25) * 0.0002;
                mapRef.current?.animateToRegion({
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }, 1000);
            }}
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

    const isSearching = searchQuery.length > 0 || (activeCategory && activeCategory !== 'Todos');

    const renderDashboard = () => (
        <View>
            {/* Categories Grid */}
            <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle, isDarkMode && { color: '#E2E8F0' }]}>CATEGORÍAS</Text>
                <View style={styles.categoriesGrid}>
                    {CATEGORIES.map(c => (
                        <TouchableOpacity
                            key={c.label}
                            onPress={() => handleCategorySelect(c.label)}
                            style={[
                                styles.categoryGridItem,
                                activeCategory === c.label && { transform: [{ scale: 1.05 }] }
                            ]}
                        >
                            <View style={[
                                styles.categoryIconBox,
                                { backgroundColor: isDarkMode ? '#1E293B' : '#fff' },
                                activeCategory === c.label && {
                                    backgroundColor: c.color,
                                    shadowColor: c.color,
                                    shadowOpacity: 0.4,
                                    shadowRadius: 10,
                                    elevation: 6
                                }
                            ]}>
                                <MaterialIcons
                                    name={c.icon as any}
                                    size={28}
                                    color={activeCategory === c.label ? '#fff' : (isDarkMode ? '#94A3B8' : '#64748B')}
                                />
                            </View>
                            <Text style={[
                                styles.categoryGridLabel,
                                isDarkMode && { color: '#94A3B8' },
                                activeCategory === c.label && { color: themeColor, fontWeight: '900' }
                            ]}>
                                {c.label.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Popular Businesses */}
            <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle, isDarkMode && { color: '#E2E8F0' }]}>NEGOCIOS TOP</Text>
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
                <Text style={[styles.sectionTitle, isDarkMode && { color: '#E2E8F0' }]}>OFERTAS CERCA DE TI</Text>
                <View style={{ paddingHorizontal: 20, gap: 16 }}>
                    {MOCK_SERVICES.slice(0, 5).map(item => (
                        <View key={`feed-${item.id}`}>
                            {renderResultItem({ item })}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            {isFocused && <StatusBar style="light" backgroundColor={themeColor} animated={false} />}
            <Modal
                animationType="fade"
                transparent={true}
                visible={filterModalVisible}
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setFilterModalVisible(false)}
                >
                    <View style={[styles.modalContent, isDarkMode && { backgroundColor: '#1E293B' }]}>
                        <View style={styles.modalIndicator} />
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, isDarkMode && { color: '#E2E8F0' }]}>FILTRAR Y ORDENAR</Text>
                            <TouchableOpacity onPress={() => {
                                setSortBy('Recomendados');
                                setPriceRange(null);
                                setOnlyOpen(false);
                            }}>
                                <Text style={{ color: themeColor, fontWeight: '700', fontSize: 12 }}>LIMPIAR</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.filterGroupTitle, isDarkMode && { color: '#94A3B8' }]}>ORDENAR POR</Text>
                        <View style={styles.filterOptions}>
                            {['Recomendados', 'Más cercano', 'Mejor valorados'].map(opt => (
                                <TouchableOpacity key={opt} style={styles.filterOption} onPress={() => setSortBy(opt)}>
                                    <Text style={[styles.filterOptionText, isDarkMode && { color: '#E2E8F0' }, sortBy === opt && { color: themeColor }]}>{opt}</Text>
                                    <View style={[styles.radioOuter, isDarkMode && { borderColor: '#475569' }, sortBy === opt && { borderColor: themeColor, borderWidth: 6 }]} />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={[styles.filterGroupTitle, isDarkMode && { color: '#94A3B8' }]}>PRECIO</Text>
                        <View style={styles.priceOptions}>
                            {['€', '€€', '€€€'].map(price => (
                                <TouchableOpacity
                                    key={price}
                                    style={[
                                        styles.priceOption,
                                        priceRange === price && { backgroundColor: themeColor, borderColor: themeColor },
                                        isDarkMode && { backgroundColor: '#334155', borderColor: '#475569' },
                                        isDarkMode && priceRange === price && { backgroundColor: themeColor }
                                    ]}
                                    onPress={() => setPriceRange(priceRange === price ? null : price)}
                                >
                                    <Text style={[styles.priceOptionText, (priceRange === price || (isDarkMode && !priceRange)) && { color: '#fff' }]}>{price}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.switchOption}>
                            <Text style={[styles.filterOptionText, isDarkMode && { color: '#E2E8F0' }]}>Solo abiertos ahora</Text>
                            <TouchableOpacity
                                style={[styles.switchBase, onlyOpen && { backgroundColor: themeColor }]}
                                onPress={() => setOnlyOpen(!onlyOpen)}
                            >
                                <View style={[styles.switchCircle, onlyOpen && { transform: [{ translateX: 20 }] }]} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[styles.applyButton, { backgroundColor: themeColor }]}
                            onPress={() => setFilterModalVisible(false)}
                        >
                            <Text style={styles.applyButtonText}>MOSTRAR {filteredResults.length} RESULTADOS</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {isFocused && <StatusBar style="light" backgroundColor={themeColor} animated={false} />}

            <View style={[styles.headerContainer, { backgroundColor: themeColor }]} pointerEvents="box-none">
                <SafeAreaView edges={['top']} style={styles.safeHeader} pointerEvents="box-none">
                    <View style={styles.topRow} pointerEvents="box-none">
                        <View pointerEvents="box-none">
                            <View style={styles.headerTop} pointerEvents="box-none">
                                <TouchableOpacity style={styles.locationSelector}>
                                    <MaterialIcons name="location-on" size={16} color="#fff" />
                                    <Text style={styles.locationTextHeader}>Centro Histórico</Text>
                                    <MaterialIcons name="expand-more" size={16} color="#fff" />
                                </TouchableOpacity>
                                <Text style={[styles.headerTitle, isDarkMode && styles.headerTitleDark]}>DESCUBRE <Text style={styles.brandAccent}>WATACO</Text></Text>
                            </View>
                            <Text style={styles.headerBigTitle}>EXPLORAR</Text>
                            <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.7)' }]}>DESCUBRE TU CIUDAD</Text>
                        </View>
                        <View style={styles.headerActions} pointerEvents="box-none">
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
                    <View style={styles.searchContainer} pointerEvents="box-none">
                        <View style={[styles.searchBar, isDarkMode && { backgroundColor: '#334155' }]}>
                            <MaterialIcons name="search" size={24} color={isDarkMode ? '#94A3B8' : '#94A3B8'} />
                            <TextInput
                                style={[styles.searchInput, isDarkMode && { color: '#E2E8F0' }]}
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
                    <ScrollView ref={tabsScrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
                        <TouchableOpacity
                            style={[styles.filterBtn, { backgroundColor: isDarkMode ? '#334155' : '#fff' }]}
                            onPress={() => setFilterModalVisible(true)}
                        >
                            <MaterialIcons name="tune" size={20} color={themeColor} />
                        </TouchableOpacity>
                        {CATEGORIES.map(c => (
                            <TouchableOpacity
                                key={c.label}
                                onPress={() => handleCategorySelect(c.label)}
                                style={[
                                    styles.tabItem,
                                    isDarkMode && { backgroundColor: '#334155', borderColor: '#475569' },
                                    activeCategory === c.label && {
                                        backgroundColor: getCategoryColor(c.label),
                                        borderColor: '#fff',
                                        transform: [{ scale: 1.05 }]
                                    }
                                ]}
                            >
                                <MaterialIcons
                                    name={c.icon as any}
                                    size={18}
                                    color={activeCategory === c.label ? '#fff' : (isDarkMode ? '#CBD5E1' : '#64748B')}
                                    style={{ marginRight: 6 }}
                                />
                                <Text style={[
                                    styles.tabLabel,
                                    activeCategory === c.label && styles.activeTabLabel,
                                    isDarkMode && activeCategory !== c.label && styles.tabLabelDark
                                ]}>{c.label.toUpperCase()}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Global Professional Map (Always Visible at Top) */}
                <View style={[styles.sectionContainer, { marginBottom: 10 }]}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={[styles.sectionTitle, isDarkMode && { color: '#E2E8F0' }]}>
                            {searchQuery.length > 0 ? `RESULTADOS EN EL MAPA (${filteredResults.length})` : locationLabel}
                        </Text>
                        <TouchableOpacity style={styles.mapActionBtn} onPress={handleMyLocation}>
                            <MaterialIcons name="my-location" size={20} color={themeColor} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.mapCardContainer, isDarkMode && styles.mapCardContainerDark]}>
                        <MapView
                            ref={mapRef}
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            initialRegion={{
                                latitude: -12.1190,
                                longitude: -77.0285,
                                latitudeDelta: 0.012,
                                longitudeDelta: 0.012,
                            }}
                            customMapStyle={isDarkMode ? mapStyleDark : []}
                        >
                            {(searchQuery.length > 0 ? filteredResults : MOCK_SERVICES).slice(0, 15).map((service) => {
                                const lat = -12.1190 + (parseInt(service.id.replace(/\D/g, '') || '0') % 50 - 25) * 0.0002;
                                const lon = -77.0285 + (parseInt(service.id.replace(/\D/g, '') || '0') % 50 - 25) * 0.0002;
                                return (
                                    <Marker
                                        key={`marker-${service.id}`}
                                        coordinate={{ latitude: lat, longitude: lon }}
                                    >
                                        <View style={[styles.customMarker, { backgroundColor: getCategoryColor(service.category || 'Todos') }]}>
                                            <MaterialIcons name={CATEGORIES.find(c => c.label === service.category)?.icon as any || 'location-on'} size={14} color="#fff" />
                                        </View>
                                        <Callout tooltip onPress={() => router.push(`/details/${service.id}`)}>
                                            <BlurView intensity={90} tint={isDarkMode ? "dark" : "light"} style={styles.calloutContainer}>
                                                <Text style={[styles.calloutTitle, isDarkMode && { color: '#fff' }]}>{service.title}</Text>
                                                <Text style={styles.calloutSubtitle}>{service.category}</Text>
                                                <View style={[styles.calloutAction, { backgroundColor: themeColor }]}>
                                                    <Text style={styles.calloutActionText}>VER MÁS</Text>
                                                </View>
                                            </BlurView>
                                        </Callout>
                                    </Marker>
                                );
                            })}
                        </MapView>

                        {/* Floating Map Overlay */}
                        <View style={styles.mapOverlay}>
                            <BlurView intensity={80} tint={isDarkMode ? "dark" : "light"} style={styles.mapBlur}>
                                <MaterialIcons name="layers" size={16} color={themeColor} />
                                <Text style={[styles.mapOverlayText, isDarkMode && { color: '#fff' }]}>VISTA HÍBRIDA</Text>
                            </BlurView>
                        </View>
                    </View>
                </View>

                {isSearching ? (
                    <View style={styles.resultsContainer}>
                        <View style={styles.resultsHeaderRow}>
                            <Text style={[styles.resultsCount, isDarkMode && { color: '#94A3B8' }]}>
                                {filteredResults.length} NEGOCIOS ENCONTRADOS
                            </Text>
                            <View style={styles.resultsDivider} />
                        </View>
                        {filteredResults.length > 0 ? (
                            filteredResults.map(item => (
                                <View key={item.id} style={{ marginBottom: 20 }}>
                                    {renderResultItem({ item })}
                                </View>
                            ))
                        ) : (
                            <View style={styles.emptyState}>
                                <View style={[styles.emptyIcon, isDarkMode && { backgroundColor: '#334155' }]}>
                                    <MaterialIcons name="search-off" size={40} color="#CBD5E1" />
                                </View>
                                <Text style={[styles.emptyTitle, isDarkMode && { color: '#E2E8F0' }]}>SIN RESULTADOS</Text>
                                <Text style={[styles.emptyText, isDarkMode && { color: '#94A3B8' }]}>
                                    {searchQuery.length > 0
                                        ? `No encontramos nada para "${searchQuery}"`
                                        : `No hay ofertas disponibles en ${activeCategory}`
                                    }
                                </Text>
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
    containerDark: {
        backgroundColor: '#0F172A',
    },
    headerContainer: {
        borderBottomWidth: 0,
        zIndex: 110,
        elevation: 4,
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
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    locationSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    locationTextHeader: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 2,
    },
    headerTitleDark: {
        color: '#fff',
    },
    brandAccent: {
        color: '#fff',
        opacity: 0.8,
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
        paddingTop: 8,
        paddingBottom: 12,
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
    tabLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    tabLabelDark: {
        color: 'rgba(255,255,255,0.4)',
    },
    activeTabLabel: {
        color: '#fff',
    },
    categoryLabel: {
        fontSize: 9,
        fontWeight: '900',
        color: '#64748B',
        textAlign: 'center',
    },
    categoryLabelDark: {
        color: '#94A3B8',
    },
    activeCategoryLabel: {
        color: '#0F172A',
    },
    activeCategoryLabelDark: {
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
        marginBottom: 16,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    mapActionBtn: {
        padding: 4,
    },
    mapCardContainer: {
        marginHorizontal: 20,
        height: 300,
        borderRadius: 32,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    mapCardContainerDark: {
        backgroundColor: '#1E293B',
        borderColor: 'rgba(255,255,255,0.05)',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    customMarker: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    mapOverlay: {
        position: 'absolute',
        top: 16,
        right: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    mapBlur: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 8,
    },
    mapOverlayText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: 1,
    },
    resultsHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 12,
    },
    resultsCount: {
        fontSize: 10,
        fontWeight: '900',
        color: '#64748B',
        letterSpacing: 1,
    },
    resultsDivider: {
        flex: 1,
        height: 1,
        backgroundColor: '#F1F5F9',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        gap: 16,
    },
    categoryGridItem: {
        width: (SCREEN_WIDTH - 40 - 48) / 4,
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
        height: SCREEN_WIDTH * 0.6,
        borderRadius: 32,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
    },
    resultCardDark: {
        backgroundColor: '#1E293B',
        shadowOpacity: 0.3,
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
    header: {
        paddingBottom: 20,
    },
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
    modalIndicator: {
        width: 40,
        height: 4,
        backgroundColor: '#E2E8F0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 12,
    },
    seeAllText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    activeDot: {
        position: 'absolute',
        bottom: -4,
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    priceOptions: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    priceOption: {
        flex: 1,
        height: 44,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    priceOptionText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#64748B',
    },
    switchOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    switchBase: {
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E2E8F0',
        padding: 2,
    },
    switchCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    calloutContainer: {
        padding: 12,
        borderRadius: 20,
        minWidth: 160,
        maxWidth: 200,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        overflow: 'hidden',
    },
    calloutTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 2,
    },
    calloutSubtitle: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    calloutAction: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    calloutActionText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1,
    },
});
