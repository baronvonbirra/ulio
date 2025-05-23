import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Platform } from 'react-native'; // Import Platform
import { Colors } from '@/constants/Colors'; // Import our Colors

// Removed useFonts and SpaceMono, assuming new typography is handled by ThemedText
// Removed useColorScheme, as we are directly applying the dark theme

// Create a custom dark theme object for @react-navigation/native
const SophisticatedDarkTheme = {
  dark: true, // Identifies it as a dark theme
  colors: {
    primary: Colors.dark.tint, // Primary interactive color
    background: Colors.dark.background, // Screen background
    card: Colors.dark.cardBackground, // Header, card backgrounds
    text: Colors.dark.text, // Default text color
    border: Colors.dark.borderColor, // Border color
    notification: Colors.dark.tint, // Notification color (e.g., badges)
  },
};

export default function RootLayout() {
  // if (!loaded) { // Font loading removed for now
  //   return null;
  // }

  return (
    <ThemeProvider value={SophisticatedDarkTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.dark.cardBackground,
          },
          headerTintColor: Colors.dark.tint, // For back arrow
          headerTitleStyle: {
            color: Colors.dark.text,
            fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
          },
          headerBackTitleVisible: false, // Cleaner look
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" /> {/* Set status bar to light content for dark background */}
    </ThemeProvider>
  );
}
