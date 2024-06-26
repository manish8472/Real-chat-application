
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "",
  authDomain: "manishchat-f7304.firebaseapp.com",
  projectId: "manishchat-f7304",
  storageBucket: "manishchat-f7304.appspot.com",
  messagingSenderId: "120988715345",
  appId: "",
  measurementId: "G-4RPG2WS7Y0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
