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

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-100 to-blue-100 p-10 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-cyan-700 drop-shadow-sm">
          การจองของฉัน
        </h1>

        {bookings.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">
            ยังไม่มีการจอง
          </p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b, index) => (
              <li
                key={index}
                className="p-5 border border-cyan-200 rounded-xl shadow-md bg-gradient-to-r from-sky-50 to-cyan-50 hover:shadow-lg transition"
              >
                <p className="text-gray-800">
                  <strong className="text-cyan-700">ห้อง:</strong> {b.room}
                </p>
                <p className="text-gray-800">
                  <strong className="text-cyan-700">วันที่:</strong> {b.date}
                </p>
                <p className="text-gray-800">
                  <strong className="text-cyan-700">เวลา:</strong> {b.time}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/home/"
            className="inline-block bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200"
          >
            กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
