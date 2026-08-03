"use client";

import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import profile from "@/assets/Ellipse 165.png";
import Booking from "./Booking";
import { CapitalizeName } from "@/constants/capitalizeName";

interface BookDoctorProps {
  consultation: any;
}

const BookDoctor = ({ consultation }: BookDoctorProps) => {
  return (
    <div className="min-h-screen bg-[#F8F9FC] p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <Image
              src={profile}
              alt={`${consultation?.firstName} ${consultation?.lastName}`}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />

            <div className="flex flex-1 items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Dr. {CapitalizeName(consultation?.firstName) || "-"}{" "}
                  {CapitalizeName(consultation?.lastName) || ""}
                </h2>

                <p className="mt-1 text-sm text-pink-600">
                  {consultation?.profile?.specialization ??
                    "Not available"}
                </p>

                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  {consultation?.hospital?.hospitalName || "-"}
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.2 (38)</span>
              </div>
            </div>
          </div>
        </div>

        <Booking consultation={consultation} />
      </div>
    </div>
  );
};

export default BookDoctor;