import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import ScreenWrapper from "../../components/ScreenWrapper";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import ThemeToggle from "../../components/ThemeToggle";
import { FontSizes, Spacing } from "../../constants/spacing";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
               <ThemeToggle />
            </View>
            <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Sign in to continue to your account
            </Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <CustomInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />

            <CustomButton
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              style={{ marginTop: Spacing.md }}
            />

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                Don't have an account?
              </Text>
              <Link href="/register" style={[styles.link, { color: theme.primary }]}>
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xxl,
  },
  headerTop: {
    alignItems: 'flex-end',
    marginBottom: Spacing.lg
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: "bold",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
  },
  form: {
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.xl,
    alignItems: "center",
  },
  footerText: {
    fontSize: FontSizes.md,
    marginRight: Spacing.xs,
  },
  link: {
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
});

export default LoginScreen;
