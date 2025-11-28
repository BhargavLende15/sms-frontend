import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import UserOnly from "../../components/UserOnly";
import AdminUserOnly from "../../components/AdminUserOnly";

const _layout = () => {
  return (
    <AdminUserOnly>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name=" admin_profile"
          options={{ title: "Admin Profile" }}
        />
        <Tabs.Screen name="admin_home" options={{ title: "Admin Home" }} />
      </Tabs>
    </AdminUserOnly>
  );
};

export default _layout;

const styles = StyleSheet.create({
  rootLayout: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  myText: {
    fontWeight: "600",
    fontSize: 40,
  },
});
