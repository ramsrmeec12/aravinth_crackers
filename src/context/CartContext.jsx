// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Load cart from Firestore
  useEffect(() => {
    if (!user) return; // No user = no Firestore call

    const loadCart = async () => {
      try {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCart(cartSnap.data().items || []);
        }
      } catch (error) {
        console.error("Error loading cart:", error.message);
      }
    };

    loadCart();
  }, [user]);

  // Save cart to Firestore whenever it changes
  useEffect(() => {
    if (!user) return;
    if (cart.length === 0) return; // Skip saving empty cart

    const saveCart = async () => {
      try {
        await setDoc(
          doc(db, "carts", user.uid),
          { items: cart },
          { merge: true }
        );
      } catch (error) {
        console.error("Error saving cart:", error.message);
      }
    };

    saveCart();
  }, [cart, user]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Update quantity of an item
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  // Remove an item from cart
  const removeFromCart = async (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));

    if (user) {
      try {
        const updatedCart = cart.filter((item) => item.id !== id);
        await updateDoc(doc(db, "carts", user.uid), { items: updatedCart });
      } catch (error) {
        console.error("Error removing item from Firestore:", error.message);
      }
    }
  };

  // Clear entire cart (Firestore + local state)
  const clearCart = async () => {
    if (user) {
      try {
        await updateDoc(doc(db, "carts", user.uid), { items: [] });
      } catch (error) {
        console.error("Error clearing cart from Firestore:", error.message);
      }
    }
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.reduce((acc, item) => acc + item.qty, 0),
        addToCart,
        updateQty,
        removeFromCart, // ✅ Added here
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
