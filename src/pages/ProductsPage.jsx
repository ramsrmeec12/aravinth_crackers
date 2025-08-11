// src/pages/ProductsPage.jsx
import React, { useState } from "react";
import productsData from "../data";
import ProductCard from "../components/ProductsCard";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(productsData.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (productId) => {
    console.log("Added to cart:", productId);
    // You can later connect this with Firebase or local state
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Category Filter */}
      <div className="flex gap-3 overflow-x-auto mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm ${
              selectedCategory === cat
                ? "bg-yellow-500 text-white border-yellow-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
