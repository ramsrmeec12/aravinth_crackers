import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-orange-100 to-yellow-50 min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-red-700 mb-6">
          🎇 About Aravinth Crackers 🎆
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to <span className="font-semibold">Aravinth Crackers</span>, your trusted
          destination for premium quality fireworks straight from the heart of
          Sivakasi, Tamil Nadu – the fireworks capital of India.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          For generations, we have been bringing joy and celebration to homes
          across India with our wide range of sparklers, flower pots, rockets,
          and more. We are committed to providing safe, eco-friendly, and
          budget-friendly crackers so that your festivities sparkle brighter.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          This Diwali and every festive occasion, let us light up your moments
          with colors, joy, and safe celebrations. Thank you for making us a
          part of your happiness!
        </p>
        <div className="mt-10">
          <img
            src="https://images.unsplash.com/photo-1603217191515-bdfb1e4bc105?auto=format&fit=crop&w=1000&q=80"
            alt="Diwali celebration"
            className="rounded-xl shadow-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
