import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '@/context/CartContext';

const { width } = Dimensions.get('window');

export default function CheckoutScreen() {
    const router = useRouter();
    const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
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
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="dark" />

            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>CHECKOUT</Text>
                <View style={styles.placeholder} />
            </SafeAreaView>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {cartItems.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <MaterialIcons name="shopping-cart" size={80} color="#E2E8F0" />
                        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
                        <Text style={styles.emptySubtitle}>Agrega alguna oferta para continuar</Text>
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
                            <View key={item.id} style={styles.cartItem}>
                                <Image source={{ uri: item.img }} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <View style={styles.itemHeader}>
                                        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                                        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                            <MaterialIcons name="delete-outline" size={20} color="#CBD5E1" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.itemOption}>Opción: Canje Directo x{item.quantity}</Text>
                                    <View style={styles.itemFooter}>
                                        <View style={styles.quantityContainer}>
                                            <TouchableOpacity
                                                style={styles.quantityBtn}
                                                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <MaterialIcons name="remove" size={14} color="#64748B" />
                                            </TouchableOpacity>
                                            <Text style={styles.quantityVal}>{item.quantity}</Text>
                                            <TouchableOpacity
                                                style={styles.quantityBtn}
                                                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <MaterialIcons name="add" size={14} color="#8B5CF6" />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.itemPrice}>€{((item.price || 0) * item.quantity).toFixed(2)}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}

                        {/* Entrega Section */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>ENTREGA</Text>
                            <TouchableOpacity>
                                <Text style={styles.sectionAction}>CAMBIAR</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.deliveryRow}>
                            <TouchableOpacity
                                style={[styles.deliveryCard, deliveryType === 'pickup' && styles.deliveryCardActive]}
                                onPress={() => setDeliveryType('pickup')}
                            >
                                {deliveryType === 'pickup' && (
                                    <View style={styles.checkIcon}>
                                        <MaterialIcons name="check-circle" size={18} color="#8B5CF6" />
                                    </View>
                                )}
                                <View style={[styles.deliveryIconBg, deliveryType === 'pickup' ? styles.iconBgActive : styles.iconBgInactive]}>
                                    <MaterialIcons name="storefront" size={24} color={deliveryType === 'pickup' ? '#fff' : '#8B5CF6'} />
                                </View>
                                <Text style={styles.deliveryTitle}>Recojo</Text>
                                <Text style={styles.deliveryNote}>Gratis • 20min</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.deliveryCard, deliveryType === 'delivery' && styles.deliveryCardActive]}
                                onPress={() => setDeliveryType('delivery')}
                            >
                                {deliveryType === 'delivery' && (
                                    <View style={styles.checkIcon}>
                                        <MaterialIcons name="check-circle" size={18} color="#8B5CF6" />
                                    </View>
                                )}
                                <View style={[styles.deliveryIconBg, deliveryType === 'delivery' ? styles.iconBgActive : styles.iconBgInactiveSecondary]}>
                                    <MaterialIcons name="moped" size={24} color={deliveryType === 'delivery' ? '#fff' : '#0EA5E9'} />
                                </View>
                                <Text style={styles.deliveryTitle}>Delivery</Text>
                                <Text style={styles.deliveryNote}>Desde €2.50 • 45m</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Location Card */}
                        <View style={styles.locationCard}>
                            <View style={styles.locationIconCircle}>
                                <MaterialIcons name="location-on" size={20} color="#F97316" />
                            </View>
                            <View style={styles.locationTextContainer}>
                                <Text style={styles.locationLabel}>UBICACIÓN DE TIENDA</Text>
                                <Text style={styles.locationValue}>AV. LARCO 123, MIRAFLORES</Text>
                            </View>
                            <MaterialIcons name="map" size={20} color="#CBD5E1" />
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
                                    style={[styles.paymentCard, paymentMethod === method.id && styles.paymentCardActive]}
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
                                            <Text style={styles.methodLabel}>{method.label}</Text>
                                            {method.id === 'cash' && <Text style={styles.methodType}>{method.type}</Text>}
                                        </View>
                                    </View>
                                    <View style={[styles.radio, paymentMethod === method.id && styles.radioActive]}>
                                        {paymentMethod === method.id && <View style={styles.radioInner} />}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Summary Table */}
                        <View style={styles.summaryCard}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal</Text>
                                <Text style={styles.summaryValue}>€{subtotal.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Impuestos</Text>
                                <Text style={styles.summaryValue}>€{taxes.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <View style={styles.couponLabelRow}>
                                    <MaterialIcons name="confirmation-number" size={16} color="#22C55E" />
                                    <Text style={styles.couponLabel}>Cupón</Text>
                                </View>
                                <Text style={styles.couponValue}>-€{discount.toFixed(2)}</Text>
                            </View>

                            <View style={styles.pointsBanner}>
                                <MaterialIcons name="stars" size={18} color="#EAB308" />
                                <Text style={styles.pointsText}>
                                    GANAS <Text style={styles.pointsHighlight}>40 W-POINTS</Text> CON ESTA COMPRA.
                                </Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.totalRow}>
                                <View>
                                    <Text style={styles.totalCaption}>TOTAL A PAGAR</Text>
                                    <Text style={styles.totalAmount}>€{total.toFixed(2)}</Text>
                                </View>
                                <View style={styles.avatarStack}>
                                    <View style={[styles.avatar, { backgroundColor: '#E2E8F0' }]} />
                                    <View style={[styles.avatar, { backgroundColor: '#CBD5E1', marginLeft: -12 }]} />
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
                <View style={styles.fixedFooter}>
                    <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
                        <Text style={styles.checkoutBtnText}>CONFIRMAR PAGO</Text>
                        <View style={styles.arrowIconBg}>
                            <MaterialIcons name="arrow-forward" size={18} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
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
        paddingBottom: 120,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    deliveryCardActive: {
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
    },
    checkIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
    deliveryIconBg: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBgActive: {
        backgroundColor: '#8B5CF6',
    },
    iconBgInactive: {
        backgroundColor: '#F5F3FF',
    },
    iconBgInactiveSecondary: {
        backgroundColor: '#F0F9FF',
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
        padding: 24,
        backgroundColor: 'rgba(255,255,255,0.9)',
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
});
