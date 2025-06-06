import type { ChangeEvent } from "react";

interface ArtworkFilterProps {
  geoLocation: string;
  onChange: (value: string) => void;
  onPage: (page: number) => void;
}

const COUNTRIES = [
  "", // default blank option
  "China",
  "Japan",
  "France",
  "Italy",
  "Egypt",
  "India",
  "United States",
  "Greece",
  "Mexico",
  "England",
  "Germany",
  "Korea",
  "Iran",
  "Turkey",
];

export default function ArtworkFilter({
  geoLocation,
  onChange,
  onPage,
}: ArtworkFilterProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
    onPage(1);
  };

  return (
    <div className="mb-6 max-w-xs">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Filter by Country
      </label>
      <select
        value={geoLocation}
        onChange={handleChange}
        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
      >
        {COUNTRIES.map((country) => (
          <option key={country} value={country}>
            {country || "All Countries"}
          </option>
        ))}
      </select>
    </div>
  );
}
