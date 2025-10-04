"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const room = searchParams.get("room");

  const handleConfirm = () => {
    const newBooking = { date, time, room };
    
    // ดึงข้อมูลเก่ามาก่อน
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");

    // เก็บข้อมูลใหม่เพิ่มเข้าไป
    saved.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(saved));

    alert("ยืนยันการจองเรียบร้อย ✅");
    
    // ไปที่หน้า my-bookings
    router.push("/my-booking");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-sky-100">
      <div className="bg-white/90 shadow-md border border-sky-100 rounded-2xl p-10 w-[480px] text-gray-800 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-sky-700 mb-6 text-center tracking-tight">
          รายละเอียดการจอง
        </h1>

        <div className="space-y-4 text-base">
          <p>
            <strong className="text-sky-800">ห้องที่จอง:</strong>{" "}
            {room || "ไม่ระบุ"}
          </p>
          <p>
            <strong className="text-sky-800">วันที่:</strong>{" "}
            {date || "ไม่ระบุ"}
          </p>
          <p>
            <strong className="text-sky-800">เวลา:</strong>{" "}
            {time || "ไม่ระบุ"}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleConfirm}
            className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-8 py-2 rounded-lg font-medium hover:scale-[1.03] transition-transform shadow-sm hover:shadow-md"
          >
            ยืนยันการจอง
          </button>
        </div>
      </div>
    </div>
  );
}
