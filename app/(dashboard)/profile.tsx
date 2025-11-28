import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { use, useState } from "react";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import { useUser } from "../../hooks/useUser";
const profile = () => {
  const { user } = useUser();
  const { logout } = useUser();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.myview}>
      <Text>Profile Tab</Text>
      <Text>Welcome {user.email}</Text>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
};

export default profile;

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
