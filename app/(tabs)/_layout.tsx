import { auth } from "@/firebaseConfig";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const user = auth.currentUser;

  if (!user) {
    // return <Redirect href="/tickets/createTicket" />;
  }
// Dette er mere bare et navigations side for brugeren
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display: user ? "flex" : "none",
        },
        tabBarActiveTintColor: "#285D43",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="overview"
        options={{
          title: "Overview",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="space-dashboard" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tickets"
        options={{
          title: "Tickets",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="receipt" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="support"
        options={{
          title: "Support",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="question-answer" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="menu" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
