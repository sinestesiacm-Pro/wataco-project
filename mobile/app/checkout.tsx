import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Dimensions, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/context/CartContext';

const { width } = Dimensions.get('window');

export default function CheckoutScreen() {
    const router = useRouter();
    const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart, isDarkMode } = useCart();
    const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
    const [paymentMethod, setPaymentMethod] = useState('visa');

    const subtotal = getTotal();
    const deliveryFee = deliveryType === 'delivery' ? 2.50 : 0;
    const taxes = subtotal * 0.033;
    const discount = cartItems.length > 0 ? 5.00 : 0;
    const total = subtotal + taxes + deliveryFee - discount;

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            Alert.alert("Carrito vacío", "Agrega ofertas para continuar.");
            return;
        }
        router.push('/claim-success');
    };

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style={isDarkMode ? "light" : "dark"} />

            {/* Header */}
            <SafeAreaView edges={['top']} style={[styles.header, isDarkMode && { backgroundColor: '#0F172A', borderBottomColor: '#1E293B' }]}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, isDarkMode && { backgroundColor: '#1E293B' }]}>
                    <MaterialIcons name="arrow-back" size={24} color={isDarkMode ? "#fff" : "#0F172A"} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, isDarkMode && { color: '#fff' }]}>CHECKOUT</Text>
                <View style={styles.placeholder} />
            </SafeAreaView>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {cartItems.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <MaterialIcons name="shopping-cart" size={80} color={isDarkMode ? "#334155" : "#E2E8F0"} />
                        <Text style={[styles.emptyTitle, isDarkMode && { color: '#fff' }]}>Tu carrito está vacío</Text>
                        <Text style={[styles.emptySubtitle, isDarkMode && { color: '#94A3B8' }]}>Agrega alguna oferta para continuar</Text>
                        <TouchableOpacity style={styles.exploreButton} onPress={() => router.back()}>
                            <Text style={styles.exploreButtonText}>EXPLORAR OFERTAS</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.checkoutContent}>
                        {/* Cart Items */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>TUS OFERTAS</Text>
                        </View>
                        {cartItems.map((item) => (
                            <View key={item.id} style={[styles.cartItem, isDarkMode && { backgroundColor: '#1E293B' }]}>
                                <Image source={{ uri: item.img }} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <View style={styles.itemHeader}>
                                        <Text style={[styles.itemName, isDarkMode && { color: '#fff' }]} numberOfLines={1}>{item.name}</Text>
                                        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                            <MaterialIcons name="delete-outline" size={20} color={isDarkMode ? "#94A3B8" : "#CBD5E1"} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={[styles.itemOption, isDarkMode && { color: '#94A3B8' }]}>Opción: Canje Directo x{item.quantity}</Text>
                                    <View style={styles.itemFooter}>
                                        <View style={[styles.quantityContainer, isDarkMode && styles.quantityContainerDark]}>
                                            <TouchableOpacity
                                                style={styles.quantityBtn}
                                                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <MaterialIcons name="remove" size={14} color={isDarkMode ? "#94A3B8" : "#64748B"} />
                                            </TouchableOpacity>
                                            <Text style={[styles.quantityVal, isDarkMode && { color: '#fff' }]}>{item.quantity}</Text>
                                            <TouchableOpacity
                                                style={styles.quantityBtn}
                                                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <MaterialIcons name="add" size={14} color="#8B5CF6" />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={[styles.itemPrice, isDarkMode && { color: '#fff' }]}>€{((item.price || 0) * item.quantity).toFixed(2)}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}

                        {/* Entrega Section */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>MÉTODO DE ENTREGA</Text>
                            <TouchableOpacity>
                                <Text style={styles.sectionAction}>CAMBIAR</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.deliveryRow}>
                            <TouchableOpacity
                                style={[
                                    styles.deliveryCard,
                                    isDarkMode && styles.deliveryCardDark,
                                    deliveryType === 'pickup' && (isDarkMode ? styles.deliveryCardActiveDark : styles.deliveryCardActive)
                                ]}
                                onPress={() => setDeliveryType('pickup')}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.deliveryIconBg, deliveryType === 'pickup' && styles.iconBgActive]}>
                                    <MaterialIcons
                                        name="storefront"
                                        size={24}
                                        color={deliveryType === 'pickup' ? '#fff' : (isDarkMode ? '#94A3B8' : '#64748B')}
                                    />
                                </View>
                                <Text style={[
                                    styles.deliveryTitle,
                                    isDarkMode && { color: '#fff' },
                                    deliveryType === 'pickup' && { color: '#8B5CF6' }
                                ]}>RECOJO</Text>
                                <Text style={[styles.deliveryNote, isDarkMode && { color: '#94A3B8' }]}>Gratis • 20min</Text>
                                {deliveryType === 'pickup' && (
                                    <View style={[styles.checkIcon, isDarkMode ? styles.checkIconDark : { borderColor: '#fff' }]}>
                                        <MaterialIcons name="check" size={12} color="#fff" />
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.deliveryCard,
                                    isDarkMode && styles.deliveryCardDark,
                                    deliveryType === 'delivery' && (isDarkMode ? styles.deliveryCardActiveDark : styles.deliveryCardActive)
                                ]}
                                onPress={() => setDeliveryType('delivery')}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.deliveryIconBg, deliveryType === 'delivery' && styles.iconBgActive]}>
                                    <MaterialIcons
                                        name="moped"
                                        size={24}
                                        color={deliveryType === 'delivery' ? '#fff' : (isDarkMode ? '#94A3B8' : '#64748B')}
                                    />
                                </View>
                                <Text style={[
                                    styles.deliveryTitle,
                                    isDarkMode && { color: '#fff' },
                                    deliveryType === 'delivery' && { color: '#8B5CF6' }
                                ]}>DELIVERY</Text>
                                <Text style={[styles.deliveryNote, isDarkMode && { color: '#94A3B8' }]}>Desde €2.50 • 45m</Text>
                                {deliveryType === 'delivery' && (
                                    <View style={[styles.checkIcon, isDarkMode ? styles.checkIconDark : { borderColor: '#fff' }]}>
                                        <MaterialIcons name="check" size={12} color="#fff" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Location Card */}
                        <View style={[styles.locationCard, isDarkMode && styles.locationCardDark, !isDarkMode && { backgroundColor: '#FFF7ED', borderColor: '#FED7AA' }]}>
                            <View style={[styles.locationIconCircle, { backgroundColor: isDarkMode ? 'rgba(249, 115, 22, 0.1)' : '#FFF7ED' }]}>
                                <MaterialIcons name="store" size={20} color="#F97316" />
                            </View>
                            <View style={styles.locationTextContainer}>
                                <Text style={[styles.locationLabel, isDarkMode && { color: '#94A3B8' }]}>RECOJO EN TIENDA</Text>
                                <Text style={[styles.locationValue, isDarkMode && { color: '#fff' }]}>CALLE PRINCIPAL 456, LIMA</Text>
                            </View>
                            <TouchableOpacity style={[styles.mapSmallBtn, isDarkMode && { backgroundColor: '#334155' }]}>
                                <MaterialIcons name="map" size={18} color="#F97316" />
                            </TouchableOpacity>
                        </View>

                        {/* Pago Section */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>PAGO</Text>
                            <TouchableOpacity>
                                <Text style={styles.sectionAction}>AGREGAR</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.paymentContainer}>
                            {[
                                { id: 'visa', label: 'Personal **** 8842', type: 'VISA', color: '#0F172A' },
                                { id: 'cash', label: 'Wataco Cash', type: '€125.00 disponible', color: '#22C55E' },
                            ].map((method) => (
                                <TouchableOpacity
                                    key={method.id}
                                    style={[styles.paymentCard, isDarkMode && styles.paymentCardDark, paymentMethod === method.id && (isDarkMode ? { borderColor: '#8B5CF6', backgroundColor: 'rgba(139, 92, 246, 0.15)' } : styles.paymentCardActive)]}
                                    onPress={() => setPaymentMethod(method.id)}
                                >
                                    <View style={styles.paymentLeft}>
                                        <View style={[styles.methodIcon, { backgroundColor: method.color }]}>
                                            {method.id === 'visa' ? (
                                                <Text style={styles.visaText}>VISA</Text>
                                            ) : (
                                                <MaterialIcons name="account-balance-wallet" size={20} color="#fff" />
                                            )}
                                        </View>
                                        <View>
                                            <Text style={[styles.methodLabel, isDarkMode && { color: '#fff' }]}>{method.label}</Text>
                                            {method.id === 'cash' && <Text style={styles.methodType}>{method.type}</Text>}
                                        </View>
                                    </View>
                                    <View style={[styles.radio, paymentMethod === method.id && styles.radioActive, isDarkMode && { borderColor: '#475569' }]}>
                                        {paymentMethod === method.id && <View style={styles.radioInner} />}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Summary Table */}
                        <View style={[styles.summaryCard, isDarkMode && styles.summaryCardDark]}>
                            <View style={styles.summaryRow}>
                                <Text style={[styles.summaryLabel, isDarkMode && { color: '#94A3B8' }]}>Subtotal</Text>
                                <Text style={[styles.summaryValue, isDarkMode && { color: '#fff' }]}>€{subtotal.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={[styles.summaryLabel, isDarkMode && { color: '#94A3B8' }]}>Impuestos</Text>
                                <Text style={[styles.summaryValue, isDarkMode && { color: '#fff' }]}>€{taxes.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <View style={styles.couponLabelRow}>
                                    <MaterialIcons name="confirmation-number" size={16} color="#22C55E" />
                                    <Text style={[styles.couponLabel, isDarkMode && { color: '#94A3B8' }]}>Cupón</Text>
                                </View>
                                <Text style={styles.couponValue}>-€{discount.toFixed(2)}</Text>
                            </View>

                            <View style={[styles.pointsBanner, isDarkMode && { backgroundColor: 'rgba(234, 179, 8, 0.1)' }]}>
                                <MaterialIcons name="stars" size={18} color="#EAB308" />
                                <Text style={[styles.pointsText, isDarkMode && { color: '#FACC15' }]}>
                                    GANAS <Text style={styles.pointsHighlight}>40 W-POINTS</Text> CON ESTA COMPRA.
                                </Text>
                            </View>

                            <View style={[styles.divider, isDarkMode && { backgroundColor: '#334155' }]} />

                            <View style={styles.totalRow}>
                                <View>
                                    <Text style={[styles.totalCaption, isDarkMode && { color: '#94A3B8' }]}>TOTAL A PAGAR</Text>
                                    <Text style={[styles.totalAmount, isDarkMode && { color: '#fff' }]}>€{total.toFixed(2)}</Text>
                                </View>
                                <View style={styles.avatarStack}>
                                    <View style={[styles.avatar, { backgroundColor: isDarkMode ? '#334155' : '#E2E8F0' }]} />
                                    <View style={[styles.avatar, { backgroundColor: isDarkMode ? '#1E293B' : '#CBD5E1', marginLeft: -12 }]} />
                                    <View style={[styles.avatar, styles.avatarCount, { marginLeft: -12 }]}>
                                        <Text style={styles.avatarCountText}>+12</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Fixed Footer Button */}
            {cartItems.length > 0 && (
                <SafeAreaView edges={['bottom']} style={styles.fixedFooter}>
                    <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
                        <Text style={styles.checkoutBtnText}>CONFIRMAR PAGO</Text>
                        <View style={styles.arrowIconBg}>
                            <MaterialIcons name="arrow-forward" size={18} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            )}
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
        paddingVertical: 12,
        backgroundColor: '#fff',
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
    scrollContent: {
        paddingBottom: 180, // Increased to clear fixed footer and safe areas
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
        marginTop: 20,
        textTransform: 'uppercase',
    },
    emptySubtitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
        marginTop: 8,
    },
    exploreButton: {
        marginTop: 30,
        backgroundColor: '#8B5CF6',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 16,
    },
    exploreButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
    },
    checkoutContent: {
        padding: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: 0.5,
    },
    sectionAction: {
        fontSize: 10,
        fontWeight: '900',
        color: '#8B5CF6',
        letterSpacing: 1,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 32,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 24,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemName: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
        textTransform: 'uppercase',
        flex: 1,
        marginRight: 8,
    },
    itemOption: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
        marginTop: 4,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    quantityContainerDark: {
        backgroundColor: '#334155',
        borderColor: '#475569',
    },
    quantityBtn: {
        padding: 2,
    },
    quantityVal: {
        fontSize: 12,
        fontWeight: '900',
        color: '#0F172A',
        marginHorizontal: 10,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
    },
    deliveryRow: {
        flexDirection: 'row',
        gap: 16,
    },
    deliveryCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 32,
        padding: 20,
        borderWidth: 2,
        borderColor: 'transparent',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 1, // Reduced to avoid artifacts
    },
    deliveryCardDark: {
        backgroundColor: '#1E293B',
    },
    deliveryCardActive: {
        borderColor: '#8B5CF6',
        backgroundColor: '#F5F3FF', // Opaque instead of alpha for artifact prevention
        elevation: 0,
    },
    deliveryCardActiveDark: {
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        elevation: 0,
    },
    checkIcon: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#8B5CF6',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    checkIconDark: {
        borderColor: '#1E293B',
    },
    deliveryIconBg: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    iconBgActive: {
        backgroundColor: '#8B5CF6',
    },
    deliveryTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
        textTransform: 'uppercase',
    },
    deliveryNote: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
        marginTop: 4,
        textTransform: 'uppercase',
    },
    locationCard: {
        marginTop: 16,
        backgroundColor: '#fff',
        borderRadius: 32,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 6,
        borderLeftColor: '#F97316',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    locationCardDark: {
        backgroundColor: '#1E293B',
    },
    locationIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF7ED',
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationTextContainer: {
        flex: 1,
        marginLeft: 16,
    },
    locationLabel: {
        fontSize: 9,
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 2,
    },
    locationValue: {
        fontSize: 12,
        fontWeight: '900',
        color: '#0F172A',
        marginTop: 2,
        textTransform: 'uppercase',
    },
    paymentContainer: {
        gap: 12,
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#F1F5F9',
    },
    paymentCardDark: {
        backgroundColor: '#1E293B',
        borderColor: '#334155',
    },
    paymentCardActive: {
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
    },
    paymentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    methodIcon: {
        width: 48,
        height: 38,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    visaText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
        fontStyle: 'italic',
    },
    methodLabel: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
        textTransform: 'uppercase',
    },
    methodType: {
        fontSize: 10,
        fontWeight: '900',
        color: '#22C55E',
        textTransform: 'uppercase',
    },
    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioActive: {
        borderColor: '#8B5CF6',
    },
    radioInner: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#8B5CF6',
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 40,
        padding: 24,
        marginTop: 40,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    summaryCardDark: {
        backgroundColor: '#1E293B',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    summaryLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
    },
    couponLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    couponLabel: {
        fontSize: 14,
        fontWeight: '900',
        color: '#22C55E',
        textTransform: 'uppercase',
    },
    couponValue: {
        fontSize: 14,
        fontWeight: '900',
        color: '#22C55E',
    },
    pointsBanner: {
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        padding: 12,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
        marginBottom: 24,
    },
    pointsText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#475569',
        letterSpacing: 0.5,
    },
    pointsHighlight: {
        color: '#F97316',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        borderStyle: 'dashed',
        marginBottom: 20,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    totalCaption: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 2,
        marginBottom: 4,
    },
    totalAmount: {
        fontSize: 36,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -1,
    },
    avatarStack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#fff',
    },
    avatarCount: {
        backgroundColor: '#8B5CF6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarCountText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
    },
    fixedFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 0 : 24, // SafeAreaView handles iOS bottom
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    checkoutBtn: {
        backgroundColor: '#8B5CF6',
        height: 64,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    checkoutBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
    arrowIconBg: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 8,
        borderRadius: 12,
    },
    mapSmallBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F97316',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
});
