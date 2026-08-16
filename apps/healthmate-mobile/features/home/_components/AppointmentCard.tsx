"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Clock, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubTitle, SmallText } from "@/components/Reusable";
import { ROUTES } from "@/constants/route";
import { patientService } from "@/service/patientService";
import { CapitalizeName } from "@/constants/capitalizeName";
import useDate from "@/hooks/useDate";
import Image from 'next/image';
import profileFallback from '@/assets/Ellipse 165.png';

type Doctor = { firstName?: string; lastName?: string };

const getDoctorName = (doctor?: Doctor | null) => {
  if (!doctor) return "Doctor unavailable";
  const fullName = [CapitalizeName(doctor.firstName ?? ""), CapitalizeName(doctor.lastName ?? "")]
    .filter(Boolean)
    .join(" ");
  return fullName ? `Dr. ${fullName}` : "Doctor unavailable";
};

const getDoctorInitials = (doctor?: Doctor | null) => {
  if (!doctor) return "?";
  const initials = [doctor.firstName?.[0], doctor.lastName?.[0]].filter(Boolean).join("");
  return initials ? initials.toUpperCase() : "?";
};

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-[#F4F3FF] text-[#5924DC]",
  pending: "bg-[#FFFAEB] text-[#B54708]",
  cancelled: "bg-[#FEF3F2] text-[#B42318]",
  completed: "bg-[#ECFDF3] text-[#067647]",
};

const getStatusStyle = (status?: string) =>
  STATUS_STYLES[status?.toLowerCase() ?? ""] || "bg-[#F4F3FF] text-[#5924DC]";

/* ---------- Skeleton ---------- */

const SkeletonBlock = ({
  width,
  height,
  rounded = "rounded-md",
  className = "",
}: {
  width: number | `${number}%`;
  height: number;
  rounded?: string;
  className?: string;
}) => (
  <div
    className={`bg-gray-200 animate-pulse ${rounded} ${className}`}
    style={{
      width: typeof width === "number" ? `${width}px` : width,
      height: `${height}px`,
    }}
  />
);

const AppointmentCardSkeleton = () => (
  <div className="w-full p-[15px] border border-[#F2F2F2] rounded-[10px] bg-white">
    <div className="flex flex-row items-center mt-[5px] mb-[2px]">
      <SkeletonBlock width={50} height={50} rounded="rounded-full" className="shrink-0" />
      <div className="flex flex-row flex-1 justify-between items-center ml-[5px]">
        <div className="flex flex-col gap-2">
          <SkeletonBlock width={140} height={14} />
          <SkeletonBlock width={110} height={11} />
          <SkeletonBlock width={90} height={11} />
        </div>
        <SkeletonBlock width={60} height={24} rounded="rounded-md" className="shrink-0" />
      </div>
    </div>
    <div className="flex flex-row justify-between gap-[10px] border-t-2 border-[#F8F8F8] mt-[15px] pt-[14px]">
      <SkeletonBlock width="100%" height={38} rounded="rounded-lg" className="flex-1" />
      <SkeletonBlock width="100%" height={38} rounded="rounded-lg" className="flex-1" />
    </div>
  </div>
);

export default function AppointmentCard() {
  const router = useRouter();
  const { getReadableDate } = useDate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAppointments", 10, 1],
    queryFn: () => patientService.getAppointments(1, 1),
  });
  const appointment = data?.data?.[0];

  const errorMessage = error instanceof Error ? error.message : "Something went wrong";

  const handleViewDetails = () => {
    if (appointment) router.push(`/appointments/${appointment.id}`);
  };

  const handleReschedule = () => {
    if (appointment) router.push(`/home-screen/appointment/${appointment.id}/reschedule`);
  };

  const handleJoinCall = () => {
    if (appointment) router.push(`/home-screen/appointment/${appointment.id}/call`);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-[10px] mb-[10px]">
        <SubTitle>Recent Appointments</SubTitle>
        <button
          type="button"
          className="flex flex-row items-center"
          onClick={() => router.push(ROUTES.allApointments)}
        >
          <span className="text-[#DD2590] font-normal text-xs">See All</span>
          <ArrowRight size={15} color="#DD2590" />
        </button>
      </div>

      {isLoading ? (
        <AppointmentCardSkeleton />
      ) : isError ? (
        <div className="flex flex-col items-center p-4 border border-[#F1F1F1] rounded-md">
          <p className="font-lato text-[#414651] text-sm mt-2 text-center">Error loading appointment</p>
          <SmallText>{errorMessage}</SmallText>
        </div>
      ) : !appointment ? (
        <div className="flex flex-col items-center p-6 border border-[#F1F1F1] rounded-md">
          {/* <Inbox size={40} color="#717680" /> */}
          <span className="font-lato text-[#414651] text-sm mt-2 text-center">No appointment yet</span>
          <SmallText>Create an appointment</SmallText>
        </div>
      ) : (
        <div className="w-full p-[15px] border border-[#F2F2F2] rounded-[10px] bg-white">
          <button
            type="button"
            onClick={handleViewDetails}
            aria-label={`View appointment with ${getDoctorName(appointment?.doctor)}`}
            className="w-full text-left flex flex-row mt-[5px] mb-[2px]"
          >
            {/* <span className="w-[50px] h-[50px] rounded-full bg-[#FDF2FA] text-[#DD2590] flex items-center justify-center font-semibold shrink-0">
              {getDoctorInitials(appointment?.doctor)}
            </span> */}
            <div className="w-[70px] shrink-0">
              <Image
                src={profileFallback}
                alt={getDoctorInitials(appointment?.doctor)}
                className="w-[70px] h-[70px] rounded-full object-cover"
              />
            </div>
            <div className="flex flex-row flex-1 justify-between">
              <div className="ml-2.5 flex-1">
                <SubTitle>{getDoctorName(appointment?.doctor)}</SubTitle>
                <div className="flex items-center mt-[5px]">
                  <Clock size={13} color="#717680" />
                  <span className="ml-[3px]">
                    <SmallText>
                      {appointment.time} | {getReadableDate(appointment.date)}
                    </SmallText>
                  </span>
                </div>
                <div className="flex items-center">
                  <Video size={15} color="#717680" />
                  <span className="ml-[3px]">
                    <SmallText>
                      {CapitalizeName(appointment.consultationType).replaceAll("_", " ")}
                    </SmallText>
                  </span>
                </div>
              </div>
              <span className={`h-[35px] rounded-md p-[7px] text-xs shrink-0 ${getStatusStyle(appointment.status)}`}>
                {appointment.status}
              </span>
            </div>
          </button>

          <div className="flex flex-row justify-between gap-[10px] border-t-2 border-[#F8F8F8] mt-[15px] pt-[14px]">
            <button
              type="button"
              onClick={handleReschedule}
              className="flex-1 py-2 px-4 bg-[#FAFAFA] rounded-lg border border-[#D6D7DA] text-sm font-semibold text-[#252B37]"
            >
              Reschedule
            </button>
            <button
              type="button"
              onClick={handleJoinCall}
              className="flex-1 py-2 px-4 bg-[#DD2591] rounded-lg text-sm font-semibold text-[#F2F2F2]"
            >
              Join Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
