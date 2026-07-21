import React from "react";
import { TableCell, TableRow } from "@/lib/components/ui/table";

export const AppointmentCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-4 border-t border-gray-200 first:border-t-0"
        >
          <div className="flex items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-gray-200" />

            <div className="ml-3 flex-1 space-y-2">
              <div className="h-3.5 w-32 rounded bg-gray-200" />
              <div className="h-3 w-48 rounded bg-gray-100" />
              <div className="h-3 w-36 rounded bg-gray-100" />
            </div>
          </div>

          <div className="h-9 w-24 rounded-md bg-gray-200" />
        </div>
      ))}
    </div>
  );
};

export const RecentActivitySkeleton = () => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between p-3">
          <div className="flex items-center">
            <div className="h-10 w-[6px] rounded-lg bg-gray-200" />

            <div className="ml-3 space-y-2">
              <div className="h-3.5 w-40 rounded bg-gray-200" />
              <div className="h-3 w-32 rounded bg-gray-100" />
            </div>
          </div>

          <div className="h-3 w-14 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
};

export const RecentConsultationTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index} className="animate-pulse">
          <TableCell>
            <div className="space-y-2">
              <div className="h-3.5 w-28 rounded bg-gray-200" />
              <div className="h-3 w-40 rounded bg-gray-100" />
            </div>
          </TableCell>

          <TableCell>
            <div className="space-y-2">
              <div className="h-3.5 w-24 rounded bg-gray-200" />
              <div className="h-3 w-16 rounded bg-gray-100" />
            </div>
          </TableCell>

          <TableCell>
            <div className="h-3.5 w-20 rounded bg-gray-200" />
          </TableCell>

          <TableCell>
            <div className="h-6 w-20 rounded-full bg-gray-200" />
          </TableCell>

          <TableCell>
            <div className="h-3.5 w-20 rounded bg-gray-200" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export const EarningsSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-4 w-[350px] h-[170px] border border-borderColor animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-36 rounded bg-gray-200" />
        <div className="h-5 w-5 rounded bg-gray-200" />
      </div>

      <div className="h-7 w-36 rounded bg-gray-200 mx-auto my-5" />

      <div className="flex justify-center">
        <div className="h-9 w-24 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};

export const OverviewStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-3 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-borderColor rounded-lg p-4"
        >
          <div className="h-3.5 w-28 rounded bg-gray-200" />

          <div className="flex items-center justify-between mt-4">
            <div className="h-6 w-14 rounded bg-gray-200" />
            <div className="h-4 w-12 rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
};