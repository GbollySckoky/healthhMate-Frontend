"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table"
// import Paginate from "@/lib/components/ui/Paginate";
import { useRouter } from "next/navigation";
import useGetSupport from "@/lib/hooks/useGetSupport";
import { SupportTicket } from "@/lib/interface/supportTicket";
import SupportTableSkeleton from "@/lib/components/ui/SupportTableSkeleton";

export function SupportTable() {
  const router = useRouter()
  const { supportData, isLoading, isError, error } = useGetSupport()

  return (
    <div>
      <div className="overflow-x-auto">
        <Table className="table-fixed w-full">
          <TableHeader className="border-t border-borderColor text-[#535862]">
            <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium">
              <TableHead className="w-28">Id</TableHead>
              <TableHead className="w-32">Appointment Id</TableHead>
              <TableHead className="w-40">Subject</TableHead>
              <TableHead className="w-24">Category</TableHead>
              <TableHead className="w-20">Priority</TableHead>
              <TableHead className="w-64">Description</TableHead>
              <TableHead className="w-28">Creator Type</TableHead>
              <TableHead className="w-32">Patient Id</TableHead>
              <TableHead className="w-32">Hospital Id</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <SupportTableSkeleton />
          ) : (
            <TableBody>
              {isError ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    {error?.message}
                  </TableCell>
                </TableRow>
              ) : supportData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    No recent support ticket found
                  </TableCell>
                </TableRow>
              ) : (
                supportData.map((support: SupportTicket) => (
                  <TableRow
                    key={support.ticketNumber}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => router.push(`/support/${support.id}`)}
                  >
                    <TableCell className="font-inter font-normal text-[12px] text-grey-20 truncate">{support.ticketNumber}</TableCell>
                    <TableCell className="font-inter font-normal text-[12px] text-grey-20 truncate">{support.appointmentId}</TableCell>
                    <TableCell className="font-inter font-normal text-[12px] text-grey-20 truncate">{support.subject}</TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20 truncate">{support?.category.charAt(0).toUpperCase() + support?.category.slice(1).toLocaleLowerCase()}</TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20 truncate">{support?.priority.charAt(0).toUpperCase() + support?.priority.slice(1).toLocaleLowerCase()}</TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20 truncate" title={support?.description}>
                      {support?.description}
                    </TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20 truncate">{support?.creatorType.charAt(0).toUpperCase() + support?.creatorType.slice(1).toLocaleLowerCase()}</TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20 truncate">{support?.patientId}</TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20 truncate">{support?.hospitalId}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      </div>
      {/* <Paginate /> */}
    </div>
  )
}