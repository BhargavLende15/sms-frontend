import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../components/ThemeToggle";

const AdminProfile = () => {
  const { user, logout } = useUser();
  const { theme } = useTheme();
  const [loggingOut, setLoggingOut] = useState(false);

  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: theme.background }],
    [theme]
  );
  const textStyle = useMemo(
    () => [styles.text, { color: theme.text }],
    [theme]
  );

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>Admin Profile</Text>
      <Text style={textStyle}>Welcome {user?.email}</Text>
      <View style={styles.buttonContainer}>
        {loggingOut ? (
          <ActivityIndicator size="small" />
        ) : (
          <Button title="Logout" color="#b91c1c" onPress={handleLogout} />
        )}
      </View>
      <ThemeToggle />
    </View>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 12,
  },
});
