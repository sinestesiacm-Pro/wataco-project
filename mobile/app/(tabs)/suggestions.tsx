import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';

import { useCart } from '@/context/CartContext';
import { COUPONS } from '@/constants/mockData';

export default function SuggestionsScreen() {
    const router = useRouter();
    const isFocused = useIsFocused();
    const { isDarkMode } = useCart();
    const [activeCategory, setActiveCategory] = useState("Todos");

    const copyToClipboard = async (code: string) => {
        await Clipboard.setStringAsync(code);
    };

    const renderCoupon = (item: any) => (
        <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={[styles.couponCard, isDarkMode && styles.couponCardDark]}
            onPress={() => router.push(`/details/${item.id}`)}
        >
            <View style={[styles.colorStrip, { backgroundColor: item.color }]} />

            <View style={styles.cardHeader}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.img }} style={styles.shopImage} />
                </View>
                <View style={styles.headerContent}>
                    <View style={styles.tagRow}>
                        <View style={[styles.tag, { backgroundColor: item.bg }]}>
                            <Text style={[styles.tagText, { color: item.color }]}>{item.tag}</Text>
                        </View>
                        {item.timer && (
                            <View style={styles.timerRow}>
                                <MaterialIcons name="timer" size={14} color="#94A3B8" />
                                <Text style={styles.timerText}>{item.timer}</Text>
                            </View>
                        )}
                    </View>
                    <Text style={[styles.shopName, isDarkMode && styles.textLight]}>{item.shop}</Text>
                    <Text style={[styles.description, isDarkMode && styles.textMuted]}>{item.desc}</Text>
                </View>
            </View>

            {/* Perforation Line Visualization */}
            <View style={styles.perforationContainer}>
                <View style={styles.halfCircleLeft} />
                <View style={styles.dashedLine} />
                <View style={styles.halfCircleRight} />
            </View>

            <View style={[styles.cardFooter, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : item.bg }]}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.offerValue, isDarkMode && styles.textLight]}>{item.offer}</Text>
                    <Text style={[styles.offerDetail, isDarkMode && styles.textMuted]}>{item.detail}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.codeButton, isDarkMode && styles.codeButtonDark]}
                    onPress={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.code);
                    }}
                >
                    <Text style={[styles.codeText, isDarkMode && styles.textMuted]}>{item.code}</Text>
                    <MaterialIcons name="content-copy" size={16} color={isDarkMode ? "#94A3B8" : "#64748B"} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            {isFocused && (
                <StatusBar
                    style={isDarkMode ? "light" : "dark"}
                    backgroundColor={isDarkMode ? "#0F172A" : "#F8FAFC"}
                    animated={false}
                />
            )}
            {/* Header */}
            <View style={[styles.headerContainer, isDarkMode && styles.headerContainerDark]}>
                <SafeAreaView edges={['top']} style={styles.safeHeader}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={[styles.headerTitle, isDarkMode && styles.textLight]}>BENEFICIOS</Text>
                            <Text style={styles.headerSubtitle}>EXCLUSIVO WATACO PREMIUM</Text>
                        </View>
                        <TouchableOpacity style={[styles.historyButton, isDarkMode && styles.historyButtonDark]}>
                            <MaterialIcons name="history" size={24} color={isDarkMode ? "#94A3B8" : "#64748B"} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
                        {['Todos', 'Bronce', 'Plata', 'Oro', 'Diamante'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveCategory(tab)}
                                style={[
                                    styles.tab,
                                    isDarkMode && styles.tabDark,
                                    activeCategory === tab && styles.activeTab
                                ]}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeCategory === tab && styles.activeTabText,
                                    isDarkMode && activeCategory !== tab && styles.textMuted
                                ]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </View>

            {/* Content */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {COUPONS.map(renderCoupon)}
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
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        zIndex: 10,
    },
    headerContainerDark: {
        backgroundColor: '#1E293B',
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    safeHeader: {
        paddingBottom: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
        paddingTop: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0F172A',
        textTransform: 'uppercase',
    },
    textLight: {
        color: '#F1F5F9',
    },
    textMuted: {
        color: '#94A3B8',
    },
    headerSubtitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 2,
    },
    historyButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyButtonDark: {
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    tabsContainer: {
        paddingHorizontal: 20,
        gap: 10,
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    tabDark: {
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    activeTab: {
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
        padding: 20,
        gap: 24,
        paddingBottom: 100,
    },

    // Coupon Card
    couponCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    couponCardDark: {
        backgroundColor: '#1E293B',
    },
    colorStrip: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 6,
    },
    cardHeader: {
        flexDirection: 'row',
        padding: 16,
        paddingLeft: 24,
        gap: 16,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#F8FAFC',
    },
    shopImage: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    headerContent: {
        flex: 1,
    },
    tagRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 9,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    timerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timerText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
    },
    shopName: {
        fontSize: 16,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 2,
    },
    description: {
        fontSize: 12,
        color: '#64748B',
    },

    // Perforation
    perforationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 20,
    },
    halfCircleLeft: {
        width: 12,
        height: 24,
        backgroundColor: '#F8FAFC', // Match background
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        marginLeft: -12, // Pull slightly
    },
    dashedLine: {
        flex: 1,
        height: 1,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderStyle: Platform.OS === 'web' ? 'solid' : 'dashed',
        borderRadius: 1,
    },
    halfCircleRight: {
        width: 12,
        height: 24,
        backgroundColor: '#F8FAFC',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        marginRight: -12,
    },

    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingLeft: 24,
        gap: 12,
    },
    offerValue: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0F172A',
    },
    offerDetail: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    codeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#94A3B8',
    },
    codeButtonDark: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderColor: 'rgba(255,255,255,0.2)',
    },
    codeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#475569',
        fontVariant: ['tabular-nums'],
    },
});
