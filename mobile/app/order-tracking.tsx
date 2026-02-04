import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/context/CartContext';

const TrackingStep = ({ icon, title, time, active, completed, isLast, isDarkMode }: any) => (
    <View style={styles.stepContainer}>
        <View style={styles.stepIconColumn}>
            <View style={[
                styles.iconCircle,
                active && styles.iconCircleActive,
                completed && styles.iconCircleCompleted,
                isDarkMode && styles.iconCircleDark
            ]}>
                <MaterialIcons
                    name={completed ? "check" : icon}
                    size={20}
                    color={completed || active ? "#fff" : (isDarkMode ? "#475569" : "#94A3B8")}
                />
            </View>
            {!isLast && (
                <View style={[
                    styles.stepLine,
                    completed && styles.stepLineCompleted,
                    isDarkMode && styles.stepLineDark
                ]} />
            )}
        </View>
        <View style={styles.stepInfo}>
            <Text style={[
                styles.stepTitle,
                active && styles.stepTitleActive,
                isDarkMode && styles.textWhite
            ]}>{title}</Text>
            <Text style={[styles.stepTime, isDarkMode && styles.textGrey]}>{time}</Text>
        </View>
    </View>
);

export default function OrderTrackingScreen() {
    const router = useRouter();
    const { isDarkMode, setHasActiveOrder } = useCart();

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style={isDarkMode ? "light" : "dark"} />

            <SafeAreaView edges={['top']} style={[styles.header, isDarkMode && styles.headerDark]}>
                <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.backButton}>
                    <MaterialIcons name="close" size={24} color={isDarkMode ? "#fff" : "#0F172A"} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, isDarkMode && styles.textWhite]}>ESTADO DEL PEDIDO</Text>
                <View style={styles.placeholder} />
            </SafeAreaView>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={[styles.orderCard, isDarkMode && styles.orderCardDark]}>
                    <View style={styles.orderHeader}>
                        <View>
                            <Text style={styles.orderLabel}>NÚMERO DE PEDIDO</Text>
                            <Text style={[styles.orderId, isDarkMode && styles.textWhite]}>#WT-884291</Text>
                        </View>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>EN PROCESO</Text>
                        </View>
                    </View>

                    <View style={[styles.divider, isDarkMode && styles.dividerDark]} />

                    <View style={styles.trackingContainer}>
                        <TrackingStep
                            icon="receipt"
                            title="Pedido Recibido"
                            time="01:45 PM"
                            completed
                            isDarkMode={isDarkMode}
                        />
                        <TrackingStep
                            icon="restaurant"
                            title="Preparando tu oferta"
                            time="01:47 PM"
                            active
                            isDarkMode={isDarkMode}
                        />
                        <TrackingStep
                            icon="moped"
                            title="En camino"
                            time="Estimado: 02:15 PM"
                            isDarkMode={isDarkMode}
                        />
                        <TrackingStep
                            icon="location-on"
                            title="Entregado"
                            time="--"
                            isLast
                            isDarkMode={isDarkMode}
                        />
                    </View>
                </View>

                <View style={[styles.infoCard, isDarkMode && styles.infoCardDark]}>
                    <Text style={styles.infoTitle}>DETALLES DE ENTREGA</Text>
                    <View style={styles.infoRow}>
                        <MaterialIcons name="location-pin" size={20} color="#8B5CF6" />
                        <Text style={[styles.infoText, isDarkMode && styles.textWhite]}>Av. Larco 123, Miraflores</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <MaterialIcons name="person" size={20} color="#8B5CF6" />
                        <Text style={[styles.infoText, isDarkMode && styles.textWhite]}>Socio Wataco: Juan Pérez</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.helpButton}
                    onPress={() => { }}
                >
                    <MaterialIcons name="chat" size={20} color="#8B5CF6" />
                    <Text style={styles.helpButtonText}>NECESITO AYUDA CON MI PEDIDO</Text>
                </TouchableOpacity>
            </ScrollView>

            <SafeAreaView edges={['bottom']} style={[styles.footer, isDarkMode && styles.footerDark]}>
                <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => {
                        setHasActiveOrder(false);
                        router.replace('/(tabs)');
                    }}
                >
                    <Text style={styles.homeButtonText}>MARCAR COMO RECIBIDO</Text>
                </TouchableOpacity>
            </SafeAreaView>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerDark: {
        backgroundColor: '#1E293B',
        borderBottomColor: '#334155',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: 1,
    },
    placeholder: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 32,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    orderCardDark: {
        backgroundColor: '#1E293B',
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 2,
    },
    orderId: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
        marginTop: 4,
    },
    statusBadge: {
        backgroundColor: '#F0F9FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        color: '#0EA5E9',
        fontSize: 10,
        fontWeight: '900',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 24,
    },
    dividerDark: {
        backgroundColor: '#334155',
    },
    trackingContainer: {
        paddingLeft: 8,
    },
    stepContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    stepIconColumn: {
        alignItems: 'center',
        width: 32,
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    iconCircleDark: {
        backgroundColor: '#334155',
    },
    iconCircleActive: {
        backgroundColor: '#8B5CF6',
        transform: [{ scale: 1.2 }],
    },
    iconCircleCompleted: {
        backgroundColor: '#22C55E',
    },
    stepLine: {
        width: 2,
        height: 40,
        backgroundColor: '#F1F5F9',
        marginVertical: -2,
    },
    stepLineDark: {
        backgroundColor: '#334155',
    },
    stepLineCompleted: {
        backgroundColor: '#22C55E',
    },
    stepInfo: {
        flex: 1,
        paddingBottom: 40,
    },
    stepTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#64748B',
    },
    stepTitleActive: {
        color: '#0F172A',
        fontWeight: '900',
    },
    stepTime: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 4,
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
    },
    infoCardDark: {
        backgroundColor: '#1E293B',
    },
    infoTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 2,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        color: '#475569',
        fontWeight: '600',
    },
    helpButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 20,
    },
    helpButtonText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#8B5CF6',
        letterSpacing: 1,
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    footerDark: {
        backgroundColor: '#1E293B',
        borderTopColor: '#334155',
    },
    homeButton: {
        height: 56,
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    homeButtonText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#64748B',
        letterSpacing: 1,
    },
    textWhite: {
        color: '#fff',
    },
    textGrey: {
        color: '#94A3B8',
    }
});
