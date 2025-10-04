"use client";
import { useState } from "react";
import Link from "next/link";

type Room = {
  name: string;
  image: string;
};

export default function SearchRoomPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const rooms: Room[] = [
    {
      name: "ห้องประชุม A",
      image:
        "https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png",
    },
    {
      name: "ห้องประชุม B",
      image:
        "https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png",
    },
  ];

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-50 to-cyan-100">
      {/* Header */}
      <header className="flex justify-between items-center shadow-md bg-gradient-to-r from-sky-400 via-cyan-500 to-sky-600 p-5 text-white">
        <div className="flex items-center gap-3">
          
          <h1 className="text-2xl font-bold tracking-wide">Library</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-cyan-700 mb-6 text-center">
            ค้นหาห้องประชุม
          </h1>

          {/* Search box */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="🔍 พิมพ์ชื่อห้องที่ต้องการค้นหา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Room list */}
          {filteredRooms.length === 0 ? (
            <p className="text-gray-600 text-center">ไม่พบห้องที่ค้นหา</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredRooms.map((room, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-white to-sky-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {room.name}
                    </h3>
                    <Link href="/room">
                      <button className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-2 rounded-md font-medium hover:from-sky-600 hover:to-cyan-600 transition">
                        ดูรายละเอียด
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Back button */}
          <div className="mt-10 text-center">
            <Link
              href="/home"
              className="inline-block bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:from-gray-500 hover:to-gray-600 transition"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-sky-200 to-cyan-200 text-center p-4 text-gray-700">
        © 2025 Library Room Booking System
      </footer>
    </div>
  );
}
