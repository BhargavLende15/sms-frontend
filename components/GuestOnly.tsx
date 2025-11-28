import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useRouter } from "expo-router";

const GuestOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (authChecked && user != null) {
      router.replace("/profile");
    }
  }, [user]);

  if (!authChecked && !user) {
    return <Text>Loading</Text>;
  }
  return children;
};

export default GuestOnly;
