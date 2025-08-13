// src/pages/admin/OrdersAdminPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";
import AdminOrderCard from "./AdminOrderCard";
import { CSVLink } from "react-csv";

const STATUS_OPTIONS = ["All", "Pending", "Packed", "Shipped", "Delivered", "Cancelled"];

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [qText, setQText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("createdAt", "desc"));

    let firstLoad = true; // prevent notifications on initial page load

    const unsub = onSnapshot(q, (snap) => {
      const newOrders = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      if (!firstLoad && newOrders.length > orders.length) {
        const latestOrder = newOrders[0];
        // Play a sound or show browser notification
        if (Notification.permission === "granted") {
          new Notification("New Order Received", {
            body: `${latestOrder.name} placed an order.`,
          });
        }
      }

      setOrders(newOrders);
      firstLoad = false;
    }, (err) => console.error("orders listen err", err));

    return () => unsub();
  }, [orders]);

  useEffect(() => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}, []);


  const filtered = useMemo(() => {
    return orders.filter(order => {
      if (statusFilter !== "All" && order.status !== statusFilter) return false;
      if (qText && !(
        (order.userId || "").toLowerCase().includes(qText.toLowerCase()) ||
        (order.name || "").toLowerCase().includes(qText.toLowerCase()) ||
        (order.phone || "").toLowerCase().includes(qText.toLowerCase())
      )) return false;
      if (dateFrom) {
        const from = new Date(dateFrom);
        if (!order.createdAt) return false;
        const ordDate = order.createdAt.toDate ? order.createdAt.toDate() : new Date(order.createdAt);
        if (ordDate < from) return false;
      }
      if (dateTo) {
        const to = new Date(dateTo);
        if (!order.createdAt) return false;
        const ordDate = order.createdAt.toDate ? order.createdAt.toDate() : new Date(order.createdAt);
        if (ordDate > new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59)) return false;
      }
      return true;
    });
  }, [orders, statusFilter, qText, dateFrom, dateTo]);

  const csvData = filtered.map(o => ({
    id: o.id,
    userId: o.userId,
    name: o.name,
    phone: o.phone,
    address: o.address,
    status: o.status || "Pending",
    createdAt: o.createdAt?.toDate ? o.createdAt.toDate().toISOString() : (o.createdAt || "")
  }));

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 md:items-end justify-between">
        <div className="flex gap-3">
          <input value={qText} onChange={(e) => setQText(e.target.value)} placeholder="search user / name / phone" className="border p-2 rounded" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border p-2 rounded">
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border p-2 rounded" />
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border p-2 rounded" />
        </div>

        <div className="flex gap-2 items-center">
          <CSVLink data={csvData} filename={`orders_export_${Date.now()}.csv`} className="px-3 py-2 bg-gray-200 rounded">Export CSV</CSVLink>
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.length === 0 ? (
          <div className="text-gray-600">No orders found.</div>
        ) : (
          filtered.map(order => <AdminOrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}
