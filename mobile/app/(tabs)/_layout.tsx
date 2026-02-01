import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { StyleSheet, View, Platform } from 'react-native';
import { useCart } from '@/context/CartContext';

export default function TabLayout() {
  const { themeColor } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: themeColor,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '900',
          marginBottom: 4,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 95 : 105,
          paddingBottom: Platform.OS === 'android' ? 15 : 35,
          overflow: 'visible',
        },
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint={useCart().isDarkMode ? 'dark' : 'light'}
            experimentalBlurMethod="dimezisBlurView"
            style={[
              StyleSheet.absoluteFill,
              {
                borderTopLeftRadius: 36,
                borderTopRightRadius: 36,
                overflow: 'hidden',
                backgroundColor: useCart().isDarkMode ? 'rgba(30, 58, 138, 0.5)' : 'rgba(255, 255, 255, 0.4)',
              }
            ]}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="explore" color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={{
              top: -15,
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: themeColor,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: themeColor,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.4,
              shadowRadius: 15,
              elevation: 8,
              borderWidth: 4,
              borderColor: useCart().isDarkMode ? '#0F172A' : '#fff',
            }}>
              <MaterialIcons size={32} name="qr-code-scanner" color="#fff" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          title: 'Cupones',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="confirmation-number" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
