"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
// import Conversation from "./Conversation";
// import image from '@/assets/Image.png'
// import { Status } from "@/types/status";
import Paginate from "@/components/ui/Paginate";
// import { useFormModal } from "@/components/modal/FormModal";
import useGetSupport from "@/hooks/useGetSupport";
import { SupportTicket } from "@/lib/interface/support";
import SupportTableSkeleton from "@/components/ui/SupportTableSkeleton";
import { useRouter } from "next/navigation";

  
  export function SupportTable() {
    // const { openModal } = useFormModal();
    const router = useRouter()
    const {supportData, isLoading, isError, error} = useGetSupport()
    console.log(supportData, "12333")
    return (
      <div>
        <Table>
            <TableHeader className="border-t border-borderColor text-[#535862]">
                <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                   <TableHead>ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Creator Type</TableHead>
                    {/* <TableHead>Creator Type</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <SupportTableSkeleton />
              ) : ( isError ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    {error?.message}
                  </TableCell>
                </TableRow>
              ): supportData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No recent support ticket found
                  </TableCell>
                </TableRow>
              ) :  supportData.map((support: SupportTicket) => (
                  <TableRow  key={support.ticketNumber}>
                  <TableCell className="font-inter font-normal text-[12px] text-grey-20">{support.ticketNumber}</TableCell>
                  <TableCell className="font-inter font-normal text-[12px] text-grey-20">{support.subject}</TableCell>
                  <TableCell className="font-inter font-medium text-[12px] text-grey-20">{support?.category}</TableCell>
                  <TableCell className="font-inter font-medium text-[12px] text-grey-20">{support?.priority}</TableCell>
                  <TableCell className="font-inter font-medium text-[12px] text-grey-20 w-70 truncate">{support?.description}</TableCell>
                  <TableCell className="font-inter font-medium text-[12px] text-grey-20">{support?.creatorType}</TableCell>
                  {/* <TableCell className="font-inter font-medium text-[12px] text-grey-800">{support?.subject}</TableCell> */}
                  <TableCell >
                  </TableCell>
                  <TableCell className="font-inter font-medium text-[12px] text-red-800 cursor-pointer"
                      onClick={() => router.push(`/support/${support.id}`)}>
                      View Details</TableCell>
                  </TableRow>
              )))}
            </TableBody>
        </Table>
        <Paginate />
    </div>
    )
  }
  