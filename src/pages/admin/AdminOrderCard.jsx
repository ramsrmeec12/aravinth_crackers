import React, { useState } from "react";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import InvoiceGenerator from "../../components/InvoiceGenerator";

const STATUS_FLOW = ["Pending", "Packed", "Shipped", "Delivered"];

export default function AdminOrderCard({ order }) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(order.status || "Pending");
    const [note, setNote] = useState(order.note || "");

    const changeStatus = async (newStatus) => {
        try {
            await updateDoc(doc(db, "orders", order.id), {
                status: newStatus,
                updatedAt: new Date(),
                note,
            });
            setStatus(newStatus);
        } catch (err) {
            console.error("status update err", err);
        }
    };

    const cancelOrder = async () => {
        if (!confirm("Cancel this order?")) return;
        try {
            await updateDoc(doc(db, "orders", order.id), {
                status: "Cancelled",
                updatedAt: new Date(),
                note: note || "Cancelled by admin",
            });
            setStatus("Cancelled");
        } catch (err) {
            console.error("cancel err", err);
        }
    };

    const deleteOrder = async () => {
        if (!confirm("Delete this order permanently?")) return;
        try {
            await deleteDoc(doc(db, "orders", order.id));
        } catch (err) {
            console.error("delete order err", err);
        }
    };

    return (
        <div className="bg-white border rounded p-4 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-sm text-gray-500">
                        #{order.id} • {order.userId}
                    </div>
                    <div className="font-medium text-lg">{order.name}</div>
                    <div className="text-sm text-gray-600">
                        {order.phone} • {order.address}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div
                        className={`px-3 py-1 rounded text-sm ${status === "Pending" ? "bg-yellow-100" : "bg-gray-100"
                            }`}
                    >
                        {status}
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                        Details
                    </button>
                </div>
            </div>

            {/* actions */}
            <div className="mt-3 flex gap-2 flex-wrap">
                {STATUS_FLOW.map((s) => (
                    <button
                        key={s}
                        onClick={() => changeStatus(s)}
                        className={`px-3 py-1 rounded ${status === s ? "bg-green-500 text-white" : "bg-gray-100"
                            }`}
                    >
                        {s}
                    </button>
                ))}
                <button
                    onClick={cancelOrder}
                    className="px-3 py-1 rounded bg-red-100 text-red-700"
                >
                    Cancel
                </button>
                <button
                    onClick={deleteOrder}
                    className="px-3 py-1 rounded bg-gray-200"
                >
                    Delete
                </button>

                {/* Add Invoice Download Button */}
                <InvoiceGenerator
                    order={order}
                    shopInfo={{
                        name: "Aravinth Crackers Store",
                        address: "123 Main Street, Chennai, India - 600001",
                        contact: "Phone: +91 9876543210 | Email: info@aravinthcrackers.com",
                    }}
                />
            </div>

            {/* modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded w-full max-w-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Order Details</h3>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-500"
                            >
                                Close
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p>
                                    <strong>Name:</strong> {order.name}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {order.phone}
                                </p>
                                <p>
                                    <strong>Address:</strong> {order.address}
                                </p>
                                <p>
                                    <strong>Order id:</strong> {order.id}
                                </p>
                                <p>
                                    <strong>Status:</strong> {order.status}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium">Items</h4>
                                <ul className="list-disc ml-5">
                                    {(order.items || []).map((it) => (
                                        <li key={it.id || `${it.name}-${Math.random()}`}>
                                            {it.name} × {it.qty}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm">Note / Admin message</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => {
                                        changeStatus(status);
                                    }}
                                    className="px-3 py-1 bg-green-500 text-white rounded"
                                >
                                    Save Note / Update
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="px-3 py-1 bg-gray-200 rounded"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
