"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  createdAt?: string;
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
      u.email === email ? { ...u, role: u.role === "admin" ? "user" : "admin" } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-5 bg-white border-b">
        <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
        <Link
          href="/home"
          className="text-sm text-blue-600 hover:underline"
        >
          กลับหน้าหลัก
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">จัดการผู้ใช้</h2>

          {users.length === 0 ? (
            <p className="text-gray-500 text-sm">ยังไม่มีผู้ใช้ในระบบ</p>
          ) : (
            <table className="w-full text-left text-sm border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-600">
                  <th>ชื่อ</th>
                  <th>อีเมล</th>
                  <th>Role</th>
                  <th>วันที่สมัคร</th>
                  <th>การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-3 py-2">{user.name}</td>
                    <td className="px-3 py-2">{user.email}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("th-TH")
                        : "-"}
                    </td>
                    <td className="px-3 py-2 flex gap-2">
                      <button
                        onClick={() => toggleRole(user.email)}
                        className="text-yellow-600 text-xs px-2 py-1 rounded hover:bg-yellow-50"
                      >
                        เปลี่ยน Role
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.email)}
                        className="text-red-600 text-xs px-2 py-1 rounded hover:bg-red-50"
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
      <footer className="text-center p-4 text-gray-400 text-xs border-t">
        © 2024 My App. All rights reserved.
      </footer>
    </div>
  );
}
