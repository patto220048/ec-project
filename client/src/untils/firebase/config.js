// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "ecomecre-a948f.firebaseapp.com",
  databaseURL: import.meta.env.FIREBASE_DATABASE_URL,
  projectId: "ecomecre-a948f",
  storageBucket: "ecomecre-a948f.appspot.com",
  messagingSenderId: "949121466853",
  appId: "1:949121466853:web:16051beff5096e0e36af0c",
  measurementId: "G-S0JXTTEFEN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


