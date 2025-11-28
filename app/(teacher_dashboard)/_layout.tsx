import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import TeacherOnly from "../../components/TeacherOnly";

const _layout = () => {
  return (
    <TeacherOnly>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="teacher_home" options={{ title: "Home" }} />
        <Tabs.Screen name="teacher_profile" options={{ title: "Profile" }} />
      </Tabs>
    </TeacherOnly>
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

