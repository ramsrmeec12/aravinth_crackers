import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, cart } = useCart();
  const isInCart = cart.some((item) => item.id === product.id);

  // Merge main image + other images into one array
  const allImages = [product.image, ...(product.otherImages || [])];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product) return <div className="p-6">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Image Section */}
        <div className="flex flex-col items-center">
          {/* Main Image */}
          <img
            src={allImages[currentIndex]}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg transition duration-300 ease-in-out"
          />

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {allImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 object-cover rounded-lg border cursor-pointer transition-all duration-200 ${
                  currentIndex === index ? "border-yellow-500 scale-105" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Dots */}
          <div className="flex gap-2 mt-3">
            {allImages.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-200 ${
                  currentIndex === index ? "bg-yellow-500" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mb-4">
            {product.category} • {product.subcategory}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
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

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className={`mt-5 px-6 py-2 text-white rounded-lg ${
              isInCart
                ? "bg-green-500 hover:bg-green-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {isInCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
