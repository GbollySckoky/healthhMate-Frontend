interface ConsultationTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const CONSULTATION_TYPES = [
  {
    label: "Video Call",
    value: "video_call",
  },
  {
    label: "Audio Call",
    value: "audio_call",
  },
  {
    label: "Physical Appointment",
    value: "in_person",
  },
];

const ConsultationTypeSelector = ({
  value,
  onChange,
}: ConsultationTypeSelectorProps) => {
  return (
    <div>
      <h3 className="mb-1 pb-1.5 text-sm font-normal text-[#414651]">
        Consultation Type
      </h3>

      <div className="space-y-3">
        {CONSULTATION_TYPES.map((type) => {
          const isSelected = value === type.value;

          return (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange(type.value)}
              className={`w-full rounded-md border p-3 text-left text-xs font-normal transition ${
                isSelected
                  ? "border-pink-600 bg-pink-50 text-pink-600"
                  : "border-gray-300"
              }`}
            >
              {type.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ConsultationTypeSelector;