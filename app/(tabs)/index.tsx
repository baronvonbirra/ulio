import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { getAllCategories, Category } from '@/src/services/cocktailService';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DynamicImage from '@/components/DynamicImage'; // Updated import path

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
    <TouchableOpacity onPress={() => handleCategoryPress(item.name)} style={styles.itemContainer}>
      <DynamicImage
        imageName={item.icon_placeholder}
        imageType="category"
        style={styles.categoryImage}
        fallbackContainerStyle={styles.categoryImageFallback} // Use this to control fallback view's size
        textStyle={styles.categoryImageText}
      />
      <ThemedText type="subtitle" style={styles.categoryName}>{item.name}</ThemedText>
    </TouchableOpacity>
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
    backgroundColor: '#f0f0f0', // A light background for the safe area
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
  categoryImage: {
    width: 40, // Specify size for the image/placeholder
    height: 40,
    marginRight: 15, // Space between image and text
  },
  categoryImageFallback: { // Style for the View container of the fallback text
    width: 40,
    height: 40,
    // backgroundColor is already set in DynamicImage, but can be overridden
  },
  categoryImageText: { // Style for the fallback text itself
    fontSize: 10,
    // color is already set in DynamicImage
  },
  categoryName: {
    flex: 1, // Allow text to take remaining space
  },
  // iconPlaceholder style removed as it's no longer used.
});
