import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productsData from "../data";
import ProductCard from "../components/ProductsCard";
import ComboCard from "../components/ComboCard"; // ✅ Import ComboCard
import { combosWithProducts } from "../combosData"; // ✅ Import combos data

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const query = useQuery();
  const navigate = useNavigate();

  const categories = ["All", ...new Set(productsData.map((p) => p.category))];

  useEffect(() => {
    const search = query.get("search") || "";
    setSearchTerm(search);
    if (search) setSelectedCategory("All");
  }, [query]);

  const filteredProducts = productsData.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      (searchTerm === "" ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const groupedByCategory = categories
    .filter((cat) => cat !== "All")
    .map((cat) => ({
      category: cat,
      products: productsData.filter(
        (p) =>
          p.category === cat &&
          (searchTerm === "" ||
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    }))
    .filter((group) => group.products.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <button
          onClick={() => {
            setSelectedCategory("All");
            setSearchTerm("");
            navigate("/products");
          }}
          className={`px-4 py-2 rounded-lg border text-sm font-medium ${
            selectedCategory === "All"
              ? "bg-yellow-500 text-white border-yellow-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-100"
          }`}
        >
          All
        </button>
        <button
          onClick={() => navigate("/combos")}
          className="px-1.5 py-2 rounded-lg border text-sm font-medium"
        >
          Explore Combos
        </button>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSearchTerm("");
            navigate("/products");
          }}
          className="px-2 py-2 rounded-lg border text-sm bg-white text-gray-700 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          {categories
            .filter((cat) => cat !== "All")
            .map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
        </select>
      </div>

      {/* ✅ Horizontal Combos Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Popular Combos</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {combosWithProducts.map((combo) => (
            <div className="min-w-[220px]" key={combo.comboId}>
              <ComboCard combo={combo} />
            </div>
          ))}
        </div>
      </div>

      {/* All view */}
      {selectedCategory === "All" ? (
        groupedByCategory.map((group) => (
          <div key={group.category} className="mb-8 pl-4">
            <h2 className="text-xl font-bold mb-3">{group.category}</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {group.products.map((product) => (
                <div className="min-w-[200px] pl-4" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-full">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
