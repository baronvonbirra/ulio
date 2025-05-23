import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, Platform, View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { getCocktailByName, Cocktail, Ingredient } from '@/src/services/cocktailService';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DynamicImage from '@/components/DynamicImage'; // Import DynamicImage

export default function CocktailDetailScreen() {
  const params = useLocalSearchParams<{ name?: string | string[] }>();
  const [cocktail, setCocktail] = useState<Cocktail | null | undefined>(undefined); // undefined for loading, null for not found

  // Ensure name is a string
  const cocktailNameParam = Array.isArray(params.name) ? params.name[0] : params.name;

  useEffect(() => {
    if (cocktailNameParam) {
      const fetchedCocktail = getCocktailByName(cocktailNameParam);
      setCocktail(fetchedCocktail);
    } else {
      setCocktail(null); // No name provided
    }
  }, [cocktailNameParam]);

  if (cocktail === undefined) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  if (!cocktail) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen options={{ title: 'Cocktail Not Found' }} />
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.notFoundText}>Cocktail not found.</ThemedText>
          {cocktailNameParam && <ThemedText>Searched for: {cocktailNameParam}</ThemedText>}
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: cocktail.name || 'Cocktail Details' }} />
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.container}>
          {/* Dynamic Image / Placeholder */}
          {cocktail.image_placeholder && (
            <DynamicImage
              imageName={cocktail.image_placeholder}
              imageType="cocktail"
              style={styles.cocktailDetailImage}
              fallbackContainerStyle={styles.cocktailDetailImageFallback}
              textStyle={styles.cocktailDetailImageText}
            />
          )}

          {/* Name */}
          <ThemedText type="title" style={styles.cocktailName}>{cocktail.name}</ThemedText>

          {/* Description */}
          <ThemedText style={styles.description}>{cocktail.description}</ThemedText>

          {/* Ingredients */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>Ingredients:</ThemedText>
          {cocktail.ingredients.map((ingredient: Ingredient, index: number) => (
            <ThemedText key={index} style={styles.listItem}>
              - {ingredient.amount} {ingredient.unit} {ingredient.name}
            </ThemedText>
          ))}

          {/* Instructions */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>Instructions:</ThemedText>
          {cocktail.instructions.map((step: string, index: number) => (
            <ThemedText key={index} style={styles.listItem}>{`${index + 1}. ${step}`}</ThemedText>
          ))}

          {/* Garnish */}
          {cocktail.garnish && (
            <>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Garnish:</ThemedText>
              <ThemedText style={styles.listItem}>{cocktail.garnish}</ThemedText>
            </>
          )}

          {/* Glassware */}
          {cocktail.glassware && (
            <>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Glassware:</ThemedText>
              <ThemedText style={styles.listItem}>{cocktail.glassware}</ThemedText>
            </>
          )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light gray background for the whole screen
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 8 : 20,
  },
  cocktailDetailImage: { // Styles for the DynamicImage component (Image or Fallback container)
    width: '100%', // Make it responsive
    height: 200,    // Fixed height for the detail image
    marginBottom: 20,
    borderRadius: 8, // Optional: if you want rounded corners for the image/placeholder
  },
  cocktailDetailImageFallback: { // Specific styles for the fallback container
    // backgroundColor is set in DynamicImage, override if needed
    // width/height are taken from `style` prop (styles.cocktailDetailImage)
    alignItems: 'center', // Ensure text is centered in the fallback
    justifyContent: 'center',
  },
  cocktailDetailImageText: { // Specific styles for the fallback text
    fontSize: 18, // Larger text for detail image fallback
    // color is set in DynamicImage
  },
  // imagePlaceholderContainer and imagePlaceholderText styles removed as they are no longer used.
  cocktailName: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#333', // Dark color for the name
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24, // Improved readability
    color: '#555',
  },
  sectionTitle: {
    marginTop: 15,
    marginBottom: 8,
    fontSize: 18, // Slightly larger for section titles
    color: '#444',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 6,
    marginLeft: 10, // Indent list items
    lineHeight: 22,
    color: '#555',
  },
  notFoundText: {
    textAlign: 'center',
    marginTop: 30,
    color: 'red',
  },
});
