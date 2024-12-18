import { sendSupportMessage } from "@/db";
import { auth } from "@/firebaseConfig";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
    //OBS! Denne side eksistere, men den fungere ikke i praksis, da den ikke sender beskeden til nogen...
export default function support() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Hent bruger
  const user = auth.currentUser;


  useEffect(() => {
    if (user) {
      setEmail(user.email || ""); //brug brugers email
    }
  }, [user]);

  const handleSend = async () => {
    await sendSupportMessage({
      email,
      message,                          //send beskeder og email afsted til modtager
      onSuccess: () => {
        setMessage("");
        Alert.alert("Support ticket sent");
      },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Support",
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={"#555"}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!user}
            />
            <TextInput
              placeholder="Enter your message"
              placeholderTextColor={"#555"}
              style={[styles.input, { height: 140 }]}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity style={styles.button} onPress={handleSend}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  form: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    width: "100%",
  },
  button: {
    backgroundColor: "#285D43",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
});
