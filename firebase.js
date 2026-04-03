import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCUwePizW0KHicnjm85B80lN8ke2IcldCo",
  authDomain: "rooka-fe7fc.firebaseapp.com",
  projectId: "rooka-fe7fc",
  storageBucket: "rooka-fe7fc.firebasestorage.app",
  messagingSenderId: "927530984108",
  appId: "1:927530984108:web:22060c210982d6acbfb509"
};

const app = initializeApp(firebaseConfig);

// 🔥 Firestore connect
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };