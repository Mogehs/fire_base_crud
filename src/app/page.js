"use client";
import React, { useState, useEffect, useTransition } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", number: "", email: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), formData);
      setMessage("Record added");
      setFormData({ name: "", number: "", email: "" });
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage("Error adding record");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "users", editingId), formData);
      setMessage("Record updated");
      setFormData({ name: "", number: "", email: "" });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage("Error updating record");
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setMessage("Record deleted");
    fetchUsers();
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, number: user.number, email: user.email });
    setEditingId(user.id);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start p-6 text-black">
      <div className="bg-sky-100 p-8 rounded-xl shadow-md w-full max-w-lg mt-10">
        <h1 className="text-2xl font-bold mb-6 text-sky-600 text-center">
          Firebase Contact Form
        </h1>
        <div className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            name="number"
            type="tel"
            placeholder="Phone Number"
            value={formData.number}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={editingId ? handleUpdate : handleAdd}
            className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-semibold"
          >
            {editingId ? "Update Record" : "Add Record"}
          </button>
        </div>

        {message && (
          <p className="mt-4 text-sm text-center text-sky-600">{message}</p>
        )}
      </div>

      <div className="mt-10 w-full grid grid-cols-3 gap-10">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-sky-50 border border-sky-200 rounded-xl p-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm">{user.number}</p>
              <p className="text-sm">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(user)}
                className="text-sm px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
