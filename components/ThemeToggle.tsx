import React from "react";
import { Switch, Text, View, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  const { theme } = useTheme();
  const isDarkMode = mode === "dark";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});

