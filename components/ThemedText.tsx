import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

import { Colors } from '@/constants/Colors'; // Import Colors for the link

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    // Assuming system default sans-serif is acceptable for body text
    // fontFamily: 'HelveticaNeue-Light', // Example if a specific light sans-serif was desired
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    // fontFamily: 'HelveticaNeue-Light',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold', // Keep bold for strong titles
    lineHeight: 38, // Adjusted line height for serif
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', // Georgia for iOS, fallback to generic serif
  },
  subtitle: {
    fontSize: 22, // Slightly increased size for subtitles
    fontWeight: 'normal', // Normal weight for a more elegant serif subtitle
    lineHeight: 28, // Adjusted line height
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: Colors.dark.tint, // Use the new tint color for links
    // fontFamily: 'HelveticaNeue-Light',
  },
});
