import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface NeumorphicIconProps {
    icon: string;
    glowColor: string;
    size?: number;
    iconSize?: number;
    isActive?: boolean;
    isDarkMode?: boolean;
}

export const NeumorphicIcon: React.FC<NeumorphicIconProps> = ({
    icon,
    glowColor,
    size = 64,
    iconSize = 33,
    isActive = false,
    isDarkMode = false
}) => {
    const pulseAnim = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.8,
                    duration: 1500,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.3,
                    duration: 1500,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pulseAnim]);

    const containerSize = size;
    const ringSize = size + 4;
    const centerSize = size - 4;

    return (
        <View style={[
            styles.neumorphicContainer,
            { width: containerSize, height: containerSize, borderRadius: containerSize / 2, shadowColor: glowColor },
            isDarkMode && styles.neumorphicContainerDark
        ]}>
            {/* Animated Neon Glow Ring */}
            <Animated.View
                style={[
                    styles.glowRing,
                    {
                        width: ringSize,
                        height: ringSize,
                        borderRadius: ringSize / 2,
                        borderColor: glowColor,
                        shadowColor: glowColor,
                        opacity: pulseAnim,
                        transform: [{
                            scale: pulseAnim.interpolate({
                                inputRange: [0.3, 0.8],
                                outputRange: [1, 1.05]
                            })
                        }]
                    }
                ]}
            />

            <View style={[
                styles.whiteCenter,
                { width: centerSize, height: centerSize, borderRadius: centerSize / 2 },
                isDarkMode && styles.whiteCenterDark,
                isActive && { backgroundColor: glowColor, borderColor: 'rgba(255,255,255,0.3)' }
            ]}>
                {/* Top-left relief highlight */}
                {!isActive && <View style={[styles.reliefHighlight, { width: centerSize - 4, height: centerSize - 4, borderRadius: (centerSize - 4) / 2 }]} />}
                <MaterialIcons
                    name={icon as any}
                    size={iconSize}
                    color={isActive ? '#FFFFFF' : (isDarkMode ? '#F8FAFC' : '#1E293B')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    neumorphicContainer: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        // External Neon Glow
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
        elevation: 10,
    },
    neumorphicContainerDark: {
        backgroundColor: '#1E293B',
    },
    glowRing: {
        position: 'absolute',
        borderWidth: 4.5,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 18,
        zIndex: -1,
    },
    whiteCenter: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    whiteCenterDark: {
        backgroundColor: '#1E293B',
        borderColor: '#1E293B',
    },
    reliefHighlight: {
        position: 'absolute',
        top: 2,
        left: 2,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: 'rgba(255,255,255,1)',
    },
});
