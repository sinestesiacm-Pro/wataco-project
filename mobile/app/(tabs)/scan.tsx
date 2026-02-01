import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/context/CartContext';
import { useIsFocused } from '@react-navigation/native';

export default function ScanScreen() {
    const { isDarkMode } = useCart();
    const isFocused = useIsFocused();

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            {isFocused && (
                <StatusBar
                    style={isDarkMode ? "light" : "dark"}
                    backgroundColor={isDarkMode ? "#0F172A" : "#F8FAFC"}
                    animated={false}
                />
            )}
            <Text style={[styles.text, isDarkMode && styles.textLight]}>Scanner próximamente</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    containerDark: {
        backgroundColor: '#0F172A',
    },
    text: {
        color: '#0F172A',
        fontWeight: '700',
    },
    textLight: {
        color: '#F1F5F9',
    },
});
