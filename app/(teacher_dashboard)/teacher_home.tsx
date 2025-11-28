import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../components/ThemeToggle";
import { useUser } from "../../hooks/useUser";

interface Student {
  id: string;
  name: string;
  email: string;
  points: number;
}

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:9099";

const TeacherHome = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [points, setPoints] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: theme.background }],
    [theme]
  );
  const textStyle = useMemo(
    () => [styles.text, { color: theme.text }],
    [theme]
  );
  const inputStyle = useMemo(
    () => [styles.input, { color: theme.text, borderColor: theme.text }],
    [theme]
  );

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/students`);
      setStudents(response.data || []);
    } catch (err) {
      console.log("Failed to fetch students", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setPoints("");
    setError("");
  };

  const validatePoints = () => {
    if (!points.trim()) {
      setError("Enter points to add");
      return false;
    }
    const value = Number(points);
    if (Number.isNaN(value) || value <= 0) {
      setError("Points must be a positive number");
      return false;
    }
    return true;
  };

  const handleAddPoints = async () => {
    if (!selectedStudent || !validatePoints()) {
      return;
    }
    setUpdating(true);
    try {
      await axios.put(`${API_BASE_URL}/students/${selectedStudent.id}/points`, {
        points: Number(points),
        awardedBy: user?.id,
      });
      setPoints("");
      setSelectedStudent(null);
      await fetchStudents();
      alert("Points updated successfully");
    } catch (error: any) {
      const message = error.response?.data || "Failed to update points";
      alert(message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>Teacher Dashboard</Text>
      <Text style={textStyle}>Assign points to students</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                {item.name}
              </Text>
              <Text style={textStyle}>Email: {item.email}</Text>
              <Text style={textStyle}>Points: {item.points}</Text>
              <Button title="Add Points" onPress={() => handleSelectStudent(item)} />
            </View>
          )}
        />
      )}

      {selectedStudent ? (
        <View style={styles.form}>
          <Text style={[styles.formTitle, { color: theme.text }]}>
            Add points to {selectedStudent.name}
          </Text>
          <TextInput
            style={inputStyle}
            keyboardType="numeric"
            value={points}
            onChangeText={(value) => {
              setPoints(value);
              setError("");
            }}
            placeholder="Enter points"
            placeholderTextColor="#9ca3af"
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Button
            title={updating ? "Updating..." : "Submit"}
            onPress={handleAddPoints}
            disabled={updating}
          />
        </View>
      ) : null}
      <ThemeToggle />
    </View>
  );
};

export default TeacherHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  text: {
    fontSize: 14,
  },
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  form: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    gap: 8,
    backgroundColor: "#fff",
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
  },
});

