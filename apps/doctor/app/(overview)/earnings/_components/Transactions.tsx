"use client"
import { Search } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Calendar from "@/components/ui/DateCalendar"
import { TableTitle } from "@/components/ui/Reusable"
import { paidStatus } from "@/types/status"
import Input from "@/components/ui/Input"
// import MinSelectField from "@/components/Inputs/MinSelectField"
import { useState } from "react"
// import useToggle from "@/hooks/useToggle"
import image from "@/assets/Image.png"
import { useRouter } from "next/navigation"
import Paginate from "@/components/ui/Paginate"

// Mock data
const invoices = [
  {
    invoice: "INV001",
    date: "2025-09-20 10:30 AM",
    doctor: "Dr. James",
    patient: "John Doe",
    totalAmount: "$250.00",
    paymentMethod: "Card",
    paymentStatus: "Paid",
    image: image,
  },
  {
    invoice: "INV002",
    date: "2025-09-19 3:45 PM",
    doctor: "Dr. Smith",
    patient: "Jane Doe",
    totalAmount: "$150.00",
    paymentMethod: "Bank Transfer",
    paymentStatus: "Pending",
    image: image,
  },
  {
    invoice: "INV003",
    date: "2025-09-18 1:00 PM",
    doctor: "Dr. Adams",
    patient: "Michael Lee",
    totalAmount: "$350.00",
    paymentMethod: "Cash",
    paymentStatus: "Failed",
    image: image,
  },
]

// Helper to style status
const getStatusClasses = (status: string) => {
  switch (status) {
    case paidStatus.PAID:
      return "text-green-800 bg-green-100"
    case paidStatus.PENDING:
      return "text-grey-600 bg-[#F5F5F5]"
    case paidStatus.FAILED:
      return "text-red-800 bg-red-100"
    default:
      return ""
  }
}

export function TransactionsPage() {
  const [inputValue, setInputValue] = useState<string>("")
  // const [selectValue, setSelectValue] = useState("")
  // const { isToggle, handleToggle } = useToggle()
  const router = useRouter()

  // const handleSelect = (option: string) => {
  //   setSelectValue((prev) => (prev === option ? "" : option))
  //   handleToggle() // ✅ fixed
  // }

  // const data = {
  //   status: {
  //     label: "Payment Status",
  //     options: ["Paid", "Failed", "Pending"],
  //   },
  //   specialty: {
  //     label: "Date Range",
  //     options: ["Today", "This Week", "This Month"],
  //   },
  // }

  // const {  status } = data
  const handleNext = () => {
    router.push(`/earnings/1`)
  }

  return (
    <div className="bg-white rounded-lg w-full border border-borderColor ">
      {/* Header */}
      <div className="border-b border-borderColor100 p-4">
        <TableTitle>Transaction Breakdown</TableTitle>
      </div>

      {/* Filters */}
      <div className="flex space-x-3 my-4 px-4">
        <Input
          value={inputValue}
          placeholder="Search by transaction ID, patient"
          onChange={(e) => setInputValue(e.target.value)}
          icon={<Search size={17} color="#C11574" />}
        />
        <Calendar />
      </div>

      {/* Table */}
      <Table>
        <TableHeader className="border-t border-borderColor text-[#535862]">
          <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium">
            <TableHead>Transaction ID</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-inter text-[12px] text-grey-20">
                {invoice.invoice}
              </TableCell>
              <TableCell className="font-inter text-[12px] text-grey-20">
                {invoice.date}
                <p className="text-[12px] font-normal">10:00AM</p>
              </TableCell>
              <TableCell className="font-inter text-[12px] text-grey-30 font-medium">
                {invoice.doctor}
              </TableCell>
              <TableCell className="font-inter text-[12px] text-grey-20">
                ₦10,475
              </TableCell>
              <TableCell className="font-inter text-[12px] text-grey-20">
                Card
              </TableCell>
              <TableCell>
                <p
                  className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-4 ${getStatusClasses(
                    invoice.paymentStatus
                  )}`}
                >
                  {invoice.paymentStatus}
                </p>
              </TableCell>
              <TableCell className="font-inter text-[14px] text-red-800 cursor-pointer" onClick={handleNext}>
                View
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Paginate />
    </div>
  )
}
