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
      onPage(1)
  };

  return (
    <div className="mb-4 max-w-xs">
      <label className="block mb-1 font-medium text-sm">Filter by Country (GeoLocation)</label>
      <select
        value={geoLocation}
        onChange={handleChange}
        className="border p-2 rounded w-full"
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
