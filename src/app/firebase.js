import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);

export const fetchUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const handleAdd = async (formData) => {
  try {
    await addDoc(collection(db, "users"), formData);
    alert("Record added");
  } catch (err) {
    console.error(err);
  }
};

export const handleUpdate = async (id, formData) => {
  try {
    await updateDoc(doc(db, "users", id), formData);
    alert("Record updated");
  } catch (err) {
    console.error(err);
  }
};

export const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, "users", id));
    alert("Record deleted");
  } catch (err) {
    console.error(err);
  }
};
