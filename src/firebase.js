// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA3N7t1YmEuOg7AmNF6iTjHjVyJ1bf0v0k",
  authDomain: "aravinth-crackers-f878f.firebaseapp.com",
  projectId: "aravinth-crackers-f878f",
  storageBucket: "aravinth-crackers-f878f.firebasestorage.app",
  messagingSenderId: "558392452429",
  appId: "1:558392452429:web:88aa5e283da1435ece0304",
  measurementId: "G-MCBLSEWZ8R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
