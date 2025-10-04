"use client";

import { useState, ChangeEvent } from "react";

type Booking = {
  id: number;
  name: string;
  date: string;
  time: string;
  status: "Confirmed" | "Cancelled";
};

export default function ManageBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [form, setForm] = useState({ name: "", date: "", time: "" });
  const [search, setSearch] = useState({ name: "", date: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const addBooking = () => {
    if (!form.name || !form.date || !form.time) return alert("Please fill all fields");
    setBookings([
      ...bookings,
      { ...form, id: Date.now(), status: "Confirmed" as const },
    ]);
    setForm({ name: "", date: "", time: "" });
  };

  const editBooking = (id: number) => {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;
    const newName = prompt("Edit Customer Name:", booking.name);
    if (newName) {
      setBookings(
        bookings.map((b) => (b.id === id ? { ...b, name: newName } : b))
      );
    }
  };

  const cancelBooking = (id: number) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setBookings(
        bookings.map((b) =>
          b.id === id ? { ...b, status: "Cancelled" } : b
        )
      );
    }
  };

  const resetSearch = () => {
    setSearch({ name: "", date: "" });
  };

  const filteredBookings = bookings.filter((b) => {
    const matchName = search.name
      ? b.name.toLowerCase().includes(search.name.toLowerCase())
      : true;
    const matchDate = search.date ? b.date === search.date : true;
    return matchName && matchDate;
  });

  return (
    <div className="min-h-screen bg-blue-50 p-8 font-sans">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Manage Booking
      </h1>

      {/* Search Section */}
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2 text-blue-800">Search Booking</h3>
        <div className="flex flex-wrap gap-2">
          <input
            name="name"
            placeholder="Customer Name"
            value={search.name}
            onChange={handleSearchChange}
            className="border p-2 rounded w-48"
          />
          <input
            name="date"
            type="date"
            value={search.date}
            onChange={handleSearchChange}
            className="border p-2 rounded"
          />
          <button
            onClick={resetSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Add Booking Section */}
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2 text-blue-800">Add Booking</h3>
        <div className="flex flex-wrap gap-2">
          <input
            name="name"
            placeholder="Customer Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded w-48"
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <button
            onClick={addBooking}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Booking
          </button>
        </div>
      </div>

      {/* Booking Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-blue-300 rounded-lg">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="border border-blue-300 p-2">ID</th>
              <th className="border border-blue-300 p-2">Customer Name</th>
              <th className="border border-blue-300 p-2">Date</th>
              <th className="border border-blue-300 p-2">Time</th>
              <th className="border border-blue-300 p-2">Status</th>
              <th className="border border-blue-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id} className="text-center bg-white">
                <td className="border border-blue-200 p-2">{b.id}</td>
                <td className="border border-blue-200 p-2">{b.name}</td>
                <td className="border border-blue-200 p-2">{b.date}</td>
                <td className="border border-blue-200 p-2">{b.time}</td>
                <td
                  className={`border border-blue-200 p-2 font-semibold ${
                    b.status === "Cancelled"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {b.status}
                </td>
                <td className="border border-blue-200 p-2 space-x-2">
                  <button
                    onClick={() => editBooking(b.id)}
                    className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => cancelBooking(b.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
