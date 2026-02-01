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
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: 75,
          paddingBottom: 10,
        },
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView
              intensity={95}
              tint="light"
              style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.85)' }]}
            />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0' }]} />
          )
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="explore" color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => (
            <View style={{
              top: -20,
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: themeColor,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: themeColor,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 5
            }}>
              <MaterialIcons size={32} name="qr-code-scanner" color="#fff" />
            </View>
          ),
          tabBarLabelStyle: { display: 'none' }
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          title: 'Cupones',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="confirmation-number" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
