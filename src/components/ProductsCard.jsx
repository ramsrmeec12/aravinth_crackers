import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCart();
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover sm:h-60"
      />
      <div className="p-4">
        <h3 className="font-medium text-base">{product.name}</h3>
        <p className="text-sm text-gray-500">
          {product.category} • {product.subcategory}
        </p>
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
