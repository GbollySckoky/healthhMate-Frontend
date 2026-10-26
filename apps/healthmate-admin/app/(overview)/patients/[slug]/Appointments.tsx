"use client";

import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { APPOINTMENT_DETAILS } from "@/lib/interface/appointment";
import { getStatusStyle } from "@/lib/constant/status";
import { displayText, formatDate } from "./Overview";

const Appointments = ({ patient, isLoading }: {
  patient?: APPOINTMENT_DETAILS;
  isLoading: boolean;
}) => {
  if (isLoading) return <p role="status" className="py-8 text-center">Loading appointment…</p>;
  if (!patient) return <p className="py-8 text-center">No appointment available.</p>;

  return (
    <div className="mt-5">
      <p className="mb-4 text-sm text-grey-20">Appointment associated with this patient record.</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Health Concern</TableHead>
            <TableHead>Status</TableHead>
            <TableHead><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{`${patient.doctor?.firstName || ""} ${patient.doctor?.lastName || ""}`.trim() || "Not provided"}</TableCell>
            <TableCell>{formatDate(patient.date)}<p className="text-xs text-grey-20">{patient.time}</p></TableCell>
            <TableCell>{displayText(patient.consultationType)}</TableCell>
            <TableCell className="max-w-xs whitespace-normal break-words">{patient.healthConcern || "Not provided"}</TableCell>
            <TableCell><span className={`rounded-full px-3 py-1 text-xs ${getStatusStyle(patient.status)}`}>{displayText(patient.status)}</span></TableCell>
            <TableCell><Link className="text-sm text-red-800" href={`/appointment/${patient.id}`}>View details</Link></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Appointments;
