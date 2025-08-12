// src/pages/admin/AdminLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-xl font-bold">Admin Dashboard</Link>
          <Link to="/admin/orders" className="text-sm text-gray-600">Orders</Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-700">{user?.email}</div>
          <button onClick={logout} className="px-3 py-1 bg-yellow-400 rounded">Logout</button>
        </div>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
