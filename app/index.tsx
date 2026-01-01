import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../hooks/useUser";
import { useTheme } from "../hooks/useTheme";
import ScreenWrapper from "../components/ScreenWrapper";
import { FontSizes, Spacing } from "../constants/spacing";

const Index = () => {
  const { user, authChecked } = useUser();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (!authChecked) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    const userType = user?.type?.toLowerCase();
    let route = "/home";
    if (userType === "admin") {
      route = "/admin_home";
    } else if (userType === "teacher") {
      route = "/teacher_home";
    } else if (userType === "student") {
      route = "/home";
    }
    router.replace(route as any);
  }, [authChecked, user]);

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.statusText, { color: theme.textSecondary }]}>
          {authChecked ? "Redirecting..." : "Checking session..."}
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  statusText: {
    marginTop: Spacing.md,
    fontSize: FontSizes.md,
    fontWeight: "500",
  },
});
