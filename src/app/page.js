"use client";
import React, { useState, useEffect } from "react";
import { handleAdd, handleUpdate, handleDelete, fetchUsers } from "./firebase";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", number: "", email: "" });
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEdit = (user) => {
    setFormData({ name: user.name, number: user.number, email: user.email });
    setEditingId(user.id);
  };

  const refreshUsers = async () => {
    setLoading(true);
    const data = await fetchUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const handleAddUser = async () => {
    await handleAdd(formData);
    setFormData({ name: "", number: "", email: "" });
    refreshUsers();
  };

  const handleUpdateUser = async () => {
    if (editingId) {
      await handleUpdate(editingId, formData);
      setFormData({ name: "", number: "", email: "" });
      setEditingId(null);
      refreshUsers();
    }
  };

  const handleDeleteUser = async (id) => {
    await handleDelete(id);
    refreshUsers();
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
            onClick={handleAddUser}
            className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-semibold"
          >
            Add Record
          </button>
          <button
            onClick={handleUpdateUser}
            className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-semibold"
          >
            Update Record
          </button>
        </div>
      </div>

      <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-3 gap-10">
        {loading ? (
          <div className="flex justify-center items-center col-span-3">
            <p className="text-center text-sky-600">Loading...</p>
          </div>
        ) : (
          users.map((user) => (
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
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
