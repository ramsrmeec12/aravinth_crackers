// src/pages/CartPage.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
  runTransaction,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import emailjs from "emailjs-com";

const CartPage = () => {
  const { user } = useAuth();
  const { cart, clearCart, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.discountedPrice || 0) * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!name || !phone || !address || !pincode || !email) {
      setError("Please fill all the details including Email & Pincode");
      return;
    }

    setLoading(true);

    try {
      // 🔹 Firestore transaction to generate incremental order number
      const counterRef = doc(db, "counters", "orderCounter");
      const newOrderNumber = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        let currentCount = 0;
        if (counterDoc.exists()) {
          currentCount = counterDoc.data().count || 0;
        }
        const updatedCount = currentCount + 1;
        transaction.set(counterRef, { count: updatedCount });
        return updatedCount;
      });

      const year = new Date().getFullYear();
      const formattedOrderId = `ORD-${year}-${String(newOrderNumber).padStart(
        4,
        "0"
      )}`;

      // 🔹 Save order with custom ID
      await setDoc(doc(db, "orders", formattedOrderId), {
        orderId: formattedOrderId,
        userId: user.uid,
        name,
        phone,
        email,
        address,
        pincode,
        items: cart,
        totalAmount: totalPrice,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      // 🔹 Send Email to Owner via EmailJS
      try {
        await emailjs.send(
          "service_abesg1t",
          "template_qo3uvyp", 
          {
            orderId: formattedOrderId,
            name,
            phone,
            email,
            address,
            pincode,
            totalAmount: totalPrice,
            items: cart.map((i) => `${i.name} × ${i.qty}`).join(", "),
          },
          "J9g8Sa8UDvFpJeS9m"
        );
        console.log("✅ Email sent to owner");
      } catch (emailErr) {
        console.error("❌ EmailJS Error:", emailErr);
      }

      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place order. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 border-b pb-2"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  {item.type !== "combo" && (
                    <p className="text-sm text-gray-500">{item.category}</p>
                  )}
                  <p className="text-gray-800 font-semibold">
                    ₹{item.discountedPrice} x {item.qty} = ₹
                    {(item.discountedPrice || 0) * item.qty}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="px-2"
                  onClick={() =>
                    updateQty(item.id, Math.max(item.qty - 1, 1))
                  }
                  disabled={loading}
                >
                  -
                </button>
                <span className="mx-2">{item.qty}</span>
                <button
                  className="px-2"
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  disabled={loading}
                >
                  +
                </button>
                <button
                  className="ml-4 text-red-500"
                  onClick={() => removeFromCart(item.id)}
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <div className="mt-4 text-lg font-bold text-right">
            Total: ₹{totalPrice}
          </div>

          {/* Order Form */}
          <div className="mt-6 border p-4 rounded bg-gray-50">
            <h2 className="font-semibold mb-2">Delivery Details</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full p-2 mb-2"
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full p-2 mb-2"
              disabled={loading}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded w-full p-2 mb-2"
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="border rounded w-full p-2 mb-2"
              disabled={loading}
            />
            <textarea
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded w-full p-2 mb-2"
              disabled={loading}
            />
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className={`mt-4 w-full px-4 py-2 font-semibold rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            {loading ? "Placing your order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
