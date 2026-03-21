"use client";
import { useCity } from "./CityContext";
import { getPrimaryCities } from "@/lib/data";

const cityLabels: Record<string, string> = {
  "Los Angeles": "LA",
  "New York": "NY",
};

export default function CityPills() {
  const { selectedCity, setSelectedCity } = useCity();
  const cities = getPrimaryCities();

  if (cities.length <= 1) return null;

  return (
    <div className="flex gap-1">
      <button
        onClick={() => setSelectedCity(null)}
        className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
          selectedCity === null
            ? "bg-stone-800 text-white"
            : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700"
        }`}
      >
        All
      </button>
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => setSelectedCity(city)}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            selectedCity === city
              ? "bg-stone-800 text-white"
              : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700"
          }`}
        >
          {cityLabels[city] || city}
        </button>
      ))}
    </div>
  );
}
