import React, { ReactNode, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";

const TeacherOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("User in TeacherOnly:", user);
    if (authChecked && user == null) {
      router.replace("/login");
    }
    if (authChecked && user != null && user.type !== "teacher") {
      Alert.alert("Access Denied: Teachers Only");
      router.replace("/");
    }
  }, [user, authChecked]);
  if (!authChecked || !user) {
    console.log("loading in TeacherOnly:");
    return <Text>Loading</Text>;
  }
  return children;
};

export default TeacherOnly;



