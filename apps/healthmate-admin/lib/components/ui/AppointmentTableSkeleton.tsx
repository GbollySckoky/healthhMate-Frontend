import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "./table";

const AppointmentTableSkeleton = () => {
  return (
    <TableBody className="animate-pulse">
      {Array.from({ length: 8 }).map((_, index) => (
        <TableRow key={index}>
          {/* Doctor Name */}
          <TableCell>
            <div className="h-3.5 w-32 rounded bg-gray-200" />
          </TableCell>

          {/* Patient Name */}
          <TableCell>
            <div className="space-y-2">
              <div className="h-3.5 w-28 rounded bg-gray-200" />
              <div className="h-3 w-40 rounded bg-gray-100" />
            </div>
          </TableCell>

          {/* Health Concern */}
          <TableCell>
            <div className="h-3.5 w-36 rounded bg-gray-200" />
          </TableCell>

          {/* Date & Time */}
          <TableCell>
            <div className="space-y-2">
              <div className="h-3.5 w-24 rounded bg-gray-200" />
              <div className="h-3 w-16 rounded bg-gray-100" />
            </div>
          </TableCell>

          {/* Consultation Type */}
          <TableCell>
            <div className="h-3.5 w-24 rounded bg-gray-200" />
          </TableCell>

          {/* Amount */}
          <TableCell>
            <div className="h-3.5 w-20 rounded bg-gray-200" />
          </TableCell>

          {/* Status */}
          <TableCell>
            <div className="h-6 w-20 rounded-full bg-gray-200" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default AppointmentTableSkeleton;
