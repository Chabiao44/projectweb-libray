"use client";

export const dynamic = "force-dynamic"; // บังคับ render แบบ client-side

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link href="/admin/dashboard" className="text-gray-700 hover:text-blue-600">📊 Dashboard</Link>
          <Link href="/admin/users" className="text-gray-700 hover:text-blue-600">👤 Users</Link>
          <Link href="/admin/products" className="text-gray-700 hover:text-blue-600">📦 Products</Link>
          <Link href="/admin/orders" className="text-gray-700 hover:text-blue-600">🧾 Orders</Link>
          <Link href="/admin/settings" className="text-gray-700 hover:text-blue-600">⚙️ Settings</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Link href="/admin/login" className="inline-block">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Logout
          </span>
          </Link>

        </header>

        {/* Content */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">👤 Total Users: 120</div>
          <div className="bg-white p-6 rounded-lg shadow">📦 Products: 45</div>
          <div className="bg-white p-6 rounded-lg shadow">🧾 Orders: 230</div>
        </section>
      </main>
    </div>
  );
}
