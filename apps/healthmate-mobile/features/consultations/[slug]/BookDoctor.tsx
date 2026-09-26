"use client";

import Image from "next/image";
import { MapPin, X } from "lucide-react";

import profile from "@/assets/default.jpg";
import Booking from "./Booking";
import { CapitalizeName } from "@/constants/capitalizeName";

interface BookDoctorProps {
  consultation: any;
  onClose: () => void;
  id: string;
}

const BookDoctor = ({ consultation, onClose, id }: BookDoctorProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative flex h-[calc(100vh-32px)] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-[#F8F9FC] shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b bg-white px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Image
              src={consultation?.profile?.profilePicture || profile}
              alt={`${consultation?.firstName || ""} ${
                consultation?.lastName || ""
              }`}
              width={60}
              height={60}
              className="h-[60px] w-[60px] shrink-0 rounded-full border border-border object-cover"
              loading="lazy"
            />

            <div className="min-w-0">
              <p className="truncate text-base font-medium text-gray-900">
                Dr. {CapitalizeName(consultation?.firstName) || "-"}{" "}
                {CapitalizeName(consultation?.lastName) || ""}
              </p>

              <p className="mt-1 text-sm font-medium text-gray-500">
                {consultation?.department || "N/A"}
              </p>

              <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="h-4 w-4 shrink-0 text-gray-400" />

                <span className="truncate text-sm font-normal text-gray-500">
                  {consultation?.hospital?.hospitalName || "Hospital"}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ml-3 shrink-0 rounded-full p-2 transition hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
          <Booking consultation={consultation} id={id} />
        </div>
      </div>
    </div>
  );
};

export default BookDoctor;