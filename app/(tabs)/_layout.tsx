import React from "react";
import { Tabs } from "expo-router";
import { colors } from "@/constants/colors";
import { Home, List, Calendar, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: colors.text,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="food-list"
        options={{
          title: "Foods",
          tabBarLabel: "Foods",
          tabBarIcon: ({ color, size }) => <List size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: "Daily Log",
          tabBarLabel: "Log",
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}