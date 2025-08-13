import React, { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import AdminLayout from "./AdminLayout";
import AdminOrderCard from "./AdminOrderCard";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const prevOrdersRef = useRef([]);
  
  // Notification sound
  const notificationSound = useRef(new Audio("/notification.mp3")); // place notification.mp3 in public/

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Check for new order
      if (prevOrdersRef.current.length && fetchedOrders.length > prevOrdersRef.current.length) {
        handleNewOrderNotification();
      }

      prevOrdersRef.current = fetchedOrders;
      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, []);

  const handleNewOrderNotification = () => {
    // Play sound
    notificationSound.current.play().catch(err => console.log("Sound error:", err));

    // Browser notification
    if (Notification.permission === "granted") {
      new Notification("🛒 New Order Received!", {
        body: "A new customer order has been placed.",
        icon: "/logo.png", // your site logo in public folder
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">📦 Orders Dashboard</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <AdminOrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
