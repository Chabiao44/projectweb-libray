"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin"; // เพิ่ม role
  createdAt?: string; // เพิ่มวันที่สมัคร
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const savedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(savedUsers);
  }, []);

  const handleDeleteUser = (email: string) => {
    const confirmed = confirm(`คุณแน่ใจว่าต้องการลบผู้ใช้ ${email} ?`);

    if (confirmed) {
      const newUsers = users.filter((u) => u.email !== email);
      setUsers(newUsers);
      localStorage.setItem("users", JSON.stringify(newUsers));
      alert("ลบผู้ใช้เรียบร้อยแล้ว");
    }
  };

  const toggleRole = (email: string) => {
    const updatedUsers = users.map((u) =>
      u.email === email
        ? { ...u, role: u.role === "admin" ? "user" : "admin" }
        : u
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between shadow-md bg-gradient-to-r to-blue-600 p-5 text-white">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <Link
          href="/home"
          className="bg-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-blue-600"
        >
          กลับหน้าหลัก
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 p-10">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-blue-600 mb-6">จัดการผู้ใช้</h2>

          {users.length === 0 ? (
            <p className="text-gray-600">ยังไม่มีผู้ใช้ในระบบ</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ชื่อ</th>
                  <th className="border border-gray-300 px-4 py-2">อีเมล</th>
                  <th className="border border-gray-300 px-4 py-2">Role</th>
                  <th className="border border-gray-300 px-4 py-2">วันที่สมัคร</th>
                  <th className="border border-gray-300 px-4 py-2">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.role === "admin"
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("th-TH")
                        : "-"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 space-x-2">
                      <button
                        onClick={() => toggleRole(user.email)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        เปลี่ยน Role
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.email)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 text-center p-4 shadow-inner">
        <p className="text-gray-500">© 2024 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}