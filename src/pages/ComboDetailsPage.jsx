import React from "react";
import { useParams } from "react-router-dom";
import { combosWithProducts } from "../combosData";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function ComboDetailsPage() {
  const { id } = useParams();
  const combo = combosWithProducts.find((c) => c.comboId === id);
  const { addToCart, cart } = useCart();

  if (!combo) return <p className="text-center py-10">Combo not found.</p>;

  const isInCart = cart.some((item) => item.id === combo.comboId);

  const handleAddToCart = () => {
    if (isInCart) return;
    addToCart({
      id: combo.comboId,
      name: combo.name,
      image: combo.coverImage,
      originalPrice: combo.originalPrice,
      discountedPrice: combo.discountedPrice,
      discountPercent: combo.discountPercent,
      qty: 1,
      type: "combo",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10">
      {/* Left: Image */}
      <motion.div
        className="rounded-2xl overflow-hidden shadow-lg"
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={combo.coverImage}
          alt={combo.name}
          className="w-full h-[450px] object-contain bg-gray-50"
        />
      </motion.div>

      {/* Right: Details */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{combo.name}</h1>

        {/* Discount Badge */}
        <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
          {combo.discountPercent}% OFF
        </span>

        {/* Prices */}
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-gray-500 line-through text-lg">
            ₹{combo.originalPrice}
          </span>
          <span className="text-green-600 font-bold text-2xl">
            ₹{combo.discountedPrice}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          You save ₹{combo.originalPrice - combo.discountedPrice} on this combo!
        </p>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`px-6 py-3 rounded-xl font-semibold shadow-md transition ${
            isInCart
              ? "bg-green-500 cursor-not-allowed text-white"
              : "bg-yellow-400 hover:bg-yellow-500 text-white"
          }`}
        >
          {isInCart ? "✅ Added to Cart" : "🛒 Add Combo to Cart"}
        </button>

        {/* Products */}
        <h2 className="text-xl font-semibold mt-10 mb-4">
          Products Included ({combo.productDetails.length})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {combo.productDetails.map((p) => (
            <motion.div
              key={p.id}
              className="border rounded-xl p-3 text-center bg-white shadow-sm hover:shadow-md transition"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-28 object-contain mb-2"
              />
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-gray-600">Qty: {p.qty}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
