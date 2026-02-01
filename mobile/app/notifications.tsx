import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const MOCK_NOTIFICATIONS = [
    { id: '1', title: '¡Nueva Oferta!', message: 'Sushi Master tiene un 50% de descuento solo por hoy.', time: '2 min', icon: 'local-offer', color: '#8B5CF6' },
    { id: '2', title: 'Puntos Recibidos', message: 'Has ganado 50 W-Points por tu última compra.', time: '1h', icon: 'stars', color: '#F97316' },
    { id: '3', title: 'Cupón por vencer', message: 'Tu cupón de "Starbucks" vence en 3 horas.', time: '3h', icon: 'timer', color: '#F43F5E' },
];

export default function NotificationsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="dark" />

            <SafeAreaView edges={['top']} style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>NOTIFICACIONES</Text>
                <View style={styles.placeholder} />
            </SafeAreaView>

            <ScrollView style={styles.scrollView}>
                {MOCK_NOTIFICATIONS.map((notif) => (
                    <TouchableOpacity key={notif.id} style={styles.notificationItem}>
                        <View style={[styles.iconContainer, { backgroundColor: notif.color + '20' }]}>
                            <MaterialIcons name={notif.icon as any} size={24} color={notif.color} />
                        </View>
                        <View style={styles.content}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.title}>{notif.title}</Text>
                                <Text style={styles.time}>{notif.time}</Text>
                            </View>
                            <Text style={styles.message}>{notif.message}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: 2,
    },
    placeholder: {
        width: 44,
    },
    scrollView: {
        flex: 1,
    },
    notificationItem: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
    },
    time: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
    },
    message: {
        fontSize: 13,
        color: '#64748B',
        lineHeight: 18,
    },
});
