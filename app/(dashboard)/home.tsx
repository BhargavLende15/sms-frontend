import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCount } from "../../store/counterSlice";
import ThemeToggle from "../../components/ThemeToggle";
import { useTheme } from "../../hooks/useTheme";

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
      <Text style={textStyle}>Home Tab Count: {count}</Text>
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
  },
  text: {
    fontSize: 18,
  },
});
