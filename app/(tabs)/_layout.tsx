import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native'; // Import StyleSheet

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground'; // This is likely for blur on iOS
import { Colors } from '@/constants/Colors';
// Removed useColorScheme as we are directly applying the dark theme

export default function TabLayout() {
  // const colorScheme = useColorScheme(); // Forcing dark theme

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.tabIconSelected,
        tabBarInactiveTintColor: Colors.dark.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground, // For iOS blur
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(30, 30, 30, 0.85)', // Dark, translucent for blur over dark content
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: Colors.dark.borderColor, // Subtle border
          },
          default: { // Android, Web
            backgroundColor: Colors.dark.cardBackground, // Solid dark background
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: Colors.dark.borderColor,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
