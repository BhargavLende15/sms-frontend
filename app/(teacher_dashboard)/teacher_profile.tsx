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
import React, { useEffect, useMemo, useState } from "react";
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
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setMobileNumber(user?.mobileNumber || "");
    setDepartment(user?.department || "");
  }, [user]);

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
    setLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.log(error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <KeyboardAvoidingView style={containerStyle}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, textStyle]}>Teacher Profile</Text>
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, textStyle]}>Full Name</Text>
          <TextInput
            style={inputStyle}
            value={name}
            onChangeText={setName}
            placeholder="Enter full name"
            placeholderTextColor="#9ca3af"
          />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, textStyle]}>Email</Text>
          <TextInput
            style={inputStyle}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, textStyle]}>Mobile Number</Text>
          <TextInput
            style={inputStyle}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="Enter mobile number"
            placeholderTextColor="#9ca3af"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, textStyle]}>Department</Text>
          <TextInput
            style={inputStyle}
            value={department}
            onChangeText={setDepartment}
            placeholder="Enter department"
            placeholderTextColor="#9ca3af"
          />
        </View>
        <View style={styles.actions}>
          <Button
            title={saving || loading ? "Saving..." : "Save Changes"}
            onPress={handleSave}
            disabled={saving || loading}
          />
        </View>
        <View style={styles.actions}>
          <Button
            title={loggingOut ? "Logging out..." : "Logout"}
            color="#b91c1c"
            onPress={handleLogout}
            disabled={loggingOut}
          />
        </View>
        <ThemeToggle />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TeacherProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  scrollContent: {
    paddingBottom: 32,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  fieldGroup: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    marginVertical: 4,
    height: 48,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  actions: {
    marginTop: 8,
  },
});

