import React from "react";
import { Button, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <View style={{ marginTop: 16 }}>
      <Button
        title={mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        onPress={toggleTheme}
      />
    </View>
  );
};

export default ThemeToggle;

