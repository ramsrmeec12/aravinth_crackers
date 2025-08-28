import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ComboCard({ combo }) {
    const navigate = useNavigate();
    const { addToCart, cart } = useCart();

    // Treat combo as a cart item with unique ID prefixed with "combo-"
    const comboCartId = `combo-${combo.comboId}`;
    const isInCart = cart.some((item) => item.id === comboCartId);

    const handleAddCombo = (e) => {
        e.stopPropagation(); // Prevent navigating when clicking Add to Cart

        if (isInCart) return; // ✅ Prevent duplicate combo

        addToCart({
            id: comboCartId,
            name: combo.name,
            image: combo.coverImage,
            originalPrice: combo.originalPrice,
            discountedPrice: combo.discountedPrice,
            discountPercent: combo.discountPercent,
            qty: 1,
            type: "combo",
            products: combo.productDetails,
        });
    };


    return (
        <div
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200 cursor-pointer"
            onClick={() => navigate(`/combo/${combo.comboId}`)}
        >
            <div className="w-full mb-3">
                <img
                    src={combo.coverImage}
                    alt={combo.name}
                    className="w-full h-auto object-contain rounded bg-gray-100"
                />
            </div>


            <h2 className="text-lg font-bold mb-2">{combo.name}</h2>

            {/* Price */}
            <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500 line-through">
                    ₹{combo.originalPrice}
                </span>
                <span className="text-green-600 font-semibold">
                    ₹{combo.discountedPrice}
                </span>
                <span className="text-red-500 text-sm">
                    ({combo.discountPercent}% OFF)
                </span>
            </div>

            <button
                onClick={handleAddCombo}
                className={`mt-2 px-3 py-1 rounded text-sm font-semibold w-full ${isInCart
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-yellow-400 hover:bg-yellow-500"
                    }`}
            >
                {isInCart ? "Added to Cart" : "Add Combo to Cart"}
            </button>
        </div>
    );
}
