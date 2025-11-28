import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { Link } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../components/ThemeToggle";
const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const containerStyle = useMemo(
    () => [styles.myview, { backgroundColor: theme.background }],
    [theme]
  );
  const inputStyle = useMemo(
    () => [styles.input, { color: theme.text, borderColor: theme.text }],
    [theme]
  );
  const linkStyle = useMemo(
    () => ({ textAlign: "center", color: theme.text }),
    [theme]
  );

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={containerStyle}>
      <TextInput
        style={inputStyle}
        placeholder="Email"
        placeholderTextColor="#9ca3af"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      <TextInput
        secureTextEntry={true}
        style={inputStyle}
        placeholder="Password"
        placeholderTextColor="#9ca3af"
        value={password}
        onChangeText={setPassword}
      />
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}
      {loading ? (
        <ActivityIndicator size={"small"}></ActivityIndicator>
      ) : (
        <>
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
      <Link href="/register" style={linkStyle}>
        <Text style={{ color: theme.text }}>Register Instead?</Text>
      </Link>
      <ThemeToggle />
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
  errorText: {
    color: "#dc2626",
    fontSize: 12,
    marginBottom: 8,
  },
});
