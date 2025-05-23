import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, SafeAreaView, Platform } from 'react-native'; // Import Pressable
import { useRouter } from 'expo-router';
import { getAllCategories, Category } from '@/src/services/cocktailService';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DynamicImage from '@/components/DynamicImage';
import { Colors } from '@/constants/Colors'; // Import Colors

export default function CategorySelectionScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchedCategories = getAllCategories();
    // We only need name and icon_placeholder for the category list itself.
    // The full cocktail list will be fetched on the next screen.
    const categoryListData = fetchedCategories.map(cat => ({
      name: cat.name,
      icon_placeholder: cat.icon_placeholder,
      cocktails: [], // cocktails array is not needed here
    }));
    setCategories(categoryListData);
  }, []);

  const handleCategoryPress = (categoryName: string) => {
    router.push(`/cocktail-list?categoryName=${encodeURIComponent(categoryName)}`);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <Pressable
      onPress={() => handleCategoryPress(item.name)}
      style={({ pressed }) => [
        styles.itemContainer,
        { transform: [{ scale: pressed ? 0.97 : 1 }] }, // Apply scale transform
      ]}
    >
      <DynamicImage
        imageName={item.icon_placeholder}
        imageType="category"
        style={styles.categoryImage}
        fallbackContainerStyle={styles.categoryImageFallback} // Use this to control fallback view's size
        textStyle={styles.categoryImageText}
      />
      <ThemedText type="subtitle" style={styles.categoryName}>{item.name}</ThemedText>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.header}>Select a Category</ThemedText>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.name}
          style={styles.list}
        />
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
    paddingTop: Platform.OS === 'android' ? 20 : 0, // Add padding for Android status bar
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
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
  categoryImage: {
    width: 40, // Specify size for the image/placeholder
    height: 40,
    marginRight: 15, // Space between image and text
  },
  categoryImageFallback: {
    width: 40,
    height: 40,
    backgroundColor: Colors.dark.borderColor, // Darker fallback background
  },
  categoryImageText: {
    fontSize: 10,
    color: Colors.dark.textSecondary, // Lighter fallback text
  },
  categoryName: {
    flex: 1, // Allow text to take remaining space
  },
  // iconPlaceholder style removed as it's no longer used.
});
