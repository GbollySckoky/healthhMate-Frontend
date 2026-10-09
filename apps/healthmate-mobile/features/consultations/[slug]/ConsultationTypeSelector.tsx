import { CapitalizeName } from "@/constants/capitalizeName";

interface ConsultationTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  data: string[]
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
  data
}: ConsultationTypeSelectorProps) => {
  return (
    <div>
      <h3 className="mb-1 pb-1.5 text-sm font-normal text-[#414651]">
        Consultation Type
      </h3>

      {data.length === 0 && (
        <p className="text-sm text-gray-500">
          No appointment cleaning types available for this date.
        </p>
      )}

      <div className="space-y-3">
        {data.map((type) => {
          const isSelected = value === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={`w-full rounded-md border p-3 text-left text-xs font-normal transition ${
                isSelected
                  ? "border-pink-600 bg-pink-50 text-pink-600"
                  : "border-gray-300"
              }`}
            >
              {CapitalizeName(type.replaceAll("_", " "))}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ConsultationTypeSelector;