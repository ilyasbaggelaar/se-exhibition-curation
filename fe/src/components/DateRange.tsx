import type { ChangeEvent } from "react";

interface DateRangeProps {
    dateBegin: string;
    dateEnd: string;
    onChange: (dates: {dateBegin: string; dateEnd: string}) => void;
}

export default function DateRange({dateBegin, dateEnd, onChange}: DateRangeProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        onChange({dateBegin, dateEnd, [name]: value});
    };


  return (
    <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      <input
        type="number"
        name="dateBegin"
        value={dateBegin}
        onChange={handleChange}
        placeholder="Date Begin (e.g., 1600)"
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="dateEnd"
        value={dateEnd}
        onChange={handleChange}
        placeholder="Date End (e.g., 1800)"
        className="border p-2 rounded"
      />
    </div>
  );
}
