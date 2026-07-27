"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import Paginate from "@/lib/components/ui/paginate";
import { APPOINTMENT } from "@/lib/interface/appointment";
import { DoctorAppointmentSkeleton } from "@/components/ui/DoctorDetailsSkeleton";

const Appointment = ({
  appointments,
  isLoading,
}: {
  appointments: APPOINTMENT[];
  isLoading: boolean;
}) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-700 bg-green-100";
      case "PENDING":
        return "text-gray-700 bg-gray-100";
      case "CANCELLED":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div>
      <Table>
        <TableHeader className="border-t border-borderColor text-grey-20">
          <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium">
            <TableHead>Patient</TableHead>
            <TableHead>Health Concern</TableHead>
            <TableHead>Consultation Type</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <DoctorAppointmentSkeleton />
        ) : (
          <TableBody>
            {appointments?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-8 text-center text-sm text-gray-500"
                >
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              appointments?.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-inter text-[14px] text-grey-30">
                    {`${appointment?.user?.firstName || ""} ${
                      appointment?.user?.lastName || ""
                    }`.trim() || "-"}
                  </TableCell>

                  <TableCell className="font-inter text-[12px] text-grey-20">
                    {appointment.healthConcern || "-"}
                  </TableCell>

                  <TableCell className="font-inter text-[12px] text-grey-20">
                    {appointment.consultationType || "-"}
                  </TableCell>

                  <TableCell className="font-inter text-[14px] text-grey-20">
                    {appointment.note || "-"}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`w-fit rounded-full px-3 py-1 font-inter text-[12px] font-medium ${getStatusStyle(
                        appointment.status
                      )}`}
                    >
                      {appointment.status || "-"}
                    </span>
                  </TableCell>

                  <TableCell className="font-inter text-[14px] text-grey-20">
                    ₦{appointment.amount?.toLocaleString() || "0"}
                  </TableCell>

                  <TableCell className="font-inter text-[14px] text-grey-20">
                    {appointment.date || "-"}
                  </TableCell>

                  <TableCell className="font-inter text-[14px] text-grey-20">
                    {appointment.time || "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        )}
      </Table>

      <Paginate />
    </div>
  );
};

export default Appointment;