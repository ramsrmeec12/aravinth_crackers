import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import productsData from "../data";
import ProductCard from "../components/ProductsCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const query = useQuery();

  const categories = ["All", ...new Set(productsData.map((p) => p.category))];

  useEffect(() => {
    const search = query.get("search") || "";
    setSearchTerm(search);
    // Reset category to 'All' when searching
    if (search) {
      setSelectedCategory("All");
    }
  }, [query]);

  // Filter products by category first
  let filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  // Further filter by search term (if any)
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleAddToCart = (productId) => {
    console.log("Added to cart:", productId);
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="text-center col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
