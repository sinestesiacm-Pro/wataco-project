import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

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

    const renderStat = (value: string | number, label: string, color: string) => (
        <View style={styles.statBox}>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );

    const renderMenuButton = (icon: any, label: string, sublabel: string, color: string, bgColor: string) => (
        <TouchableOpacity style={styles.menuButton}>
            <View style={[styles.menuIconBox, { backgroundColor: bgColor }]}>
                <MaterialIcons name={icon} size={24} color={color} />
            </View>
            <View>
                <Text style={styles.menuTitle}>{label}</Text>
                <Text style={styles.menuSubtitle}>{sublabel}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Hero Section */}
                    <View style={styles.card}>
                        <View style={styles.headerRow}>
                            <Text style={styles.headerTitle}>MI PERFIL</Text>
                            <TouchableOpacity style={styles.settingsButton}>
                                <MaterialIcons name="settings" size={20} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.profileSection}>
                            <View style={styles.avatarContainer}>
                                <Image source={{ uri: USER.avatar }} style={styles.avatar} />
                                <View style={styles.editBadge}>
                                    <MaterialIcons name="edit" size={12} color="#fff" />
                                </View>
                            </View>

                            <Text style={styles.userName}>{USER.name}</Text>
                            <Text style={styles.userEmail}>{USER.email}</Text>

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

                    {/* Wallet Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Wataco Wallet</Text>
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
                            <View style={[styles.walletCard, styles.visaCard]}>
                                <View style={styles.cardTop}>
                                    <Text style={styles.visaBrand}>Visa</Text>
                                    <MaterialIcons name="lock" size={20} color="#94A3B8" />
                                </View>
                                <View style={{ marginTop: 'auto' }}>
                                    <Text style={styles.visaNumber}>**** **** **** 4219</Text>
                                    <View style={styles.cardBottom}>
                                        <Text style={styles.expiryText}>Expira 12/25</Text>
                                        <View style={styles.mainBadge}>
                                            <Text style={styles.mainBadgeText}>Principal</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    {/* Grid Menu */}
                    <View style={styles.menuGrid}>
                        {renderMenuButton('local-offer', 'Mis Ofertas', '8 activas', '#F43F5E', '#FFF1F2')}
                        {renderMenuButton('history', 'Historial', '24 canjes', '#64748B', '#F1F5F9')}
                        {renderMenuButton('favorite', 'Favoritos', '15 guardados', '#22C55E', '#F0FDF4')}
                        {renderMenuButton('help', 'Soporte', 'Chat 24/7', '#A855F7', '#FAF5FF')}
                    </View>

                    <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/')}>
                        <MaterialIcons name="logout" size={20} color="#475569" />
                        <Text style={styles.logoutText}>Cerrar Sesión</Text>
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
});
