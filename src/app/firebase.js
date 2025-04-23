import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcw1E12hLbCpSpMV-m1dz-wTLqFHru2n4",
  authDomain: "fir-crud-ea525.firebaseapp.com",
  projectId: "fir-crud-ea525",
  storageBucket: "fir-crud-ea525.firebasestorage.app",
  messagingSenderId: "334449459926",
  appId: "1:334449459926:web:cb5619e266860548287f77",
  measurementId: "G-WPMP0H1XG8",
};

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);
