// FeaturedProducts.jsx
import React from "react";

const FeaturedProducts = () => {
  const products = [
    {
      image: require("../assets/products/p125.jpg"),
      name: "2025 New Varieties",
      description: "Traditional sparklers",
    },
    {
      image: require("../assets/products/p119.jpg"),
      name: "Gift Boxed",
      description: "Classic firecrackers",
    },
    {
      image: require("../assets/products/p33.webp"),
      name: "Kids Special",
      description: "Colorful ground spinners",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-lg font-semibold mb-4 text-center sm:text-left">
        Featured Products
      </h2>

      {/* Mobile: horizontal scroll, Desktop: grid */}
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 sm:gap-6 gap-4 pb-2 scrollbar-hide">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 sm:w-auto bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover sm:h-60 p-4 border rounded-xl"
            />
            <div className="p-4">
              <h3 className="font-medium text-base">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
