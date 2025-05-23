import React from 'react';
import { Image, View, StyleSheet, ImageStyle, TextStyle, StyleProp, ImageSourcePropType } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors'; // Import Colors

interface DynamicImageProps {
  imageName?: string;
  imageType: 'category' | 'cocktail';
  style?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  fallbackContainerStyle?: StyleProp<ImageStyle>;
}

// Map for known local images. require() needs static paths.
// Key convention: `${imageType}_${imageName}`
const localImageMap: Record<string, ImageSourcePropType> = {
  'category_rum_category_icon.png': require('../../assets/images/categories/rum_category_icon.png'),
  'category_whiskey_category_icon.png': require('../../assets/images/categories/whiskey_category_icon.png'),
  // Add more entries here as other images become available
  // e.g., 'cocktail_old_fashioned.png': require('../../assets/images/cocktails/old_fashioned.png'),
};

const DynamicImage: React.FC<DynamicImageProps> = ({
  imageName,
  imageType,
  style,
  textStyle,
  fallbackContainerStyle,
}) => {
  let imageSource: ImageSourcePropType | null = null;

  if (imageName) {
    const imageKey = `${imageType}_${imageName}`;
    if (localImageMap[imageKey]) {
      imageSource = localImageMap[imageKey];
    }
  }

  if (imageSource) {
    // Apply the external style to the Image component
    return <Image source={imageSource} style={[styles.imageDefaults, style]} resizeMode="contain" />;
  } else {
    // Apply the external style to the fallback container
    // and ensure fallbackContainerStyle can also provide specific overrides
    return (
      <View style={[styles.fallbackContainerDefaults, fallbackContainerStyle, style]}>
        <ThemedText style={[styles.fallbackTextDefaults, textStyle]}>
          {imageName || 'No image'}
        </ThemedText>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  imageDefaults: {
    width: 50,
    height: 50,
  },
  fallbackContainerDefaults: {
    width: 50,
    height: 50,
    backgroundColor: Colors.dark.borderColor, // Use a dark theme color
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.cardBackground, // Use a slightly different dark theme color for border
    borderRadius: 4,
  },
  fallbackTextDefaults: {
    fontSize: 10,
    color: Colors.dark.textSecondary, // Use a light/secondary text color for dark theme
    textAlign: 'center',
  },
});

export default DynamicImage;
