import React, { ReactNode, use, useEffect, useReducer } from "react";
import { useUser } from "../hooks/useUser";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";

const AdminUserOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("User in AdminUserOnly:", user);
    if (authChecked && user == null) {
      router.replace("/login");
    }
    if (authChecked && user != null && user.type !== "admin") {
      Alert.alert("Access Denied: Admin Users Only");
      router.replace("/");
    }
  }, [user]);
  if (!authChecked || !user) {
    console.log("loading in AdminUserOnly:");
    return <Text>Loading</Text>;
  }
  return children;
};

export default AdminUserOnly;
