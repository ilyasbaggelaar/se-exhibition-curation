import type { ChangeEvent } from "react";

interface DateRangeProps {
  dateBegin: string;
  dateEnd: string;
  onChange: (dates: { dateBegin: string; dateEnd: string }) => void;
}

const ERA_OPTIONS = [
  { label: "All Eras", value: { dateBegin: "", dateEnd: "" } },
  { label: "A.D. 1900 - Present", value: { dateBegin: "1900", dateEnd: "2025" } },
  { label: "A.D. 1800 - 1900", value: { dateBegin: "1800", dateEnd: "1900" } },
  { label: "A.D. 1600 - 1800", value: { dateBegin: "1600", dateEnd: "1800" } },
  { label: "A.D. 1000 - 1600", value: { dateBegin: "1000", dateEnd: "1600" } },
  { label: "A.D. 500 - 1000", value: { dateBegin: "500", dateEnd: "1000" } },
  { label: "A.D. 1 - 500", value: { dateBegin: "1", dateEnd: "500" } },
  { label: "2000 - 1000 B.C.", value: { dateBegin: "-2000", dateEnd: "-1000" } },
  { label: "8000 - 2000 B.C.", value: { dateBegin: "-8000", dateEnd: "-2000" } },
];

export default function DateRange({ dateBegin, dateEnd, onChange }: DateRangeProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = ERA_OPTIONS.find(
      (opt) =>
        `${opt.value.dateBegin}-${opt.value.dateEnd}` === e.target.value
    );
    if (selected) {
      onChange(selected.value);
    }
  };

  return (
    <div className="mb-6 max-w-md">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Filter by Era
      </label>
      <select
        value={`${dateBegin}-${dateEnd}`}
        onChange={handleChange}
        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
      >
        {ERA_OPTIONS.map((opt) => (
          <option
            key={opt.label}
            value={`${opt.value.dateBegin}-${opt.value.dateEnd}`}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
