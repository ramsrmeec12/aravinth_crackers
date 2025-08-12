import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const CartPage = () => {
    const { user } = useAuth();
    const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");



    const placeOrder = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (!name || !phone || !address) {
            setError("Please fill all the details");
            return;
        }

        try {
            await addDoc(collection(db, "orders"), {
                userId: user.uid,
                items: cart, // ✅ cart from context
                name,        // ✅ from state
                phone,       // ✅ from state
                address,     // ✅ add address too
                createdAt: serverTimestamp()
            });



            clearCart();
            navigate("/orders");
        } catch (err) {
            console.error("Error placing order:", err);
            setError("Failed to place order. Please try again.");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between mb-4 border-b pb-2"
                        >
                            <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {item.category} • {item.subcategory}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className="px-2"
                                    onClick={() =>
                                        updateQuantity(item.id, Math.max(item.qty - 1, 1))
                                    }
                                >
                                    -
                                </button>
                                <span>{item.qty}</span>
                                <button
                                    className="px-2"
                                    onClick={() => updateQuantity(item.id, item.qty + 1)}
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
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg"
                    >
                        Place Order
                    </button>
                </>
            )}
        </div>
    );
};

export default CartPage;
