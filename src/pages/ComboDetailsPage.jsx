import React from "react";
import { useParams } from "react-router-dom";
import { combosWithProducts } from "../combosData";
import { useCart } from "../context/CartContext";

export default function ComboDetailsPage() {
    const { id } = useParams();
    const combo = combosWithProducts.find((c) => c.comboId === id);
    const { addToCart, cart } = useCart();

    if (!combo) return <p className="text-center py-10">Combo not found.</p>;

    // Check if combo is already in cart
    const isInCart = cart.some((item) => item.id === combo.comboId);

    const handleAddToCart = () => {
        if (isInCart) return; // ✅ Prevent duplicate combo

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
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">{combo.name}</h1>

            {/* Cover Image */}
            <img
                src={combo.coverImage}
                alt={combo.name}
                className="w-full h-64 object-cover rounded mb-6"
            />

            {/* Prices */}
            <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-500 line-through text-lg">
                    ₹{combo.originalPrice}
                </span>
                <span className="text-green-600 font-bold text-xl">
                    ₹{combo.discountedPrice}
                </span>
                <span className="text-red-500 text-lg">
                    ({combo.discountPercent}% OFF)
                </span>
            </div>

            {/* Products in combo */}
            <h2 className="text-xl font-semibold mb-2">Products Included:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                {combo.productDetails.map((p) => (
                    <div key={p.id} className="border rounded p-2 text-center">
                        <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-32 object-cover rounded mb-2"
                        />
                        <p className="text-sm font-medium">{p.name}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`px-4 py-2 rounded font-semibold ${isInCart
                        ? "bg-green-500 cursor-not-allowed text-white"
                        : "bg-yellow-400 hover:bg-yellow-500 text-white"
                    }`}
            >
                {isInCart ? "Added to Cart" : "Add Combo to Cart"}
            </button>
        </div>
    );
}
