import { register } from "@/db";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
//På denne side er vores registrering af en bruger
export default function registerScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");   //Sætter alle vores felter til at være tomme
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    register({
      email,
      password,         //Her sendes brugeren videre
      confirmPassword,
      onSuccess: () => router.replace("/overview"),
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.form}>
          <KeyboardAvoidingView behavior="padding" style={{ gap: 24 }}>
            <View style={{ gap: 12 }}>
              <View style={{ gap: 4 }}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View style={{ gap: 4 }}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <View style={{ gap: 4 }}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
            </View>
            <View style={{ gap: 10, flexDirection: "row" }}>
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={{ textAlign: "center" }}>Register</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Already have an account? Login here
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#285D43",
    padding: 20,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 5,
    flex: 1,
  },
  label: {
    fontWeight: "500",
    color: "#fff",
  },
  form: {},
});
