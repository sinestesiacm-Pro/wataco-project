import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, FlatList, Platform, StatusBar, Modal } from 'react-native';
import { useRouter } from 'expo-router';
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
  const { addToCart, cartCount, setThemeColor } = useCart(); // Removed themeColor from destructuring as it's redefined below
  const [selectedCategory, setSelectedCategory] = React.useState('Todos');
  const [promoIndex, setPromoIndex] = React.useState(0);
  const themeColor = CATEGORIES.find(c => c.label === selectedCategory)?.color || '#8B5CF6';
  const [filterModalVisible, setFilterModalVisible] = React.useState(false);

  // Update global theme when category changes
  React.useEffect(() => {
    setThemeColor(getHeaderColor(selectedCategory));
  }, [selectedCategory]);

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id || Date.now() + Math.random(),
      name: item.title || item.name,
      price: item.price || 15.0,
      img: item.image,
      quantity: 1,
      type: 'service',
      shop: item.shop || item.title || item.name
    });
  };

  const renderCategory = ({ item }: { item: Category | { id: string, label: string, icon: string, color: string } }) => {
    const isActive = selectedCategory === item.label;
    const gradient = getCategoryGradient(item.label);
    const glowColor = gradient[1];

    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item.label)}
        style={[styles.categoryContainer, isActive && styles.activeCategoryContainer]}
      >
        <NeumorphicIcon
          icon={item.icon}
          glowColor={glowColor}
          isActive={isActive}
        />
        <Text style={[styles.categoryLabel, isActive && styles.activeCategoryLabel]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFeatured = ({ item }: { item: Offer }) => (
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
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={getHeaderColor(selectedCategory)} />
      {/* Header */}
      <View style={[styles.header, { backgroundColor: getHeaderColor(selectedCategory) }]}>
        <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
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
              <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/checkout')}>
                <MaterialIcons name="shopping-bag" size={24} color="#fff" />
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/notifications')}>
                <MaterialIcons name="notifications" size={24} color="#fff" />
                <View style={[
                  styles.notificationDot,
                  (selectedCategory === 'Comida' || selectedCategory === 'Belleza' || selectedCategory === 'Mascotas') && { backgroundColor: '#FACC15' } // Yellow dot for red themes
                ]} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/search')}>
            <MaterialIcons name="search" size={24} color="#94A3B8" />
            <Text style={styles.searchText}>¿QUÉ ESTÁS BUSCANDO?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: themeColor, shadowColor: themeColor }]} onPress={() => setFilterModalVisible(true)}>
            <MaterialIcons name="tune" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Promotions Section (Uber Eats 2026 Aesthetic) */}
        <View style={styles.promoSection}>
          <FlatList
            data={PROMOTIONS}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={SCREEN_WIDTH - 40}
            decelerationRate="fast"
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              const index = Math.round(x / (SCREEN_WIDTH - 40));
              if (index !== promoIndex) setPromoIndex(index);
            }}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.promoList}
            renderItem={({ item }) => (
              <View style={styles.promoCardShadowWrapper}>
                <View style={styles.promoCardInner}>
                  <LinearGradient
                    colors={item.gradientColors as [string, string, ...string[]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.promoGradient}
                  >
                    {/* Glass Overlay for modern look */}
                    <View style={styles.promoGlassOverlay} />
                    {/* Premium Hairline Border */}
                    <View style={styles.promoHairlineBorder} />

                    <TouchableOpacity activeOpacity={0.9} style={styles.promoContent}>
                      {/* Image with subtle elevation */}
                      <View style={styles.promoImageWrapper}>
                        <Image source={{ uri: item.image }} style={styles.promoImage} />
                      </View>

                      {/* Text Section */}
                      <View style={styles.promoTextCol}>
                        <Text style={styles.promoTitle}>{item.title}</Text>
                        <Text style={styles.promoSubtitle}>{item.subtitle}</Text>
                        <View style={styles.promoFooterRow}>
                          <Text style={styles.promoFooterText}>{item.footer}</Text>
                        </View>
                      </View>

                      {/* Circular Chevron Button (Glass style) */}
                      <View style={styles.promoCircularButton}>
                        <MaterialIcons name="chevron-right" size={24} color="#141414" />
                      </View>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            )}
          />

          {/* Minimalist Pagination Dots */}
          <View style={styles.paginationRow}>
            {PROMOTIONS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.paginationDot,
                  promoIndex === i ? [styles.paginationDotActive, { backgroundColor: themeColor }] : null
                ]}
              />
            ))}
          </View>
        </View>

        {/* Filter Modal */}
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

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <FlatList
            data={[{ id: 'all', label: 'Todos', icon: 'apps', color: 'slate' }, ...CATEGORIES]}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>DESTACADOS <Text style={styles.brandText}>WATACO</Text></Text>
          <TouchableOpacity onPress={() => router.push('/search')}>
            <View style={styles.seeAllContainer}>
              <Text style={styles.seeAllText}>VER TODO</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#0EA5E9" />
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={FEATURED_OFFERS}
          renderItem={renderFeatured}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
          snapToInterval={310} // card width + margin
          decelerationRate="fast"
          snapToAlignment="start"
        />

        {/* List Offers (Filtered) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'Todos' ? 'OFERTAS DEL DÍA' : `OFERTAS DE ${selectedCategory.toUpperCase()}`}
          </Text>
        </View>

        <View style={styles.recommendationsList}>
          {LIST_OFFERS.filter(offer => selectedCategory === 'Todos' || offer.category === selectedCategory).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.recommendationCard}
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    overflow: 'hidden',
    backgroundColor: '#8B5CF6', // Vibrant Violet (Vercel Style)
  },
  headerSafeArea: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    paddingTop: 120, // Header height
    paddingBottom: 100, // Navbar height + extra for visibility
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
  promoSection: {
    marginVertical: 10,
  },
  promoList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  promoCardShadowWrapper: {
    width: SCREEN_WIDTH - 40,
    height: 102,             // más compacto
    borderRadius: 28,
    backgroundColor: 'transparent',
    overflow: 'visible',
    // sombra más moderna y ligera
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 30,
    elevation: 4,
  },
  promoCardInner: {
    flex: 1,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  promoGradient: {
    flex: 1,
  },
  promoGlassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  promoHairlineBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    borderRadius: 28,
  },
  promoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  promoImageWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 2,
  },
  promoImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  promoTextCol: {
    flex: 1,
    justifyContent: 'center',
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#141414',
    lineHeight: 19,
    marginBottom: 2,
  },
  promoSubtitle: {
    fontSize: 12,
    color: 'rgba(20,20,20,0.55)',
    fontWeight: '600',
    marginBottom: 6,
  },
  promoFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoFooterText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(20,20,20,0.78)',
  },
  promoCircularButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.10)',
  },
  paginationDotActive: {
    width: 18,
    borderRadius: 6,
    backgroundColor: '#8B5CF6',
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
    gap: 10,
    width: 78,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '900', // Bolder labels
    color: '#0F172A', // Darker navy/black
    textTransform: 'none',
    marginTop: 8,
  },
  activeCategoryContainer: {
    transform: [{ scale: 1.05 }],
  },
  activeCategoryLabel: {
    color: '#0F172A',
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
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
    width: '100%',
    height: 175,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
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
