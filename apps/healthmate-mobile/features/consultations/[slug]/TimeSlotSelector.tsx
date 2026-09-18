interface TimeSlotSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const TIME_SLOTS = [
  "10:00am",
  "11:00am",
  "12:00pm",
  "1:00pm",
  "2:00pm",
  "3:00pm",
  "4:00pm",
  "5:00pm",
];

const TimeSlotSelector = ({
  value,
  onChange,
}: TimeSlotSelectorProps) => {
  return (
    <div>
      <p className="mb-1 pb-1.5 text-sm font-normal text-[#414651]">
        Select Time
      </p>

      <div className="grid grid-cols-4 gap-3">
        {TIME_SLOTS.map((slot) => {
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