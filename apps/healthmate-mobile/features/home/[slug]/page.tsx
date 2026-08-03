"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Video, ChevronRight, XCircle, MapPin } from "lucide-react";
import { patientService } from "@/service/patientService";
import { GetAppointment } from "@/lib/interface/get-appointments-interface";
import CreateSupportTicket from "./CreateSupport";
import AppointmentDetailsSkeleton from "@/components/AppointmentDetailSkeleton";
import { BtnFlex, Card, JoinBtn, MinTitle, PageWrapper, RescheduleBtn } from "@/components/Reusable";
import { doctorProfileRoute, ROUTES } from "@/constants/route";
import { useModal } from "@/store/Modal";
import profile from "@/assets/images/Mobile.png";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";

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

const getDoctorSpecialty = (doctor: GetAppointment["doctor"]) => {
  return doctor?.specialty || doctor?.specialization || "Doctor";
};

const getDoctorImage = (doctor: GetAppointment["doctor"]) => {
  return doctor?.profileImage || doctor?.image || null;
};

// `profile` may be a plain string path or a Next.js static-import object
// depending on your image setup — this handles either.
const resolveImageSrc = (src: string | null) => {
  if (src) return src;
  return typeof profile === "string" ? profile : (profile as { src: string }).src;
};

const formatAppointmentDate = (date?: string, time?: string) => {
  if (!date && !time) return "N/A";

  const appointmentDate = date ? new Date(date) : null;
  const formattedDate =
    appointmentDate && !Number.isNaN(appointmentDate.getTime())
      ? appointmentDate.toLocaleDateString()
      : date;

  return [formattedDate, time].filter(Boolean).join(" at ");
};

const formatConsultationType = (consultationType?: string) => {
  if (!consultationType) return "N/A";

  return (
    consultationType.charAt(0).toUpperCase() +
    consultationType.slice(1).toLocaleLowerCase().replaceAll("_", " ")
  );
};

const AppointmentDetails = () => {
  const params = useParams();
  const rawId = params?.slug;
  const appointmentId = Array.isArray(rawId) ? rawId[0] : rawId;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();

  const {
    data: appointmentResponse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getAppointmentById", appointmentId],
    queryFn: () => patientService.getAppointmentById(appointmentId as string),
    enabled: !!appointmentId,
  });

  const appointmentDetails = appointmentResponse?.data ?? null;

  const cancelAppointment = useMutation({
    mutationFn: (id: string) => patientService.cancelAppointment(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["getAppointmentById", appointmentId] }),
        queryClient.invalidateQueries({ queryKey: ["getAppointments"] }),
      ]);
    },
  });

  const doctorImage = appointmentDetails ? getDoctorImage(appointmentDetails.doctor) : null;

  const detailItems = [
    {
      text: appointmentDetails?.note || "No consultation note added yet for this appointment.",
      title: "About",
    },
    {
      text: formatAppointmentDate(appointmentDetails?.date, appointmentDetails?.time),
      title: "Date & Time",
    },
    {
      text: formatConsultationType(appointmentDetails?.consultationType),
      title: "Consultation Type",
      icon: <Video size={13} color="#717680" />,
    },
    {
      text: appointmentDetails?.healthConcern || "No health concern provided.",
      title: "Health Concern",
    },
  ];

  const handleViewProfile = () => {
    if (!appointmentDetails?.doctor?.id) return;
    router.push(doctorProfileRoute(appointmentDetails.doctor.id));
  };

  const canCancelAppointment =
    appointmentDetails?.status?.toUpperCase() === "PENDING" ||
    appointmentDetails?.status?.toUpperCase() === "UPCOMING";

  const handleCancelAppointment = () => {
    if (!appointmentId) return;

    openModal(
      <div className="flex flex-col gap-3">
        <p className="text-sm text-[#414651]">
          This will cancel your appointment. This action cannot be undone.
        </p>
        <div className="flex flex-row gap-2 mt-2">
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 py-3 rounded-lg border border-[#D6D7DA] bg-[#FAFAFA] text-sm font-semibold text-[#252B37]"
          >
            Keep booking
          </button>
          <button
            type="button"
            onClick={() => {
              cancelAppointment.mutate(appointmentId);
              closeModal();
            }}
            className="flex-1 py-3 rounded-lg bg-[#B42318] text-sm font-semibold text-white"
          >
            Cancel booking
          </button>
        </div>
      </div>,
      { title: "Cancel booking?", presentation: "center" }
    );
  };

  const handleReportIssue = () => {
    openModal(<CreateSupportTicket appointmentId={appointmentId as string} />, {
      title: "Create Support Ticket",
      description: "",
      onClose: () => {},
    });
  };

  return (
    <PageWrapper>
      {isLoading && <AppointmentDetailsSkeleton />}

      {isError && (
        <div className="flex flex-col items-center justify-center px-5 py-10">
          <p className="font-lato text-sm text-[#B42318] text-center">
            {(error as Error).message || "Unable to load appointment"}
          </p>
        </div>
      )}

      {!isLoading && !isError && !appointmentDetails && (
        <div className="flex flex-col items-center justify-center px-5 py-10">
          <p className="font-lato text-sm text-[#414651] mt-2.5 text-center">
            Appointment not found
          </p>
        </div>
      )}

      {!isLoading && !isError && appointmentDetails && (
        <>
          <div className="mb-5 flex flex-row bg-white p-4 rounded-[10px] border border-[#F2F2F2]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolveImageSrc(doctorImage)}
              alt={getDoctorName(appointmentDetails.doctor)}
              className="w-20 h-20 rounded-full border-2 border-[#E8E8E8] object-cover"
            />
            <div className="ml-4 flex-1 flex flex-col justify-center">
              <MinTitle>{getDoctorName(appointmentDetails.doctor)}</MinTitle>
              <p className="font-inter text-sm font-normal text-[#C11574] my-1.5">
                {getDoctorSpecialty(appointmentDetails.doctor)}
              </p>
              <div className="flex flex-row items-center">
                <MapPin size={16} color="#666" />
                <p className="font-libre-regular text-sm text-[#666] ml-1 font-normal">
                  {appointmentDetails.hospital?.hospitalName || "Hospital unavailable"}
                </p>
              </div>
            </div>
          </div>

          <Card>
            <div className="flex flex-col items-start gap-2 py-2">
              <p className="font-lato text-sm text-[#414651] font-medium">Status</p>
              <AppointmentStatusBadge status={appointmentDetails.status} />
            </div>
            <div className="h-px bg-[#F5F5F5] mt-3" />
            {detailItems.map((item, index) => {
              const { text, title, icon } = item;
              const isLastItem = index === detailItems.length - 1;

              return (
                <div key={title} className="py-2">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-lato text-sm text-[#414651] font-medium mb-1">{title}</p>
                    <div className="flex flex-row items-center">
                      {icon && <span className="mr-1.5">{icon}</span>}
                      <p className="font-lato text-xs text-[#414651] font-normal not-italic">
                        {text}
                      </p>
                    </div>
                  </div>
                  {!isLastItem && <div className="h-px bg-[#F5F5F5] mt-3" />}
                </div>
              );
            })}
          </Card>

          <Card>
            <button
              type="button"
              onClick={() => router.push(ROUTES.messages)}
              className="w-full flex flex-row items-center justify-between py-2 text-left"
            >
              <div>
                <p className="font-lato text-sm text-[#414651] font-medium mb-1">Chat Doctor</p>
                <p className="font-lato text-xs text-[#414651] font-normal">
                  Send a message to your doctor
                </p>
              </div>
              <ChevronRight size={18} color="#717680" />
            </button>
            <div className="h-px bg-[#F5F5F5] mt-3" />

            <button
              type="button"
              onClick={handleReportIssue}
              className="w-full flex flex-row items-center justify-between py-2 text-left"
            >
              <div>
                <p className="font-lato text-sm text-[#414651] font-medium mb-1">
                  Report an Issue
                </p>
                <p className="font-lato text-xs text-[#414651] font-normal">
                  Get help with this appointment
                </p>
              </div>
              <ChevronRight size={18} color="#717680" />
            </button>
            <div className="h-px bg-[#F5F5F5] mt-3" />

            <button
              type="button"
              aria-disabled={!canCancelAppointment || cancelAppointment.isPending}
              disabled={!canCancelAppointment || cancelAppointment.isPending}
              onClick={handleCancelAppointment}
              className={`w-full flex flex-row items-center justify-between py-2 text-left disabled:cursor-not-allowed ${
                !canCancelAppointment || cancelAppointment.isPending ? "opacity-50" : ""
              }`}
            >
              <div>
                <p className="font-lato text-sm text-[#B42318] font-medium mb-1">
                  {cancelAppointment.isPending ? "Cancelling booking..." : "Cancel Booking"}
                </p>
                <p className="font-lato text-xs text-[#414651] font-normal">
                  {canCancelAppointment
                    ? "Cancel this appointment"
                    : "This appointment can no longer be cancelled"}
                </p>
              </div>
              <XCircle size={18} color="#B42318" />
            </button>

            {cancelAppointment.isError && (
              <p className="font-lato text-xs text-[#B42318] mt-2">
                {(cancelAppointment.error as Error).message ||
                  "Unable to cancel this booking. Please try again."}
              </p>
            )}
          </Card>

          <BtnFlex>
            <RescheduleBtn _fn={handleViewProfile}>Reschedule</RescheduleBtn>
            <JoinBtn _fn={() => router.push(ROUTES.home)}>Join Call</JoinBtn>
          </BtnFlex>
        </>
      )}
    </PageWrapper>
  );
};

export default AppointmentDetails;
