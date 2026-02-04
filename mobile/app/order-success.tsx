import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/context/CartContext';

const { width, height } = Dimensions.get('window');

export default function OrderSuccessScreen() {
    const router = useRouter();
    const { isDarkMode } = useCart();

    // Animations
    const scaleAnim = React.useRef(new Animated.Value(0)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 40,
                friction: 8,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const handleGoToTracking = () => {
        router.replace('/order-tracking');
    };

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style={isDarkMode ? "light" : "dark"} />

            <SafeAreaView style={styles.content}>
                <View style={styles.successIconContainer}>
                    <Animated.View style={[
                        styles.iconCircle,
                        { transform: [{ scale: scaleAnim }], opacity: opacityAnim }
                    ]}>
                        <MaterialIcons name="check-circle" size={120} color="#22C55E" />
                    </Animated.View>
                </View>

                <Animated.View style={[
                    styles.textContainer,
                    { opacity: opacityAnim, transform: [{ translateY: slideAnim }] }
                ]}>
                    <Text style={[styles.title, isDarkMode && styles.textWhite]}>¡CANJE EXITOSO!</Text>
                    <Text style={[styles.subtitle, isDarkMode && styles.textGrey]}>
                        Tu oferta ha sido procesada correctamente.
                    </Text>

                    <View style={[styles.rewardCard, isDarkMode && styles.rewardCardDark]}>
                        <View style={styles.rewardIcon}>
                            <MaterialIcons name="stars" size={32} color="#EAB308" />
                        </View>
                        <View>
                            <Text style={styles.rewardLabel}>HAS GANADO</Text>
                            <Text style={[styles.rewardValue, isDarkMode && styles.textWhite]}>150 PUNTOS WATACO</Text>
                        </View>
                    </View>
                </Animated.View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleGoToTracking}
                    >
                        <Text style={styles.primaryButtonText}>VER MI PEDIDO</Text>
                        <MaterialIcons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => router.replace('/(tabs)')}
                    >
                        <Text style={[styles.secondaryButtonText, isDarkMode && styles.textWhite]}>VOLVER AL INICIO</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerDark: {
        backgroundColor: '#0F172A',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    successIconContainer: {
        marginBottom: 40,
    },
    iconCircle: {
        shadowColor: '#22C55E',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    textContainer: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: 1,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    textWhite: {
        color: '#fff',
    },
    textGrey: {
        color: '#94A3B8',
    },
    rewardCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 20,
        borderRadius: 24,
        width: '100%',
        gap: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    rewardCardDark: {
        backgroundColor: '#1E293B',
        borderColor: '#334155',
    },
    rewardIcon: {
        width: 56,
        height: 56,
        borderRadius: 18,
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rewardLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 2,
    },
    rewardValue: {
        fontSize: 16,
        fontWeight: '900',
        color: '#0F172A',
        marginTop: 4,
    },
    footer: {
        width: '100%',
        marginTop: 60,
        gap: 16,
    },
    primaryButton: {
        height: 64,
        backgroundColor: '#8B5CF6',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
    },
    secondaryButton: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 1,
    }
});
