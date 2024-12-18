import { getTicketById, updateTicket } from "@/db"; // Import necessary functions
import { timeAgo } from "@/utils";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

//Her kan vi opdatere vores tickets, efter de er blevet løst i den virkelige verden
export default function TicketDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [ticket, setTicket] = useState<any>(null);

  const fetchTicket = async () => {
    const fetchedTicket = await getTicketById(id); //I dette stykke vil den ticket der er valgt blive hentet gennem dens id nr.
    setTicket(fetchedTicket);
  };

  const markAsSolved = async () => {    //Her kan vi opdatere en tickets status, og ændre ticket'en til at Solved er True, og den vil ændre styling og status
    await updateTicket(id, { solved: true });
    alert("Ticket marked as solved");
    router.back(); // Sender brugeren tilbage
  };
  
  useEffect(() => {
    fetchTicket();
  }, [id]);
 //Holder siden hen hvis den ikke kan finde en ticket endnu
  if (!ticket) {
    return <Text>Loading...</Text>; // Loading...
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Ticket Details",
          headerBackTitle: "Back",
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{ticket.title}</Text>
        <Text style={styles.description}>{ticket.description}</Text>
        <Text style={styles.location}>Location: {ticket.location}</Text>
        <Text style={styles.location}>
          {timeAgo(ticket.createdAt.toDate())}
        </Text>
        <TouchableOpacity style={styles.button} onPress={markAsSolved}>
          <Text style={styles.buttonText}>Mark as Solved</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  location: {
    fontSize: 14,
    color: "#555",
  },
  createdAt: {
    fontSize: 12,
    color: "#aaa",
  },
  button: {
    backgroundColor: "#285D43",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
