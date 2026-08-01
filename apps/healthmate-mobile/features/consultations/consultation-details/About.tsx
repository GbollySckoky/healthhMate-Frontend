"use client";

import React from "react";
import { Video, Headphones, PersonStanding } from "lucide-react";

import { colors } from "@/constants/colors";
import { Consultation } from "@/lib/interface/consultation";
import BookDoctor from "./BookDoctor";
import { useModal } from "@/store/Modal";
// import { useModal } from "@/context/ModalContext";

const getConsultationIcon = (type: string) => {
  if (type === "video_call") {
    return <Video size={16} color={colors.gray} />;
  }

  if (type === "audio_call") {
    return <Headphones size={16} color={colors.gray} />;
  }

  return <PersonStanding size={16} color={colors.gray} />;
};

const formatConsultationType = (type: string) => {
  if (type === "video_call") return "Video Call";
  if (type === "audio_call") return "Audio Call";
  if (type === "in_person") return "Physical Appointment";

  return type;
};

interface Props {
  consultation: any;
}

const About = ({ consultation }: Props) => {
  const { openModal } = useModal();

  return (
    <div className="mt-8 mb-12 border-t pt-6">
      <MinCard
        title="About"
        value={consultation?.profile?.bio || "No bio available"}
      />

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Availability</h3>

        {consultation?.availability?.length > 0 ? (
          <div className="mt-4 space-y-4">
            {consultation.availability.map((item: Consultation) => (
              <div
                key={item.id}
                className="rounded-xl border bg-white p-4"
              >
                <h4 className="mb-3 text-base font-semibold">
                  {item.dayOfWeek}
                </h4>

                <p className="mb-2 text-sm text-gray-500">
                  Time Slots
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {item.availableTimeSlots?.map((slot: string) => (
                    <Chip key={slot} label={slot} />
                  ))}
                </div>

                <p className="mb-2 text-sm text-gray-500">
                  Consultation Types
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.consultationType?.map((type: string) => (
                    <IconChip
                      key={type}
                      label={formatConsultationType(type)}
                      icon={getConsultationIcon(type)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-gray-500">
            No availability added yet.
          </p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">
          Consultation Fee
        </h3>

        <p className="mt-2 text-xl font-semibold text-green-600">
          ₦
          {consultation?.profile?.consultationFee?.toLocaleString() ??
            "0"}
        </p>
      </div>

      <button
        className="mt-8 w-full rounded-xl bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-700"
        onClick={() =>
          openModal(<BookDoctor consultation={consultation} />, {
            title: "Book Doctor",
            description: "",
            onClose: () => {},
          })
        }
      >
        Book Consultation
      </button>
    </div>
  );
};

export default About;

interface ChipProps {
  label: string;
}

const Chip = ({ label }: ChipProps) => (
  <div className="rounded-full border bg-gray-50 px-3 py-2 text-sm">
    {label}
  </div>
);

interface IconChipProps {
  label: string;
  icon: React.ReactNode;
}

const IconChip = ({
  label,
  icon,
}: IconChipProps) => (
  <div className="flex items-center gap-2 rounded-full border bg-gray-50 px-3 py-2 text-sm">
    {icon}
    <span>{label}</span>
  </div>
);

interface MinCardProps {
  title: string;
  value?: string;
  text?: string;
}

const MinCard = ({
  title,
  value,
  text,
}: MinCardProps) => (
  <div className="mt-2">
    <h3 className="text-lg font-semibold">{title}</h3>

    {text && (
      <p className="mt-2 text-sm text-gray-900">{text}</p>
    )}

    <p className="mt-2 leading-7 text-gray-500">
      {value}
    </p>
  </div>
);