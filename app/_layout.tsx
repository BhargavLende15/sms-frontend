import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { Stack } from "expo-router";
import { UserProvider } from "../context/UserContext";
import { Provider, useSelector } from "react-redux";
import { smsStore, RootState } from "../store/store";
import { ThemeProvider } from "../context/ThemeContext";

const _layout = () => {
  return (
    <Provider store={smsStore}>
      <ThemeProvider>
        <UserProvider>
          <Stack></Stack>
        </UserProvider>
      </ThemeProvider>
    </Provider>
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
