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
    // ดึง currentUser
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      setUserName(currentUser.name);

      // ดึง users สำหรับแสดงข้อมูลโปรไฟล์
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find((u) => u.name === currentUser.name);
      setUser(foundUser || null);

      // ดึง booking จาก MyBookings (localStorage "bookings")
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">ยังไม่ได้เข้าสู่ระบบ</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between shadow-md bg-gradient-to-r to-blue-600 p-5 text-white">
        <img
          src="https://www.mju.ac.th/th/images/mju_logo_main-resize.png"
          alt="MJU Logo"
          className="h-16 w-auto"
        />
        <h2 className="text-xl font-semibold">
    <Link href="/profile" className="hover:underline">
      {userName || "ผู้ใช้งานทั่วไป"}
    </Link>
  </h2>
      </header>

      {/* Body */}
      <main className="flex-1 p-10">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto relative">
          <Link
            href="/home"
            className="absolute top-6 right-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            กลับหน้าหลัก
          </Link>

          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            โปรไฟล์ของ {userName}
          </h1>

          <div className="mb-6">
            <p><span className="font-semibold">ชื่อ:</span> {user.name}</p>
            <p><span className="font-semibold">อีเมล:</span> {user.email}</p>
          </div>

          <h2 className="text-xl font-bold text-blue-500 mb-4">ข้อมูลการจองของฉัน</h2>

          {bookings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600 text-lg">ยังไม่มีการจอง</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b, index) => (
                <div
                  key={index}
                  className="p-5 border rounded-lg shadow-sm bg-blue-50 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-blue-800 mb-2">
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

      <footer className="bg-gray-50 text-center p-4 shadow-inner">
        <p className="text-gray-500">© 2024 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}