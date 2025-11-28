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
      <Text style={textStyle}>Home Tab</Text>
      <Text style={textStyle}>Count: {count}</Text>
      <View style={styles.linkContainer}>
        <Link href="/rank_list" style={styles.link}>
          <Text style={[styles.linkText, { color: theme.text }]}>
            View Rank List
          </Text>
        </Link>
      </View>
      <ThemeToggle />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  myview: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  link: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
