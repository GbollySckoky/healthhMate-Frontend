"use client";

// import { Card }  .=from "@/lib/components/ui/Reusable";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/lib/components/ui/table";

export const DoctorHeaderSkeleton = () => {
  return (
    <div className="mb-3 flex items-center justify-between border-b border-borderColor pb-6 animate-pulse">
      <div className="flex items-center">
        <div className="h-[50px] w-[50px] rounded-full bg-gray-200" />

        <div className="ml-3 space-y-2">
          <div className="h-4 w-36 rounded bg-gray-200" />
          <div className="h-3.5 w-48 rounded bg-gray-100" />
        </div>
      </div>

      <div className="h-10 w-40 rounded-lg bg-gray-200" />
    </div>
  );
};

export const DoctorOverviewSkeleton = () => {
  return (
    <div className="animate-pulse">
      {[3, 5, 5].map((rows, index) => (
        <div
          key={index}
          className="mt-5 border-b border-borderColor pb-4 last:border-b-0"
        >
          <div className="mb-4 h-5 w-44 rounded bg-gray-200" />

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
        </div>
      ))}
    </div>
  );
};

export const DoctorAppointmentSkeleton = () => {
  return (
    <TableBody className="animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <TableRow key={index}>
          {Array.from({ length: 8 }).map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <div className="h-3.5 w-24 rounded bg-gray-200" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};