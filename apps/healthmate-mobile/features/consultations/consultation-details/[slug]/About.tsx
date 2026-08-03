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
    <div className="mt-3 mb-5 border-t pt-4">
      <MinCard
        title="About"
        value={consultation?.profile?.bio || "No bio available"}
      />

      <div className="mt-5">
        <h3 className="text-base font-medium text-[#414651]">Availability</h3>

        {consultation?.availability?.length > 0 ? (
          <div className="mt-4 space-y-4">
            {consultation.availability.map((item: Consultation) => (
              <div
                key={item.id}
                className="rounded-xl border bg-white p-4"
              >
                <p className="mb-3 text-sm font-medium text-[#414651]">
                  {item.dayOfWeek}
                </p>

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
        <h3 className="text-sm font-medium">
          Consultation Fee
        </h3>

        <p className="mt-2 text-base font-medium text-green-600">
          ₦
          {consultation?.profile?.consultationFee?.toLocaleString() ??
            "0"}
        </p>
      </div>

      <button
        className="mt-8 mb-[50px] w-full rounded-xl bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-700"
        onClick={() =>
          openModal(<BookDoctor consultation={consultation} />, {
          title: "Book Appointment",
          footer: (
            <button className="w-full rounded-xl bg-pink-600 py-3 font-semibold text-white">
              Confirm Booking
            </button>
          ),
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
  <div className="rounded-full border bg-gray-50 px-3 py-2 text-xs font-normal text-[#414651]">
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
  <div className="flex items-center gap-2 rounded-full border bg-gray-50 px-3 py-2 text-xs font-normal">
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
  <div >
    <p className="text-base font-medium text-[#414651]">{title}</p>

    {text && (
      <p className="mt-2 text-sm text-gray-900 font-normal">{text}</p>
    )}

    <p className="text-xs font-normal text-gray-500">
      {value}
    </p>
  </div>
);
