"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Clock, Inbox, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubTitle, SmallText } from "@/components/Reusable";
import { ROUTES } from "@/constants/route";
import { patientService } from "@/service/patientService";

const getDoctorName = (doctor: { fullName?: string; name?: string; firstName?: string; lastName?: string } | null) => {
  if (!doctor) return "Doctor unavailable";
  return doctor.fullName || doctor.name || `Dr. ${[doctor.firstName, doctor.lastName].filter(Boolean).join(" ")}` || "Doctor unavailable";
};

export default function AppointmentCard() {
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAppointments", 1, 1],
    queryFn: () => patientService.getAppointments(1, 1),
  });
  const appointment = data?.data?.[0];

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-[10px] mb-[10px]">
        <SubTitle>Recent Appointments</SubTitle>
        <button type="button" className="flex flex-row items-center" onClick={() => router.push(ROUTES.allApointments)}>
          <span className="text-[#DD2590] font-normal text-xs">See All</span><ArrowRight size={15} color="#DD2590" />
        </button>
      </div>
      {isLoading ? <div className="h-[140px] rounded-[10px] bg-[#FAFAFA] animate-pulse" /> : isError ? (
        <div className="flex flex-col items-center p-4"><span className="text-sm">Error loading appointment</span><SmallText>{error.message}</SmallText></div>
      ) : !appointment ? (
        <div className="flex flex-col items-center p-4"><Inbox size={40} color="#717680" /><span className="mt-2 text-sm">No appointment yet</span><SmallText>Create an appointment</SmallText></div>
      ) : (
        <button type="button" onClick={() => router.push(`/home-screen/appointment/${appointment.id}`)} className="w-full text-left p-[15px] border border-[#F2F2F2] rounded-[10px] bg-white">
          <div className="flex flex-row content-center mt-[5px] mb-[2px]">
            <span className="w-[50px] h-[50px] rounded-full bg-[#FDF2FA] text-[#DD2590] flex items-center justify-center font-semibold">{getDoctorName(appointment.doctor).split(" ").slice(0, 2).map((value) => value[0]).join("")}</span>
            <div className="flex flex-row flex-1 justify-between content-center ml-[5px]">
              <div>
                <SubTitle>{getDoctorName(appointment.doctor)}</SubTitle>
                <div className="flex flex-row content-center mt-[5px]"><Clock size={13} color="#717680" /><span className="ml-[3px]"><SmallText>{appointment.time} | {new Date(appointment.date).toLocaleDateString()}</SmallText></span></div>
                <div className="flex flex-row content-center mt-[5px] mb-[5px]"><Video size={13} color="#717680" /><span className="ml-[3px]"><SmallText>{appointment.consultationType.replaceAll("_", " ")}</SmallText></span></div>
              </div>
              <span className="h-[35px] rounded-[10px] p-[10px] bg-[#F4F3FF] text-[#5924DC] text-xs">{appointment.status}</span>
            </div>
          </div>
          <div className="flex flex-row justify-between gap-[10px] border-t-2 border-[#F8F8F8] mt-[15px] pt-[14px]">
            <span className="py-2 px-4 bg-[#FAFAFA] rounded-lg border border-[#D6D7DA] text-sm font-semibold text-[#252B37]">Reschedule</span>
            <span className="py-2 px-4 bg-[#DD2591] rounded-lg text-sm font-semibold text-[#F2F2F2]">Join Call</span>
          </div>
        </button>
      )}
    </div>
  );
}
