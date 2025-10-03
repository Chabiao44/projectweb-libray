"use client";


import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      setUserName(currentUser.name);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center shadow p-5 bg-gradient-to-r to-blue-600">
    <div className="relative w-40 h-16">
      
    </div>
      <h2 className="text-right text-xl font-semibold text-white">
        {userName ? `สวัสดีคุณ ${userName}` : "ผู้ใช้งานทั่วไป"}
      </h2>
      </header>

      {/* Navigation */}
      <nav className="shadow-lg p-3 rounded justify-center text-center space-x-4 bg-gradient-to-r to-blue-600 flex flex-wrap">
        <Link href="/home" className="text-gray-200 hover:text-white px-4 py-1">
          หน้าหลัก
        </Link>
        <Link href="/room" className="text-gray-200 hover:text-white px-4 py-1">
          การจองห้อง
        </Link>
        <Link href="/my-booking" className="text-gray-200 hover:text-white px-4 py-1">
          ตรวจสอบการจอง
        </Link>
      </nav>

      {/* Cards */}
      <main className="p-10 flex justify-center gap-10 flex-wrap">
        {[
          { href: "/room/", title: "การจองห้อง", subtitle: "Room usage rules" },
          { href: "/my-booking/", title: "ข้อมูลการจองห้อง", subtitle: "Room usage rules" },
          { href: "/room/", title: "ข้อปฏิบัติการใช้ห้อง", subtitle: "Room usage rules" },
        ].map((card, idx) => (
          <Link key={idx} href={card.href} className="hover:scale-105 transition-transform">
            <div className="text-2xl bg-white shadow-lg p-5 w-80 rounded-lg text-right hover:shadow-xl transition-shadow">
              {card.title}
              <p className="text-gray-500 text-sm text-right mt-1">{card.subtitle}</p>
            </div>
          </Link>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 text-center p-4 shadow-inner mt-auto">
        <p className="text-gray-500">© 2024 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}
