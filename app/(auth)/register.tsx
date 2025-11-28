import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
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
    <KeyboardAvoidingView style={containerStyle}>
      <TextInput
        style={inputStyle}
        placeholder="Full Name"
        placeholderTextColor="#9ca3af"
        value={name}
        onChangeText={setName}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      <TextInput
        style={inputStyle}
        placeholder="Email"
        placeholderTextColor="#9ca3af"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      <TextInput
        secureTextEntry={true}
        style={inputStyle}
        placeholder="Password"
        placeholderTextColor="#9ca3af"
        value={password}
        onChangeText={setPassword}
      />
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}
      <TextInput
        style={inputStyle}
        placeholder="Mobile Number"
        placeholderTextColor="#9ca3af"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
      />
      {errors.mobileNumber ? (
        <Text style={styles.errorText}>{errors.mobileNumber}</Text>
      ) : null}
      <TextInput
        style={inputStyle}
        placeholder="Department"
        placeholderTextColor="#9ca3af"
        value={department}
        onChangeText={setDepartment}
      />
      {errors.department ? (
        <Text style={styles.errorText}>{errors.department}</Text>
      ) : null}
      <View style={pickerStyle}>
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
      <View style={pickerStyle}>
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
      <Button
        title={`Select DOB: ${dobLabel}`}
        onPress={() => setShowDatePicker(true)}
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
      {loading ? (
        <ActivityIndicator size={"small"}></ActivityIndicator>
      ) : (
        <>
          <Button title="Register" onPress={handleRegister} />
        </>
      )}
      <Link href="/login" style={linkStyle}>
        <Text style={{ color: theme.text }}>Login Instead?</Text>
      </Link>
      <ThemeToggle />
    </KeyboardAvoidingView>
  );
};

export default index;

const styles = StyleSheet.create({
  myview: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 6,
  },
});
