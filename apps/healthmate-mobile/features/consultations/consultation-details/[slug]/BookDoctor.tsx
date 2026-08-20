"use client";

import Image from "next/image";
import { MapPin, X } from "lucide-react";
import profile from "@/assets/Ellipse 165.png";
import Booking from "./Booking";
import { CapitalizeName } from "@/constants/capitalizeName";

interface BookDoctorProps {
  consultation: any;
  onClose: () => void;
}

const BookDoctor = ({ consultation, onClose }: BookDoctorProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden bg-[#F8F9FC] shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-5">
          <div className="flex items-center gap-4">
            <Image
              src={profile}
              alt={`${consultation?.firstName} ${consultation?.lastName}`}
              width={70}
              height={70}
              className="rounded-full object-cover"
              loading="lazy"
            />

            <div>
              <p className="text-base font-medium text-gray-900">
                Dr. {CapitalizeName(consultation?.firstName) || "-"}{" "}
                {CapitalizeName(consultation?.lastName) || ""}
              </p>

              <p className="mt-1 text-sm font-medium text-pink-600">
                {consultation?.profile?.specialization ||
                  "General Practitioner"}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500 text-sm font-normal">
                    {consultation?.hospital?.hospitalName || "Hospital"}
                  </span>
                </div>

                {/* <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.2 (38 Reviews)</span>
                </div> */}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-6">
          <Booking consultation={consultation} />
        </div>
      </div>
    </div>
  );
};

export default BookDoctor;