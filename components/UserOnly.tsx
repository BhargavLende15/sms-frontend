import React, { ReactNode, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useRouter } from "expo-router";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

const UserOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (authChecked && user == null) {
      router.replace("/login");
      return;
    }
    if (authChecked && user != null && user.type !== "student") {
      Alert.alert("Access Denied: Users Only");
      router.replace("/");
    }
  }, [user, authChecked]);

  if (!authChecked || !user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }
  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserOnly;
