import type { ChangeEvent } from "react";

interface DateRangeProps {
  dateBegin: string;
  dateEnd: string;
  onChange: (dates: { dateBegin: string; dateEnd: string }) => void;
}

export default function DateRange({
  dateBegin,
  dateEnd,
  onChange,
}: DateRangeProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ dateBegin, dateEnd, [name]: value });
  };

  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Date Begin
        </label>
        <input
          type="number"
          name="dateBegin"
          value={dateBegin}
          onChange={handleChange}
          placeholder="e.g., 1600"
          className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Date End
        </label>
        <input
          type="number"
          name="dateEnd"
          value={dateEnd}
          onChange={handleChange}
          placeholder="e.g., 1800"
          className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
        />
      </div>
    </div>
  );
}
