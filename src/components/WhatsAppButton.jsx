import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "919876543210"; // ✅ Replace with your WhatsApp number (no +, no spaces)
  const orderMessage = "Hello, I would like to place an order for crackers."; // ✅ Default message

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center z-50 transition duration-200"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
