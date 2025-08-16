import React, { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query, orderBy, doc, setDoc } from "firebase/firestore";
import { db, messaging } from "../../firebase";
import AdminLayout from "./AdminLayout";
import AdminOrderCard from "./AdminOrderCard";
import { getToken, onMessage } from "firebase/messaging";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const prevOrdersRef = useRef([]);
  const notificationSound = useRef(new Audio("/notification.mp3")); // in public/

  const { user } = useAuth();

  // 🔹 Register FCM + save admin token
  useEffect(() => {
    if (!user) return;

    const registerFCM = async () => {
      try {
        // Ask for notification permission
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("Notification permission not granted");
          return;
        }

        // Get FCM token
        const token = await getToken(messaging, {
          vapidKey: "BEGlN7Mly2LNxTUvDGH8UT2ZBzc248pYbJP8w4F_kEBOvhp2Ygtl0YBLoMM5v6mDNcYgXFLjwLWiq1ztgLErFSs",
        });

        if (token) {
          console.log("✅ Admin FCM Token:", token);

          // Save admin’s device token in Firestore
          await setDoc(
            doc(db, "adminTokens", user.uid),
            {
              token,
              updatedAt: new Date(),
            },
            { merge: true }
          );
        }
      } catch (err) {
        console.error("❌ FCM Error:", err);
      }
    };

    registerFCM();

    // 🔹 Foreground message handler
    const unsubscribeOnMessage = onMessage(messaging, (payload) => {
      console.log("📩 Foreground notification:", payload);
      notificationSound.current.play().catch(() => {});

      new Notification(payload.notification?.title || "New Order", {
        body: payload.notification?.body || "You received a new order.",
        icon: "/logo.png",
      });
    });

    return () => unsubscribeOnMessage();
  }, [user]);

  // 🔹 Orders real-time listener
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Detect new order (local check)
      if (
        prevOrdersRef.current.length &&
        fetchedOrders.length > prevOrdersRef.current.length
      ) {
        handleNewOrderNotification();
      }

      prevOrdersRef.current = fetchedOrders;
      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, []);

  const handleNewOrderNotification = () => {
    notificationSound.current.play().catch(() => {});

    if (Notification.permission === "granted") {
      new Notification("🛒 New Order Received!", {
        body: "A new customer order has been placed.",
        icon: "/logo.png",
      });
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
