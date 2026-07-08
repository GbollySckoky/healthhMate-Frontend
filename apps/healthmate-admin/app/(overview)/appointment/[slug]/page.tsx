"use client";

import {
  Card,
  FlexWrapper,
  Infos,
  NoteCard,
  PageWrapper,
  StatusInfo,
} from "@/lib/components/ui/Reusable";
import { Hospital_Admin } from "@/lib/service/service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const AppointmentDetailsSkeleton = () => {
  return (
    <div className="animate-pulse space-y-5">
      {[4, 3, 2].map((rows, index) => (
        <Card key={index}>
          {index !== 0 && <div className="mb-4 h-5 w-44 rounded bg-gray-200" />}

          <div className="space-y-3">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="flex items-center justify-between gap-4"
              >
                <div className="h-3.5 w-32 rounded bg-gray-200" />
                <div className="h-3.5 w-44 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </Card>
      ))}

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-lg border border-borderColor bg-white p-3"
        >
          <div className="mb-3 h-4 w-40 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="mt-2 h-4 w-3/4 rounded bg-gray-100" />
        </div>
      ))}
    </div>
  );
};

const Page = () => {
  const params = useParams();
  const id = Number(params?.slug);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAppointmentDetails", id],
    queryFn: () => Hospital_Admin.getAppointmentDetails(id),
    enabled: !!id,
  });

  const appointment = data?.data;

  if (isError) {
    return (
      <PageWrapper>
        <FlexWrapper>
          <div className="py-20 text-center text-sm text-grey-20">
            Failed to load appointment details. {error.message}
          </div>
        </FlexWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <FlexWrapper>
        {isLoading ? (
          <AppointmentDetailsSkeleton />
        ) : (
          <>
            <Card>
              <StatusInfo label="Status" value={appointment?.status || "-"} />
              <Infos
                label="Date & Time"
                value={
                  appointment?.date && appointment?.time
                    ? `${appointment.date} at ${appointment.time}`
                    : "-"
                }
              />
              <Infos label="Duration" value={appointment?.duration || "-"} />
              <Infos
                label="Consultation Type"
                value={appointment?.consultationType || "-"}
              />
               <Infos
                label="Consultation Fee"
                value={appointment?.amount.toLocaleString() || "-"}
              />
            </Card>

            <Card className="mt-5">
              <p className="mb-3 font-libre text-[18px] font-semibold">
                Doctor Information
              </p>

              <Infos
                label="Name"
                value={`${appointment?.doctor?.firstName || ""} ${
                  appointment?.doctor?.lastName || ""
                }`.trim() || "-"}
              />
              <Infos
                label="Specialty"
                value={appointment?.doctor?.profile?.specialization || "-"}
              />
              <Infos label="Email" value={appointment?.doctor?.email || "-"} />
              <Infos label="Gender" value={appointment?.doctor?.gender || "-"} />
            </Card>

            <Card className="mt-5">
              <p className="mb-3 font-libre text-[18px] font-semibold">
                Patient Information
              </p>

              <Infos
                label="Name"
                value={`${appointment?.user?.firstName || ""} ${
                  appointment?.user?.lastName || ""
                }`.trim() || "-"}
              />
              <Infos label="Email" value={appointment?.user?.email || "-"} />
              {/* <Infos label="Email" value={appointment?.user?.profile ? appointment?.user?.profile?.gender : "-"} />
              <Infos label="Email" value={appointment?.user?.profile ? appointment?.user?.profile?.healthCondition : "-"} /> */}
            </Card>

            <NoteCard
              className="mt-5"
              label="Patient Note"
              value={appointment?.healthConcern || "-"}
            />

            <NoteCard
              className="mt-5"
              label="Consultation Note and Next Step"
              value={appointment?.note || "-"}
            />

            <div className="mt-5 rounded-lg border border-borderColor bg-white p-3">
              <p className="font-lato text-[16px] font-normal text-[#535862]">
                Rating & Feedback
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-2"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <p className="mt-2 font-lato text-[18px] font-medium text-grey-20">
                {appointment?.feedback ||
                  "No feedback has been submitted for this appointment yet."}
              </p>
            </div>
          </>
        )}
      </FlexWrapper>
    </PageWrapper>
  );
};

export default Page;