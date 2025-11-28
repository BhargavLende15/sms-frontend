import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../components/ThemeToggle";

const TeacherProfile = () => {
  const { user, logout, updateProfile, loading } = useUser();
  const { theme } = useTheme();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || "");
  const [department, setDepartment] = useState(user?.department || "");
  const [saving, setSaving] = useState(false);

  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: theme.background }],
    [theme]
  );
  const inputStyle = useMemo(
    () => [styles.input, { color: theme.text, borderColor: theme.text }],
    [theme]
  );
  const textStyle = useMemo(
    () => [styles.text, { color: theme.text }],
    [theme]
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({
        name,
        email,
        mobileNumber,
        department,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, textStyle]}>Teacher Profile</Text>
        <Text style={textStyle}>Welcome {user?.email}</Text>

        <Text style={[styles.label, textStyle]}>Name</Text>
        <TextInput
          style={inputStyle}
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
          placeholderTextColor="#9ca3af"
        />

        <Text style={[styles.label, textStyle]}>Email</Text>
        <TextInput
          style={inputStyle}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
        />

        <Text style={[styles.label, textStyle]}>Mobile Number</Text>
        <TextInput
          style={inputStyle}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="Mobile Number"
          placeholderTextColor="#9ca3af"
          keyboardType="phone-pad"
        />

        <Text style={[styles.label, textStyle]}>Department</Text>
        <TextInput
          style={inputStyle}
          value={department}
          onChangeText={setDepartment}
          placeholder="Department"
          placeholderTextColor="#9ca3af"
        />

        <Button
          title={saving || loading ? "Saving..." : "Save Changes"}
          onPress={handleSave}
          disabled={saving || loading}
        />

        <Button title="Logout" onPress={handleLogout} />
        <ThemeToggle />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TeacherProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
});

