import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4wd6eyAbuOsgeKq8ZnOEgQ384_wHOST0",
  authDomain: "update-69157.firebaseapp.com",
  projectId: "update-69157",
  storageBucket: "update-69157.appspot.com",
  messagingSenderId: "819825724248",
  appId: "1:819825724248:web:3bb8710861a9fa7148332d",
  measurementId: "G-QRST9PXKBL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);