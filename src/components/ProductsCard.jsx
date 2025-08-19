import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth context

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCart();
  const { user } = useAuth(); // ✅ Get logged in user
  const isInCart = cart.some((item) => item.id === product.id);

  // Check if admin (replace with your actual admin UID or role logic)
  const isAdmin = user && user.email === "ram123@gmail.co";

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full p-2 object-cover sm:h-60"
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-base">{product.name}</h3>
          {isAdmin && (
            <span className="text-xs text-gray-500">ID: {product.id}</span>
          )}
        </div>
        <p className="text-sm text-gray-500">{product.category}</p>

        {/* Price Section */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-gray-400 line-through text-sm">
            ₹{product.originalPrice}
          </span>
          <span className="text-lg font-semibold text-green-600">
            ₹{product.discountedPrice}
          </span>
          <span className="text-red-500 text-xs font-semibold">
            ({product.discountPercent}% OFF)
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className={`mt-3 px-4 py-2 text-white rounded-lg text-sm ${
            isInCart
              ? "bg-green-500 hover:bg-green-600"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
