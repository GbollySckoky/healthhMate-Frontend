import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { paidStatus } from '@/types/status'
import { Card, Info, TableTitle } from '@/components/reusable/Reusable'
import { CloudUpload } from 'lucide-react'

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
    },
    {
      invoice: "INV002",
      date: "2025-09-19 3:45 PM",
      doctor: "Dr. Smith",
      patient: "Jane Doe",
      totalAmount: "$150.00",
      paymentMethod: "Bank Transfer",
      paymentStatus: "Pending",
    },
    {
      invoice: "INV003",
      date: "2025-09-18 1:00 PM",
      doctor: "Dr. Adams",
      patient: "Michael Lee",
      totalAmount: "$350.00",
      paymentMethod: "Cash",
      paymentStatus: "Failed",
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


const EarningsTable = () => {
  return (
    <div>
      <div className="bg-white rounded-lg w-full border border-borderColor mt-5 p-5">
        <div className='border-b border-borderColor100 pb-5 flex items-center justify-between '>
            <TableTitle >Earnings Breakdown</TableTitle>
            <div className='border border-borderColor100 rounded-lg flex items-center px-3 cursor-pointer py-2 gap-2'>
            <span> <CloudUpload size={15} /></span>
            <p className='font-medium text-[14px] font-inter text-[#414651]'>Export</p>
            </div>
        </div>
        {/* Table */}
        <Table className='mb-7 '>
          <TableHeader className="border-t border-borderColor text-[#535862]">
            <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium">
              <TableHead>Date</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Net Payout</TableHead>
              <TableHead>Status</TableHead>
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
                </TableCell>
                <TableCell className="font-inter text-[12px] text-grey-20">
                  {invoice.doctor}
                </TableCell>
                <TableCell className="font-inter text-[12px] text-grey-20">
                  {invoice.patient}
                </TableCell>
                <TableCell className="font-inter text-[12px] text-grey-20">
                  {invoice.totalAmount}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Card */}
      <Card className='mt-6'>
          <Info label='Payout confirmation date & time' amount='05 Aug 25, 2:00 pm'/>
          <Info label='Transaction ID' amount='TXID1006'/>
          <Info label='Payment Method' amount='Bank Transfer'/>
      </Card>
    </div>
  )
}

export default EarningsTable