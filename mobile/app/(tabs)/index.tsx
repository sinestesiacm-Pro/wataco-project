import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, FlatList, Platform, Modal, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { useCart } from '@/context/CartContext';
import { CATEGORIES, FEATURED_OFFERS, LIST_OFFERS, PROMOTIONS } from '@/constants/mockData';
import { Offer, Category, Promotion } from '@/lib/types';
import { getCategoryGradient, getHeaderColor } from '@/lib/theme';
import { NeumorphicIcon } from '@/components/NeumorphicIcon';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { addToCart, cartCount, setThemeColor, isDarkMode } = useCart();
  const [selectedCategory, setSelectedCategory] = React.useState('Todos');
  const [promoIndex, setPromoIndex] = React.useState(0);
  // Memoize theme color
  const themeColor = useMemo(() =>
    getHeaderColor(selectedCategory),
    [selectedCategory]
  );
  const [filterModalVisible, setFilterModalVisible] = React.useState(false);

  // Update global theme when category changes
  React.useEffect(() => {
    setThemeColor(getHeaderColor(selectedCategory));
  }, [selectedCategory]);

  // Memoized add to cart handler
  const handleAddToCart = useCallback((item: any) => {
    addToCart({
      id: item.id || Date.now() + Math.random(),
      name: item.title || item.name,
      price: item.price || 15.0,
      img: item.image,
      quantity: 1,
      type: 'service',
      shop: item.shop || item.title || item.name
    });
  }, [addToCart]);

  // Memoized category renderer
  const renderCategory = useCallback(({ item }: { item: Category | { id: string, label: string, icon: string, color: string } }) => {
    const isActive = selectedCategory === item.label;
    const gradient = getCategoryGradient(item.label);
    const glowColor = gradient[1];

    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item.label)}
        style={[styles.categoryContainer, isActive && styles.activeCategoryContainer]}
      >
        <View style={[
          styles.categoryCard,
          isActive && { borderColor: glowColor, backgroundColor: isDarkMode ? '#1E293B' : '#fff' },
          isDarkMode && !isActive && styles.categoryCardDark
        ]}>
          <MaterialIcons
            name={item.icon as any}
            size={28}
            color={isActive ? glowColor : (isDarkMode ? '#CBD5E1' : '#64748B')}
          />
        </View>
        <Text style={[
          styles.categoryLabel,
          isActive && styles.activeCategoryLabel,
          isDarkMode && !isActive && styles.categoryLabelDark,
          isDarkMode && isActive && styles.activeCategoryLabelDark
        ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  }, [selectedCategory, isDarkMode]);

  // Memoized featured renderer
  const renderFeatured = useCallback(({ item }: { item: Offer }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.featuredCard}
      onPress={() => router.push(`/details/${item.id}`)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.featuredImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.featuredGradient}
      />
      <View style={styles.featuredBadge}>
        {item.discount && (
          <View style={[styles.badgeContainer, { backgroundColor: '#F97316' }]}>
            <Text style={styles.badgeText}>{item.discount}</Text>
          </View>
        )}
      </View>
      <View style={styles.featuredContent}>
        <View style={styles.featuredTextContainer}>
          <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
          <Text style={styles.featuredTitle} numberOfLines={2}>{item.title}</Text>
        </View>
        <TouchableOpacity
          style={styles.reserveButton}
          onPress={(e) => {
            e.stopPropagation(); // Might not work exactly like web, but handled by logic
            handleAddToCart(item);
          }}
        >
          <Text style={styles.reserveButtonText}>RESERVAR</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ), [handleAddToCart, router]);

  // Memoized key extractors
  const categoryKeyExtractor = useCallback((item: Category) => item.id, []);
  const featuredKeyExtractor = useCallback((item: Offer) => item.id, []);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      {isFocused && <StatusBar style="light" backgroundColor={getHeaderColor(selectedCategory)} animated={false} />}
      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
          {/* Header Top Row: Location + Actions */}
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.locationContainer} onPress={() => router.push('/profile')}>
              <View style={styles.locationIconBg}>
                <MaterialIcons name="location-on" size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.locationTitle}>TU UBICACIÓN</Text>
                <View style={styles.locationRow}>
                  <Text style={styles.locationText}>Centro Histórico</Text>
                  <MaterialIcons name="expand-more" size={16} color="rgba(255,255,255,0.8)" />
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconCircleButton} onPress={() => router.push('/checkout')}>
                <MaterialIcons name="shopping-cart" size={22} color="#fff" />
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconCircleButton} onPress={() => router.push('/notifications')}>
                <MaterialIcons name="notifications" size={22} color="#fff" />
                <View style={[
                  styles.notificationDot,
                  (selectedCategory === 'Comida' || selectedCategory === 'Belleza' || selectedCategory === 'Mascotas') && { backgroundColor: '#FACC15' }
                ]} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Header Bottom Row: Search + Filter */}
          <View style={styles.headerSearchRow}>
            <TouchableOpacity
              style={[styles.searchPill, isDarkMode && styles.searchPillDark]}
              onPress={() => router.push('/search')}
            >
              <MaterialIcons name="search" size={24} color={isDarkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)"} />
              <Text style={[styles.searchPillText, isDarkMode && styles.searchPillTextDark]}>¿QUÉ ESTÁS BUSCANDO?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterPill, isDarkMode && styles.filterPillDark]}
              onPress={() => setFilterModalVisible(true)}
            >
              <MaterialIcons name="tune" size={24} color={themeColor} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Impact Section (Promotions Card) */}
        <View style={styles.heroSection}>
          <FlatList
            data={PROMOTIONS}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              const index = Math.round(x / SCREEN_WIDTH);
              if (index !== promoIndex) setPromoIndex(index);
            }}
            renderItem={({ item }) => (
              <View style={styles.promoCardContainer}>
                <View style={styles.promoCardShadowWrapper}>
                  <View style={styles.promoCardInner}>
                    <View style={styles.promoCardAction}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.promoCardAction}
                        onPress={() => router.push(`/details/${item.id}`)}
                      >
                        <Image source={{ uri: item.image }} style={styles.promoBgImage} />
                        <LinearGradient
                          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)', 'transparent']}
                          start={{ x: 0, y: 0.5 }}
                          end={{ x: 1, y: 0.5 }}
                          style={styles.promoImpactGradient}
                        />

                        <View style={styles.promoImpactContent}>
                          {/* Commercial Tag */}
                          <View style={[styles.promoBadge, { backgroundColor: item.color || '#6B21A8' }]}>
                            <Text style={styles.promoBadgeText}>{item.tag}</Text>
                          </View>

                          <Text style={styles.promoImpactTitle} numberOfLines={2}>{item.title}</Text>
                          <Text style={styles.promoImpactSubtitle} numberOfLines={1}>{item.subtitle}</Text>

                          {/* Commercial CTA Button */}
                          <View style={styles.promoImpactCTA}>
                            <Text style={[styles.promoImpactCTAText, { color: themeColor }]}>{item.footer}</Text>
                            <MaterialIcons name="arrow-forward" size={16} color={themeColor} />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          {/* Pagination Dots (Inside Hero, Top Right) */}
          <View style={styles.heroPagination}>
            {PROMOTIONS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.heroDot,
                  promoIndex === i ? { width: 14, backgroundColor: '#fff' } : { backgroundColor: 'rgba(255,255,255,0.4)' }
                ]}
              />
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setFilterModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>FILTRAR OFERTAS</Text>
                <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                  <MaterialIcons name="close" size={24} color="#64748B" />
                </TouchableOpacity>
              </View>

              <Text style={styles.filterGroupTitle}>ORDENAR POR</Text>
              <View style={styles.filterOptions}>
                {['Más cercano', 'Mejor valorados', 'Novedades'].map(opt => (
                  <TouchableOpacity key={opt} style={styles.filterOption}>
                    <Text style={styles.filterOptionText}>{opt}</Text>
                    <View style={styles.radioOuter} />
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.applyButton, { backgroundColor: themeColor }]}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.applyButtonText}>APLICAR FILTROS</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>


        {/* Featured */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}>DESTACADOS <Text style={styles.brandText}>WATACO</Text></Text>
          <TouchableOpacity onPress={() => router.push('/search')}>
            <View style={styles.seeAllContainer}>
              <Text style={styles.seeAllText}>VER TODO</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#0EA5E9" />
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={FEATURED_OFFERS.filter(offer => selectedCategory === 'Todos' || offer.category === selectedCategory)}
          renderItem={renderFeatured}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
          snapToInterval={310} // card width + margin
          decelerationRate="fast"
          snapToAlignment="start"
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="info-outline" size={32} color={isDarkMode ? '#475569' : '#CBD5E1'} />
              <Text style={styles.emptyText}>No hay destacados en esta categoría</Text>
            </View>
          )}
        />

        {/* List Offers (Filtered) */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}>
            {selectedCategory === 'Todos' ? 'OFERTAS DEL DÍA' : `OFERTAS DE ${selectedCategory.toUpperCase()}`}
          </Text>
        </View>

        <View style={styles.recommendationsList}>
          {LIST_OFFERS.filter(offer => selectedCategory === 'Todos' || offer.category === selectedCategory).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.recommendationCard, isDarkMode && styles.recommendationCardDark]}
              onPress={() => router.push(`/details/${item.id}`)}
            >
              <Image source={{ uri: item.image }} style={styles.recommendationImage} resizeMode="cover" />
              <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.recommendationGradient}
              />
              <View style={styles.recommendationContent}>
                <View style={styles.tagBadge}>
                  <Text style={styles.tagTextSmall}>{item.category}</Text>
                </View>
                <View>
                  <Text style={styles.recommendationTitle}>{item.title}</Text>
                  <Text style={styles.recommendationSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.recommendationStats}>
                  <View style={styles.statBadge}>
                    <MaterialIcons name="star" size={12} color="#FACC15" />
                    <Text style={styles.statText}>{item.rating || '4.5'}</Text>
                  </View>
                  <View style={styles.statBadge}>
                    <Text style={styles.priceStatic}>€{(item.price || 15).toFixed(2)}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.claimButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
              >
                <MaterialIcons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingBottom: 22, // Compacted
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 12,
    zIndex: 100,
  },
  headerSafeArea: {
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 0) : 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 4, // Compacted
  },
  headerSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 4, // Compacted
  },
  searchPill: {
    flex: 1,
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 27,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchPillDark: {
    backgroundColor: '#1E293B',
    shadowOpacity: 0.3,
  },
  searchPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.3)',
    letterSpacing: -0.2,
  },
  searchPillTextDark: {
    color: 'rgba(255,255,255,0.4)',
  },
  filterPill: {
    width: 54,
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  filterPillDark: {
    backgroundColor: '#1E293B',
    shadowOpacity: 0.3,
  },
  iconCircleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationIconBg: {
    padding: 8,
  },
  locationTitle: {
    fontSize: 9,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 2,
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fff',
    textTransform: 'uppercase',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#F43F5E',
    height: 18,
    minWidth: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: '#F43F5E',
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 120,
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  searchBar: {
    flex: 1,
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
    // Higher 3D Elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  searchText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  filterButton: {
    width: 60,
    height: 60,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroSection: {
    position: 'relative',
    marginTop: 0,
    marginBottom: 10,
    zIndex: 1,
  },
  promoHeaderSection: {
    paddingTop: 0,
  },
  heroPagination: {
    position: 'absolute',
    bottom: 45, // Moved to bottom right over image
    right: 45,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    zIndex: 20,
  },
  heroDot: {
    height: 6,
    width: 6,
    borderRadius: 3,
  },
  promoList: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'visible',
  },
  promoCardContainer: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20, // Add padding for "Floating Card" look
    overflow: 'visible',
  },
  promoCardShadowWrapper: {
    width: '100%',
    height: 420, // Increased to provide more clearance
    backgroundColor: 'transparent',
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  promoCardInner: {
    flex: 1,
    borderRadius: 24, // Matches mockup
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  promoCardAction: {
    flex: 1,
  },
  promoBgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.8, // Better contrast for white text
  },
  promoImpactGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  promoImpactContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 35,
    paddingTop: 180, // Reduced to match compact header
  },
  promoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 0,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  promoBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  promoImpactTitle: {
    fontSize: 20, // More compact
    fontWeight: '900',
    color: '#fff',
    lineHeight: 26,
    marginBottom: 4,
  },
  promoImpactSubtitle: {
    fontSize: 13, // More compact
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '600',
    marginBottom: 12,
  },
  promoImpactCTA: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  promoImpactCTAText: {
    fontSize: 11, // More compact
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    marginBottom: 15,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  paginationDotActive: {
    width: 25,
    borderRadius: 10,
  },
  categoriesSection: {
    marginVertical: 10,
    paddingVertical: 10,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 16,
    paddingTop: 20,
    paddingBottom: 25,
  },
  categoryContainer: {
    alignItems: 'center',
    gap: 8,
    width: 72,
  },
  categoryCard: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardDark: {
    backgroundColor: '#1E293B',
    shadowOpacity: 0.2,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: '#64748B',
    textTransform: 'none',
    marginTop: 8,
  },
  categoryLabelDark: {
    color: '#94A3B8',
  },
  activeCategoryContainer: {
    transform: [{ scale: 1.05 }],
  },
  activeCategoryLabel: {
    color: '#0F172A',
    fontWeight: '900',
  },
  activeCategoryLabelDark: {
    color: '#fff',
    fontWeight: '900',
  },
  emptyContainer: {
    width: SCREEN_WIDTH - 40,
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 20,
    marginHorizontal: 20,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 1,
  },
  filterGroupTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#64748B',
    marginBottom: 16,
    letterSpacing: 1,
  },
  filterOptions: {
    gap: 12,
    marginBottom: 32,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
  },
  applyButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  tagBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  tagTextSmall: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  priceStatic: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  sectionTitleDark: {
    color: '#fff',
  },
  brandText: {
    color: '#0EA5E9',
    fontStyle: 'italic',
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0EA5E9',
    letterSpacing: 1.5,
  },
  featuredList: {
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 20,
  },
  featuredCard: {
    width: 290,
    height: 190,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  badgeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  featuredSubtitle: {
    color: '#0EA5E9',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  featuredTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  reserveButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  reserveButtonText: {
    color: '#0F172A',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  vipText: {
    color: '#0EA5E9',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  recommendationsList: {
    paddingHorizontal: 20,
    gap: 20,
  },
  recommendationCard: {
    height: 140,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  recommendationCardDark: {
    backgroundColor: '#1E293B',
    shadowOpacity: 0.3,
  },
  recommendationImage: {
    width: '100%',
    height: '100%',
  },
  recommendationGradient: {
    position: 'absolute',
    inset: 0,
  },
  recommendationContent: {
    position: 'absolute',
    inset: 0,
    padding: 24,
    justifyContent: 'center',
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  recommendationSubtitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#64748B',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  recommendationStats: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 12,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
  },
  claimButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#0EA5E9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  claimButtonText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
