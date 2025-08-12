// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(null); // null = loading

  React.useEffect(() => {
    let mounted = true;
    const check = async () => {
      if (!user) {
        if (mounted) setIsAdmin(false);
        return;
      }
      try {
        const docRef = doc(db, "admins", user.uid);
        const snap = await getDoc(docRef);
        if (mounted) setIsAdmin(snap.exists());
      } catch (err) {
        console.error("admin check error", err);
        if (mounted) setIsAdmin(false);
      }
    };
    check();
    return () => (mounted = false);
  }, [user]);

  if (isAdmin === null) return <div className="p-8">Checking admin access…</div>;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}
