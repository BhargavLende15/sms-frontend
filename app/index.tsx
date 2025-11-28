import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "expo-router";
import { useUser } from "../hooks/useUser";
import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "../components/ThemeToggle";

const Index = () => {
  const { user, authChecked } = useUser();
  const router = useRouter();
  const { theme } = useTheme();
  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: theme.background }],
    [theme]
  );
  const textStyle = useMemo(
    () => [styles.statusText, { color: theme.text }],
    [theme]
  );

  useEffect(() => {
    if (!authChecked) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    const userType = user?.type?.toLowerCase();
    const route = userType === "admin" ? "/admin_home" : "/home";
    router.replace(route);
  }, [authChecked, user]);

  return (
    <View style={containerStyle}>
      <ActivityIndicator size="large" />
      <Text style={textStyle}>
        {authChecked ? "Redirecting..." : "Checking session..."}
      </Text>
      <ThemeToggle />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  statusText: {
    marginTop: 16,
    fontSize: 16,
    color: "#333",
  },
});
