"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, MessageCircleMore, Video } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { patientService } from "@/service/patientService";
import { GetAppointment } from "@/lib/interface/get-appointments-interface";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
import AppointmentCardSkeleton from "@/components/AllAppointmntSkeleton";
import SearchInput from "@/components/SearchInput";
import { PageWrapper, SmallText, SubTitle } from "@/components/Reusable";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CapitalizeName } from "@/constants/capitalizeName";
import profileFallback from "@/assets/default.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "PENDING", label: "PENDING" },
  { value: "UPCOMING", label: "UPCOMING" },
  { value: "ONGOING", label: "ONGOING" },
  { value: "COMPLETED", label: "COMPLETED" },
  { value: "CANCELLED", label: "CANCELLED" },
];

const formatAppointmentDate = (date: string, time: string) => {
  const appointmentDate = new Date(date);
  const formattedDate = Number.isNaN(appointmentDate.getTime()) ? date : appointmentDate.toLocaleDateString();
  return `${time} | ${formattedDate}`;
};

const getDoctorName = (doctor: GetAppointment["doctor"]) => {
  if (!doctor) return "Doctor unavailable";
  if (doctor.fullName) return doctor.fullName;
  if (doctor.name) return doctor.name;
  const name = [doctor.firstName, doctor.lastName]
    .filter((value): value is string => Boolean(value))
    .map((value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
    .join(" ");
  return name || "Doctor unavailable";
};

const getDoctorImage = (doctor: GetAppointment["doctor"]) => doctor?.profile?.profilePicture || profileFallback;

const formatConsultationType = (consultationType: string) =>
  consultationType.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const AllAppointments = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<string | undefined>();
  const limit = 10;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchQuery(searchInput);
      setPage(1);
    }, 500);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["getAppointments", page, limit, searchQuery, activeStatus],
    queryFn: () => patientService.getAppointments(page, limit, searchQuery, activeStatus),
  });

  const appointments = data?.data ?? [];
  const meta = data?.meta;
  const canGoPrevious = meta ? meta.page > 1 : page > 1;
  const canGoNext = meta ? meta.page < meta.totalPages : false;

  const handleTabChange = (status: string) => {
    setActiveStatus(status === "all" ? undefined : status);
    setPage(1);
  };

  const renderBody = () => {
    return (
      <TableBody>
        {isLoading && [1, 2, 3, 4].map((key) => <TableRow key={key}><TableCell colSpan={4} className="p-3"><AppointmentCardSkeleton /></TableCell></TableRow>)}
        {isError && <TableRow><TableCell colSpan={4} className="py-10 text-center text-sm text-[#B42318]">{(error as Error).message || "Unable to load appointments"}</TableCell></TableRow>}
        {!isLoading && !isError && appointments.length === 0 && <TableRow><TableCell colSpan={4} className="py-10 text-center text-sm text-[#414651]">No appointments found for this department.</TableCell></TableRow>}
        {!isLoading && !isError && appointments.map((appointment, index) => {
          const { id, doctor, date, time, status, consultationType, approvalStatus } = appointment;
          return (
            <TableRow key={id} className="hover:bg-transparent">
              <TableCell colSpan={4} className="whitespace-normal p-3 ">
                <article onClick={() => router.push(`/appointments/${id}`)} className="cursor-pointer rounded-[10px] border border-[#F2F2F2] bg-white p-[15px] transition-opacity hover:opacity-90 active:opacity-75">
                  <div className="flex items-start gap-3">
                    <Image src={getDoctorImage(doctor)} alt={getDoctorName(doctor)} width={50} height={50} sizes="50px" priority={index === 0} className="h-[50px] w-[50px] shrink-0 rounded-full bg-[#F2F2F2] object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="py-1 "><SubTitle>{doctor?.title ? `${doctor.title}.` : "Dr."} {getDoctorName(doctor)}</SubTitle><SmallText>{doctor?.department?.replaceAll("_", " ") || "Department unavailable"}</SmallText></div>
                        <AppointmentStatusBadge status={status} />
                      </div>
                      <div className="">
                        <div className="flex items-center gap-1"><Clock size={13} color="#717680" /><SmallText>{formatAppointmentDate(date, time)}</SmallText></div>
                        <div className="flex items-center gap-1 pt-1"><Video size={13} color="#717680" /><SmallText>{formatConsultationType(consultationType)}</SmallText></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[15px] border-t-2 border-[#F8F8F8] pt-3 ">
                    {approvalStatus === "PENDING" ? <p className="text-sm text-[#717680] text-center">Once approved, you can message Dr. {CapitalizeName(doctor?.firstName)}.</p> : (
                      <button type="button" onClick={(event) => { event.stopPropagation(); router.push(`/appointments/message/${id}`); }} className="flex w-full items-center justify-center gap-1 rounded-lg border border-[#D6D7DA] bg-[#FAFAFA] px-4 py-2 text-sm font-semibold text-[#252B37]"><MessageCircleMore size={17} />Messages</button>
                    )}
                  </div>
                </article>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    )
  }
  return (
    <PageWrapper>
      <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:gap-4">

        {/* Search */}
        <div className="w-full sm:w-[350px] lg:w-[420px]">
          <SearchInput
            placeholder="Search for an appointment"
            value={searchInput}
            onChange={setSearchInput}
            className="w-full"
          />
        </div>

      </div>
      <Tabs defaultValue="all" className="w-full min-w-0 flex flex-col" onValueChange={handleTabChange}>
        <div className="w-full min-w-0 overflow-x-auto">
          <TabsList className="w-max max-w-none flex-nowrap">
            {STATUS_OPTIONS.map((status) => (
                <TabsTrigger key={status.value} value={status.value}>{status.label}</TabsTrigger>
            ))}
          </TabsList>
        </div>
        {STATUS_OPTIONS.map((status) => (
          <TabsContent key={status.value} value={status.value} className="w-full min-w-0">
            <div className="mb-[30px] overflow-hidden rounded-[10px] border border-[#F2F2F2] bg-white">
              <Table>{renderBody()}</Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {!isLoading && !isError && meta && <div className="mb-[30px] flex items-center justify-between rounded-[10px] border border-[#F2F2F2] bg-white p-3">
          <button type="button" disabled={!canGoPrevious} onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))} className={`rounded-lg px-4 py-2.5 ${canGoPrevious ? "bg-[#DD2591]" : "bg-[#D6D7DA]"}`}><span className="text-[13px] font-medium text-white">Previous</span></button>
          <p className="text-center text-[13px] text-[#717680]">Page {meta.page} of {Math.max(meta.totalPages, 1)}<br />{meta.total} appointments</p>
          <button type="button" disabled={!canGoNext} onClick={() => setPage((currentPage) => currentPage + 1)} className={`rounded-lg px-4 py-2.5 ${canGoNext ? "bg-[#DD2591]" : "bg-[#D6D7DA]"}`}><span className="text-[13px] font-medium text-white">Next</span></button>
        </div>}
    </PageWrapper>
  );
};

export default AllAppointments;
