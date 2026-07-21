"use client";

import { FlexWrapper, PageWrapper, TableTitle } from "@/lib/components/ui/Reusable";
import React, { useEffect, useState } from "react";
import { CloudUpload, Search } from "lucide-react";
import Image from "next/image";
import image from "@/assets/Image.png";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Input from "@/lib/components/Inputs/Input";
import MinSelectField from "@/lib/components/Inputs/MinSelectField";
import Paginate from "@/lib/components/ui/paginate";
import AppointmentTableSkeleton from "@/lib/components/ui/AppointmentTableSkeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";

import { Hospital_Admin } from "@/lib/service/service";
import { GET_ALL_APPOINTMENTS } from "@/lib/interface/get_all_appointyment";
import { STATUS } from "@/types/status";
import useToggle from "@/lib/hooks/useToggle";

const getStatusStyle = (status: string) => {
  switch (status) {
    case STATUS.COMPLETED:
      return "text-green-700 bg-green-100";
    case STATUS.PENDING:
      return "text-gray-700 bg-gray-100";
    case STATUS.CANCELLED:
    case STATUS.REJECTED:
      return "text-red-800 bg-red-100";
    default:
      return "text-gray-700 bg-gray-100";
  }
};

const Patients = () => {
  const router = useRouter();
  const { isToggle, handleToggle } = useToggle();

  const [searchInput, setSearchInput] = useState("");
  const [debounceSearchQuery, setDebounceSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<string | undefined>();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    total: 0,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearchQuery(searchInput);

      setPagination((prev) => ({
        ...prev,
        page: 1,
      }));
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "appointment",
      pagination.page,
      pagination.limit,
      debounceSearchQuery,
      activeStatus,
    ],
    queryFn: () =>
      Hospital_Admin.getAllAppointments(
        pagination.page,
        pagination.limit,
        debounceSearchQuery,
        activeStatus
      ),
  });

  useEffect(() => {
    if (data?.meta) {
      setPagination((prev) => ({
        ...prev,
        total: data.meta.total,
        totalPages: data.meta.totalPages,
      }));
    }
  }, [data]);

  const appointmentData: GET_ALL_APPOINTMENTS[] = data?.data ?? [];

  const patients = appointmentData.filter(
    (patient) => patient.status !== STATUS.PENDING
  );

  const handleSelect = (option: string | undefined) => {
    setActiveStatus(option);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));

    handleToggle();
  };

  const handleNext = (id: number) => {
    router.push(`/patients/${id}`);
  };

  const statusOptions = [STATUS.COMPLETED, STATUS.PENDING, STATUS.CANCELLED];

  return (
    <PageWrapper>
      <FlexWrapper>
        <div className=" w-full rounded-lg border border-borderColor bg-white">
          <div className="flex items-center justify-between border-b border-borderColor100 p-4">
            <TableTitle>All Patients</TableTitle>

            <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-borderColor100 px-3 py-2">
              <CloudUpload size={15} />
              <span className="font-inter text-[14px] font-medium text-[#414651]">
                Export
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3 px-4 py-4">
            <Input
              value={searchInput}
              placeholder="Search by patient, doctor or health concern"
              onChange={(e) => setSearchInput(e.target.value)}
              icon={<Search size={17} color="#C11574" />}
            />

            <MinSelectField
              label="Status"
              value={activeStatus}
              show={isToggle}
              options={statusOptions}
              onSelect={handleSelect}
              onClick={handleToggle}
              className="w-fit"
            />
          </div>

          <Table>
            <TableHeader className="border-t border-borderColor text-[#535862]">
              <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium text-[#535862]">
                <TableHead>Patient Name</TableHead>
                <TableHead>Doctor Name</TableHead>
                <TableHead>Health Concern</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            {isLoading ? (
              <AppointmentTableSkeleton />
            ) : (
              <TableBody>
                {isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-8 text-center text-sm text-red-600"
                    >
                      {error.message}
                    </TableCell>
                  </TableRow>
                ) : patients.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-8 text-center text-sm text-gray-500"
                    >
                      No patients found
                    </TableCell>
                  </TableRow>
                ) : (
                  patients.map((patient) => (
                    <TableRow
                      key={patient.id}
                      className="cursor-pointer hover:bg-[#FAFBFF]"
                      onClick={() => handleNext(patient.id)}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <Image
                            src={image}
                            alt="Patient"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />

                          <div className="ml-2">
                            <p className="font-inter text-[12px] text-grey-20">
                              {`${patient.user?.firstName || ""} ${
                                patient.user?.lastName || ""
                              }`.trim() || "N/A"}
                            </p>
                            <p className="font-inter text-[12px] text-grey-20">
                              {patient.user?.email || "-"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <p className="font-inter text-[12px] text-grey-20">
                          {`${patient.doctor?.firstName || ""} ${
                            patient.doctor?.lastName || ""
                          }`.trim() || "N/A"}
                        </p>
                        <p className="font-inter text-[12px] text-grey-20">
                          {patient.doctor?.email || "-"}
                        </p>
                      </TableCell>

                      <TableCell className="font-inter text-[12px] text-grey-20">
                        {patient.healthConcern || "-"}
                      </TableCell>

                      <TableCell>
                        <p className="font-inter text-[12px] text-grey-20">
                          {patient.date || "-"}
                        </p>
                        <p className="font-inter text-[12px] text-grey-20">
                          {patient.time || "-"}
                        </p>
                      </TableCell>

                      <TableCell className="font-inter text-[12px] text-grey-20">
                        {patient.consultationType || "-"}
                      </TableCell>

                      <TableCell className="font-inter text-[12px] text-grey-20">
                        ₦{patient.amount?.toLocaleString() || "0"}
                      </TableCell>

                      <TableCell>
                        <span
                          className={`w-fit rounded-full px-3 py-1 font-inter text-[12px] font-normal ${getStatusStyle(
                            patient.status
                          )}`}
                        >
                          {patient.status || "N/A"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext(patient.id);
                          }}
                          className="font-inter text-[12px] font-medium text-red-800"
                        >
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            )}
          </Table>

          <div className="border-t border-borderColor px-4 py-4">
            <Paginate />
          </div>
        </div>
      </FlexWrapper>
    </PageWrapper>
  );
};

export default Patients;