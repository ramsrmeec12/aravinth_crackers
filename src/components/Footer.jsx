import React from "react";
import image1 from '../assets/footerbg.avif'
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const Footersec = () => {
  return (
    <footer
      className="relative text-yellow-50 mt-10"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${image1}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Shop Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-300">
            🎆 Aravinth Crackers
          </h3>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for premium quality crackers at the best prices.
            Celebrate this Diwali with joy, light, and safety.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-300">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> No. 27, Lakshmi Narashiman Nagar, Mettamalai, Sattur, Sivakasi, Tamil Nadu
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +91 93636 05130
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> aravinthcrackers@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp /> WhatsApp Orders: +91 93636 05130
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-300">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-yellow-200">Home</a></li>
            <li><a href="/products" className="hover:text-yellow-200">Our Products</a></li>
            <li><a href="/about" className="hover:text-yellow-200">About Us</a></li>
            <li><a href="/contact" className="hover:text-yellow-200">Contact</a></li>
            <li><a href="/privacy-policy" className="hover:text-yellow-200">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-300">
            Follow Us
          </h3>
          <div className="flex gap-4 text-xl">
            <a href="https://www.facebook.com/share/1EKdu3K849/" className="hover:text-yellow-200"><FaFacebook /></a>
            <a href="https://www.instagram.com/aravinthcrackers/" className="hover:text-yellow-200"><FaInstagram /></a>
            <a href="https://wa.me/c/919363605130" className="hover:text-yellow-200"><FaWhatsapp /></a>
          </div>
          <p className="text-sm mt-4">Stay updated with offers & festive deals!</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-black/70 text-center py-3 text-sm border-t border-yellow-700">
        © {new Date().getFullYear()} Aravinth Crackers. All rights reserved.
      </div>
    </footer>
  );
};

export default Footersec;
