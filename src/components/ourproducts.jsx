import { Link } from "react-router-dom"
import image1 from '../assets/ourproducts/i1.png'
import i1 from '../assets/ourproducts/i1.png'
import i2 from '../assets/ourproducts/i2.png'
import i3 from '../assets/ourproducts/i3.png'
import i4 from '../assets/ourproducts/i4.png'
import i5 from '../assets/ourproducts/i5.png'
import i6 from '../assets/ourproducts/i6.png'
import i7 from '../assets/ourproducts/i6.png'
import i8 from '../assets/ourproducts/i8.png'
import i9 from '../assets/ourproducts/i9.png'
import i10 from '../assets/ourproducts/i10.png'
import i11 from '../assets/ourproducts/i11.png'
import i12 from '../assets/ourproducts/i11.png'


const products = [
 { name: "Single Sound", imgSrc: i1, highlighted: false },
  { name: "Ground Chakkars", imgSrc: i2, highlighted: false },
  { name: "Flower Pots", imgSrc: i3, highlighted: false },
  { name: "Twinkling Star", imgSrc: i4, highlighted: false },
  { name: "Rockets", imgSrc: i5, highlighted: false },
  { name: "Kids Special", imgSrc: i6, highlighted: false },
  { name: "Bomb", imgSrc: i7, highlighted: false },
  { name: "Bijili Crackers", imgSrc: i8, highlighted: false },
  { name: "Festival Crackers", imgSrc: i9, highlighted: false },
  { name: "Mini Fancy Items", imgSrc: i10, highlighted: false },
  { name: "Repeat Shots", imgSrc: i11, highlighted: false },
  { name: "Colour Fountain", imgSrc: i12, highlighted: false },
  { name: "Peacock Cracker", imgSrc: i1, highlighted: false },
  { name: "New Variety", imgSrc: i2, highlighted: false },
  { name: "Match Box", imgSrc: i3, highlighted: false },
  { name: "Sparklers", imgSrc: i4, highlighted: false },
  { name: "Gift Boxed", imgSrc: i5, highlighted: false },
  { name: "2025 Diwali New", imgSrc: image1, highlighted: false },
]

export default function OurProducts() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-center text-2xl font-extrabold text-[#1a0a52] mb-8">
        OUR PRODUCTS
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(({ name, imgSrc, highlighted }) => (
          <Link key={name} to="/products">
            <div
              className={`flex flex-col items-center justify-center border rounded-lg p-6 cursor-pointer hover:bg-blue-950 hover:text-white
                ${
                  highlighted
                    ? "bg-[#122a59] border-yellow-400 text-white"
                    : "bg-gray-100 border-[#122a59] text-[#122a59]"
                }
                hover:shadow-lg transition duration-300`}
            >
              <img
                src={imgSrc}
                alt={name}
                className="w-20 h-20 mb-4 object-contain"
              />
              <p className="text-center text-sm sm:text-base">{name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
