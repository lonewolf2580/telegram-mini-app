// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO3azJO5G2kLjNdiqsektuA7clwG-eWCU",
  authDomain: "telegram-tap.firebaseapp.com",
  projectId: "telegram-tap",
  storageBucket: "telegram-tap.firebasestorage.app",
  databaseURL: "https://telegram-tap-default-rtdb.firebaseio.com",
  messagingSenderId: "827135841515",
  appId: "1:827135841515:web:cefe2a8e4c43d2c8369aae",
  measurementId: "G-24LFM7RFHE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
