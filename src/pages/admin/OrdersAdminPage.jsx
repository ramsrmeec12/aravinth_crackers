// src/pages/admin/OrdersAdminPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { CSVLink } from "react-csv";

const STATUS_OPTIONS = [
  "Pending",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [qText, setQText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("createdAt", "desc"));

    let firstLoad = true;
    const unsub = onSnapshot(q, (snap) => {
      const newOrders = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      if (!firstLoad && newOrders.length > orders.length) {
        const latestOrder = newOrders[0];
        if (Notification.permission === "granted") {
          new Notification("New Order Received", {
            body: `${latestOrder.name} placed an order.`,
          });
        }
      }

      setOrders(newOrders);
      firstLoad = false;
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      if (statusFilter !== "All" && order.status !== statusFilter) return false;
      if (
        qText &&
        !(
          (order.userId || "").toLowerCase().includes(qText.toLowerCase()) ||
          (order.name || "").toLowerCase().includes(qText.toLowerCase()) ||
          (order.phone || "").toLowerCase().includes(qText.toLowerCase()) ||
          (order.email || "").toLowerCase().includes(qText.toLowerCase()) ||
          (order.pincode || "").toString().includes(qText)
        )
      )
        return false;
      if (dateFrom) {
        const from = new Date(dateFrom);
        if (!order.createdAt) return false;
        const ordDate = order.createdAt.toDate
          ? order.createdAt.toDate()
          : new Date(order.createdAt);
        if (ordDate < from) return false;
      }
      if (dateTo) {
        const to = new Date(dateTo);
        if (!order.createdAt) return false;
        const ordDate = order.createdAt.toDate
          ? order.createdAt.toDate()
          : new Date(order.createdAt);
        if (
          ordDate >
          new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59)
        )
          return false;
      }
      return true;
    });
  }, [orders, statusFilter, qText, dateFrom, dateTo]);

  const csvData = filtered.map((o) => ({
    id: o.id,
    userId: o.userId,
    name: o.name,
    phone: o.phone,
    email: o.email || "",
    address: o.address,
    pincode: o.pincode || "",
    courierName: o.courierName || "",
    trackingId: o.trackingId || "",
    status: o.status || "Pending",
    createdAt: o.createdAt?.toDate
      ? o.createdAt.toDate().toISOString()
      : o.createdAt || "",
  }));

  const handleStatusChange = async (orderId, newStatus) => {
    let updateData = { status: newStatus };

    if (newStatus === "Shipped") {
      const courierName = prompt("Enter Courier Name:");
      const trackingId = prompt("Enter Tracking ID:");
      updateData.courierName = courierName;
      updateData.trackingId = trackingId;
    }

    try {
      await updateDoc(doc(db, "orders", orderId), updateData);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-end justify-between">
        <div className="flex flex-wrap gap-3">
          <input
            value={qText}
            onChange={(e) => setQText(e.target.value)}
            placeholder="Search user / name / phone / email / pincode"
            className="border p-2 rounded"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="All">All</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <CSVLink
          data={csvData}
          filename={`orders_export_${Date.now()}.csv`}
          className="px-3 py-2 bg-gray-200 rounded"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Orders List */}
      <div className="grid gap-3">
        {filtered.length === 0 ? (
          <div className="text-gray-600">No orders found.</div>
        ) : (
          filtered.map((order) => {
            const total = (order.items || []).reduce(
              (sum, item) =>
                sum + (item.discountedPrice || 0) * (item.qty || 1),
              0
            );

            return (
              <div
                key={order.id}
                className="border p-4 rounded shadow bg-white space-y-2"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <select
                    value={order.status || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="border rounded p-1"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <p>
                  <strong>Name:</strong> {order.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.email || "—"}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Pincode:</strong> {order.pincode || "—"}
                </p>

                {order.status === "Shipped" && (
                  <div className="bg-purple-50 p-2 rounded">
                    <p>
                      <strong>Courier:</strong> {order.courierName || "—"}
                    </p>
                    <p>
                      <strong>Tracking ID:</strong> {order.trackingId || "—"}
                    </p>
                  </div>
                )}

                <p className="text-gray-500 text-sm">
                  {order.createdAt?.toDate
                    ? order.createdAt.toDate().toLocaleString()
                    : ""}
                </p>
                <ul className="list-disc ml-5">
                  {(order.items || []).map((item) => (
                    <li key={item.id}>
                      {item.name} × {item.qty} × ({item.id})
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-semibold text-right">
                  Total: ₹{total.toLocaleString()}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
