import  { combosWithProducts } from "../combosData";
import ComboCard from "../components/ComboCard";

export default function CombosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Combos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {combosWithProducts.map((combo) => (
          <ComboCard key={combo.comboId} combo={combo} />
        ))}
      </div>
    </div>
  );
}
