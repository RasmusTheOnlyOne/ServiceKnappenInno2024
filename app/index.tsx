import { login } from "@/db";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function loginScreen() {  //Her er vores login, som definere brugeren oplysninger, og tjekker der derefter om de kan logges ind
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {   
    login({ email, password, onSuccess: () => router.replace("/overview") });
  };

  const handleGuest = () => {
    router.replace("/tickets/createTicket");      //Hvis de er en gæst tilgengæld, så kan de stadig lave tickets, hvilket de derfor bliver sendt derover
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.form}>
          {/* Logo */}
          <Image
            source={require("@/assets/images/logo.png")}
            style={{
              width: "auto",
              objectFit: "contain",
              height: 100,
              marginBottom: 24,
              marginTop: -100,
            }}
          />
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
            </View>
            <View style={{ gap: 10, display: "flex" }}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{ textAlign: "center" }}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderColor: "#fff",
                  },
                ]}
                onPress={handleGuest}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Continue as Guest
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Don't have an account? Register here
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
    // flex: 1,
  },
  label: {
    fontWeight: "500",
    color: "#fff",
  },
  form: {},
});
