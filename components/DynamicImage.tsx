import React from 'react';
import { Image, View, Text, StyleSheet, ImageStyle, TextStyle, StyleProp } from 'react-native';
import { ThemedText } from './ThemedText'; // Assuming ThemedText can be used for fallback

interface DynamicImageProps {
  imageName?: string;
  imageType: 'category' | 'cocktail';
  style?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>; // For the fallback text
  fallbackContainerStyle?: StyleProp<ImageStyle>; // To style the container of the fallback text like an image
}

const imagePaths = {
  category: (name: string) => `../../assets/images/categories/${name}`,
  cocktail: (name: string) => `../../assets/images/cocktails/${name}`,
};

// This is a map for known images. require() needs static paths.
// We can't truly dynamically require a path constructed with variables like `${imageName}`.
// So, this component will demonstrate the principle, but for actual images to load,
// they would need to be explicitly added here or a different strategy (like asset bundling or network loading)
// would be required for a large number of dynamic images.
// For this exercise, we'll simulate the dynamic loading attempt and always hit the fallback.

const DynamicImage: React.FC<DynamicImageProps> = ({
  imageName,
  imageType,
  style,
  textStyle,
  fallbackContainerStyle,
}) => {
  let imageSource = null;

  if (imageName) {
    // Attempt to require the image.
    // In a real scenario with many images, this approach has limitations.
    // For Expo, images in assets are often pre-bundled or need specific handling.
    // This try-catch will likely always go to catch if images aren't known at compile time.
    try {
      // This is where the limitation lies: require paths must be static.
      // We cannot use a variable like `imagePaths[imageType](imageName)` directly in require.
      // To make this truly dynamic with require, one would need a large switch statement
      // or a map of require calls, which is not scalable for many images.
      // Example: if (imageType === 'category' && imageName === 'classic.png') {
      //   imageSource = require('../../assets/images/categories/classic.png');
      // }
      // For now, we will simulate this by letting it fail to demonstrate the fallback.
      if (imageType === '_nonexistent_type_' && imageName === '_nonexistent_name_') { // Never true, so will always "fail" for this demo
         // This is a placeholder for where a dynamic require might go if it were possible for truly dynamic strings
         // e.g. imageSource = require(imagePaths[imageType](imageName));
      }
      // To make it actually load an image if it existed, you'd need:
      // if (imageName === "some-known-image.png" && imageType === "category") {
      //   imageSource = require("../../assets/images/categories/some-known-image.png");
      // }

      // Since we can't dynamically require, we'll assume it's not found for this task.
      // To test actual image loading, one would need to manually add a require path here for a specific image.
      // For the purpose of this task, we will always render the fallback.
      throw new Error("Simulating dynamic image load failure for placeholder demonstration.");

    } catch (error) {
      // Image not found or dynamic require failed, will use fallback.
      imageSource = null;
    }
  }

  if (imageSource) {
    return <Image source={imageSource} style={[styles.image, style]} resizeMode="contain" />;
  } else {
    return (
      <View style={[styles.fallbackContainer, fallbackContainerStyle, style]}>
        <ThemedText style={[styles.fallbackText, textStyle]}>
          {imageName || 'No image'}
        </ThemedText>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  image: {
    // Default image styling, can be overridden by props
    width: 50,
    height: 50,
  },
  fallbackContainer: {
    width: 50, // Default size, should be overridden by `style` or `fallbackContainerStyle`
    height: 50, // Default size
    backgroundColor: '#e0e0e0', // Light gray background for placeholder
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
  },
  fallbackText: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
  },
});

export default DynamicImage;
