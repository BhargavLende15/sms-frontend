import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const rank_list = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rankList, setRankList] = useState<Array<any>>([]);
  const getRankList = async () => {
    setLoading(true);
    try {
      const response: any = await axios.get("http://localhost:9099/students");
      setRankList(response.data);
    } catch (error) {
      console.log("Error fetching rank list:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRankList();
  }, []);
  return (
    <View style={styles.myview}>
      <Text>Rank List</Text>
      {loading ? (
        <ActivityIndicator size={"small"}></ActivityIndicator>
      ) : (
        <>
          <FlatList
            data={rankList}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
                <Text>{item.points}</Text>
                <Text>{item.email}</Text>
              </View>
            )}
          ></FlatList>
        </>
      )}
    </View>
  );
};

export default rank_list;

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
