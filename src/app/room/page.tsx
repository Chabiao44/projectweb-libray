"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Root() {
  const router = useRouter();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [saved, setSaved] = useState<{ date: string; time: string } | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("savedTime");
    if (data) setSaved(JSON.parse(data));
  }, []);

  const handleBlur = () => {
    if (time !== "") {
      const num = parseFloat(time);
      if (!isNaN(num)) {
        let formatted = num.toFixed(2);
        let [intPart, decPart] = formatted.split(".");
        if (intPart.length < 2) intPart = intPart.padStart(2, "0");
        setTime(`${intPart}.${decPart}`);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { date, time };
    setSaved(data);
    localStorage.setItem("savedTime", JSON.stringify(data));
    alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
  };

  const handleBookRoom = (roomName: string) => {
    if (!date || !time) {
      alert("กรุณาเลือกวันที่และเวลา ก่อนจองห้อง");
      return;
    }
    router.push(`/booking?room=${roomName}&date=${date}&time=${time}`);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      setUserName(currentUser.name);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-sky-100">
      {/* Header */}
      <header className="flex items-center justify-between p-5 bg-gradient-to-r from-sky-500 to-blue-500 shadow-md text-white">
        <h1 className="text-2xl font-semibold tracking-tight">Library</h1>
        <h2 className="text-right text-sm">
          {userName ? `${userName}` : "ผู้ใช้งานทั่วไป"}
        </h2>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Form */}
        <form
          onSubmit={handleSave}
          className="p-8 space-y-6 w-1/3 bg-white/90 shadow-md border-r border-sky-100 backdrop-blur-sm"
        >
          <h2 className="text-xl font-semibold text-sky-700 mb-4">
            บันทึกเวลา
          </h2>

          <div className="flex flex-col">
            <label htmlFor="date" className="mb-2 font-medium text-gray-700">
              เลือกวันที่:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="time" className="mb-2 font-medium text-gray-700">
              เลือกเวลา:
            </label>
            <input
              type="number"
              step="0.01"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onBlur={handleBlur}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 text-white py-2 rounded-md font-semibold hover:scale-[1.02] transition-all shadow-sm hover:shadow-md"
          >
            บันทึก
          </button>

          {saved && (
            <div className="mt-4 p-4 bg-sky-50 border-l-4 border-sky-400 rounded-md text-gray-700">
              <p>
                วันที่บันทึก: <strong>{saved.date}</strong>
              </p>
              <p>
                เวลา: <strong>{saved.time}</strong>
              </p>
            </div>
          )}
        </form>

        {/* ห้องประชุม A */}
        <main className="flex-1 p-10 bg-transparent">
          <div className="bg-white/90 rounded-2xl shadow-md border border-sky-100 p-6">
            <h2 className="text-lg font-semibold text-sky-800 mb-4">
              ห้องประชุม A
            </h2>
            <div className="rounded-xl overflow-hidden mb-6 border border-sky-100">
              <img
                src="https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png"
                alt="Room A"
                className="w-full h-64 object-cover"
              />
            </div>
            <button
              onClick={() => handleBookRoom("ห้องประชุม A")}
              className="bg-gradient-to-r from-emerald-400 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:scale-[1.03] transition-transform shadow-sm hover:shadow-md"
            >
              จองห้อง A
            </button>
          </div>
        </main>

        {/* ห้องประชุม B */}
        <main className="flex-1 p-10 bg-transparent">
          <div className="bg-white/90 rounded-2xl shadow-md border border-sky-100 p-6">
            <h2 className="text-lg font-semibold text-sky-800 mb-4">
              ห้องประชุม B
            </h2>
            <div className="rounded-xl overflow-hidden mb-6 border border-sky-100">
              <img
                src="https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png"
                alt="Room B"
                className="w-full h-64 object-cover"
              />
            </div>
            <button
              onClick={() => handleBookRoom("ห้องประชุม B")}
              className="bg-gradient-to-r from-emerald-400 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:scale-[1.03] transition-transform shadow-sm hover:shadow-md"
            >
              จองห้อง B
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
