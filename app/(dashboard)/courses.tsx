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
      alert("You must be logged in to enroll in courses.");
      return;
    }
    if (user.type !== "student") {
      alert("Only students can enroll in courses.");
      return;
    }
    setEnrollLoadingId(courseId);
    try {
      await axios.post(`${API_BASE_URL}/courses/${courseId}/enroll`, {
        studentId: user.id,
      });
      await fetchEnrollments();
      alert("Successfully enrolled in course!");
    } catch (error: any) {
      let message = "Failed to enroll in course. Please try again.";
      if (error.response?.status === 404) {
        if (error.response?.data?.includes("Student")) {
          message = "Student account not found. Please contact support.";
        } else if (error.response?.data?.includes("Course")) {
          message = "Course not found. It may have been removed.";
        } else {
          message = error.response.data || "Resource not found. Please refresh and try again.";
        }
      } else if (error.response?.status === 409) {
        message = "You are already enrolled in this course.";
      } else if (error.response?.status === 400) {
        message = error.response.data || "Invalid request. Please check the course details and try again.";
      } else if (error.response?.data) {
        message = error.response.data;
      }
      alert(message);
      console.log("Enrollment error:", error.response?.data || error.message);
    } finally {
      setEnrollLoadingId(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={containerStyle} showsVerticalScrollIndicator={false}>
      <Text style={[titleStyle, { color: theme.text }]}>Available Courses</Text>
      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} style={styles.loader} />
      ) : courses.length === 0 ? (
        <View style={[styles.emptyState, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[textStyle, { color: theme.textSecondary }]}>
            No courses available right now.
          </Text>
        </View>
      ) : (
        courses.map((course) => {
          const isEnrolled = enrolledIds.has(course.id);
          return (
            <View key={course.id} style={[styles.courseCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.courseTitle, { color: theme.text }]}>
                {course.title}
              </Text>
              <Text style={[styles.department, { color: theme.textSecondary }]}>
                {course.department}
              </Text>
              {course.description ? (
                <Text style={[styles.description, { color: theme.text }]}>
                  {course.description}
                </Text>
              ) : null}
              {course.capacity ? (
                <Text style={[styles.capacity, { color: theme.textSecondary }]}>
                  Capacity: {course.capacity}
                </Text>
              ) : null}
              <View style={styles.buttonContainer}>
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
                  color={isEnrolled ? theme.textSecondary : theme.primary}
                />
              </View>
            </View>
          );
        })
      )}
      <View style={styles.themeContainer}>
        <ThemeToggle />
      </View>
    </ScrollView>
  );
};

export default StudentCourses;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },
  loader: {
    marginTop: 40,
  },
  emptyState: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: "center",
  },
  courseCard: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  department: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    marginBottom: 12,
    lineHeight: 22,
  },
  capacity: {
    fontSize: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  text: {
    fontSize: 14,
  },
  themeContainer: {
    marginTop: 24,
  },
});

