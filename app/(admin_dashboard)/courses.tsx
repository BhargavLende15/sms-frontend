import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  createdBy?: string;
}

interface Enrollment {
  enrollmentId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  department: string;
  status: string;
  enrolledAt: string;
}

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:9099";

const AdminCourses = () => {
  const { user } = useUser();
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [capacity, setCapacity] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState<Record<string, Enrollment[]>>({});
  const [loadingEnrollments, setLoadingEnrollments] = useState<Record<string, boolean>>({});

  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: theme.background }],
    [theme]
  );
  const inputStyle = useMemo(
    () => [styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.input }],
    [theme]
  );
  const labelStyle = useMemo(
    () => [styles.label, { color: theme.text }],
    [theme]
  );
  const textStyle = useMemo(
    () => [styles.text, { color: theme.text }],
    [theme]
  );

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/courses`);
      setCourses(response.data || []);
    } catch (error) {
      console.log("Failed to load courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const validateCourse = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!department.trim()) {
      newErrors.department = "Department is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDepartment("");
    setCapacity("");
    setErrors({});
  };

  const handleCreateCourse = async () => {
    if (!validateCourse()) {
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/courses`, {
        title: title.trim(),
        description: description.trim(),
        department: department.trim(),
        capacity: capacity ? Number(capacity) : null,
        createdBy: user?.id,
      });
      resetForm();
      await fetchCourses();
      alert(`Course "${title.trim()}" created successfully!`);
    } catch (error: any) {
      let message = "Failed to create course. Please try again.";
      if (error.response?.status === 400) {
        message = error.response.data || "Invalid course information. Please check all fields and try again.";
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        message = "You don't have permission to create courses. Only admins can create courses.";
      } else if (error.response?.data) {
        message = error.response.data;
      }
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchEnrollments = async (courseId: string) => {
    setLoadingEnrollments({ ...loadingEnrollments, [courseId]: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/courses/${courseId}/enrollments`);
      setEnrollments({ ...enrollments, [courseId]: response.data || [] });
      setExpandedCourseId(courseId);
    } catch (error: any) {
      console.log("Failed to fetch enrollments", error);
      alert("Failed to load enrolled students. Please try again.");
    } finally {
      setLoadingEnrollments({ ...loadingEnrollments, [courseId]: false });
    }
  };

  const toggleEnrollments = (courseId: string) => {
    if (expandedCourseId === courseId) {
      // Collapse
      setExpandedCourseId(null);
    } else {
      // Expand - fetch if not already loaded
      if (!enrollments[courseId]) {
        fetchEnrollments(courseId);
      } else {
        setExpandedCourseId(courseId);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={containerStyle}>
      <Text style={[styles.title, { color: theme.text }]}>Manage Courses</Text>
      <View style={styles.fieldGroup}>
        <Text style={labelStyle}>Title</Text>
        <TextInput
          style={inputStyle}
          value={title}
          onChangeText={setTitle}
          placeholder="Course title"
          placeholderTextColor="#9ca3af"
        />
        {errors.title ? (
          <Text style={styles.errorText}>{errors.title}</Text>
        ) : null}
      </View>
      <View style={styles.fieldGroup}>
        <Text style={labelStyle}>Description</Text>
        <TextInput
          style={[inputStyle, { height: 80 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Course description"
          placeholderTextColor="#9ca3af"
          multiline
        />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={labelStyle}>Department</Text>
        <TextInput
          style={inputStyle}
          value={department}
          onChangeText={setDepartment}
          placeholder="Department"
          placeholderTextColor="#9ca3af"
        />
        {errors.department ? (
          <Text style={styles.errorText}>{errors.department}</Text>
        ) : null}
      </View>
      <View style={styles.fieldGroup}>
        <Text style={labelStyle}>Capacity (optional)</Text>
        <TextInput
          style={inputStyle}
          value={capacity}
          onChangeText={setCapacity}
          placeholder="e.g. 50"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
        />
      </View>
      <Button
        title={submitting ? "Saving..." : "Add Course"}
        onPress={handleCreateCourse}
        disabled={submitting}
      />
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Existing Courses</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : courses.length === 0 ? (
        <Text style={textStyle}>No courses added yet.</Text>
      ) : (
        courses.map((course) => {
          const courseEnrollments = enrollments[course.id] || [];
          const isExpanded = expandedCourseId === course.id;
          const isLoading = loadingEnrollments[course.id];
          
          return (
            <View key={course.id} style={[styles.courseCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.courseTitle, { color: theme.text }]}>
                {course.title}
              </Text>
              <Text style={[styles.department, { color: theme.textSecondary }]}>{course.department}</Text>
              {course.description ? (
                <Text style={[styles.description, { color: theme.text }]}>{course.description}</Text>
              ) : null}
              {course.capacity ? (
                <Text style={[styles.capacity, { color: theme.textSecondary }]}>Capacity: {course.capacity}</Text>
              ) : null}
              <View style={styles.enrollmentSection}>
                <View style={styles.buttonContainer}>
                  <Button
                    title={
                      isLoading
                        ? "Loading enrollments..."
                        : isExpanded
                        ? `Hide Enrollments (${courseEnrollments.length})`
                        : enrollments[course.id]
                        ? `View Enrollments (${courseEnrollments.length})`
                        : "View Enrolled Students"
                    }
                    onPress={() => toggleEnrollments(course.id)}
                    disabled={isLoading}
                    color={theme.primary}
                  />
                </View>
                {isExpanded && (
                  <View style={styles.enrollmentsList}>
                    {courseEnrollments.length === 0 ? (
                      <Text style={[styles.emptyEnrollment, { color: theme.textSecondary }]}>
                        No students enrolled yet.
                      </Text>
                    ) : (
                      courseEnrollments.map((enrollment) => (
                        <View key={enrollment.enrollmentId} style={[styles.enrollmentCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                          <Text style={[styles.studentName, { color: theme.text }]}>
                            {enrollment.studentName}
                          </Text>
                          <Text style={[styles.enrollmentText, { color: theme.textSecondary }]}>Email: {enrollment.studentEmail}</Text>
                          <Text style={[styles.enrollmentText, { color: theme.textSecondary }]}>Department: {enrollment.department}</Text>
                          <Text style={[styles.enrollmentText, { color: theme.textSecondary }]}>
                            Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                          </Text>
                        </View>
                      ))
                    )}
                  </View>
                )}
              </View>
            </View>
          );
        })
      )}
      <ThemeToggle />
    </ScrollView>
  );
};

export default AdminCourses;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    height: 52,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 32,
    marginBottom: 20,
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
  text: {
    fontSize: 14,
  },
  enrollmentSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1.5,
  },
  buttonContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  enrollmentsList: {
    marginTop: 12,
    gap: 12,
  },
  enrollmentCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  enrollmentText: {
    fontSize: 14,
    marginBottom: 4,
  },
  emptyEnrollment: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    padding: 16,
  },
});

