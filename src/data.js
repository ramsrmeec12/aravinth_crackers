import image1 from './assets/image.png';
import image2 from './assets/image.png';
import image3 from './assets/image.png';

const products = [
  {
    id: "p1",
    name: "Kambi Mathappu",
    category: "Sparklers",
    subcategory: "Traditional",
    image: image1,
    otherImages: [image2, image3],
    originalPrice: 100,
    discountedPrice: 80,
    discountPercent: 20
  },
  {
    id: "p2",
    name: "Lakshmi Vedi",
    category: "Flower Pots",
    subcategory: "Classic",
    image: image1,
    originalPrice: 120,
    discountedPrice: 90,
    discountPercent: 25
  },
  {
    id: "p3",
    name: "Colorful Flower Pot",
    category: "Flower Pots",
    subcategory: "Colorful",
    image: image1,
    originalPrice: 150,
    discountedPrice: 120,
    discountPercent: 20
  },
  {
    id: "p4",
    name: "Electric Sparkler",
    category: "Sparklers",
    subcategory: "Electric",
    image: image1,
    originalPrice: 90,
    discountedPrice: 70,
    discountPercent: 22
  },
];

export default products;
