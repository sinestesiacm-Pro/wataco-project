import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import { useCart, ThemeMode } from '@/context/CartContext';

// Mock User Data
const USER = {
    name: 'Dra. Ana López',
    email: 'ana.lopez@wataco.app',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    stats: {
        coupons: 12,
        savings: '$450',
        points: 850
    }
};

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    const router = useRouter();
    const isFocused = useIsFocused();
    const { themeMode, setThemeMode, isDarkMode, hasActiveOrder } = useCart();
    const [settingsExpanded, setSettingsExpanded] = useState(false);


    const renderStat = (value: string | number, label: string, color: string) => (
        <View style={[styles.statBox, isDarkMode && styles.statBoxDark]}>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            <Text style={[styles.statLabel, isDarkMode && styles.textMuted]}>{label}</Text>
        </View>
    );

    const renderMenuButton = (icon: any, label: string, sublabel: string, color: string, bgColor: string, onPress?: () => void) => (
        <TouchableOpacity
            style={[styles.menuButton, isDarkMode && styles.menuButtonDark]}
            onPress={onPress}
        >
            <View style={[styles.menuIconBox, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : bgColor }]}>
                <MaterialIcons name={icon} size={24} color={color} />
            </View>
            <View>
                <Text style={[styles.menuTitle, isDarkMode && styles.textLight]}>{label}</Text>
                <Text style={[styles.menuSubtitle, isDarkMode && styles.textMuted]}>{sublabel}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderThemeOption = (mode: ThemeMode, label: string, icon: string) => {
        const isSelected = themeMode === mode;
        return (
            <TouchableOpacity
                style={[
                    styles.themeOption,
                    isSelected && styles.themeOptionSelected,
                    isDarkMode && styles.themeOptionDark,
                    isDarkMode && isSelected && styles.themeOptionSelectedDark
                ]}
                onPress={() => setThemeMode(mode)}
            >
                <MaterialIcons
                    name={icon as any}
                    size={24}
                    color={isSelected ? '#0EA5E9' : (isDarkMode ? '#94A3B8' : '#64748B')}
                />
                <Text style={[
                    styles.themeOptionText,
                    isSelected && styles.themeOptionTextSelected,
                    isDarkMode && styles.textMuted
                ]}>{label}</Text>
                {isSelected && (
                    <View style={styles.checkmark}>
                        <MaterialIcons name="check-circle" size={20} color="#0EA5E9" />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            {isFocused && (
                <StatusBar
                    style={isDarkMode ? "light" : "dark"}
                    backgroundColor={isDarkMode ? "#0F172A" : "#F8FAFC"}
                    animated={false}
                />
            )}
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Hero Section */}
                    <View style={[styles.card, isDarkMode && styles.cardDark]}>
                        <View style={styles.headerRow}>
                            <Text style={[styles.headerTitle, isDarkMode && styles.textLight]}>MI PERFIL</Text>
                            <TouchableOpacity
                                style={[styles.settingsButton, isDarkMode && styles.settingsButtonDark]}
                                onPress={() => setSettingsExpanded(!settingsExpanded)}
                            >
                                <MaterialIcons name={settingsExpanded ? "close" : "settings"} size={20} color={isDarkMode ? "#CBD5E1" : "#64748B"} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.profileSection}>
                            <View style={styles.avatarContainer}>
                                <Image source={{ uri: USER.avatar }} style={styles.avatar} />
                                <View style={styles.editBadge}>
                                    <MaterialIcons name="edit" size={12} color="#fff" />
                                </View>
                            </View>

                            <Text style={[styles.userName, isDarkMode && styles.textLight]}>{USER.name}</Text>
                            <Text style={[styles.userEmail, isDarkMode && styles.textMuted]}>{USER.email}</Text>

                            <View style={styles.membershipBadge}>
                                <View style={styles.premiumTag}>
                                    <Text style={styles.premiumText}>PREMIUM</Text>
                                </View>
                                <Text style={styles.memberSince}>•</Text>
                                <Text style={styles.memberSince}>MIEMBRO 2023</Text>
                            </View>

                            <View style={styles.statsRow}>
                                {renderStat(USER.stats.coupons, 'CUPONES', '#F43F5E')}
                                {renderStat(USER.stats.savings, 'AHORRO', '#22C55E')}
                                {renderStat(USER.stats.points, 'PUNTOS', '#0EA5E9')}
                            </View>
                        </View>
                    </View>

                    {/* Settings Section (Expandable) */}
                    {settingsExpanded && (
                        <View style={[styles.settingsCard, isDarkMode && styles.cardDark]}>
                            <Text style={[styles.settingsSectionTitle, isDarkMode && styles.textLight]}>CONFIGURACIÓN</Text>

                            {/* Theme Selection */}
                            <View style={styles.settingsGroup}>
                                <Text style={[styles.settingsGroupLabel, isDarkMode && styles.textMuted]}>TEMA DE LA APP</Text>
                                <View style={styles.themeOptions}>
                                    {renderThemeOption('light', 'Claro', 'light-mode')}
                                    {renderThemeOption('dark', 'Oscuro', 'dark-mode')}
                                    {renderThemeOption('auto', 'Automático', 'brightness-auto')}
                                </View>
                            </View>

                            {/* Other Settings */}
                            <TouchableOpacity style={[styles.settingsRow, isDarkMode && styles.settingsRowDark]}>
                                <View style={styles.settingsRowLeft}>
                                    <MaterialIcons name="notifications" size={22} color="#0EA5E9" />
                                    <Text style={[styles.settingsRowText, isDarkMode && styles.textLight]}>Notificaciones</Text>
                                </View>
                                <MaterialIcons name="chevron-right" size={24} color={isDarkMode ? "#64748B" : "#CBD5E1"} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.settingsRow, isDarkMode && styles.settingsRowDark]}>
                                <View style={styles.settingsRowLeft}>
                                    <MaterialIcons name="language" size={22} color="#22C55E" />
                                    <Text style={[styles.settingsRowText, isDarkMode && styles.textLight]}>Idioma</Text>
                                </View>
                                <View style={styles.settingsRowRight}>
                                    <Text style={[styles.settingsRowValue, isDarkMode && styles.textMuted]}>Español</Text>
                                    <MaterialIcons name="chevron-right" size={24} color={isDarkMode ? "#64748B" : "#CBD5E1"} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.settingsRow, isDarkMode && styles.settingsRowDark]}>
                                <View style={styles.settingsRowLeft}>
                                    <MaterialIcons name="security" size={22} color="#F43F5E" />
                                    <Text style={[styles.settingsRowText, isDarkMode && styles.textLight]}>Privacidad</Text>
                                </View>
                                <MaterialIcons name="chevron-right" size={24} color={isDarkMode ? "#64748B" : "#CBD5E1"} />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Wallet Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, isDarkMode && styles.textLight]}>Wataco Wallet</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>Ver todo</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.walletList}>
                            {/* WatacoPay Card */}
                            <View style={styles.walletCard}>
                                <LinearGradient
                                    colors={['#0F172A', '#1E293B']}
                                    style={styles.cardGradient}
                                >
                                    <View style={styles.cardTop}>
                                        <Text style={styles.cardBrand}>Wataco<Text style={{ fontWeight: '400', color: '#0EA5E9' }}>Pay</Text></Text>
                                        <MaterialIcons name="contactless" size={24} color="rgba(255,255,255,0.8)" />
                                    </View>
                                    <View>
                                        <Text style={styles.balanceLabel}>SALDO DISPONIBLE</Text>
                                        <Text style={styles.balanceValue}>$1,250.00</Text>
                                    </View>
                                    <View style={styles.cardBottom}>
                                        <Text style={styles.cardNumber}>**** 8842</Text>
                                        <View style={styles.virtualBadge}>
                                            <Text style={styles.virtualText}>VIRTUAL</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </View>

                            {/* Visa Card */}
                            <View style={[styles.walletCard, styles.visaCard, isDarkMode && styles.visaCardDark]}>
                                <View style={styles.cardTop}>
                                    <Text style={[styles.visaBrand, isDarkMode && styles.textLight]}>Visa</Text>
                                    <MaterialIcons name="lock" size={20} color="#94A3B8" />
                                </View>
                                <View style={{ marginTop: 'auto' }}>
                                    <Text style={[styles.visaNumber, isDarkMode && styles.textLight]}>**** **** **** 4219</Text>
                                    <View style={styles.cardBottom}>
                                        <Text style={styles.expiryText}>Expira 12/25</Text>
                                        <View style={[styles.mainBadge, isDarkMode && styles.mainBadgeDark]}>
                                            <Text style={[styles.mainBadgeText, isDarkMode && styles.textMuted]}>Principal</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    {/* Grid Menu */}
                    <View style={styles.menuGrid}>
                        {renderMenuButton(
                            'local-offer',
                            'Mis Ofertas',
                            hasActiveOrder ? '1 activa' : 'Ver todas',
                            '#F43F5E',
                            '#FFF1F2',
                            () => hasActiveOrder ? router.push('/order-tracking') : Alert.alert("Sin pedidos", "No tienes ofertas activas actualmente.")
                        )}
                        {renderMenuButton('history', 'Historial', '24 canjes', '#64748B', '#F1F5F9')}
                        {renderMenuButton('favorite', 'Favoritos', '15 guardados', '#22C55E', '#F0FDF4')}
                        {renderMenuButton('help', 'Soporte', 'Chat 24/7', '#A855F7', '#FAF5FF')}
                    </View>

                    <TouchableOpacity style={[styles.logoutButton, isDarkMode && styles.logoutButtonDark]} onPress={() => router.replace('/')}>
                        <MaterialIcons name="logout" size={20} color={isDarkMode ? "#94A3B8" : "#475569"} />
                        <Text style={[styles.logoutText, isDarkMode && styles.textMuted]}>Cerrar Sesión</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 40,
        padding: 24,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#0F172A',
        textTransform: 'uppercase',
    },
    settingsButton: {
        width: 40,
        height: 40,
        borderRadius: 16,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileSection: {
        alignItems: 'center',
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 112,
        height: 112,
        borderColor: 'rgba(14, 165, 233, 0.05)',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#64748B',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    userName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    userEmail: {
        fontSize: 14,
        fontWeight: '600',
        color: '#94A3B8',
        marginBottom: 16,
    },
    membershipBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
    },
    premiumTag: {
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    premiumText: {
        color: '#0EA5E9',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    memberSince: {
        color: '#CBD5E1',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    statBox: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 9,
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 1,
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
    },
    seeAllText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#0EA5E9',
    },
    walletList: {
        gap: 16,
        paddingHorizontal: 4,
    },
    walletCard: {
        width: 280,
        height: 160,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
    },
    cardGradient: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardBrand: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1,
    },
    balanceLabel: {
        color: '#94A3B8',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 4,
    },
    balanceValue: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '900',
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardNumber: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 2,
    },
    virtualBadge: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    virtualText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
    },
    visaCard: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        padding: 24,
        justifyContent: 'space-between',
    },
    visaBrand: {
        color: '#0F172A',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1,
    },
    visaNumber: {
        color: '#0F172A',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 8,
    },
    expiryText: {
        color: '#64748B',
        fontSize: 12,
        fontWeight: '700',
    },
    mainBadge: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    mainBadgeText: {
        color: '#475569',
        fontSize: 10,
        fontWeight: '900',
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 30,
    },
    menuButton: {
        width: (width - 56) / 2, // 40 padding + 16 gap
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 24,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 1,
    },
    menuIconBox: {
        width: 40,
        height: 40,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
        textTransform: 'uppercase',
    },
    logoutButton: {
        backgroundColor: '#F1F5F9',
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    logoutText: {
        color: '#475569',
        fontSize: 14,
        fontWeight: '700',
    },
    // Dark mode styles
    containerDark: {
        backgroundColor: '#0F172A',
    },
    cardDark: {
        backgroundColor: '#1E293B',
    },
    textLight: {
        color: '#F1F5F9',
    },
    textMuted: {
        color: '#94A3B8',
    },
    statBoxDark: {
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    menuButtonDark: {
        backgroundColor: '#1E293B',
    },
    settingsButtonDark: {
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    visaCardDark: {
        backgroundColor: '#1E293B',
        borderColor: '#334155',
    },
    mainBadgeDark: {
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    logoutButtonDark: {
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    // Settings section styles
    settingsCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    settingsSectionTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: 1,
        marginBottom: 20,
    },
    settingsGroup: {
        marginBottom: 24,
    },
    settingsGroupLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#64748B',
        letterSpacing: 1,
        marginBottom: 12,
    },
    themeOptions: {
        flexDirection: 'row',
        gap: 12,
    },
    themeOption: {
        flex: 1,
        backgroundColor: '#F1F5F9',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        gap: 8,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    themeOptionSelected: {
        borderColor: '#0EA5E9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
    },
    themeOptionDark: {
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    themeOptionSelectedDark: {
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
    },
    themeOptionText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748B',
    },
    themeOptionTextSelected: {
        color: '#0EA5E9',
        fontWeight: '900',
    },
    checkmark: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    settingsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    settingsRowDark: {
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    settingsRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingsRowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    settingsRowText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
    },
    settingsRowValue: {
        fontSize: 12,
        fontWeight: '600',
        color: '#94A3B8',
    },
});
