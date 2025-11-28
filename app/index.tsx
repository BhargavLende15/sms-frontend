import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useUser } from "../hooks/useUser";

const Index = () => {
  const { user, authChecked } = useUser();
  const router = useRouter();

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
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.statusText}>
        {authChecked ? "Redirecting..." : "Checking session..."}
      </Text>
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
