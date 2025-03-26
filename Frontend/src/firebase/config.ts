import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCkmCn1Oj_cudk6hzNlf9n_xVLuzewlWls",
  authDomain: "bdd2-proyecto1.firebaseapp.com",
  projectId: "bdd2-proyecto1",
  storageBucket: "bdd2-proyecto1.firebasestorage.app",
  messagingSenderId: "173427692504",
  appId: "1:173427692504:web:6a8e8f9b482428cb4cd8ad",
  measurementId: "G-6RX66DLXVC"
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);
