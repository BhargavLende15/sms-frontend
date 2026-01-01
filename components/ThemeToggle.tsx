import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

const ThemeToggle = () => {
  const { mode, toggleTheme, theme } = useTheme();
  const isDarkMode = mode === "dark";

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isDarkMode ? "moon" : "sunny"}
        size={20}
        color={isDarkMode ? Colors.primaryLight : Colors.warning}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
