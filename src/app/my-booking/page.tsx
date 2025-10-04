"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Booking = {
  date: string | null;
  time: string | null;
  room: string | null;
};

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      setUserName(currentUser.name);
    }
  }, []);

  const handleDelete = (index: number) => {
    const confirmed = confirm("ต้องการยกเลิกการจองนี้หรือไม่?");
    if (confirmed) {
      const newBookings = bookings.filter((_, i) => i !== index);
      setBookings(newBookings);
      localStorage.setItem("bookings", JSON.stringify(newBookings));
      alert("ยกเลิกการจองเรียบร้อย");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-50 via-cyan-50 to-blue-100">
      {/* Header */}
      <header className="flex justify-between items-center shadow-md bg-gradient-to-r from-sky-400 via-cyan-500 to-sky-600 p-5 text-white">
        <div className="flex flex-col items-end">
       <h2 className="text-xl font-semibold">Library</h2>
        
      </div>
        <h2 className="text-xl font-semibold">
          {userName ? `${userName}` : "ผู้ใช้งานทั่วไป"}
        </h2>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 max-w-4xl mx-auto relative">
          <Link
            href="/home"
            className="absolute top-6 right-6 bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-sky-600 hover:to-cyan-600 transition"
          >
            กลับหน้าหลัก
          </Link>

          <h1 className="text-2xl font-bold text-cyan-700 mb-6 text-center">
            ข้อมูลการจองห้องของฉัน
          </h1>

          {bookings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600 text-lg">ยังไม่มีการจอง</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b, index) => (
                <div
                  key={index}
                  className="p-5 border rounded-xl shadow-md bg-gradient-to-r from-sky-50 to-cyan-50 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-cyan-800 mb-2">
                        {b.room || "ไม่ระบุห้อง"}
                      </p>
                      <div className="space-y-1 text-gray-700">
                        <p>
                          <strong>วันที่:</strong> {b.date || "ไม่ระบุ"}
                        </p>
                        <p>
                          <strong>เวลา:</strong> {b.time || "ไม่ระบุ"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-sky-200 to-cyan-200 text-center p-4 text-gray-700">
        © 2025 Library Room Booking System
      </footer>
    </div>
  );
}
