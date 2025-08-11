import image1 from '../assets/ourproducts/Flower-Pots.png'
import image2 from '../assets/ourproducts/Ground-Chakkars.png'
import image3 from '../assets/ourproducts/Something-Special.png'
import image4 from '../assets/ourproducts/—Pngtree—new-arrival-banner-sale-sticker_5954962-1-150x150.png'
const products = [
  { name: "GROUND CHAKKARS", imgSrc: image1, highlighted: false },
  { name: "FLOWER POTS", imgSrc: image2, highlighted: false },
  { name: "NEW ARRIVALS", imgSrc: image3, highlighted: false },
  { name: "TWINKLING STARS & PENCILS", imgSrc: image4, highlighted: false },
  { name: "SPARKLERS", imgSrc: image1, highlighted: false },
  { name: "ATOM BOMB", imgSrc: image2, highlighted: false },
  { name: "ONE SOUND CRACKERS", imgSrc: image3, highlighted: false },
  { name: "ROCKET", imgSrc: image4, highlighted: false },
];

export default function OurProducts() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-center text-2xl font-extrabold text-[#1a0a52] mb-8">
        OUR PRODUCTS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(({ name, imgSrc, highlighted }) => (
          <div
            key={name}
            className={`flex flex-col items-center justify-center border rounded-lg p-6 cursor-pointer hover:bg-blue-950 hover:text-white
              ${
                highlighted
                  ? "bg-[#122a59] border-yellow-400 text-white"
                  : "bg-gray-100 border-[#122a59] text-[#122a59]"
              }
              hover:shadow-lg transition-shadow duration-300`}
          >
            <img src={imgSrc} alt={name} className="w-20 h-20 mb-4 object-contain" />
            <p className="text-center text-sm sm:text-base">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
