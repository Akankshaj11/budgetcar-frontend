import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXQO7THL478SetIptcMQEDfEc-WJ8clI8",
  authDomain: "car-marketplace-3fc9e.firebaseapp.com",
  projectId: "car-marketplace-3fc9e",
  storageBucket: "car-marketplace-3fc9e.firebasestorage.app",
  messagingSenderId: "53458006275",
  appId: "1:53458006275:web:a59de4f80dfbf004c43936"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;



