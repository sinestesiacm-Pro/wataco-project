import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Dimensions, StatusBar, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

import { useCart } from '@/context/CartContext';
import { MOCK_SERVICES, CATEGORIES } from '@/constants/mockData';
import { Offer } from '@/lib/types';
import { getCategoryColor } from '@/lib/theme';

const { width } = Dimensions.get('window');

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart, themeColor, setThemeColor } = useCart();
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const service = MOCK_SERVICES.find(s => s.id === id) || MOCK_SERVICES[0];

    // Sync theme on mount
    React.useEffect(() => {
        if (service.category) {
            setThemeColor(getCategoryColor(service.category));
        }
    }, [service.category]);

    const [liked, setLiked] = useState(false);
    const [selectedDate, setSelectedDate] = useState('Hoy');
    const [selectedTime, setSelectedTime] = useState('14:00');

    // Interpolations for scroll effects
    const headerOpacity = scrollY.interpolate({
        inputRange: [200, 300],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [100, 80], // Becomes thinner
        extrapolate: 'clamp',
    });

    const fusionElevation = scrollY.interpolate({
        inputRange: [250, 300],
        outputRange: [0, 10],
        extrapolate: 'clamp',
    });

    const handleAddToCart = () => {
        addToCart({
            id: Date.now(),
            name: service.title,
            price: service.price || 15.0,
            img: service.image,
            quantity: 1,
            type: 'service',
            shop: service.subtitle // using subtitle as shop name or adding shop field
        });
        router.push('/claim-success');
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="light-content" />

            {/* Hero Image */}
            <View style={styles.heroContainer}>
                <Image source={{ uri: service.image }} style={styles.heroImage} resizeMode="cover" />
                <LinearGradient
                    colors={['rgba(0,0,0,0.6)', 'transparent', 'transparent']}
                    style={styles.heroGradient}
                />
            </View>

            {/* Header Actions */}
            <Animated.View style={[
                styles.header,
                {
                    backgroundColor: themeColor,
                    opacity: headerOpacity,
                    height: headerHeight,
                    paddingTop: Platform.OS === 'ios' ? 40 : 20,
                }
            ]}>
                <StatusBar barStyle="light-content" backgroundColor={themeColor} />
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIconBtn}>
                    <MaterialIcons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{service.title}</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIconBtn}>
                        <MaterialIcons name="search" size={22} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIconBtn}>
                        <MaterialIcons name="share" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {/* Transparent Floating Header (Initial state) */}
            <View style={[styles.floatingHeader, { paddingTop: Platform.OS === 'ios' ? 40 : 20 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.floatingIconBtn}>
                    <MaterialIcons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.floatingIconBtn}>
                        <MaterialIcons name="search" size={22} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.floatingIconBtn}>
                        <MaterialIcons name="share" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Scrollable Content */}
            <Animated.ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <View style={styles.spacer} />

                <View style={styles.contentCard}>
                    <View style={styles.handleBar} />

                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{service.title}</Text>
                        {service.discount && (
                            <View style={styles.discountBadge}>
                                <Text style={styles.discountText}>{service.discount}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.tagsRow}>
                        <View style={styles.tag}>
                            <MaterialIcons name="local-offer" size={16} color="#0EA5E9" />
                            <Text style={styles.tagText}>{service.tag || 'Oferta'}</Text>
                        </View>
                        <View style={[styles.tag, styles.tagGreen]}>
                            <MaterialIcons name="verified" size={16} color="#22C55E" />
                            <Text style={[styles.tagText, styles.tagTextGreen]}>DISPONIBLE</Text>
                        </View>
                    </View>

                    {/* Shop Info */}
                    <View style={styles.shopCard}>
                        <Image source={{ uri: service.image }} style={styles.shopImage} />
                        <View style={styles.shopInfo}>
                            <Text style={styles.shopName}>{service.subtitle}</Text>
                            <View style={styles.ratingRow}>
                                <MaterialIcons name="star" size={16} color="#EAB308" />
                                <Text style={styles.ratingText}>{service.rating || 4.8}</Text>
                                <Text style={styles.dot}>•</Text>
                                <Text style={styles.distanceText}>{service.distance || '0.5km'} de ti</Text>
                            </View>
                        </View>
                        <View style={styles.openBadge}>
                            <Text style={styles.openText}>{service.isOpen ? 'ABIERTO' : 'CERRADO'}</Text>
                        </View>
                    </View>

                    {/* Date Selection */}
                    <Text style={styles.sectionTitle}>SELECCIONA TU HORARIO</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
                        {['Hoy', 'Mañana', 'Lunes 22', 'Martes 23'].map((date) => (
                            <TouchableOpacity
                                key={date}
                                style={[styles.chip, selectedDate === date && { backgroundColor: themeColor }]}
                                onPress={() => setSelectedDate(date)}
                            >
                                <Text style={[styles.chipText, selectedDate === date && styles.selectedChipText]}>{date}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
                        {['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                            <TouchableOpacity
                                key={time}
                                style={[styles.timeChip, selectedTime === time && { backgroundColor: themeColor }]}
                                onPress={() => setSelectedTime(time)}
                            >
                                <Text style={[styles.timeChipText, selectedTime === time && styles.selectedTimeChipText]}>{time}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Description */}
                    <Text style={styles.sectionTitle}>DESCRIPCIÓN</Text>
                    <Text style={styles.description}>
                        Disfruta de una experiencia única con nuestros servicios premium. Calidad garantizada y la mejor atención en el corazón de la ciudad.
                    </Text>

                    {/* Location Placeholder (Map) */}
                    <View style={styles.mapContainer}>
                        <View style={styles.mapHeader}>
                            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>UBICACIÓN</Text>
                            <View style={styles.locationBadge}>
                                <Text style={styles.locationBadgeText}>MIRAFLORES, LIMA</Text>
                            </View>
                        </View>
                        <View style={styles.mapPlaceholder}>
                            <MaterialIcons name="map" size={48} color="#CBD5E1" />
                            <Text style={styles.mapPlaceholderText}>Mapa interactivo próximamente</Text>

                            <TouchableOpacity style={[styles.directionsButton, { backgroundColor: themeColor, shadowColor: themeColor }]}>
                                <MaterialIcons name="directions" size={20} color="#fff" />
                                <Text style={styles.directionsText}>IR AHORA</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 100 }} />
                </View>
            </Animated.ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bookmarkButton}>
                    <MaterialIcons name="bookmark-border" size={24} color="#94A3B8" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.clamButton, { backgroundColor: themeColor, shadowColor: themeColor }]} onPress={handleAddToCart}>
                    <Text style={styles.claimButtonText}>CANJEAR OFERTA</Text>
                    <MaterialIcons name="confirmation-number" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    heroContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 400,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 150,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    floatingHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 80,
        zIndex: 90,
    },
    headerTitle: {
        flex: 1,
        color: '#fff',
        fontSize: 14,
        fontWeight: '900',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginHorizontal: 10,
    },
    headerIconBtn: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingIconBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 8,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    spacer: {
        height: 400,
    },
    contentCard: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        padding: 24,
        minHeight: 500,
        marginTop: -36, // Fusion overlap
    },
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: '#F1F5F9',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 24,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    title: {
        flex: 1,
        fontSize: 24,
        fontWeight: '900',
        color: '#0F172A',
        textTransform: 'uppercase',
        marginRight: 10,
    },
    discountBadge: {
        backgroundColor: '#F43F5E',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        transform: [{ rotate: '3deg' }],
    },
    discountText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
    },
    tagsRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 24,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    tagText: {
        color: '#0EA5E9',
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    tagGreen: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: 'rgba(34, 197, 94, 0.1)',
    },
    tagTextGreen: { color: '#22C55E' },
    shopCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        marginBottom: 32,
    },
    shopImage: {
        width: 56,
        height: 56,
        borderRadius: 16,
        marginRight: 16,
    },
    shopInfo: {
        flex: 1,
    },
    shopName: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#0F172A',
    },
    dot: { color: '#CBD5E1' },
    distanceText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#64748B',
        textDecorationLine: 'underline',
    },
    openBadge: {
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    openText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#22C55E',
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: 1.5,
        marginBottom: 16,
    },
    chipsContainer: {
        gap: 10,
        marginBottom: 20,
    },
    chip: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
    },
    selectedChip: {
        backgroundColor: '#0EA5E9',
    },
    chipText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    selectedChipText: { color: '#fff' },
    timeChip: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
    },
    selectedTimeChip: {
        backgroundColor: '#64748B',
    },
    timeChipText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94A3B8',
    },
    selectedTimeChipText: { color: '#fff' },
    description: {
        fontSize: 14,
        lineHeight: 24,
        color: '#64748B',
        fontWeight: '600',
        marginBottom: 32,
    },
    mapContainer: {
        marginBottom: 32,
    },
    mapHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    locationBadge: {
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    locationBadgeText: {
        color: '#0EA5E9',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1,
    },
    mapPlaceholder: {
        height: 200,
        backgroundColor: '#F1F5F9',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    mapPlaceholderText: {
        marginTop: 8,
        color: '#94A3B8',
        fontSize: 12,
        fontWeight: '700',
    },
    directionsButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#0EA5E9',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 16,
        shadowColor: '#0EA5E9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    directionsText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        flexDirection: 'row',
        gap: 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    bookmarkButton: {
        width: 56,
        height: 56,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clamButton: {
        flex: 1,
        height: 56,
        borderRadius: 20,
        backgroundColor: '#0EA5E9',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#0EA5E9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    claimButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
    },
});

