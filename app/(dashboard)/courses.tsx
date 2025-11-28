import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useUser } from "../../hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../components/ThemeToggle";

interface Course {
  id: string;
  title: string;
  description: string;
  department: string;
  capacity?: number;
}

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:9099";

const StudentCourses = () => {
  const { user } = useUser();
  const { theme } = useTheme();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [enrollLoadingId, setEnrollLoadingId] = useState<string | null>(null);

  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: theme.background }],
    [theme]
  );
  const textStyle = useMemo(
    () => [styles.text, { color: theme.text }],
    [theme]
  );
  const titleStyle = useMemo(
    () => [styles.title, { color: theme.text }],
    [theme]
  );

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/courses`);
      setCourses(response.data || []);
    } catch (error) {
      console.log("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    if (!user?.id) {
      return;
    }
    try {
      const response = await axios.get(
        `${API_BASE_URL}/courses/student/${user.id}`
      );
      const ids = new Set<string>((response.data || []).map((c: Course) => c.id));
      setEnrolledIds(ids);
    } catch (error) {
      console.log("Failed to fetch enrollments", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchEnrollments();
  }, [user?.id]);

  const handleEnroll = async (courseId: string) => {
    if (!user?.id) {
      alert("You must be logged in to enroll");
      return;
    }
    setEnrollLoadingId(courseId);
    try {
      await axios.post(`${API_BASE_URL}/courses/${courseId}/enroll`, {
        studentId: user.id,
      });
      await fetchEnrollments();
      alert("Enrolled successfully");
    } catch (error: any) {
      const message = error.response?.data || "Failed to enroll";
      alert(message);
    } finally {
      setEnrollLoadingId(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={containerStyle}>
      <Text style={titleStyle}>Available Courses</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : courses.length === 0 ? (
        <Text style={textStyle}>No courses available right now.</Text>
      ) : (
        courses.map((course) => {
          const isEnrolled = enrolledIds.has(course.id);
          return (
            <View key={course.id} style={styles.courseCard}>
              <Text style={[styles.courseTitle, { color: theme.text }]}>
                {course.title}
              </Text>
              <Text style={textStyle}>{course.department}</Text>
              {course.description ? (
                <Text style={textStyle}>{course.description}</Text>
              ) : null}
              {course.capacity ? (
                <Text style={textStyle}>Capacity: {course.capacity}</Text>
              ) : null}
              <Button
                title={
                  isEnrolled
                    ? "Enrolled"
                    : enrollLoadingId === course.id
                    ? "Enrolling..."
                    : "Enroll"
                }
                onPress={() => handleEnroll(course.id)}
                disabled={isEnrolled || enrollLoadingId === course.id}
              />
            </View>
          );
        })
      )}
      <ThemeToggle />
    </ScrollView>
  );
};

export default StudentCourses;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 16,
  },
  courseCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
});

