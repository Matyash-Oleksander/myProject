import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: "AIzaSyDfZDTtX8dUjZIGyRT2mpiIzCkc42Ub35E",
  authDomain: "test-a0668.firebaseapp.com",
  databaseURL: "https://test-a0668-default-rtdb.firebaseio.com",
  projectId: "test-a0668",
  storageBucket: "test-a0668.appspot.com",
  messagingSenderId: "421142403568",
  appId: "1:421142403568:web:5639e865cf82cbe0faa535",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// console.log("auth++++", auth);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
// console.log("storage++++", storage);
