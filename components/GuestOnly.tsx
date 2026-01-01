import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { ReactNode, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useRouter } from "expo-router";
import { useTheme } from "../hooks/useTheme";

const GuestOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (authChecked && user != null) {
      router.replace("/profile");
    }
  }, [user]);

  if (!authChecked && !user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }
  return children;
};

export default GuestOnly;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
