import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_ryGnuxmrScNUnsQLIXbX5IPZvkL9j-Y",
  authDomain: "studio-3616504818-29bff.firebaseapp.com",
  projectId: "studio-3616504818-29bff",
  storageBucket: "studio-3616504818-29bff.firebasestorage.app",
  messagingSenderId: "949526959937",
  appId: "1:949526959937:web:4aa6610b3088c20287b3c0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
