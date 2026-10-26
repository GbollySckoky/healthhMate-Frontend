"use client";
import { MediumTitle, MinText, SmallestTitle } from "@/components/ui/Reusable";
import React from "react";
import { ChevronRight } from "lucide-react";
import image from "@/assets/default.jpg";
import useGetTodayAppointment from "@/lib/hooks/useGetTodayAppointment";
import { GET_ALL_APPOINTMENTS } from "@/lib/interface/get_all_appointyment";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constant/Routes";
import { AppointmentCardSkeleton } from "@/components/ui/DashboardSkeleton";
import Image from "next/image";
import { CapitalizeName } from "@/lib/components/ui/CapitalizeName";
// import Image from 'nex'
const UpcomingConsultation = () => {
  const router = useRouter();
  const { todayAppointments: upcomingConsultation, isLoading, error, isError } = useGetTodayAppointment();

  return (
    <div className="bg-white rounded-lg border border-gray-200 w-full h-[400px] flex flex-col">
      {/* Fixed header */}
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
        <div className="flex items-center justify-between">
          <MediumTitle>Upcoming Consultations</MediumTitle>
          <button type="button" onClick={() => router.push(ROUTES.appointment)} className="flex items-center text-red-800 cursor-pointer hover:text-red-600">
            <p className="font-semibold text-[15px]">See all</p>
            <ChevronRight size={18} />
          </button>
        </div>
        <p className="pt-3 text-gray-500 font-semibold text-[14px]">Today</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 pt-0">
        {isLoading ? (
          <AppointmentCardSkeleton />
        ) : isError ? (
          <p className="text-center py-20 text-sm">{error instanceof Error ? error.message : "Failed to load upcoming appointments. Please try again."}</p>
        ) : upcomingConsultation?.length === 0 ? (
          <p className="text-center py-8 text-gray-500 text-sm">
            No upcoming appointments found
          </p>
        ) : (
          upcomingConsultation
            ?.slice(0, 10)
            ?.map((consultation: GET_ALL_APPOINTMENTS) => {
              return (
                <div
                  key={consultation.id}
                  className="flex items-center justify-between py-4 border-t border-gray-200 first:border-t-0"
                >
                  <div className="flex">
                    <Image
                      src={consultation.doctor.profile.profilePicture || image}
                      alt={`${consultation.id} profile`}
                      width={40}
                      height={40}
                      className="w-[40px] h-[40px] rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col ml-3 flex-1 min-w-0">
                      <SmallestTitle>
                        {consultation?.doctor?.title || "N/A"}{" "}
                        {consultation?.doctor?.firstName || "N/A"}{" "}
                        {consultation?.doctor?.lastName || "N/A"}
                      </SmallestTitle>
                      <div className="flex items-center space-x-2 ">
                        <MinText className="text-red-800 font-medium">
                          {consultation?.time || "N/A"}
                        </MinText>
                        <MinText className="text-gray-500">|</MinText>
                        <MinText className="text-gray-500">
                          {consultation?.date || "N/A"}
                        </MinText>
                        <MinText className="text-gray-500">|</MinText>
                        <MinText className="text-gray-500">
                          {CapitalizeName(consultation?.consultationType.replaceAll("_", " ")) || "N/A"}
                        </MinText>
                      </div>
                      <MinText className="text-gray-500 truncate">
                        Patient: {consultation?.user?.firstName || "N/A"}{" "}
                        {consultation?.user?.lastName || "N/A"}
                      </MinText>
                    </div>
                  </div>
                  <button
                    className="font-semibold text-[14px] border p-2 rounded-md font-libre text-[#414651] cursor-pointer hover:text-red-800"
                    onClick={() =>
                      router.push(`${ROUTES.appointment}/${consultation.id}`)
                    }
                  >
                    View Details
                  </button>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default UpcomingConsultation;
