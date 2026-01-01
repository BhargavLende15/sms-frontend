import React from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { BorderRadius, FontSizes, Spacing } from "../constants/spacing";

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.input,
            color: theme.text,
            borderColor: error ? theme.error : theme.border,
          },
          style,
        ]}
        placeholderTextColor={theme.textSecondary}
        {...props}
      />
      {error && <Text style={[styles.error, { color: theme.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.md,
  },
  error: {
    fontSize: FontSizes.xs,
    marginTop: Spacing.xs,
  },
});

export default CustomInput;
