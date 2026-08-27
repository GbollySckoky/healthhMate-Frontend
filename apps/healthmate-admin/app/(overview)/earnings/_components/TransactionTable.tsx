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
import { paidStatus } from "@/types/status"
// import Input from "@/lib/components/ui/Input"
import { useState } from "react"
// import Paginate from "@/lib/components/ui/Paginate"
import useGetFinance from '@/lib/hooks/useGetFinance';
import { CapitalizeName } from "@/lib/constant/capitalizeName"
import EarningsPage from "./Earnings"
import Input from "@/components/Inputs/Input"
import Paginate from "@/lib/components/ui/paginate"

// Helper to style status
const getStatusClasses = (status: string) => {
  switch (status) {
    case paidStatus.PAID:
      return "text-green-500 bg-green-100"
    case paidStatus.PENDING:
      return "text-grey-600 bg-[#F5F5F5]"
    case paidStatus.FAILED:
      return "text-red-800 bg-red-100"
    default:
      return ""
  }
}

const TABLE_COLUMNS = 8

// Shared shimmer block — matches the SkeletonBlock pattern used elsewhere in the app
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-[#EAECF0] rounded ${className}`} />
)

const TransactionsRowSkeleton = () => (
  <TableRow>
    <TableCell><SkeletonBlock className="h-3 w-20" /></TableCell>
    <TableCell><SkeletonBlock className="h-3 w-24" /></TableCell>
    <TableCell><SkeletonBlock className="h-3 w-16" /></TableCell>
    <TableCell><SkeletonBlock className="h-3 w-20" /></TableCell>
    <TableCell><SkeletonBlock className="h-3 w-14" /></TableCell>
    <TableCell><SkeletonBlock className="h-3 w-16" /></TableCell>
    <TableCell><SkeletonBlock className="h-5 w-16 rounded-full" /></TableCell>
    <TableCell><SkeletonBlock className="h-3 w-8" /></TableCell>
  </TableRow>
)

const TransactionsTableSkeleton = ({ rows = 8 }: { rows?: number }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <TransactionsRowSkeleton key={i} />
    ))}
  </>
)

const TransactionsEmptyState = () => (
  <TableRow>
    <TableCell colSpan={TABLE_COLUMNS} className="text-center py-10">
      <p className="text-[13px] font-medium text-grey-30">No transactions found</p>
      <p className="text-[12px] text-[#535862] mt-1">
        Transactions will show up here once payments start coming in.
      </p>
    </TableCell>
  </TableRow>
)

const TransactionsErrorState = ({ message }: { message?: string }) => (
  <TableRow>
    <TableCell colSpan={TABLE_COLUMNS} className="text-center py-10">
      <p className="text-[13px] font-medium text-red-800">Couldn&apos;t load transactions</p>
      <p className="text-[12px] text-[#535862] mt-1">
        {message ?? "Something went wrong. Please try again."}
      </p>
    </TableCell>
  </TableRow>
)

export function TransactionsPage() {
  const [inputValue, setInputValue] = useState<string>("")
  const { pagination, setPagination, financeDatas, isLoading, isError, error } = useGetFinance()
  // const router = useRouter()

  // const handleNext = (id: string) => {
  //   router.push(`/earnings/${id}`)
  // }

  const hasData = !isLoading && !isError && financeDatas?.length > 0
  const isEmpty = !isLoading && !isError && (!financeDatas || financeDatas.length === 0)

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
                <TableHead>Transaction ID</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && <TransactionsTableSkeleton rows={pagination.limit ?? 8} />}

              {isError && <TransactionsErrorState message={error?.message} />}

              {isEmpty && <TransactionsEmptyState />}

              {hasData &&
                financeDatas.map((data: any) => (
                  <TableRow key={data.id}>
                    <TableCell>
                      <p className="truncate font-inter text-[12px] text-grey-20 w-23">
                        {data.id ?? 'N/A'}
                      </p>
                    </TableCell>
                    <TableCell>
                       <p className="truncate font-inter text-[12px] text-grey-20 w-20">
                          {data.reference ?? 'N/A'}
                       </p>
                    </TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20">
                      {/* {invoice.date} */}
                      <p className="text-[12px] font-normal">10:00AM</p>
                    </TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20 font-medium">
                      {data.metadata.user?.firstName ?? 'N/A'}
                    </TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20">
                      ₦{Number(data.amount)?.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-inter text-[12px] text-grey-20">
                      {CapitalizeName(data.paymentMethod?.toLowerCase()) ?? 'N/A'}
                    </TableCell>
                    <TableCell>
                      <p
                        className={`text-[12px] text-grey-20 rounded-full w-fit py-1 px-4 ${getStatusClasses(
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
                ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {hasData && <Paginate pagination={pagination} setPagination={setPagination}/>}
        </div>
      </FlexWrapper>
    </PageWrapper>
  )
}