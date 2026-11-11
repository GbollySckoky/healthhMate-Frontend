interface TimeSlotSelectorProps {
  value: string;
  onChange: (value: string) => void;
  data: string[];
}

const TimeSlotSelector = ({
  value,
  onChange,
  data
}: TimeSlotSelectorProps) => {
  return (
    <div>
      <p className="mb-1 pb-1.5 text-sm font-normal text-[#414651]">
        Select Time
      </p>

      {data.length === 0 && (
        <p className="text-sm text-gray-500">
          No appointment times available for this date.
        </p>
      )}

      <div className="grid grid-cols-4 gap-3">
        {data.map((slot) => {
          const isSelected = value === slot;

          return (
            <button
              key={slot}
              type="button"
              onClick={() => onChange(slot)}
              className={`rounded-md border py-2 text-xs font-normal transition ${
                isSelected
                  ? "border-pink-600 bg-pink-50 text-pink-600"
                  : "border-gray-300"
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotSelector;