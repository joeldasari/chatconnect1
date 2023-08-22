import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvIctGbKoDH9p0T9TEjdG_1Bkjj3y-kEo",
  authDomain: "chatconnect-6c02c.firebaseapp.com",
  projectId: "chatconnect-6c02c",
  storageBucket: "chatconnect-6c02c.appspot.com",
  messagingSenderId: "633630449642",
  appId: "1:633630449642:web:0be434dbe68a4bb7e21c93",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
