import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../hooks/useTheme";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:9099";

const rank_list = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [rankList, setRankList] = useState<Array<any>>([]);
  const getRankList = async () => {
    setLoading(true);
    try {
      const response: any = await axios.get(`${API_BASE_URL}/students`);
      const sorted = [...(response.data || [])].sort(
        (a, b) => (b.points || 0) - (a.points || 0)
      );
      setRankList(sorted);
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
    <View style={[styles.myview, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Rank List</Text>
      {loading ? (
        <ActivityIndicator size={"small"}></ActivityIndicator>
      ) : (
        <>
          <FlatList
            data={rankList}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                <Text style={[styles.rank, { color: theme.text }]}>
                  #{index + 1}
                </Text>
                <View>
                  <Text style={[styles.name, { color: theme.text }]}>
                    {item.name}
                  </Text>
                  <Text style={{ color: theme.text }}>Points: {item.points || 0}</Text>
                  <Text style={{ color: theme.text }}>{item.email}</Text>
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default rank_list;

const styles = StyleSheet.create({
  myview: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  header: {
    fontWeight: "700",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  rank: {
    fontSize: 20,
    fontWeight: "600",
    width: 48,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
});
