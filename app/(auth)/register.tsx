import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import ScreenWrapper from "../../components/ScreenWrapper";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import ThemeToggle from "../../components/ThemeToggle";
import { BorderRadius, FontSizes, Spacing } from "../../constants/spacing";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

const RegisterScreen = () => {
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(mobileNumber.trim()))
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    if (!department.trim()) newErrors.department = "Department is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        gender,
        type,
        dateOfBirth: dateOfBirth.toISOString(),
        mobileNumber: mobileNumber.trim(),
        department: department.trim(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const PickerContainer = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <View style={[styles.pickerWrapper, { backgroundColor: theme.input, borderColor: theme.border }]}>
        {children}
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
             <View style={styles.headerTop}>
               <ThemeToggle />
            </View>
            <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Join us today!
            </Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              error={errors.name}
            />

            <CustomInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <CustomInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />

            <CustomInput
              label="Mobile Number"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              error={errors.mobileNumber}
            />

            <CustomInput
              label="Department"
              placeholder="Enter your department"
              value={department}
              onChangeText={setDepartment}
              error={errors.department}
            />

            <PickerContainer label="Gender">
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={{ color: theme.text }}
                dropdownIconColor={theme.text}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </PickerContainer>

            <PickerContainer label="Role">
              <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue)}
                style={{ color: theme.text }}
                dropdownIconColor={theme.text}
              >
                <Picker.Item label="Student" value="student" />
                <Picker.Item label="Teacher" value="teacher" />
                <Picker.Item label="Admin" value="admin" />
              </Picker>
            </PickerContainer>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>Date of Birth</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={[styles.dateButton, { backgroundColor: theme.input, borderColor: theme.border }]}
              >
                <Text style={{ color: theme.text }}>
                  {dayjs(dateOfBirth).format("YYYY-MM-DD")}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={dateOfBirth}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>

            <CustomButton
              title="Sign Up"
              onPress={handleRegister}
              loading={loading}
              style={{ marginTop: Spacing.md }}
            />

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                Already have an account?
              </Text>
              <Link href="/login" style={[styles.link, { color: theme.primary }]}>
                Sign In
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingVertical: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
   headerTop: {
    alignItems: 'flex-end',
    marginBottom: Spacing.lg
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: "bold",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
    fontWeight: "500",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    justifyContent: "center",
    height: 50, // Fixed height for consistency
  },
  dateButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.xl,
    alignItems: "center",
  },
  footerText: {
    fontSize: FontSizes.md,
    marginRight: Spacing.xs,
  },
  link: {
    fontSize: FontSizes.md,
    fontWeight: "600",
  },
});

export default RegisterScreen;
