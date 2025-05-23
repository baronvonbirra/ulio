import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { getCocktailsByCategory, Cocktail } from '@/src/services/cocktailService';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DynamicImage from '@/components/DynamicImage'; // Import DynamicImage

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
    <TouchableOpacity onPress={() => handleCocktailPress(item.name)} style={styles.itemContainer}>
      <DynamicImage
        imageName={item.image_placeholder}
        imageType="cocktail"
        style={styles.cocktailImage}
        fallbackContainerStyle={styles.cocktailImageFallback}
        textStyle={styles.cocktailImageText}
      />
      <ThemedText type="subtitle" style={styles.cocktailName}>{item.name}</ThemedText>
    </TouchableOpacity>
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
    backgroundColor: '#f0f0f0',
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
    flexDirection: 'row', // Align image and text horizontally
    alignItems: 'center', // Center items vertically
    backgroundColor: 'white',
    paddingVertical: 10, // Adjusted padding
    paddingHorizontal: 15, // Adjusted padding
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cocktailImage: { // Styles for the DynamicImage component itself (applies to Image or fallback container)
    width: 40,
    height: 40,
    marginRight: 15,
  },
  cocktailImageFallback: { // Specific styles for the fallback container if needed (e.g. different background)
    width: 40, // Ensure size consistency
    height: 40,
    // backgroundColor is already set in DynamicImage
  },
  cocktailImageText: { // Specific styles for the fallback text
    fontSize: 10,
    // color is already set in DynamicImage
  },
  cocktailName: {
    flex: 1, // Allow text to take remaining space
  },
  // imagePlaceholder style removed as it's no longer used.
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});
