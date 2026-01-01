import React from "react";
import { Tabs } from "expo-router";
import UserOnly from "../../components/UserOnly";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";

const StudentDashboardLayout = () => {
  const { theme } = useTheme();

  return (
    <UserOnly>
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

            if (route.name === "home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "courses") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "rank_list") {
              iconName = focused ? "trophy" : "trophy-outline";
            } else {
              iconName = "square";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="courses" options={{ title: "Courses" }} />
        <Tabs.Screen name="rank_list" options={{ title: "Rank List" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </UserOnly>
  );
};

export default StudentDashboardLayout;
