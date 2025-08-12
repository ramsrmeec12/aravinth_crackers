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

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 mb-3 rounded shadow">
            <p className="font-semibold">Order ID: {order.id}</p>
            <p>Name: {order.name}</p>
            <p>Phone: {order.phone}</p>
            <p>Address: {order.address}</p>
            <p className="text-gray-500 text-sm">
              {order.createdAt?.toDate
                ? order.createdAt.toDate().toLocaleString()
                : ""}
            </p>
            <ul className="list-disc ml-5 mt-2">
              {(order.items || []).map((item) => (
                <li key={item.id}>
                  {item.name} × {item.qty}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
