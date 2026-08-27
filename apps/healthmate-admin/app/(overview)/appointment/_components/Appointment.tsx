"use client";

import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card, FlexWrapper, MediumText, PageWrapper, TableTitle, Value } from "@/lib/components/ui/Reusable";
import Input from "@/lib/components/Inputs/Input";
import AppointmentTableSkeleton from "@/lib/components/ui/AppointmentTableSkeleton";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/components/ui/tabs";
;
import { STATUS } from "@/types/status";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/lib/components/ui/table";
import useGetAllAppointments from "@/lib/hooks/useGetAllAppointments";
import Paginate from "@/lib/components/ui/paginate";
import { CapitalizeName } from "@/lib/constant/capitalizeName";

const tabs = [
  { key: "all", title: "All Appointment" },
  { key: "completed", title: "Completed" },
  { key: "pending", title: "Pending" },
  { key: "cancelled", title: "Cancelled" },
];

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

const Appointment = () => {
  const router = useRouter();
  const {
    totalAppointments,
    completedAppointments,
    pendingAppointments,
    totalAmount,
    isLoading, 
    isError, 
    error,
    appointmentData,
    setActiveStatus,
    pagination, 
    setPagination,
    searchInput, 
    setSearchInput 
  } = useGetAllAppointments()
  const summaryCards = [
    {
      id: 1,
      title: "Total Appointments",
      value: totalAppointments,
      percent: 12,
    },
    {
      id: 2,
      title: "Completed",
      value: completedAppointments,
      percent: 8,
    },
    {
      id: 3,
      title: "Pending",
      value: pendingAppointments,
      percent: -4,
    },
    {
      id: 4,
      title: "Upcoming",
      value: `₦${totalAmount.toLocaleString()}`,
      percent: 15,
    },
  ];

  const handleTabChange = (tab: string) => {
    const statusMap: Record<string, string | undefined> = {
      all: undefined,
      completed: STATUS.COMPLETED,
      pending: STATUS.PENDING,
      cancelled: STATUS.CANCELLED,
    };

    setActiveStatus(statusMap[tab]);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleAppointmentClick = (appointmentId: number) => {
    router.push(`/appointment/${appointmentId}`);
  };

  const renderTable = () => {
    return (
      <>
        <Table>
          <TableHeader className="border-t border-borderColor text-grey-20">
            <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium">
              <TableHead>Doctor Name</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Health Concern</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Consultation Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <AppointmentTableSkeleton />
          ) : (
            <TableBody>
              {isError ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-red-600">
                    {error?.message}
                  </TableCell>
                </TableRow>
              ) : appointmentData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No appointments found
                  </TableCell>
                </TableRow>
              ) : (
                appointmentData.map((appointment) => (
                  <TableRow
                    key={appointment.id}
                    onClick={() => handleAppointmentClick(appointment.id)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <TableCell className="text-[12px] text-grey-20">
                      <p className="font-inter text-[12px] text-grey-20">
                        {`${CapitalizeName(appointment.doctor?.firstName) || ""} ${
                          CapitalizeName(appointment.doctor?.lastName) || ""
                        }`.trim() || "N/A"}
                      </p>
                      <p className="font-inter text-[12px] text-grey-20">
                        {appointment.doctor?.email || "-"}
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="text-[12px] text-grey-20">
                        {`${appointment.user?.firstName || ""} ${
                          appointment.user?.lastName || ""
                        }`.trim() || "N/A"}
                      </p>
                      <p className="text-[12px] text-grey-20">
                        {appointment.user?.email || "N/A"}
                      </p>
                    </TableCell>

                    <TableCell className="text-[12px] text-grey-20">
                      {CapitalizeName(appointment.healthConcern) || "N/A"}
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
                      {CapitalizeName(appointment.consultationType.replaceAll("_", " ")) || "N/A"}
                    </TableCell>

                    <TableCell className="text-[12px] text-grey-20">
                      ₦{appointment.amount?.toLocaleString() || "0"}
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
      <Card className="grid grid-cols-4 gap-4 mb-5">
        {summaryCards.map((card) => (
          <Card key={card.id}>
            <MediumText>{card.title}</MediumText>

            <div className="flex items-center justify-between mt-2">
              <Value>{card.value}</Value>

              <div
                className={`flex items-center ${
                  card.percent > 0 ? "text-[#05A505]" : "text-[#F04438]"
                }`}
              >
                {card.percent > 0 ? (
                  <ArrowUp size={15} />
                ) : (
                  <ArrowDown size={15} />
                )}
                <p>{card.percent}%</p>
              </div>
            </div>
          </Card>
        ))}
      </Card>

      <div className=" w-full rounded-lg border border-borderColor bg-white">
        <div className="flex items-center justify-between border-b border-borderColor100 p-4">
          <TableTitle>All Appointments</TableTitle>
        </div>

        <div className="flex space-x-3 my-4 px-4">
          <Input
            value={searchInput}
            placeholder="Search by patient, doctor or health concern"
            onChange={(e) => setSearchInput(e.target.value)}
            icon={<Search size={17} color="#C11574" />}
          />
        </div>

        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.key} value={tab.key}>
              {renderTable()}
            </TabsContent>
          ))}
        </Tabs>
      </div>
     </FlexWrapper>
    </PageWrapper>
  );
};

export default Appointment;