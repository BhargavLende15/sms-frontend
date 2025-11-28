import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import UserOnly from "../../components/UserOnly";

const _layout = () => {
  return (
    <UserOnly>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="courses" options={{ title: "Courses" }} />
        <Tabs.Screen 
          name="rank_list" 
          options={{ title: "Rank List" }} 
        />
      </Tabs>
    </UserOnly>
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
