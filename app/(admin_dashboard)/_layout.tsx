import React from "react";
import { Tabs } from "expo-router";
import AdminUserOnly from "../../components/AdminUserOnly";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";

const AdminDashboardLayout = () => {
  const { theme } = useTheme();

  return (
    <AdminUserOnly>
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

            if (route.name === "admin_home") {
              iconName = focused ? "grid" : "grid-outline";
            } else if (route.name === "admin_profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name === "courses") {
              iconName = focused ? "library" : "library-outline";
            } else {
              iconName = "square";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="admin_home" options={{ title: "Home" }} />
        <Tabs.Screen name="courses" options={{ title: "Manage Courses" }} />
        <Tabs.Screen
          name="admin_profile"
          options={{ title: "Profile" }}
        />
      </Tabs>
    </AdminUserOnly>
  );
};

export default AdminDashboardLayout;
