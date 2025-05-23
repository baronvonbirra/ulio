import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, Platform, View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { getCocktailByName, Cocktail, Ingredient } from '@/src/services/cocktailService';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DynamicImage from '@/components/DynamicImage';
import { Colors } from '@/constants/Colors'; // Import Colors

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
              textStyle={styles.cocktailDetailImageText} // Fallback text style can be customized here if needed
            />
          )}

          {/* Name */}
          <ThemedText type="title" style={styles.cocktailName}>{cocktail.name}</ThemedText>

          {/* Description */}
          <ThemedText style={styles.description}>{cocktail.description}</ThemedText>

          {/* Ingredients Section Card */}
          <ThemedView style={styles.contentCard}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Ingredients:</ThemedText>
            {cocktail.ingredients.map((ingredient: Ingredient, index: number) => (
              <ThemedText key={index} style={styles.listItem}>
                {`• ${ingredient.amount} ${ingredient.unit || ''} ${ingredient.name}`}
              </ThemedText>
            ))}
          </ThemedView>

          {/* Instructions Section Card */}
          <ThemedView style={styles.contentCard}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Instructions:</ThemedText>
            {cocktail.instructions.map((step: string, index: number) => (
              <ThemedText key={index} style={styles.listItemInstruction}>{`${index + 1}. ${step}`}</ThemedText>
            ))}
          </ThemedView>

          {/* Garnish Section Card (Conditional) */}
          {cocktail.garnish && (
            <ThemedView style={styles.contentCard}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Garnish:</ThemedText>
              <ThemedText style={styles.listItem}>{cocktail.garnish}</ThemedText>
            </ThemedView>
          )}

          {/* Glassware Section Card (Conditional) */}
          {cocktail.glassware && (
            <ThemedView style={styles.contentCard}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Glassware:</ThemedText>
              <ThemedText style={styles.listItem}>{cocktail.glassware}</ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.background, // Use theme background
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 8 : 20,
  },
  cocktailDetailImage: {
    width: '100%',
    aspectRatio: 16 / 9, // Aspect ratio for a more cinematic feel
    borderRadius: 10, // Consistent with cards
    marginBottom: 25, // Increased space below image
  },
  cocktailDetailImageFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.borderColor, // Darker than card background
    borderRadius: 10, // Match image borderRadius
  },
  cocktailDetailImageText: { // Fallback text if needed, though DynamicImage has defaults
    fontSize: 18,
    color: Colors.dark.textSecondary,
  },
  cocktailName: {
    textAlign: 'center',
    marginVertical: 20, // Increased vertical margin
  },
  description: {
    fontSize: 17, // Slightly larger for readability
    lineHeight: 25, // Adjusted line height
    marginVertical: 15, // Increased vertical margin
    textAlign: 'justify', // Justify text for a more formal look
  },
  contentCard: {
    backgroundColor: Colors.dark.cardBackground,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    // ThemedText type="subtitle" already applies serif font and good size
    color: Colors.dark.tint, // Use tint color for section titles
    marginBottom: 12, // Space below title within card
    marginTop: 5, // Space above title within card
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24, // Increased line height
    marginBottom: 8, // Space between list items
    // marginLeft is removed, text aligns with card padding
  },
  listItemInstruction: { // Specific style for instructions if different needed, e.g. more spacing
    fontSize: 16,
    lineHeight: 26, // Slightly more for instructions
    marginBottom: 10,
  },
  notFoundText: {
    textAlign: 'center',
    marginTop: 30,
    color: Colors.dark.tint, // Use tint color for themed error message
  },
});
