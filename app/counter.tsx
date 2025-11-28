import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { incremented, decremented, selectCount } from "../store/counterSlice";
import { useDispatch, useSelector } from "react-redux";
const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <View style={styles.myview}>
      <Text style={styles.myText}>Counter {count}</Text>
      <Button title="Increment" onPress={() => dispatch(incremented())} />
      <Button title="Decrement" onPress={() => dispatch(decremented())} />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  myview: {
    flex: 1,
    justifyContent: "center",
    verticalAlign: "middle",
    alignSelf: "center",
    alignContent: "center",
  },
  myText: {
    fontWeight: "600",
    fontSize: 40,
  },
});
