"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      setUserName(currentUser.name);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-sky-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-sky-500 to-blue-500 shadow-md text-white">
        <h1 className="text-2xl font-semibold tracking-tight">Library</h1>

        <h2 className="text-right text-sm">
          {userName ? `สวัสดีคุณ ${userName}` : "ผู้ใช้งานทั่วไป"}
        </h2>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center gap-6 py-4 bg-white/60 backdrop-blur-md shadow-sm border-b border-sky-100">
        <Link
          href="/home"
          className="text-sky-700 hover:text-sky-900 font-medium transition-colors"
        >
          หน้าหลัก
        </Link>
        <Link
          href="/room"
          className="text-sky-700 hover:text-sky-900 font-medium transition-colors"
        >
          การจองห้อง
        </Link>
        <Link
          href="/my-booking"
          className="text-sky-700 hover:text-sky-900 font-medium transition-colors"
        >
          ตรวจสอบการจอง
        </Link>
        <Link
          href="/search-room"
          className="text-sky-700 hover:text-sky-900 font-medium transition-colors"
        >
          ค้นหาห้อง
        </Link>
        
      </nav>

      {/* Cards */}
      <main className="flex justify-center flex-wrap gap-8 p-10">
        {[
          { href: "/room", title: "การจองห้อง", subtitle: "Room reservation" },
          { href: "/my-booking", title: "ข้อมูลการจองห้อง", subtitle: "Booking information" },
          { href: "/room-rules", title: "ข้อปฏิบัติการใช้ห้อง", subtitle: "Usage rules" },
          { href: "/search-room", title: "ค้นหาห้อง", subtitle: "Room search" },
        ].map((card, idx) => (
          <Link
            key={idx}
            href={card.href}
            className="w-72 bg-white/90 p-6 rounded-2xl shadow-md border border-sky-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-sky-800 mb-1">{card.title}</h3>
            <p className="text-sm text-sky-600">{card.subtitle}</p>
          </Link>
        ))}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t bg-gradient-to-r from-sky-400 to-blue-500 text-center py-4 text-white text-sm shadow-inner">
        © 2024 Library. All rights reserved.
      </footer>
    </div>
  );
}
