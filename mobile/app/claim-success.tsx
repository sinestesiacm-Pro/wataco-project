import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function ClaimSuccessScreen() {
    const router = useRouter();
    const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0.8);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();

        // Auto navigate back after 5 seconds if no action
        const timer = setTimeout(() => {
            router.replace('/(tabs)');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="dark" />

            <SafeAreaView style={styles.content}>
                <Animated.View style={[
                    styles.iconContainer,
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
                ]}>
                    <View style={styles.iconCircle}>
                        <MaterialIcons name="check-circle" size={80} color="#fff" />
                    </View>
                </Animated.View>

                <Animated.View style={{ opacity: fadeAnim }}>
                    <Text style={styles.title}>¡OFERTA VALIDADA!</Text>
                    <Text style={styles.subtitle}>
                        Tu beneficio ha sido aplicado correctamente. ¡Disfruta de tu compra!
                    </Text>
                </Animated.View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => router.replace('/(tabs)')}
                    >
                        <Text style={styles.primaryButtonText}>VOLVER AL INICIO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => router.replace('/(tabs)/coupons')}
                    >
                        <Text style={styles.secondaryButtonText}>VER MI HISTORIAL</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <MaterialIcons name="shield" size={14} color="#CBD5E1" />
                    <Text style={styles.footerText}>POWERED BY WATACO SECURE</Text>
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
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    iconContainer: {
        marginBottom: 40,
    },
    iconCircle: {
        width: 140,
        height: 140,
        borderRadius: 50,
        backgroundColor: '#8B5CF6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0F172A',
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 60,
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    primaryButton: {
        backgroundColor: '#8B5CF6',
        height: 64,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 6,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
    },
    secondaryButton: {
        backgroundColor: '#F8FAFC',
        height: 64,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#64748B',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    footerText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#CBD5E1',
        letterSpacing: 1.5,
    },
});
