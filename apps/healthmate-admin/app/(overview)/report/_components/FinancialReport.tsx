"use client"
import Input from "@/components/Inputs/Input"
import { Card, MinTexts } from "@/components/ui/Reusable"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Status } from "@/types/status"
import { useState } from "react"
import {Search } from 'lucide-react'
import Calendar from "@/components/calendar/Calendar"


  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Open",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "Closed",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "In Progress",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "In Progress",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "Open",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Closed",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Closed",
    },
  ]
  
  export function FinancialReport() {
    const [inputValue, setInputValue] = useState<string>('')
    return (
        <Card>
          <div className="flex items-center justify-between">
              <p className="font-lato font-medium text-[18px] text-[#181D27]">Financial Reports</p>
              <div className="flex items-center space-x-3">
                <Input 
                    value={inputValue}
                    placeholder='Search by Date/Time'
                    onChange={(e) => setInputValue(e.target.value)}
                    icon={<Search size={17} color="#C11574" />}
                />
                <Calendar />
              </div>
          </div>
          <Table className="mt-5 ">
              <TableHeader className="border-t border-borderColor text-[#535862]">
                  <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                      <TableHead className="font-libre text-[14px] font-semibold text-[#535862]"> Date & Time</TableHead>
                      <TableHead className="font-inter text-[#535862] font-medium text-[12px]">Type</TableHead>
                      <TableHead className="font-libre text-[14px] font-semibold text-[#535862]">Full Name</TableHead>
                      <TableHead className="font-inter text-[12px] font-medium text-[#535862]">Specialty</TableHead>
                      <TableHead className="font-libre text-[14px] font-semibold text-[#535862]">Amount</TableHead>
                      <TableHead className="font-libre text-[14px] font-semibold text-[#535862]">Status</TableHead>
                      <TableHead className="font-inter text-[12px] font-medium text-[#535862]">Branch</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                <TableRow  key={invoice.invoice}>
                <TableCell className="font-inter font-normal text-[14px] text-grey-30 flex flex-col">
                  {invoice.invoice}
                  <MinTexts>Doctor</MinTexts>
                </TableCell>
                <TableCell className="font-inter font-normal text-[14px] text-[#535862]">{invoice.paymentStatus}</TableCell>
                <TableCell className="font-inter font-medium text-[14px] text-grey-30">{invoice.paymentMethod}</TableCell>
                <TableCell className="font-inter font-normal text-[14px] text-[#535862]">
                        {invoice.paymentMethod}
                </TableCell>
                <TableCell className="font-inter font-normal text-[14px] text-[#535862]">View Details</TableCell>
                <TableCell >
                    <p className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-4 text-grey-20 ${invoice.paymentMethod === Status.CLOSED && 'text-[#027A48] bg-green-100' || invoice.paymentMethod === Status.OPEN && 'text-[#414651] bg-[#F5F5F5]'|| invoice.paymentMethod === Status.InProgress && 'text-[#3538CD] bg-blue-50'  }`}>
                        {invoice.paymentMethod}
                    </p>
                </TableCell>
                <TableCell className="font-inter font-normal text-[14px] text-[#535862]"> View Details</TableCell>
                </TableRow>
                
                ))}
              </TableBody>
          </Table>
      </Card>
    )
  }
  