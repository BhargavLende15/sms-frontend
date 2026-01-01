import React from "react";
import { View, StyleSheet, StatusBar, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../hooks/useTheme";
import { Spacing } from "../constants/spacing";

interface ScreenWrapperProps {
  children: React.ReactNode;
  useGradient?: boolean;
  style?: any;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  useGradient = false,
  style,
}) => {
  const { theme } = useTheme();

  const Container = useGradient ? LinearGradient : View;
  const containerProps = useGradient
    ? { colors: theme.gradient, style: styles.container }
    : { style: [styles.container, { backgroundColor: theme.background }] };

  return (
    <Container {...(containerProps as any)}>
      <SafeAreaView style={[styles.safeArea, style]} edges={['top', 'left', 'right']}>
        <StatusBar
          barStyle={theme.background === "#111827" ? "light-content" : "dark-content"}
          backgroundColor={useGradient ? "transparent" : theme.background}
        />
        {children}
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
});

export default ScreenWrapper;
