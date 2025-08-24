import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async"; // ✅ Import Helmet

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "919876543210"; // Your WhatsApp number with country code
    const text = `Hello, my name is ${name}.\nEmail: ${email}\nMessage: ${message}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank"); // Opens WhatsApp chat
  };

  return (
    <>
      
      <Helmet>
        <title>Contact Aravinth Crackers | Sivakasi Fireworks & Online Orders</title>
        <meta
          name="description"
          content="Get in touch with Aravinth Crackers, Sivakasi. Reach us via phone, email, WhatsApp, or visit our store. Place online Diwali crackers orders easily."
        />
        <meta
          name="keywords"
          content="contact Aravinth Crackers, Sivakasi crackers shop, fireworks contact, buy crackers online, Diwali crackers order, Sivakasi firecrackers"
        />
        <meta property="og:title" content="Contact Aravinth Crackers – Sivakasi Fireworks" />
        <meta
          property="og:description"
          content="Call, email, or WhatsApp Aravinth Crackers for Diwali orders. Visit our Sivakasi store or order crackers online with doorstep delivery."
        />
        <meta property="og:image" content="https://aravinthcrackers.in/static/media/logo.69a2386f94a3d96e8836.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aravinthcrackers.in/contact" />
      </Helmet>

      <div className="bg-gradient-to-b from-yellow-50 to-orange-100 min-h-screen py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-red-700 mb-8">
            📍 Contact Us
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-semibold text-red-600 mb-4">Get in Touch</h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-red-500" />
                  No. 27, Lakshmi Narashiman Nagar, Mettamalai, Sattur, Sivakasi, Tamil Nadu
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-red-500" />
                  +91 97102 47861
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-red-500" />
                  aravinthcrackers@gmail.com
                </li>
                <li className="flex items-center gap-3">
                  <FaWhatsapp className="text-green-500" />
                  WhatsApp Orders: +91 97102 47861
                </li>
              </ul>

              {/* Contact Form */}
              <form
                className="mt-8 bg-white shadow-lg rounded-lg p-6 space-y-4"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 w-full"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Google Map */}
            <div>
              <h2 className="text-2xl font-semibold text-red-600 mb-4">Our Location</h2>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.5745673278133!2d77.80278907411677!3d9.451452284171511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06d17d2b2f10d7%3A0x9b8898cbbc4b2f2b!2sSivakasi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1691484312345!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
