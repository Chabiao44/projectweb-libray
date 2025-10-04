"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  password: string;
}

type Booking = {
  date: string | null;
  time: string | null;
  room: string | null;
  user: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      setUserName(currentUser.name);
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find((u) => u.name === currentUser.name);
      setUser(foundUser || null);

      const savedBookings: Booking[] = JSON.parse(localStorage.getItem("bookings") || "[]");
      setBookings(savedBookings);
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 via-cyan-50 to-blue-100">
        <p className="text-blue-600 font-medium">ยังไม่ได้เข้าสู่ระบบ</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-100 via-cyan-50 to-blue-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm shadow-md border-b">
        {/* Library ซ้าย */}
        <div className="text-blue-700 font-medium text-sm">
          Library
        </div>

        {/* Profile ขวา */}
        <div className="text-blue-800 font-semibold text-lg">
          <Link href="/profile" className="hover:underline">
            {userName || "ผู้ใช้งานทั่วไป"}
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="bg-white/90 rounded-xl p-6 shadow-md max-w-3xl mx-auto relative">
          <Link
            href="/home"
            className="absolute top-4 right-4 text-blue-600 hover:underline text-sm font-medium"
          >
            กลับหน้าหลัก
          </Link>

          <h1 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
            โปรไฟล์ของ {userName}
          </h1>

          <div className="mb-6 text-blue-700 space-y-1">
            <p><span className="font-medium">ชื่อ:</span> {user.name}</p>
            <p><span className="font-medium">อีเมล:</span> {user.email}</p>
          </div>

          <h2 className="text-xl font-semibold text-blue-800 mb-3">ข้อมูลการจองของฉัน</h2>

          {bookings.length === 0 ? (
            <div className="text-center py-8 text-blue-400">
              ยังไม่มีการจอง
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((b, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-md shadow hover:shadow-md transition flex justify-between items-start"
                >
                  <div className="flex-1">
                    <p className="font-medium text-blue-800">{b.room || "ไม่ระบุห้อง"}</p>
                    <div className="text-blue-600 text-sm space-y-1 mt-1">
                      <p><span className="font-medium">วันที่:</span> {b.date || "-"}</p>
                      <p><span className="font-medium">เวลา:</span> {b.time || "-"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition"
                  >
                    ยกเลิก
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 text-blue-300 text-xs border-t border-blue-200">
        © 2024 My App. All rights reserved.
      </footer>
    </div>
  );
}
