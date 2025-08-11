// FeaturedProducts.jsx
import React from "react";

const FeaturedProducts = () => {
  const products = [
    {
      image: require("../assets/catalogue-full-2021-8--500x500.webp"),
      name: "Kambi Mathappu",
      description: "Traditional sparklers",
    },
    {
      image: require("../assets/image.png"),
      name: "Lakshmi Vedi",
      description: "Classic firecrackers",
    },
    {
      image: require("../assets/image.png"),
      name: "Flower Pots",
      description: "Colorful ground spinners",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto mt-10 px-4">
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
              className="w-full h-48 object-cover sm:h-60"
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
