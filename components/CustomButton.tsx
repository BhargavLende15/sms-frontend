import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../hooks/useTheme";
import { BorderRadius, FontSizes, FontWeights, Spacing } from "../constants/spacing";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading = false,
  variant = "primary",
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (variant === "outline") return "transparent";
    if (variant === "secondary") return theme.secondary;
    return theme.primary;
  };

  const getTextColor = () => {
    if (variant === "outline") return theme.primary;
    return "#FFFFFF";
  };

  const ButtonContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: getTextColor(), fontSize: FontSizes.md },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </>
  );

  if (variant === "primary") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={loading}
        activeOpacity={0.8}
        style={[styles.container, style]}
      >
        <LinearGradient
          colors={theme.primaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <ButtonContent />
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        styles.container,
        styles.solidButton,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: variant === "outline" ? theme.primary : "transparent",
          borderWidth: variant === "outline" ? 1 : 0,
        },
        style,
      ]}
    >
      <ButtonContent />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    marginVertical: Spacing.xs,
    height: 50,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
  },
  solidButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
  },
  text: {
    fontWeight: FontWeights.semibold,
  },
});

export default CustomButton;
