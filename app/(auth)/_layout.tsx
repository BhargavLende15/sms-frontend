import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import GuestOnly from "../../components/GuestOnly";

const _layout = () => {
  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </GuestOnly>
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
