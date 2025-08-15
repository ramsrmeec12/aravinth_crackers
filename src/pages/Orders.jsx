// src/pages/Orders.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg shadow-sm p-5 bg-white"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status || "Pending"
                  )}`}
                >
                  {order.status || "Pending"}
                </span>
                

              </div>

              {/* Customer Info */}
              <div className="mb-2">
                <p className="font-semibold">{order.name}</p>
                <p className="text-sm text-gray-600">{order.phone}</p>
                <p className="text-sm text-gray-600">{order.address}</p>
                <p className="text-sm text-gray-600">{order.pincode}</p>
              </div>

              {/* Date */}
              <p className="text-xs text-gray-500 mb-3">
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleString()
                  : ""}
              </p>

              {/* Items */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-medium text-sm mb-2">Items:</h3>
                <ul className="text-sm space-y-1">
                  {(order.items || []).map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>× {item.qty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total */}
              <div className="mt-3 text-right font-semibold text-gray-800">
                Total: ₹
                {order.items?.reduce(
                  (sum, item) => sum + item.discountedPrice * item.qty,
                  0
                )}
              </div>
              {/* Tracking Info if shipped */}
                {order.status === "Shipped" && (
                  <div className="mt-3 bg-blue-50 p-3 rounded text-sm">
                    <h1 className="text-2xl">Shipping details :</h1><br />
                    <p><strong>Courier:</strong> {order.courierName || "N/A"}</p>
                    <p><strong>Tracking ID:</strong> {order.trackingId || "N/A"}</p>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
