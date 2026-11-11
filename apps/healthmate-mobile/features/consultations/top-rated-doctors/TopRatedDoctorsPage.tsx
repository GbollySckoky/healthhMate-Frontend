"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Star } from "lucide-react";

import { topRatedData } from "@/constants/data";
import { doctorProfileRoute } from "@/constants/route";
// import { ROUTES } from "@/constants/routes";

const TopRatedDoctorsPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="flex items-center gap-3 border-b bg-white px-6 py-4">
        <button onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </button>

        <h1 className="text-lg font-semibold">Top Rated Doctors</h1>
      </div> */}

      <div className="mx-auto max-w-5xl space-y-5 p-6">
        {topRatedData.map((doctor) => (
          <div
            key={doctor.id}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <Image
                  src="/images/profile.png"
                  alt={doctor.doctorName}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                  loading="lazy"
                />

                <div>
                  <h2 className="font-semibold">
                    {doctor.doctorName}
                  </h2>

                  <p className="mt-1 text-sm text-pink-600">
                    {doctor.type}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    {doctor.address}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                4.2 (38)
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t pt-5">
              <p className="text-lg font-semibold text-green-600">
                ₦10,000
              </p>

              <button
                onClick={() =>
                  router.push(
                    doctorProfileRoute(doctor.id)
                  )
                }
                className="rounded-lg bg-pink-600 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-700"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedDoctorsPage;
