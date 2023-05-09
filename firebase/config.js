import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: "AIzaSyAmGSYRpdzFx7zJbC7aV56Mq9Qu--Qdquc",
  authDomain: "more-4713e.firebaseapp.com",
  databaseURL: "https://more-4713e-default-rtdb.firebaseio.com",
  projectId: "more-4713e",
  storageBucket: "more-4713e.appspot.com",
  messagingSenderId: "787779355287",
  appId: "1:787779355287:web:e31a256dc04c2574ed1fd2",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// console.log("auth++++", auth);
