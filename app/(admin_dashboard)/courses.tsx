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

  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: theme.background }],
    [theme]
  );
  const inputStyle = useMemo(
    () => [styles.input, { color: theme.text, borderColor: theme.text }],
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
      alert("Course created successfully");
    } catch (error: any) {
      const message = error.response?.data || "Failed to create course";
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={containerStyle}>
      <Text style={styles.title}>Manage Courses</Text>
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
      <Text style={styles.sectionTitle}>Existing Courses</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : courses.length === 0 ? (
        <Text style={textStyle}>No courses added yet.</Text>
      ) : (
        courses.map((course) => (
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
          </View>
        ))
      )}
      <ThemeToggle />
    </ScrollView>
  );
};

export default AdminCourses;

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
  fieldGroup: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "500",
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
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
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
  },
});

