"use client";

import { useState, ChangeEvent } from "react";

interface Room {
  id: number;
  name: string;
  capacity: string;
  price: string;
  type: string;
}

export default function ManageRoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [form, setForm] = useState({
    name: "",
    capacity: "",
    price: "",
    type: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  // ✅ Handle form input
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add room
  const addRoom = () => {
    if (!form.name || !form.capacity || !form.price || !form.type) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    const newRoom: Room = { ...form, id: Date.now() };
    setRooms([...rooms, newRoom]);
    setForm({ name: "", capacity: "", price: "", type: "" });
  };

  // ✅ Delete room
  const deleteRoom = (id: number) => {
    if (confirm("คุณต้องการลบห้องนี้หรือไม่?")) {
      setRooms(rooms.filter((r) => r.id !== id));
    }
  };

  // ✅ Start editing
  const startEdit = (room: Room) => {
    setEditId(room.id);
    setForm({
      name: room.name,
      capacity: room.capacity,
      price: room.price,
      type: room.type,
    });
  };

  // ✅ Save edit
  const saveEdit = (id: number) => {
    if (!form.name || !form.capacity || !form.price || !form.type) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    setRooms(rooms.map((r) => (r.id === id ? { ...r, ...form } : r)));
    setEditId(null);
    setForm({ name: "", capacity: "", price: "", type: "" });
  };

  // ✅ Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setForm({ name: "", capacity: "", price: "", type: "" });
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#e6f7ff",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#003366" }}>Manage Room</h1>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          name="name"
          placeholder="Room Name"
          value={form.name}
          onChange={handleChange}
          style={{ marginRight: "5px" }}
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          style={{ marginRight: "5px" }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          style={{ marginRight: "5px" }}
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          style={{ marginRight: "5px" }}
        >
          <option value="">Select Type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
          <option value="Deluxe">Deluxe</option>
        </select>

        {editId ? (
          <>
            <button
              onClick={() => saveEdit(editId)}
              style={{
                backgroundColor: "#33cc33",
                color: "white",
                marginRight: "5px",
              }}
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              style={{ backgroundColor: "#999", color: "white" }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={addRoom}
            style={{ backgroundColor: "#3399ff", color: "white" }}
          >
            Add Room
          </button>
        )}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Room Name</th>
            <th style={thStyle}>Capacity</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td style={tdStyle}>{room.id}</td>
              <td style={tdStyle}>{room.name}</td>
              <td style={tdStyle}>{room.capacity}</td>
              <td style={tdStyle}>{room.price}</td>
              <td style={tdStyle}>{room.type}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => startEdit(room)}
                  style={{
                    backgroundColor: "#ff9933",
                    color: "white",
                    marginRight: "5px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRoom(room.id)}
                  style={{ backgroundColor: "#ff4d4d", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  border: "1px solid #99d6ff",
  padding: "8px",
  backgroundColor: "#b3e0ff",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #99d6ff",
  padding: "8px",
  textAlign: "center",
};
