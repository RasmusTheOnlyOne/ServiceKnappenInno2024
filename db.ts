import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  documentId,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { Alert } from "react-native";
import { auth, db } from "./firebaseConfig";

const showError = (message: string) => {
  Alert.alert("Error", message);
};

export const login = async ({
  email,
  password,
  onSuccess,
}: {
  email: string;
  password: string;
  onSuccess: () => void;
}) => {
  if (!email || !password) {
    showError("Please enter an email and password");
    return;
  }
  try {
    await signInWithEmailAndPassword(auth, email, password);
    onSuccess();
  } catch (error) {
    showError("Invalid email or password");
  }
};

export const register = async ({
  email,
  password,
  confirmPassword,
  onSuccess,
}: {
  email: string;
  password: string;
  confirmPassword: string;
  onSuccess: () => void;
}) => {
  if (!email || !password || !confirmPassword) {
    showError("Please enter an email and password");
    return;
  }
  if (password !== confirmPassword) {
    showError("Passwords do not match");
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    onSuccess();
  } catch (error) {
    showError("Failed to register");
  }
};

export const sendSupportMessage = async ({
  email,
  message,
  onSuccess,
}: {
  email: string;
  message: string;
  onSuccess: () => void;
}) => {
  const supportCol = collection(db, "support");
  try {
    await addDoc(supportCol, { email, message, createdAt: serverTimestamp() });
    onSuccess();
  } catch (error) {
    showError("Failed to send message");
  }
};

export const createTicket = async ({
  location,
  title,
  description,
  image,
  onSuccess,
}: {
  location: string;
  title: string;
  description: string;
  image: string;
  onSuccess: () => void;
}) => {
  const ticketCol = collection(db, "tickets");
  try {
    await addDoc(ticketCol, {
      location,
      title,
      description,
      image,
      solved: false,
      createdAt: serverTimestamp(),
    });
    onSuccess();
  } catch (error) {
    showError("Failed to create ticket");
  }
};

export const getTickets = async (): Promise<any[]> => {
  const ticketCol = collection(db, "tickets");
  const q = query(ticketCol, orderBy("createdAt", "desc"));
  const tickets = await getDocs(q);
  return tickets.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getTicketById = async (id: string) => {
  const ticketCol = collection(db, "tickets");
  const q = query(ticketCol, where(documentId(), "==", id));
  const ticket = await getDocs(q);
  return ticket.docs[0].data();
};

export const updateTicket = async (id: string, data: any) => {
  const ticketCol = collection(db, "tickets");
  const q = query(ticketCol, where(documentId(), "==", id));
  const ticket = await getDocs(q);
  await updateDoc(ticket.docs[0].ref, data);
};
