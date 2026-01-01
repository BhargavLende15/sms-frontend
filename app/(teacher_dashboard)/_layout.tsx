import React from "react";
import { Tabs } from "expo-router";
import TeacherOnly from "../../components/TeacherOnly";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";

const TeacherDashboardLayout = () => {
  const { theme } = useTheme();

  return (
    <TeacherOnly>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
            elevation: 0,
            shadowOpacity: 0,
            height: 60,
            paddingBottom: 10,
            paddingTop: 5,
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === "teacher_home") {
              iconName = focused ? "school" : "school-outline";
            } else if (route.name === "teacher_profile") {
              iconName = focused ? "person" : "person-outline";
            } else {
              iconName = "square";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="teacher_home" options={{ title: "Home" }} />
        <Tabs.Screen name="teacher_profile" options={{ title: "Profile" }} />
      </Tabs>
    </TeacherOnly>
  );
};

export default TeacherDashboardLayout;
