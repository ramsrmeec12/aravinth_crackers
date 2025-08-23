// combosData.js
import productsData from "./data"; // your single products data
import cover5000 from './assets/products/p10.jpg'
import cover2000 from './assets/products/p10.jpg'
const combos = [
  {
    comboId: "c1",
    name: "Combo 5000",
    coverImage: cover5000,
    products: ["p1", "p2"], // refer by product ids
    originalPrice: 5000,
    discountedPrice: 4500,
    discountPercent: 10,
  },
  {
    comboId: "c2",
    name: "Combo 2000",
    coverImage: cover2000,
    products: ["p1", "p2", "p3"], 
    originalPrice: 2000,
    discountedPrice: 1800,
    discountPercent: 10,
  },
  {
    comboId: "c3",
    name: "Combo 2000",
    coverImage: cover2000,
    products: ["p1", "p2", "p3"], 
    originalPrice: 2000,
    discountedPrice: 1800,
    discountPercent: 10,
  },
  
  // add more combos
];

// Attach full product objects for convenience
export const combosWithProducts = combos.map((combo) => ({
  ...combo,
  productDetails: combo.products.map((id) =>
    productsData.find((p) => p.id === id)
  ),
}));

export default combos;
