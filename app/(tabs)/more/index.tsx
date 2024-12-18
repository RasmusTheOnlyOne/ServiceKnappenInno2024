import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

//I denne fil vises vores "More" tab, som egentlig ikke er implementeret endnu, og er derfor mest bare fyldt med ikoner
//som man kan trykke på, men har ikke noget navigation som sådan

export default function More() {
  const navItems = [
    {
      title: "Profile",
      icon: "person",
    },
    {
      title: "FAQ",
      icon: "question-answer",
    },
    {
      title: "Language",
      icon: "language",
    },
    {
      title: "Terms of Service",
      icon: "policy",
    },
    {
      title: "Logout",
      icon: "logout",
    },
  ] satisfies { title: string; icon: keyof typeof MaterialIcons.glyphMap }[];

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "More",
        }}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {navItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.navItem}>
              <MaterialIcons
                style={styles.navItemIcon}
                name={item.icon}
                size={24}
                color="black"
              />
              <Text style={styles.navItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollViewContent: {
    gap: 6,
  },
  navItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  navItemIcon: {
    color: "#285D43",
  },
  navItemText: {
    fontSize: 16,
    fontWeight: 600,
  },
});
