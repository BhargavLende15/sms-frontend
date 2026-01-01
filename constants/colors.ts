export const Colors = {
  // Brand Colors
  primary: "#4F46E5", // Indigo 600
  primaryLight: "#818CF8", // Indigo 400
  primaryDark: "#3730A3", // Indigo 800
  
  secondary: "#EC4899", // Pink 500
  secondaryLight: "#F472B6", // Pink 400
  secondaryDark: "#DB2777", // Pink 600

  accent: "#8B5CF6", // Violet 500

  // Semantic Colors
  success: "#10B981", // Emerald 500
  error: "#EF4444", // Red 500
  warning: "#F59E0B", // Amber 500
  info: "#3B82F6", // Blue 500

  // Grays / Neutrals
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",

  // Backgrounds
  lightBackground: "#F3F4F6",
  darkBackground: "#111827",
  
  lightSurface: "#FFFFFF",
  darkSurface: "#1F2937",

  // Text
  textPrimaryLight: "#111827",
  textSecondaryLight: "#4B5563",
  
  textPrimaryDark: "#F9FAFB",
  textSecondaryDark: "#9CA3AF",

  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
};

export const Gradients = {
  primary: [Colors.primary, Colors.accent] as const,
  secondary: [Colors.secondary, Colors.secondaryLight] as const,
  dark: [Colors.gray800, Colors.gray900] as const,
  light: [Colors.white, Colors.gray50] as const,
};
