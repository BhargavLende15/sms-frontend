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
import { Link, useRouter } from "expo-router";
import axios from "axios";
import { useUser } from "../../hooks/useUser";
const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useUser();

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(email, password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.myview}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <ActivityIndicator size={"small"}></ActivityIndicator>
      ) : (
        <>
          <Button title="Register" onPress={handleRegister} />
        </>
      )}
      <Link href="/login" style={{ textAlign: "center" }}>
        <Text>Login Instead?</Text>
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
