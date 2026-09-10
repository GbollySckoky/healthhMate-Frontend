"use client"
import { Search } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table"
// import Calendar from "@/lib/components/ui/DateCalendar"
import { FlexWrapper, PageWrapper, TableTitle } from "@/lib/components/ui/Reusable"
import Input from "@/lib/components/ui/Input"
import { useState } from "react"
import Paginate from "@/lib/components/ui/Paginate"
import useGetFinance from '@/lib/hooks/useGetFinance';
import { CapitalizeName } from "@/lib/constant/capitalizeName"
import EarningsPage from "./Earnings"
import { getStatusStyle } from '@/lib/constant/status';
import useGetDate from "@/lib/hooks/useGetDate"
import { TransactionsEmptyState, TransactionsErrorState, TransactionsTableSkeleton } from "@/lib/components/ui/EarningSkeleton"
import { Copy, Check } from 'lucide-react';

export function TransactionsPage() {
  const [inputValue, setInputValue] = useState<string>("")
  const { pagination, setPagination, financeDatas, isLoading, isError, error } = useGetFinance()
  const {getReadableDate} = useGetDate()
  const [copied, setCopied] = useState("")
  const [copyAppointment, setCopyAppointment] = useState("")

  const hasData = !isLoading && !isError && financeDatas?.length > 0
  const isEmpty = !isLoading && !isError && (!financeDatas || financeDatas.length === 0)

  const handleSelectReference = (id: string) => {
    setCopied((prev) => prev === id ? '' : id)
  }

   const handleSelectAppointmentId = (id: string) => {
    setCopyAppointment((prev) => prev === id ? '' : id)
  }

  const handleCopyRefrence = async (reference: string) => {
    if(!reference) return;

    try{
      await navigator.clipboard.writeText(reference);
      handleSelectReference(reference);
      setTimeout(() => handleSelectReference(reference), 2000)
    }catch(error) {
      console.error("Failed to copy payment reference:", error);
    }
  }

  const handleCopyAppointmentId = async (id: string) => {
    if(!id) return;

    try{
      await navigator.clipboard.writeText(id);
      handleSelectAppointmentId(id);
      setTimeout(() => handleSelectAppointmentId(id), 2000)
    }catch(error) {
      console.error("Failed to copy payment reference:", error);
    }
  }

  return (
    <PageWrapper>
      <FlexWrapper className="flex-col ">
        <EarningsPage />
        {/* Header */}
        <div className="bg-white rounded-lg w-full border border-borderColor mt-10">
          <div className='border-b border-borderColor100 p-4'>
            <TableTitle>Transaction</TableTitle>
          </div>

          {/* Filters */}
          <div className="flex space-x-3 my-4 px-4">
            <Input
              value={inputValue}
              placeholder="Search by transaction ID, patient"
              onChange={(e) => setInputValue(e.target.value)}
              icon={<Search size={17} color="#C11574" />}
            />
            {/* <Calendar /> */}
          </div>

          {/* Table */}
          <Table>
            <TableHeader className="border-t border-borderColor text-[#535862]">
              <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium">
                <TableHead>Appointment ID</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Appointment Date</TableHead>
                <TableHead>Patient Name</TableHead>
                 <TableHead>Consultation Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                 <TableHead>Payment Gateway</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && <TransactionsTableSkeleton rows={pagination.limit ?? 8} />}

              {isError && <TransactionsErrorState message={error?.message} />}

              {isEmpty && <TransactionsEmptyState />}

              {hasData &&
                financeDatas.map((data: any) => {
                return  (
                  <TableRow key={data.id}>
                    <TableCell className='flex items-center'>
                      <p className="truncate font-inter text-[12px] text-grey-20 w-20">
                        {data.appointmentId ?? 'N/A'}
                      </p>
                       <span 
                          className='cursor-pointer' 
                          onClick={() => handleCopyAppointmentId(data.appointmentId)}> 
                          {copyAppointment === data.appointmentId ? (
                            <Check size={15} />
                          ): (
                            <Copy size={15} /> 
                          )}
                      </span>
                    </TableCell>
                    <TableCell className='flex items-center'>
                       <p className="truncate font-inter text-[12px] text-grey-20 w-20">
                          {data.reference ?? 'N/A'}
                       </p>
                       <span 
                          className='cursor-pointer' 
                          onClick={() => handleCopyRefrence(data.reference)}> 
                          {copied === data.reference ? (
                            <Check size={15} />
                          ): (
                            <Copy size={15} /> 
                          )}
                      </span>
                    </TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20"> 
                      {getReadableDate(data.paidAt) || 'N/A' }
                    </TableCell>
                     <TableCell className="font-inter text-[12px] text-grey-20"> 
                      {/* {invoice.date} */}
                      <p className="text-[12px] font-normal">{getReadableDate(data.metadata.date) || 'N/A' }</p>
                      <p className="text-[12px] font-normal">{data.metadata.time || 'N/A' }</p>
                    </TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20">
                      {data.metadata.amount?.user?.firstName || 'N/A'}
                      {data.metadata.amount?.user?.lastName || 'N/A'}
                    </TableCell>
                     <TableCell className="font-inter text-[12px] text-grey-20"> 
                      {CapitalizeName(data.metadata?.consultationType)?.replaceAll("_", " ") || 'N/A' }
                    </TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20">
                      ₦{data.metadata.amount?.amount.toLocaleString() || 0}
                    </TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20">
                      {CapitalizeName(data.paymentMethod?.toLowerCase()) ?? 'N/A'}
                    </TableCell>
                     <TableCell className="font-inter text-[12px] text-grey-20">
                      {data.gateway ?? 'N/A'}
                    </TableCell>
                    <TableCell>
                      <p
                        className={`text-[12px] rounded-full w-fit py-1 px-4 ${getStatusStyle(
                          data.status
                        )}`}
                      >
                        {CapitalizeName(data.status.toLowerCase()) ?? 'N/A'}
                      </p>
                    </TableCell>
                    {/* <TableCell
                      className="font-inter text-[14px] text-red-800 cursor-pointer"
                      onClick={() => handleNext(data.id)}
                    >
                      View
                    </TableCell> */}
                  </TableRow>
                )})}
            </TableBody>
          </Table>

          {/* Pagination */}
          {hasData && <Paginate pagination={pagination} setPagination={setPagination}/>}
        </div>
      </FlexWrapper>
    </PageWrapper>
  )
}