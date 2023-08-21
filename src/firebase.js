import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9XP66y4uYc-4rQVvpP_6Y1mgfq8_9xiE",
  authDomain: "anochat-53eba.firebaseapp.com",
  projectId: "anochat-53eba",
  storageBucket: "anochat-53eba.appspot.com",
  messagingSenderId: "211862904404",
  appId: "1:211862904404:web:589daee2a543fa09b717c1",
  measurementId: "G-1B43T2ZTBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
