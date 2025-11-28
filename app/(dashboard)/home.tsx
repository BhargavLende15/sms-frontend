import { StyleSheet, Text, View, Button } from "react-native";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCount } from "../../store/counterSlice";
import ThemeToggle from "../../components/ThemeToggle";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "expo-router";

const Home = () => {
  const count = useSelector(selectCount);
  const { theme } = useTheme();
  const containerStyle = useMemo(
    () => [styles.myview, { backgroundColor: theme.background }],
    [theme]
  );
  const textStyle = useMemo(
    () => [styles.text, { color: theme.text }],
    [theme]
  );

  return (
    <View style={containerStyle}>
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { color: theme.text }]}>Welcome!</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Explore your dashboard
        </Text>
      </View>
      
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Quick Actions</Text>
        <Link href="/rank_list" style={[styles.actionButton, { backgroundColor: theme.primary }]}>
          <Text style={styles.actionButtonText}>View Rank List</Text>
        </Link>
      </View>

      <View style={styles.themeContainer}>
        <ThemeToggle />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  myview: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  themeContainer: {
    marginTop: "auto",
  },
  text: {
    fontSize: 18,
  },
});
