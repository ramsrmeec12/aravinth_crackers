import React from "react";
import { combosWithProducts } from "../combosData";
import ComboCard from "../components/ComboCard";
import { Helmet } from "react-helmet-async"; // ✅ Import Helmet

export default function CombosPage() {
  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Crackers Combos | Diwali Gift Boxes & Discount Packs – Aravinth Crackers</title>
        <meta
          name="description"
          content="Discover exclusive Diwali crackers combos at Aravinth Crackers. Gift boxes, festival packs, and special discount combos available for safe delivery."
        />
        <meta
          name="keywords"
          content="Aravinth crackers, crackers combos, Diwali gift boxes, festival packs, discount crackers, buy Diwali crackers online, Aravinth Crackers combos"
        />
        <meta property="og:title" content="Diwali Crackers Combos – Aravinth Crackers" />
        <meta
          property="og:description"
          content="Celebrate Diwali with Aravinth Crackers combos. Explore gift boxes, bulk packs, and discount festival combos with safe online delivery."
        />
        <meta property="og:image" content="https://aravinthcrackers.in/static/media/logo.69a2386f94a3d96e8836.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aravinthcrackers.in/combos" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Combos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {combosWithProducts.map((combo) => (
            <ComboCard key={combo.comboId} combo={combo} />
          ))}
        </div>
      </div>
    </>
  );
}
