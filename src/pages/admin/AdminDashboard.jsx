import React, { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import AdminLayout from "./AdminLayout";
import AdminOrderCard from "./AdminOrderCard";
import { messaging } from "../../firebase";
import { getToken, onMessage } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";


export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const prevOrdersRef = useRef([]);
  
  // Notification sound
  const notificationSound = useRef(new Audio("/notification.mp3")); // place notification.mp3 in public/

  const { user } = useAuth();

useEffect(() => {
  if (!user) return;

  const registerFCM = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey: "BEGlN7Mly2LNxTUvDGH8UT2ZBzc248pYbJP8w4F_kEBOvhp2Ygtl0YBLoMM5v6mDNcYgXFLjwLWiq1ztgLErFSs", // from Firebase Console
      });

      if (token) {
        console.log("FCM Token:", token);

        // Save admin token in Firestore for Cloud Function to use
        await setDoc(doc(db, "adminTokens", user.uid), {
          token,
          updatedAt: new Date(),
        });
      }
    } catch (err) {
      console.error("FCM Error:", err);
    }
  };

  registerFCM();

  // Foreground message listener
  onMessage(messaging, (payload) => {
    console.log("Foreground notification:", payload);
    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: "/logo.png",
    });
  });
}, [user]);

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
