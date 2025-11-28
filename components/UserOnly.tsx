import React, { ReactNode, use, useEffect, useReducer } from "react";
import { useUser } from "../hooks/useUser";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";

const UserOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("User in UserOnly:", user);
    //authentication
    if (authChecked && user == null) {
      router.replace("/login");
      return;
    }
    //authorization
    if (authChecked && user != null && user.type !== "student") {
      Alert.alert("Access Denied: Users Only");
      router.replace("/");
    }
  }, [user, authChecked]);
  if (!authChecked || !user) {
    return <Text>Loading</Text>;
  }
  return children;
};

export default UserOnly;
