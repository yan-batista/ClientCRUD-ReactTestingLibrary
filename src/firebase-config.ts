import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLKr6YMr8zugHbV9W_i-fwzrusl9UmVeg",
  authDomain: "usercrudrtl.firebaseapp.com",
  projectId: "usercrudrtl",
  storageBucket: "usercrudrtl.appspot.com",
  messagingSenderId: "772002343469",
  appId: "1:772002343469:web:3c5766f00c5131890f66a4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
