"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, Video } from "lucide-react";
import { patientService } from "@/service/patientService";
import { useQuery } from "@tanstack/react-query";
import { GetAppointment } from "@/lib/interface/get-appointments-interface";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
import { PageWrapper, SmallText, SubTitle } from "@/components/Reusable";
import AppointmentCardSkeleton from "@/components/AllAppointmntSkeleton";
import SearchInput from "@/components/SearchInput";

const formatAppointmentDate = (date: string, time: string) => {
  const appointmentDate = new Date(date);
  const formattedDate = Number.isNaN(appointmentDate.getTime())
    ? date
    : appointmentDate.toLocaleDateString();

  return `${time} | ${formattedDate}`;
};

const getDoctorName = (doctor: GetAppointment["doctor"]) => {
  if (!doctor) return "Doctor unavailable";
  if (doctor.fullName) return doctor.fullName;
  if (doctor.name) return doctor.name;

  const name = [doctor.firstName, doctor.lastName]
    .filter((value): value is string => Boolean(value))
    .map((value) => value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase())
    .join(" ");
  return name || "Doctor unavailable";
};

const getDoctorImage = (doctor: GetAppointment["doctor"]) => {
  return doctor?.profileImage || doctor?.image || "https://picsum.photos/seed/696/3000/2000";
};

const AllApointments = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchInput, setSearchInput] = useState("");
  const [searchDebounceQuery, setSearchDebounceQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounceQuery(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["getAppointments", page, limit, searchDebounceQuery],
    queryFn: () => patientService.getAppointments(page, limit, searchDebounceQuery),
  });

  const appointments = data?.data ?? [];
  const meta = data?.meta;
  const canGoPrevious = meta ? meta.page > 1 : page > 1;
  const canGoNext = meta ? meta.page < meta.totalPages : false;

  const handleAppointmentPress = (id: number) => {
    router.push(`/home-screen/appointment/${id}`);
  };

  return (
    <PageWrapper>
      <SearchInput
        placeholder="Search for a doctor"
        value={searchInput}
        onChange={setSearchInput}
      />
      <div className="mb-[30px]">
        {isLoading && (
          <div>
            {[1, 2, 3, 4].map((key) => (
              <AppointmentCardSkeleton key={key} />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="font-inter-medium text-sm text-[#B42318] text-center">
              {(error as Error).message || "Unable to load appointments"}
            </p>
          </div>
        )}

        {!isLoading && !isError && appointments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="font-inter-medium text-sm text-[#414651] mt-2">
              No appointments found
            </p>
          </div>
        )}

        {!isLoading &&
          !isError &&
          appointments.map((appointment) => {
            const { id, doctor, date, time, status, consultationType } = appointment;
            return (
              <button
                type="button"
                key={id}
                onClick={() => handleAppointmentPress(id)}
                className="w-full text-left p-[15px] border border-[#F2F2F2] rounded-[10px] bg-white mb-5 mt-2.5 block active:opacity-75 transition-opacity"
              >
                <div className="flex flex-row mt-[5px] mb-[2px]">
                  <div className="w-[50px] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getDoctorImage(doctor)}
                      alt={getDoctorName(doctor)}
                      className="w-[50px] h-[50px] rounded-full object-cover bg-[#0553]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-row flex-1 justify-between">
                    <div className="ml-[5px]">
                      <SubTitle>{getDoctorName(doctor)}</SubTitle>
                      <div className="flex flex-row items-center mt-[5px]">
                        <span className="mr-[3px]">
                          <Clock size={13} color="#717680" />
                        </span>
                        <SmallText>{formatAppointmentDate(date, time)}</SmallText>
                      </div>
                      <div className="flex flex-row items-center mt-[5px]">
                        <span className="mr-[3px]">
                          <Video size={13} color="#717680" />
                        </span>
                        <SmallText>
                          {consultationType.charAt(0).toUpperCase() +
                            consultationType.slice(1).toLocaleLowerCase().replaceAll("_", " ")}
                        </SmallText>
                      </div>
                    </div>
                    <AppointmentStatusBadge status={status} />
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-[10px] border-t-2 border-t-[#F8F8F8] mt-[15px]">
                  <span className="py-2 px-4 bg-[#FAFAFA] rounded-lg border border-[#D6D7DA] mt-[14px] text-sm font-semibold text-[#252B37] text-center flex-1">
                    Reschedule
                  </span>
                  <span className="py-2 px-4 bg-[#DD2591] rounded-lg mt-[14px] text-sm font-semibold text-[#F2F2F2] text-center flex-1">
                    Join Call
                  </span>
                </div>
              </button>
            );
          })}

        {!isLoading && !isError && meta && (
          <div className="flex flex-row items-center justify-between mt-2">
            <button
              type="button"
              disabled={!canGoPrevious}
              onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
              className={`rounded-lg px-4 py-2.5 ${
                canGoPrevious ? "bg-[#DD2591]" : "bg-[#D6D7DA]"
              }`}
            >
              <span className="font-inter-medium text-white text-[13px]">Previous</span>
            </button>
            <p className="font-inter-medium text-[#717680] text-[13px] text-center whitespace-pre-line">
              {`Page ${meta.page} of ${Math.max(meta.totalPages, 1)}\n${meta.total} appointments`}
            </p>
            <button
              type="button"
              disabled={!canGoNext}
              onClick={() => setPage((currentPage) => currentPage + 1)}
              className={`rounded-lg px-4 py-2.5 ${canGoNext ? "bg-[#DD2591]" : "bg-[#D6D7DA]"}`}
            >
              <span className="font-inter-medium text-white text-[13px]">Next</span>
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default AllApointments;
