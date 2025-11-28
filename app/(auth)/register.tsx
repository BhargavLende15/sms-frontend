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
  const handleRegister = async () => {
    setLoading(true);
    try {
      await register({
        name,
        email,
        password,
        gender,
        type,
        dateOfBirth: dayjs(dateOfBirth).format("YYYY-MM-DD"),
        mobileNumber,
        department,
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
      <TextInput
        style={inputStyle}
        placeholder="Email"
        placeholderTextColor="#9ca3af"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        secureTextEntry={true}
        style={inputStyle}
        placeholder="Password"
        placeholderTextColor="#9ca3af"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={inputStyle}
        placeholder="Mobile Number"
        placeholderTextColor="#9ca3af"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={inputStyle}
        placeholder="Department"
        placeholderTextColor="#9ca3af"
        value={department}
        onChangeText={setDepartment}
      />
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
          <Picker.Item label="Admin" value="admin" />
        </Picker>
      </View>
      <Button
        title={`Select DOB: ${dobLabel}`}
        onPress={() => setShowDatePicker(true)}
      />
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
});
