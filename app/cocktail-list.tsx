import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, SafeAreaView, Platform } from 'react-native'; // Import Pressable
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { getCocktailsByCategory, Cocktail } from '@/src/services/cocktailService';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DynamicImage from '@/components/DynamicImage';
import { Colors } from '@/constants/Colors'; // Import Colors

export default function CocktailListScreen() {
  const params = useLocalSearchParams<{ categoryName?: string | string[] }>();
  const router = useRouter();
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  // Ensure categoryName is a string
  const categoryName = Array.isArray(params.categoryName) ? params.categoryName[0] : params.categoryName;

  useEffect(() => {
    if (categoryName) {
      const fetchedCocktails = getCocktailsByCategory(categoryName);
      setCocktails(fetchedCocktails);
    }
  }, [categoryName]);

  const handleCocktailPress = (cocktailName: string) => {
    router.push(`/cocktail-detail?name=${encodeURIComponent(cocktailName)}`);
  };

  const renderCocktailItem = ({ item }: { item: Cocktail }) => (
    <Pressable
      onPress={() => handleCocktailPress(item.name)}
      style={({ pressed }) => [
        styles.itemContainer,
        { transform: [{ scale: pressed ? 0.97 : 1 }] }, // Apply scale transform
      ]}
    >
      <DynamicImage
        imageName={item.image_placeholder}
        imageType="cocktail"
        style={styles.cocktailImage}
        fallbackContainerStyle={styles.cocktailImageFallback}
        textStyle={styles.cocktailImageText}
      />
      <ThemedText type="subtitle" style={styles.cocktailName}>{item.name}</ThemedText>
    </Pressable>
  );

  if (!categoryName) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <ThemedText>No category specified.</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: categoryName || 'Cocktails' }} />
      <ThemedView style={styles.container}>
        {cocktails.length > 0 ? (
          <FlatList
            data={cocktails}
            renderItem={renderCocktailItem}
            keyExtractor={(item) => item.name}
            style={styles.list}
          />
        ) : (
          <ThemedText style={styles.emptyMessage}>No cocktails found for this category.</ThemedText>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.background, // Use theme background
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 8 : 0,
    paddingHorizontal: 16,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardBackground,
    padding: 15, // Uniform padding
    borderRadius: 10,
    marginVertical: 8, // Vertical margin for separation
    marginHorizontal: 10, // Horizontal margin for separation from screen edges
    elevation: 0, // Kept flat
  },
  cocktailImage: {
    width: 50, // Increased size
    height: 50, // Increased size
    marginRight: 15,
    borderRadius: 4, // Optional: slightly rounded corners for the image/placeholder itself
  },
  cocktailImageFallback: {
    width: 50, // Match cocktailImage size
    height: 50, // Match cocktailImage size
    backgroundColor: Colors.dark.borderColor,
    borderRadius: 4, // Match cocktailImage borderRadius
  },
  cocktailImageText: {
    fontSize: 10, // Keep small for placeholder text
    color: Colors.dark.textSecondary,
  },
  cocktailName: {
    flex: 1, // Allow text to take remaining space
  },
  // imagePlaceholder style removed as it's no longer used.
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: Colors.dark.textSecondary, // Use theme secondary text color
  },
});
