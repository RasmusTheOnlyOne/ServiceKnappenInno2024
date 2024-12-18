import { getTickets } from "@/db";
import { auth } from "@/firebaseConfig";
import { timeAgo } from "@/utils";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, router, Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
  //
export default function Tickets() {
  const [tickets, setTickets] = useState<any[]>([]);  //Her er vores liste over alle tickets
  const user = auth.currentUser;                      //Som kan ses hvis man er en indlogget 

  if (!user) {
    return <Redirect href="/tickets/createTicket" />; //Her tjekkes om man er en bruger
  }

  const createTicket = () => {
    router.push("/tickets/createTicket"); //Bruger sendes til createTicket siden
  };

  const fetchTickets = useCallback(() => {    //Listen over tickets hentes. Callback så den ikke opdateres hele tiden
    getTickets().then((tickets) => setTickets(tickets));
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);
        //UI styling
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Tickets",
        }}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={createTicket}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
        <FlatList
          data={tickets}
          contentContainerStyle={{ gap: 6 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/tickets/ticketDetail",
                  params: { id: item.id },
                })
              }
            >
              <View style={[styles.ticket, item.solved && styles.solved]}>
                <Text style={[styles.title, item.solved && styles.solvedTitle]}>
                  {item.title}
                </Text>
                <Text style={styles.time}>
                  {timeAgo(item.createdAt.toDate())}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          onRefresh={fetchTickets}
          refreshing={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: "relative",
    height: "100%",
  },
  addButton: {
    backgroundColor: "#285D43",
    zIndex: 100,
    padding: 10,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  ticket: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#ccc",
    borderRadius: 99,
  },
  solved: {
    backgroundColor: "#285D43",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  solvedTitle: {
    color: "#fff",
  },
  time: {
    fontSize: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
});
