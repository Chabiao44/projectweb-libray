"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) setUserName(currentUser.name);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-50 via-cyan-50 to-blue-100">
      {/* Header */}
    <header className="flex justify-between items-center shadow-md bg-gradient-to-r from-sky-400 via-cyan-500 to-sky-600 p-5 text-white">
     {/* ซ้าย: Library */}
      <h2 className="text-xl font-semibold">Library</h2>

     {/* ขวา: ชื่อผู้ใช้ */}
     <Link href="/profile" className="text-sm hover:underline">
       {userName || "ผู้ใช้งานทั่วไป"}
     </Link>
    </header>



      {/* Navigation */}
      <nav className="shadow-lg p-3 rounded text-center space-x-4 bg-gradient-to-r from-sky-400 to-cyan-500 flex justify-center flex-wrap">
        <Link href="/home" className="text-gray-200 hover:text-white px-4 py-1">
          หน้าหลัก
        </Link>
        <Link href="/room" className="text-gray-200 hover:text-white px-4 py-1">
          การจองห้อง
        </Link>
        <Link href="/my-booking" className="text-gray-200 hover:text-white px-4 py-1">
          ตรวจสอบการจอง
        </Link>
        <Link href="/search-room" className="text-gray-200 hover:text-white px-4 py-1">
          ค้นหาห้อง 🔍︎
        </Link>
      </nav>

      {/* Cards */}
      <main className="p-10 flex justify-center gap-10 flex-wrap">
        {[
          { href: "/room/", title: "การจองห้อง", subtitle: "Booking a room" },
          { href: "/my-booking/", title: "ข้อมูลการจองห้อง", subtitle: "Room booking information" },
          { href: "/room/", title: "ข้อปฏิบัติการใช้ห้อง", subtitle: "Room usage rules" },
        ].map((card, idx) => (
          <Link key={idx} href={card.href} className="hover:scale-105 transition-transform">
            <div className="text-2xl bg-white shadow-lg p-5 w-80 rounded-xl text-right hover:shadow-xl transition-shadow">
              {card.title}
              <p className="text-gray-500 text-sm mt-1">{card.subtitle}</p>
            </div>
          </Link>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-sky-200 to-cyan-200 text-center p-4 text-gray-700 mt-auto">
        © 2025 Library Room Booking System
      </footer>
    </div>
  );
}
