"use client";

import { FlexWrapper, Infos, PageWrapper } from "@/lib/components/ui/Reusable";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import profileImage from "@/assets/Image (1).png";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Doctor } from "@/lib/constant/service";
import { useParams } from "next/navigation";
import InputField from "@/lib/components/ui/InputField";
import { useModal } from "@/lib/components/modal/Modal";
import { AxiosError } from "axios";
import { STATUS } from "@/types/status";
import DetailSkeleton from "@/lib/components/ui/DetailsSkeleton";
// import { Appointment } from "@/interface/doctor-apppointment.interface";
import PatientCardSkeleton from "@/lib/components/ui/PatientCardSkeleton";
import CreateSupport from "./CreateSupport";

const Page = () => {
  const { openModal } = useModal();
  const params = useParams();
  const id = String(params.slug);
console.log(id)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAppointmentDetails", id],
    queryFn: () => Doctor.getAppointmentDetail(id),
    enabled: !!id,
  });

  const appointmentDetails = data?.data;
  
  if (isError) {
    return (
      <div className="text-center  py-20 text-grey-500 flex items-center justify-center min-h-screen">
        Failed to load appointment details. {error.message}
      </div>
    );
  }

  return (
    <PageWrapper>
      <FlexWrapper>
        <div className="bg-white p-6 border border-borderColor rounded-lg mt-5">
          <div className="flex justify-between gap-4">
            {isLoading ? (
              <PatientCardSkeleton />
            ) : (
              <div className="flex">
                <Image
                  src={profileImage}
                  alt="Profile Image"
                  className="h-fit w-[50px]"
                />

                <div className="ml-2">
                  <p className="font-medium text-[18px] text-grey-800">
                    {`${appointmentDetails?.user?.firstName || ""} ${
                      appointmentDetails?.user?.lastName || ""
                    }`.trim() || "-"}
                  </p>

                  <p className="font-normal text-[14px] text-grey-20 pt-[2px]">
                    34 y/o — Female
                  </p>

                  <p className="font-normal text-[14px] text-grey-20 pt-[2px]">
                    {appointmentDetails?.user?.email || "-"}
                  </p>
                </div>
              </div>
            )}

            {isLoading ? (
              <div className="h-7 w-24 rounded-full bg-gray-200 animate-pulse" />
            ) : (
              <p className="text-[#414651] bg-[#f5f5f5] font-medium font-inter text-[14px] rounded-full px-5 py-1 h-fit">
                {appointmentDetails?.status || "N/A"}
              </p>
            )}
          </div>
        </div>

        {isLoading ? (
          <DetailSkeleton />
        ) : (
          <div className="space-y-4 mt-5">
            <div className="border border-borderColor p-4 rounded-lg space-y-2">
              <Infos label="Consultation Date" value={appointmentDetails?.date || "-"} />
              <Infos label="Consultation Time" value={appointmentDetails?.time || "-"} />
              <Infos
                label="Consultation Type"
                value={appointmentDetails?.consultationType.charAt(0).toUpperCase() + appointmentDetails?.consultationType.slice(1).replaceAll("_", " ") || "-"}
              />
              {/* <Infos label='Consultation Type' value={appointmentDetails?.consultationType.charAt(0).toUpperCase() + appointmentDetails?.consultationType.slice(1).replaceAll("_", " ")}/> */}
              <Infos
                label="Primary Health Concern"
                value={appointmentDetails?.healthConcern || "-"}
              />
              <Infos
                label="Consultation Fee"
                value={
                  appointmentDetails?.amount
                    ? appointmentDetails.amount.toLocaleString()
                    : "-"
                }
              />
            </div>

            <div className="border border-borderColor p-4 rounded-lg space-y-2">
              <Infos
                label="Patient Name"
                value={`${appointmentDetails?.user?.firstName || ""} ${
                  appointmentDetails?.user?.lastName || ""
                }`.trim() || "-"}
              />
              <Infos
                label="Patient Email"
                value={appointmentDetails?.user?.email || "-"}
              />
              <Infos
                label="Doctor Name"
                value={`${appointmentDetails?.doctor?.firstName.charAt(0).toUpperCase() + appointmentDetails?.doctor?.firstName.slice(1).toLowerCase() || ""} ${
                  appointmentDetails?.doctor?.lastName.charAt(0).toUpperCase() + appointmentDetails?.doctor?.lastName.slice(1).toLowerCase() || ""
                }`.trim() || "-"}
              />
              <Infos
                label="Doctor Email"
                value={appointmentDetails?.doctor?.email || "-"}
              />
            </div>

            <div className="border border-borderColor p-4 rounded-lg space-y-2">
              <Infos
                label="Hospital Name"
                value={appointmentDetails?.hospital?.hospitalName || "-"}
              />
              <Infos
                label="Hospital Email"
                value={appointmentDetails?.hospital?.email || "-"}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-7">
          {!isLoading && appointmentDetails?.status === STATUS.PENDING && (
            <button
              className="px-4 py-2 bg-red-800 rounded-lg font-inter text-white text-[14px]"
              onClick={() =>
                openModal(
                  <ApproveAppointment />,
                  {
                    title: "Approve Appointment",
                    className: "max-w-lg",
                    onClose: () => {},
                  }
                )
              }
            >
              Update Appointment Status
            </button>
          )}
          <button 
            className="w-fit bg-red-800 rounded-lg text-white text-sm px-5 py-2"
            onClick={() => {
              openModal(
                <CreateSupport appointmentDetails={appointmentDetails} />, {
                  title:
                  'Create Support Ticket',
                  className: 'max-w-lg',
                  onClose: () => {},
                }
              )
            }}
          >
            Report an Issue
          </button>
        </div>
      </FlexWrapper>
    </PageWrapper>
  );
};

export default Page;

type ApprovePayload = {
  appointment_id: string;
  payload: {
    note: string;
    status: string;
  };
};

const ApproveAppointment = () => {
  const [inputValue, setInputValue] = useState("");
  const params = useParams();
  const appointment_id = String(params.slug);
  const { closeModal } = useModal();

  const mutation = useMutation({
    mutationFn: ({ appointment_id, payload }: ApprovePayload) =>
      Doctor.approveAppointment(appointment_id, payload),
    onSuccess: () => {
      closeModal();
    },
    onError: (error: AxiosError) => {
      console.error("Approval failed:", error?.response?.data || error);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ appointment_id, payload }: ApprovePayload) =>
      Doctor.rejectAppointment(appointment_id, payload),
    onSuccess: () => {
      closeModal();
    },
    onError: (error: AxiosError) => {
      console.error("Rejection failed:", error?.response?.data || error);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      appointment_id,
      payload: {
        note: inputValue,
        status: STATUS.COMPLETED,
      },
    });
  };

  const handleSubmitRejection = (e: FormEvent) => {
    e.preventDefault();

    rejectMutation.mutate({
      appointment_id,
      payload: {
        note: inputValue,
        status: STATUS.REJECTED,
      },
    });
  };

  const isDisabled = inputValue.trim() === "";
  const isApproving = mutation.isPending;
  const isRejecting = rejectMutation.isPending;

  return (
    <div>
      <InputField
        placeholder="I will have a proper discussion with you"
        label="Consultation Note"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        name="note"
      />

      <div className="flex items-center justify-between mt-7">
        {!isApproving && (
          <button
            className={`px-5 py-2 rounded-lg font-inter text-white text-[14px] ${
              isDisabled || isRejecting
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-red-800"
            }`}
            onClick={handleSubmitRejection}
            disabled={isDisabled || isRejecting}
          >
            {isRejecting ? "Rejecting..." : "Reject Appointment"}
          </button>
        )}

        {!isRejecting && (
          <button
            className={`px-5 py-2 rounded-lg font-inter text-white text-[14px] ${
              isDisabled || isApproving
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-red-800"
            }`}
            onClick={handleSubmit}
            disabled={isDisabled || isApproving}
          >
            {isApproving ? "Approving..." : "Approve Appointment"}
          </button>
        )}
      </div>
    </div>
  );
};