import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const CartPage = () => {
  const { user } = useAuth();
  const { cart, clearCart, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // ✅ new
  const [error, setError] = useState("");

  const placeOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!name || !phone || !address || !pincode || !email) {
      setError("Please fill all the details including Email & Pincode");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cart,
        name,
        phone,
        email, // ✅ store email
        address,
        pincode,
        totalAmount: cart.reduce(
          (sum, item) => sum + (item.price || 0) * item.qty,
          0
        ),
        createdAt: serverTimestamp(),
      });

      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place order. Please try again.");
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.originalPrice || 0) * item.qty,
    0
  );

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
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-gray-800 font-semibold">
                    ₹{item.originalPrice} x {item.qty} = ₹
                    {(item.originalPrice || 0) * item.qty}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="px-2"
                  onClick={() => updateQty(item.id, Math.max(item.qty - 1, 1))}
                >
                  -
                </button>
                <span className="mx-2">{item.qty}</span>
                <button
                  className="px-2"
                  onClick={() => updateQty(item.id, item.qty + 1)}
                >
                  +
                </button>
                <button
                  className="ml-4 text-red-500"
                  onClick={() => removeFromCart(item.id)}
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
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full p-2 mb-2"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded w-full p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="border rounded w-full p-2 mb-2"
            />
            <textarea
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded w-full p-2 mb-2"
            />
          </div>

          <button
            onClick={placeOrder}
            className="mt-4 w-full px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
