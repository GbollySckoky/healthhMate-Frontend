"use client";

import { PageWrapper } from "@/components/ui/Reusable";
import { FlexWrapper } from "@/lib/components/ui/Reusable";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Appointments from "./Appointments";
import Image from "next/image";
import image from "@/assets/Image.png";
import { Trash2 } from "lucide-react";
import Overview from "./Overview";
import { useQuery } from "@tanstack/react-query";
import { Hospital_Admin } from "@/lib/service/service";
import { GET_ALL_APPOINTMENTS } from "@/lib/interface/get_all_appointyment";
import { STATUS } from "@/types/status";
import { useParams } from "next/navigation";
import PatientHeaderSkeleton from "@/components/ui/PatientHeaderSkeleton";


const Page = () => {
  const params = useParams();
  const id = Number(params.slug);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["appointment"],
    queryFn: () => Hospital_Admin.getAllAppointments(),
  });

  const appointmentData: GET_ALL_APPOINTMENTS[] = data?.data ?? [];

  const patients = appointmentData.filter(
    (patient) => patient.status !== STATUS.PENDING
  );

  const patient = patients.find((patient) => patient.id === id);

  if (isError) {
    return (
      <PageWrapper>
        <div className="py-20 text-center text-sm text-red-600">
          Failed to load patient details. {error.message}
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <FlexWrapper>
        <div className="mt-5 rounded-lg border border-borderColor bg-white p-6">
          {isLoading ? (
            <PatientHeaderSkeleton />
          ) : (
            <div className="mb-3 flex items-center justify-between border-b border-borderColor pb-6">
              <div className="flex items-center">
                <Image
                  src={image}
                  alt="Patient"
                  className="h-[50px] w-[50px] rounded-full"
                />

                <div className="ml-2">
                  <p className="mb-1 font-libre text-[14px] font-medium text-grey-800">
                    {`${patient?.user?.firstName || ""} ${
                      patient?.user?.lastName || ""
                    }`.trim() || "-"}
                  </p>

                  <p className="font-inter text-[12px] text-grey-20">
                    {patient?.user?.email || "-"}
                  </p>
                </div>
              </div>

              <button className="flex cursor-pointer items-center rounded-lg border border-red-700 px-3 py-1 font-inter text-[14px] font-semibold text-red-700">
                <Trash2 size={15} className="mr-2" />
                Delete Patient
              </button>
            </div>
          )}

          <Tabs defaultValue="overview" className="mt-4 bg-white">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Overview patient={patient} isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="appointments">
              <Appointments
                // patient={patient}
                // appointmentData={appointmentData}
                // isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </FlexWrapper>
    </PageWrapper>
  );
};

export default Page;