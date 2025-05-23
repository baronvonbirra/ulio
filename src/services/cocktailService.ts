// src/services/cocktailService.ts

import cocktailsData from '../../assets/data/cocktails.json';

// Define TypeScript interfaces
export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Cocktail {
  name: string;
  image_placeholder: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  garnish?: string;
  glassware?: string;
}

export interface Category {
  name: string;
  icon_placeholder: string;
  cocktails: Cocktail[];
}

// Type assertion for the imported data
const categories: Category[] = cocktailsData as Category[];

/**
 * Returns an array of all categories.
 * Each category object includes its name and icon placeholder.
 */
export const getAllCategories = (): Category[] => {
  return categories.map(category => ({
    name: category.name,
    icon_placeholder: category.icon_placeholder,
    cocktails: category.cocktails, // Returning full category objects for now
  }));
};

/**
 * Returns an array of cocktails for the given category name.
 * If the category is not found, it returns an empty array.
 * @param categoryName - The name of the category to retrieve cocktails from.
 */
export const getCocktailsByCategory = (categoryName: string): Cocktail[] => {
  const category = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
  return category ? category.cocktails : [];
};

/**
 * Iterates through all categories and their cocktails to find and return a specific cocktail by its name.
 * Assumes cocktail names are unique across all categories.
 * @param name - The name of the cocktail to find.
 */
export const getCocktailByName = (name: string): Cocktail | undefined => {
  for (const category of categories) {
    const cocktail = category.cocktails.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (cocktail) {
      return cocktail;
    }
  }
  return undefined;
};
