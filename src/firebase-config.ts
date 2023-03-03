// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo5VJ-KXWaQPNFc-NL6yB-V2-i1ZO6fYU",
  authDomain: "doable-9b456.firebaseapp.com",
  databaseURL:
    "https://doable-9b456-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "doable-9b456",
  storageBucket: "doable-9b456.appspot.com",
  messagingSenderId: "861328762539",
  appId: "1:861328762539:web:ac69f3ff7b137803d439ee",
  measurementId: "G-3LBMJX1DYZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth()