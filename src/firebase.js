import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfdR5vJbbe36PmIF5SvNjFYNz4IHW_8o0",
  authDomain: "anochat2.firebaseapp.com",
  projectId: "anochat2",
  storageBucket: "anochat2.appspot.com",
  messagingSenderId: "201084999687",
  appId: "1:201084999687:web:f630d10401c3768506f2a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
