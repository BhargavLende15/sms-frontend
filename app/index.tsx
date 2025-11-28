import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
const index = () => {
  return (
    <KeyboardAvoidingView style={styles.myview}>
      <Link href="/login">
        <Text>Login</Text>
      </Link>
      <Link href="/register">
        <Text>Register</Text>
      </Link>
      <Link href="/profile">
        <Text>Profile</Text>
      </Link>
      <Link href="/admin_profile">
        <Text>Admin Profile</Text>
      </Link>
      <Link href="/counter">
        <Text>Counter</Text>
      </Link>
      <Link href="/rank_list">
        <Text>Rank List</Text>
      </Link>
    </KeyboardAvoidingView>
  );
};

export default index;

const styles = StyleSheet.create({
  myview: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
