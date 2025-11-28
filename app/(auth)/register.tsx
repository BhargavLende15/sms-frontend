import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { Link } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../components/ThemeToggle";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { Platform } from "react-native";

const index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [type, setType] = useState("student");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register } = useUser();
  const { theme } = useTheme();
  const containerStyle = useMemo(
    () => [styles.myview, { backgroundColor: theme.background }],
    [theme]
  );
  const inputStyle = useMemo(
    () => [styles.input, { color: theme.text, borderColor: theme.text }],
    [theme]
  );
  const pickerStyle = useMemo(
    () => [
      styles.pickerWrapper,
      { borderColor: theme.text, backgroundColor: theme.background },
    ],
    [theme]
  );
  const pickerTextStyle = useMemo(
    () => ({ color: theme.text }),
    [theme]
  );
  const linkStyle = useMemo(
    () => ({ textAlign: "center", color: theme.text }),
    [theme]
  );
  const dobLabel = useMemo(
    () => dayjs(dateOfBirth).format("YYYY-MM-DD"),
    [dateOfBirth]
  );
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(mobileNumber.trim())) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    }
    if (!department.trim()) {
      newErrors.department = "Department is required";
    }
    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        gender,
        type,
        dateOfBirth: dayjs(dateOfBirth).format("YYYY-MM-DD"),
        mobileNumber: mobileNumber.trim(),
        department: department.trim(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={containerStyle} behavior="padding">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Join us to get started
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Full Name</Text>
            <TextInput
              style={[inputStyle, { backgroundColor: theme.input }]}
              placeholder="Enter your full name"
              placeholderTextColor={theme.textSecondary}
              value={name}
              onChangeText={setName}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Email</Text>
            <TextInput
              style={[inputStyle, { backgroundColor: theme.input }]}
              placeholder="Enter your email"
              placeholderTextColor={theme.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={[inputStyle, { backgroundColor: theme.input }]}
              placeholder="Enter your password"
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={setPassword}
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Mobile Number</Text>
            <TextInput
              style={[inputStyle, { backgroundColor: theme.input }]}
              placeholder="Enter mobile number"
              placeholderTextColor={theme.textSecondary}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
            />
            {errors.mobileNumber ? (
              <Text style={styles.errorText}>{errors.mobileNumber}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Department</Text>
            <TextInput
              style={[inputStyle, { backgroundColor: theme.input }]}
              placeholder="Enter department"
              placeholderTextColor={theme.textSecondary}
              value={department}
              onChangeText={setDepartment}
            />
            {errors.department ? (
              <Text style={styles.errorText}>{errors.department}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Gender</Text>
            <View style={[pickerStyle, { backgroundColor: theme.input, borderColor: theme.border }]}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                dropdownIconColor={theme.text}
                style={pickerTextStyle}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>User Type</Text>
            <View style={[pickerStyle, { backgroundColor: theme.input, borderColor: theme.border }]}>
              <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue)}
                dropdownIconColor={theme.text}
                style={pickerTextStyle}
              >
                <Picker.Item label="Student" value="student" />
                <Picker.Item label="Teacher" value="teacher" />
                <Picker.Item label="Admin" value="admin" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Date of Birth</Text>
            <Button
              title={`${dobLabel}`}
              onPress={() => setShowDatePicker(true)}
              color={theme.primary}
            />
            {errors.dateOfBirth ? (
              <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
            ) : null}
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "calendar"}
                onChange={(event, selectedDate) => {
                  if (Platform.OS !== "ios") {
                    setShowDatePicker(false);
                  }
                  if (selectedDate) {
                    setDateOfBirth(selectedDate);
                  }
                }}
                maximumDate={new Date()}
              />
            )}
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={theme.primary} style={styles.loader} />
          ) : (
            <View style={styles.buttonContainer}>
              <Button
                title="Register"
                onPress={handleRegister}
                color={theme.primary}
              />
            </View>
          )}

          <View style={styles.linkContainer}>
            <Text style={[styles.linkText, { color: theme.textSecondary }]}>
              Already have an account?{" "}
            </Text>
            <Link href="/login">
              <Text style={[styles.link, { color: theme.primary }]}>Login</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
      <View style={styles.themeContainer}>
        <ThemeToggle />
      </View>
    </KeyboardAvoidingView>
  );
};

export default index;

const styles = StyleSheet.create({
  myview: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 6,
  },
  pickerWrapper: {
    borderWidth: 1.5,
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  loader: {
    marginTop: 24,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  linkText: {
    fontSize: 14,
  },
  link: {
    fontSize: 14,
    fontWeight: "600",
  },
  themeContainer: {
    paddingTop: 16,
  },
});
