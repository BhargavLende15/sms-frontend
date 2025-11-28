import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useMemo } from "react";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../components/ThemeToggle";
import { useUser } from "../../hooks/useUser";

const AdminHome = () => {
  const { theme } = useTheme();
  const { user } = useUser();

  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: theme.background }],
    [theme]
  );
  const textStyle = useMemo(
    () => [styles.text, { color: theme.text }],
    [theme]
  );

  return (
    <View style={containerStyle}>
      <Text style={[styles.title, textStyle]}>Admin Dashboard</Text>
      <Text style={textStyle}>Welcome {user?.email}</Text>
      <Text style={textStyle}>
        Navigate to the Courses tab to manage courses.
      </Text>
      <ThemeToggle />
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
});
