import {
  ActivityIndicator,
  Button,
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
      const students = response.data || [];
      // Sort by points descending, handling null/undefined points
      const sorted = [...students].sort((a, b) => {
        const pointsA = a.points ?? 0;
        const pointsB = b.points ?? 0;
        if (pointsB !== pointsA) {
          return pointsB - pointsA;
        }
        // If points are equal, sort alphabetically by name
        return (a.name || "").localeCompare(b.name || "");
      });
      setRankList(sorted);
    } catch (error) {
      console.log("Error fetching rank list:", error);
      setRankList([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRankList();
    // Refresh rank list every 5 seconds to show updated points
    const interval = setInterval(() => {
      getRankList();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={[styles.myview, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.text }]}>Rank List</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Top performers
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Refresh"
          onPress={getRankList}
          disabled={loading}
          color={theme.primary}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} style={styles.loader} />
      ) : rankList.length === 0 ? (
        <View style={[styles.emptyState, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No students found
          </Text>
        </View>
      ) : (
        <FlatList
          data={rankList}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={[styles.rankBadge, { backgroundColor: index < 3 ? theme.primary : theme.surface }]}>
                <Text style={[styles.rank, { color: index < 3 ? "#ffffff" : theme.text }]}>
                  #{index + 1}
                </Text>
              </View>
              <View style={styles.studentInfo}>
                <Text style={[styles.name, { color: theme.text }]}>
                  {item.name || "Unknown"}
                </Text>
                <Text style={[styles.points, { color: theme.primary }]}>
                  {item.points ?? 0} points
                </Text>
                {item.email && (
                  <Text style={[styles.email, { color: theme.textSecondary }]}>
                    {item.email}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default rank_list;

const styles = StyleSheet.create({
  myview: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  loader: {
    marginTop: 40,
  },
  emptyState: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  rankBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  rank: {
    fontSize: 20,
    fontWeight: "700",
  },
  studentInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  points: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
});
