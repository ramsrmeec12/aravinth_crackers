// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
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
          onClick={() => onAddToCart(product.id)}
          className="mt-3 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
