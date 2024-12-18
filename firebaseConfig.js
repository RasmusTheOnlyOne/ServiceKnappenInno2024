// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQWtZc3d-gnyonURMSRJF7amKfWGckB4Y",
  authDomain: "rasmus-app-2.firebaseapp.com",
  projectId: "rasmus-app-2",
  storageBucket: "rasmus-app-2.firebasestorage.app",
  messagingSenderId: "686527906318",
  appId: "1:686527906318:web:dd7876d96caef79050325f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
