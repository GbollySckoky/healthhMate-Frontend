// components/ui/AppointmentTableSkeleton.tsx

import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/lib/components/ui/table";

const AppointmentTableSkeleton = () => {
  return (
    <TableBody className="animate-pulse">
      {Array.from({ length: 8 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="space-y-2">
              <div className="h-3.5 w-28 rounded bg-gray-200" />
              <div className="h-3 w-40 rounded bg-gray-100" />
            </div>
          </TableCell>

          <TableCell>
            <div className="h-3.5 w-24 rounded bg-gray-200" />
          </TableCell>

          <TableCell>
            <div className="h-3.5 w-24 rounded bg-gray-200" />
          </TableCell>

           <TableCell>
            <div className="space-y-2">
              <div className="h-3.5 w-24 rounded bg-gray-200" />
              <div className="h-3 w-16 rounded bg-gray-100" />
            </div>
          </TableCell>

          <TableCell>
            <div className="h-3.5 w-24 rounded bg-gray-200" />
          </TableCell>

          <TableCell>
            <div className="h-6 w-20 rounded-full bg-gray-200" />
          </TableCell>

          <TableCell>
            <div className="h-3.5 w-36 rounded bg-gray-200" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default AppointmentTableSkeleton;