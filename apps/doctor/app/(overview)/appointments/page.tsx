"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import { FlexWrapper, PageWrapper, TableTitle } from "@/lib/components/ui/Reusable";
import Input from "@/lib/components/ui/Input";
import { Search } from "lucide-react";
// import Calendar from "@/lib/components/ui/DateCalendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import { Doctor } from "@/lib/constant/service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Paginate from "@/lib/components/ui/Paginate";
import { Appointment } from "@/lib/interface/doctor-apppointment.interface";
import { Pagination } from "@/lib/interface/pagination.interfac";
import AppointmentTableSkeleton from "@/lib/components/ui/AppointmentTableSkeleton";
import { getStatusStyle } from "@/lib/constant/status";
import { CapitalizeName } from "@/lib/constant/capitalizeName";


const Page = () => {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const [debounceSearchQuery, setDebounceSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<string | undefined>();

  const [pagination, setPagination] = useState<Pagination>({
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

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [
      "getAppointment",
      activeStatus,
      debounceSearchQuery,
      pagination.page,
      pagination.limit,
    ],
    queryFn: () =>
      Doctor.getAppointment(
        pagination.page,
        pagination.limit,
        activeStatus,
        debounceSearchQuery
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

  const handleTabChange = (status: string) => {
    const statusMap: Record<string, string | undefined> = {
      all: undefined,
      upcoming: 'UPCOMING',
      pending: "PENDING",
      completed: "COMPLETED",
      cancelled: "CANCELLED",
    };

    setActiveStatus(statusMap[status]);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleAppointmentClick = (appointmentId: string) => {
    router.push(`/appointments/${appointmentId}`);
  };

  const appointments = data?.data ?? [];
  const tables = [
    {key: "all", title: 'All Appointment'},
    {key: "upcoming", title: 'Upcoming'},
    {key: "pending", title: 'Pending'},
    {key: "completed", title: 'Completed'},
    {key: "cancelled", title: 'Cancelled'},
  ]

  const renderTable = () => {
    return (
      <>
        <Table>
          <TableHeader className="border-t border-borderColor text-grey-20">
            <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium">
              <TableHead>Patient Name</TableHead>
              <TableHead>Hospital Name</TableHead>
              <TableHead>Doctor Name</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Consultation Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Health Concern</TableHead>
              <TableHead>Approval Status</TableHead>
              <TableHead>Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <AppointmentTableSkeleton />
          ) : (
            <TableBody>
              {isError ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-grey-500">
                    {error.message}
                  </TableCell>
                </TableRow>
              ) : appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No appointments found
                  </TableCell>
                </TableRow>
              ) : (    
                appointments.map((appointment: Appointment) => (
                  <TableRow
                    key={appointment.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleAppointmentClick(appointment.id)}
                  >
                    <TableCell>
                      <p className="text-[12px] text-grey-20">
                        {CapitalizeName(appointment.user?.firstName) || "N/A"}{" "}
                        {CapitalizeName(appointment.user?.lastName) || ""}
                      </p>
                      <p className="text-[12px] text-grey-20">
                        {appointment.user?.email || "N/A"}
                      </p>
                    </TableCell>
                     <TableCell className="text-[12px] text-grey-20">
                      {appointment.hospital.hospitalName || "N/A"}
                    </TableCell>
                     <TableCell className="text-[12px] text-grey-20">
                      {CapitalizeName(appointment.doctor?.firstName) || "N/A"} {" "}
                      {CapitalizeName(appointment.doctor?.lastName) || "N/A"}
                    </TableCell>
                    <TableCell>
                      <p className="text-[12px] text-grey-20">
                        {appointment.date || "N/A"}
                      </p>
                      <p className="text-[12px] text-grey-20">
                        {appointment.time || "N/A"}
                      </p>
                    </TableCell>

                    <TableCell className="text-[12px] text-grey-20">
                      {CapitalizeName(appointment.consultationType).replaceAll("_", " ")  || "N/A"}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`rounded-full text-[12px] py-1 px-3 ${getStatusStyle(
                          appointment.status
                        )}`}
                      >
                        {appointment.status || "N/A"}
                      </span>
                    </TableCell>

                    <TableCell className="text-[12px]">
                      {appointment.healthConcern || "N/A"}
                    </TableCell>
                     <TableCell>
                      <span
                        className={`rounded-full text-[12px] py-1 px-3 ${getStatusStyle(
                          appointment.approvalStatus
                        )}`}
                      >
                        {appointment.approvalStatus || "N/A"}
                      </span>
                    </TableCell>
                       <TableCell>
                      <span
                        className={`rounded-full text-[12px] py-1 px-3 ${getStatusStyle(
                          appointment.payments?.[0]?.status
                        )}`}
                      >
                       {appointment.payments?.[0]?.status || "N/A"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
        <Paginate pagination={pagination} setPagination={setPagination}/>
      </>
    );
  };

  return (
    <PageWrapper>
      <FlexWrapper>
        <div className="bg-white rounded-lg w-full border border-borderColor">
          <div className="border-b border-borderColor100 p-4 flex items-center justify-between">
            <TableTitle>All Appointments</TableTitle>
          </div>

          <div className="flex space-x-3 my-4 px-4">
            <Input
              value={searchInput}
              placeholder="Search by name, concern, hospital"
              onChange={(e) => setSearchInput(e.target.value)}
              icon={<Search size={17} color="#C11574" />}
            />

            {/* <Calendar /> */}
          </div>

          <Tabs defaultValue="all" onValueChange={handleTabChange}>
            <TabsList>
              {tables.map((table) => (
                <TabsTrigger key={table.key} value={table.key}>{table.title}</TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">{renderTable()}</TabsContent>
            <TabsContent value="upcoming">{renderTable()}</TabsContent>
            <TabsContent value="completed">{renderTable()}</TabsContent>
            <TabsContent value="pending">{renderTable()}</TabsContent>
            <TabsContent value="cancelled">{renderTable()}</TabsContent>
          </Tabs>
        </div>
      </FlexWrapper>
    </PageWrapper>
  );
};

export default Page