import productsData from "./data"; // your single products data
import cover5000 from './assets/products/p10.jpg'

const combos = [
  {
    comboId: "c1",
    name: "Rs 3000",
    coverImage: cover5000,
    products: [
      { id: "p1", qty: 5 }, { id: "p2", qty: 3 }, { id: "p3", qty: 1 }, { id: "p4", qty: 1 },
      { id: "p7", qty: 1 }, { id: "p8", qty: 1 }, { id: "p9", qty: 1 }, { id: "p10", qty: 1 },
      { id: "p14", qty: 1 }, { id: "p15", qty: 1 }, { id: "p17", qty: 1 }, { id: "p18", qty: 1 },
      { id: "p19", qty: 1 }, { id: "p22", qty: 1 }, { id: "p25", qty: 1 }, { id: "p26", qty: 1 },
      { id: "p30", qty: 1 }, { id: "p33", qty: 1 }, { id: "p34", qty: 1 }, { id: "p39", qty: 1 },
      { id: "p45", qty: 1 }, { id: "p46", qty: 1 }, { id: "p56", qty: 1 }, { id: "p63", qty: 1 },
      { id: "p68", qty: 1 }, { id: "p69", qty: 1 }, { id: "p70", qty: 1 }, { id: "p72", qty: 1 },
      { id: "p83", qty: 1 }, { id: "p90", qty: 1 }, { id: "p99", qty: 1 }, { id: "p103", qty: 1 },
      { id: "p107", qty: 2 }, { id: "p108", qty: 2 }, { id: "p110", qty: 1 }, { id: "p111", qty: 1 },
      { id: "p113", qty: 1 }
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
    { id: "p1", qty: 1 }, { id: "p2", qty: 1 }, { id: "p8", qty: 1 }, { id: "p9", qty: 1 },
    { id: "p10", qty: 1 }, { id: "p11", qty: 1 }, 

    // newly added p17–p22
    { id: "p17", qty: 2 }, { id: "p18", qty: 1 }, { id: "p19", qty: 1 },
    { id: "p20", qty: 1 }, { id: "p21", qty: 1 }, { id: "p22", qty: 1 },

    { id: "p22", qty: 1 }, { id: "p25", qty: 2 }, { id: "p26", qty: 1 },
    { id: "p33", qty: 1 }, { id: "p34", qty: 1 }, { id: "p36", qty: 1 },
    { id: "p37", qty: 1 }, { id: "p45", qty: 1 }, { id: "p56", qty: 1 }, 
    { id: "p68", qty: 1 }, { id: "p69", qty: 1 }, { id: "p70", qty: 1 }, 
    { id: "p71", qty: 1 }, { id: "p72", qty: 1 }, { id: "p78", qty: 1 }, 
    { id: "p102", qty: 1 }, { id: "p99", qty: 1 }, { id: "p104", qty: 2 },
    { id: "p105", qty: 2 }, { id: "p106", qty: 2 }, { id: "p107", qty: 2 }, 
    { id: "p110", qty: 2 }, { id: "p109", qty: 1 }, { id: "p111", qty: 1 }
  ],
  originalPrice: 30000,
  discountedPrice: 3000,
  discountPercent: 90,
}
,
  {
  comboId: "c3",
  name: "Rs 5000",
  coverImage: cover5000,
  products: [
    { id: "p1", qty: 5 }, { id: "p2", qty: 5 }, { id: "p3", qty: 5 }, { id: "p4", qty: 1 },
    { id: "p5", qty: 1 }, { id: "p6", qty: 1 }, { id: "p7", qty: 1 }, { id: "p8", qty: 3 },
    { id: "p9", qty: 1 }, { id: "p10", qty: 1 }, { id: "p11", qty: 1 }, { id: "p12", qty: 1 },

    // newly added p17–p22
    { id: "p17", qty: 2 }, { id: "p18", qty: 2 }, { id: "p19", qty: 2 },
    { id: "p20", qty: 1 }, { id: "p21", qty: 1 }, { id: "p22", qty: 1 },

    { id: "p25", qty: 2 }, { id: "p26", qty: 2 }, { id: "p29", qty: 1 }, { id: "p30", qty: 1 },
    { id: "p33", qty: 1 }, { id: "p34", qty: 1 }, { id: "p36", qty: 1 }, { id: "p37", qty: 1 },
    { id: "p38", qty: 1 }, { id: "p39", qty: 1 }, { id: "p42", qty: 1 }, { id: "p45", qty: 2 },
    { id: "p46", qty: 2 }, { id: "p54", qty: 1 }, { id: "p56", qty: 1 }, { id: "p61", qty: 1 },
    { id: "p68", qty: 1 }, { id: "p69", qty: 1 }, { id: "p70", qty: 1 }, { id: "p71", qty: 1 },
    { id: "p72", qty: 1 }, { id: "p78", qty: 1 }, { id: "p83", qty: 1 }, { id: "p85", qty: 1 },
    { id: "p90", qty: 1 }, { id: "p104", qty: 3 }, { id: "p105", qty: 2 }, { id: "p106", qty: 2 },
    { id: "p11", qty: 2 }, { id: "p111", qty: 2 }, { id: "p113", qty: 2 }
  ],
  originalPrice: 50000,
  discountedPrice: 5000,
  discountPercent: 90,
}
,
  {
    comboId: "c4",
    name: "Rs 7000",
    coverImage: cover5000,
    products: [
      { id: "p1", qty: 5 }, { id: "p2", qty: 5 }, { id: "p3", qty: 5 }, { id: "p4", qty: 1 },
      { id: "p5", qty: 1 }, { id: "p6", qty: 2 }, { id: "p7", qty: 1 }, { id: "p8", qty: 2 },
      { id: "p9", qty: 1 }, { id: "p10", qty: 1 }, { id: "p11", qty: 1 }, { id: "p12", qty: 1 },
      { id: "p13", qty: 1 }, { id: "p17", qty: 2 }, { id: "p18", qty: 2 }, { id: "p19", qty: 2 },
      { id: "p20", qty: 1 }, { id: "p21", qty: 1 }, { id: "p22", qty: 1 }, { id: "p25", qty: 3 },
      { id: "p26", qty: 3 }, { id: "p30", qty: 1 }, { id: "p33", qty: 1 }, { id: "p34", qty: 1 },
      { id: "p36", qty: 1 }, { id: "p37", qty: 1 }, { id: "p38", qty: 1 }, { id: "p39", qty: 1 },
      { id: "p40", qty: 1 }, { id: "p45", qty: 1 }, { id: "p46", qty: 1 }, { id: "p54", qty: 2 },
      { id: "p56", qty: 2 }, { id: "p61", qty: 1 }, { id: "p63", qty: 1 }, { id: "p68", qty: 1 },
      { id: "p69", qty: 1 }, { id: "p70", qty: 1 }, { id: "p71", qty: 1 }, { id: "p72", qty: 1 },
      { id: "p99", qty: 1 }, { id: "p104", qty: 6 }, { id: "p105", qty: 5 }, { id: "p106", qty: 5 },
      { id: "p107", qty: 5 }, { id: "p110", qty: 2 }, { id: "p111", qty: 2 }, { id: "p113", qty: 4 },
      { id: "p116", qty: 2 }
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
      { id: "p1", qty: 5}, { id: "p2", qty: 5 }, { id: "p3", qty: 5 }, { id: "p4", qty: 5},
      { id: "p5", qty: 5 }, { id: "p6", qty: 5 }, { id: "p7", qty: 5 }, { id: "p8", qty: 1 },
      { id: "p9", qty: 2 }, { id: "p10", qty: 2}, { id: "p11", qty: 2 }, { id: "p14", qty: 2 },
      { id: "p16", qty: 1 }, { id: "p17", qty: 2 }, { id: "p18", qty: 2 }, { id: "p19", qty: 2 },
      { id: "p20", qty: 2 }, { id: "p21", qty: 1 }, { id: "p22", qty: 2 }, { id: "p25", qty: 2 },
      { id: "p26", qty: 1 }, { id: "p29", qty: 1 }, { id: "p30", qty: 1 }, { id: "p33", qty: 1 },
      { id: "p34", qty: 1 }, { id: "p36", qty: 1 }, { id: "p37", qty: 1 }, { id: "p38", qty: 1 },
      { id: "p39", qty: 1 }, { id: "p40", qty: 1 }, { id: "p45", qty: 1 }, { id: "p46", qty: 1 },
      { id: "p54", qty: 2 }, { id: "p56", qty: 3 }, { id: "p53", qty: 1 }, { id: "p65", qty: 1 },
      { id: "p68", qty: 1 }, { id: "p69", qty: 1 }, { id: "p70", qty: 1 }, { id: "p71", qty: 1 },
      { id: "p72", qty: 1 }, { id: "p75", qty: 1 }, { id: "p78", qty: 1 }, { id: "p83", qty: 1 },
      { id: "p85", qty: 1 }, { id: "p90", qty: 1 }, { id: "p125", qty: 1 }, { id: "p91", qty: 1 },
      { id: "p99", qty: 1 }, { id: "p104", qty: 1 }, { id: "p105", qty: 5 }, { id: "p106", qty: 5 },
      { id: "p107", qty: 5 }, { id: "p110", qty: 2 }, { id: "p111", qty: 2 }, { id: "p113", qty: 4 },
      { id: "p114", qty: 2}
    ],
    originalPrice: 100000,
    discountedPrice: 10000,
    discountPercent: 90,
  }
];

export const combosWithProducts = combos.map((combo) => ({
  ...combo,
  productDetails: combo.products.map((item) => {
    const product = productsData.find((p) => p.id === item.id);
    return product ? { ...product, qty: item.qty } : null;
  }).filter(Boolean),
}));

export default combos;
