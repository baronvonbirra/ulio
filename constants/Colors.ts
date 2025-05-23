/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

// For the 'dark and sophisticated' theme, we will primarily focus on the 'dark' palette.
// The 'light' palette can remain as a fallback or be themed separately later.

const sophisticatedDark = {
  text: '#E0E0E0', // Light gray/off-white for primary text
  textSecondary: '#A0A0A0', // Medium gray for less important text
  background: '#121212', // Very dark gray for main background
  tint: '#D4AF37', // Muted gold for interactive elements, accents
  icon: '#A0A0A0', // Medium gray for non-interactive icons
  tabIconDefault: '#A0A0A0', // Default tab icon color
  tabIconSelected: '#D4AF37', // Selected tab icon color (using tint)
  cardBackground: '#1E1E1E', // Slightly lighter than main background for cards/surfaces
  borderColor: '#2A2A2A', // Dark border for subtle separation
};

// Original light theme colors (can be kept for reference or future light theme)
const tintColorLight = '#0a7ea4';
const originalLight = {
  text: '#11181C',
  background: '#fff',
  tint: tintColorLight,
  icon: '#687076',
  tabIconDefault: '#687076',
  tabIconSelected: tintColorLight,
  // Adding the new keys for consistency, though values are for a typical light theme
  cardBackground: '#f9f9f9',
  textSecondary: '#555',
  borderColor: '#ddd',
};

export const Colors = {
  light: originalLight, // Keeping original light theme for now
  dark: sophisticatedDark, // Applying the new sophisticated dark theme
};
