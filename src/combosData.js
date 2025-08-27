// combosData.js
import productsData from "./data"; // your single products data
import cover5000 from './assets/products/p10.jpg'
const combos = [
  {
    comboId: "c1",
    name: "Rs 3000",
    coverImage: cover5000,
    products: [
      "p1", "p2", "p3", "p4", "p7", "p8", "p9", "p10", "p14", "p15",
      "p17", "p18", "p19", "p22", "p25", "p26", "p30", "p33", "p34", "p39",
      "p45", "p46", "p56", "p63", "p68", "p69", "p70", "p72", "p83", "p90",
      "p99", "p103", "p107", "p108", "p110", "p111", "p113"
    ],
    originalPrice: 30000,
    discountedPrice: 3000,
    discountPercent: 90,
  },
  {
    comboId: "c2",
    name: "Rs 3000 Kids Special",
    coverImage: cover5000,
    products: [
      "p1", "p2", "p8", "p9", "p10", "p11", "p22", "p25", "p26", "p33", "p34",
      "p36", "p37", "p45", "p56", "p68", "p69", "p70", "p71", "p72", "p78",
      "p102", "p99", "p104", "p105", "p106", "p107", "p110", "p109", "p111"
    ],
    originalPrice: 30000,
    discountedPrice: 3000,
    discountPercent: 90,
  }
  ,{
  comboId: "c3",
  name: "Rs 5000",
  coverImage: cover5000,
  products: [
    "p1","p2","p3","p4","p5","p6","p7",
    "p8","p9","p10","p11","p12",
    "p25","p26","p29","p30","p33","p34",
    "p36","p37","p38","p39","p42","p45","p46",
    "p54","p56","p61","p68","p69","p70","p71","p72",
    "p78","p83","p85","p90",
    "p104","p105","p106",
    "p11","p111","p113"
  ],
  originalPrice: 50000,
  discountedPrice: 5000,
  discountPercent: 90,
},
{
  comboId: "c4",
  name: "Rs 7000",
  coverImage: cover5000,
  products: [
    "p1","p2","p3","p4","p5","p6","p7",
    "p8","p9","p10","p11","p12","p13",
    "p17","p18","p19","p20","p21","p22",
    "p25","p26","p30",
    "p33","p34","p36","p37","p38","p39","p40",
    "p45","p46",
    "p54","p56","p61","p63",
    "p68","p69","p70","p71","p72",
    "p99",
    "p104","p105","p106","p107",
    "p110","p111","p113","p116"
  ],
  originalPrice: 70000,
  discountedPrice: 7000,
  discountPercent: 90,
},
{
  comboId: "c5",
  name: "Rs 10000",
  coverImage: cover5000,
  products: [
    "p1","p2","p3","p4","p5","p6","p7",
    "p8","p9","p10","p11",
    "p14","p16",
    "p17","p18","p19","p20","p21","p22",
    "p25","p26","p29","p30",
    "p33","p34","p36","p37","p38","p39","p40",
    "p45","p46",
    "p54","p56","p53","p65",
    "p68","p69","p70","p71","p72",
    "p75","p78","p83","p85","p90","p125","p91","p99",
    "p104","p105","p106","p107",
    "p110","p111","p113","p114"
  ],
  originalPrice: 100000,
  discountedPrice: 10000,
  discountPercent: 90,
}








];


export const combosWithProducts = combos.map((combo) => ({
  ...combo,
  productDetails: combo.products.map((id) =>
    productsData.find((p) => p.id === id)
  ),
}));

export default combos;
