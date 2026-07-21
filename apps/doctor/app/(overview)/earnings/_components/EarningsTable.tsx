"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/lib/components/ui/table"
import {Search } from 'lucide-react'
import image from '@/assets/Image.png'
import { TableTitle } from "@/lib/components/ui/Reusable";
import { paidStatus } from "@/types/status";
import Input from "@/lib/components/ui/Input";
// import { useQuery } from '@tanstack/react-query';
// import { Doctor } from '@/lib/constant/service';
import { useState } from "react";
// import useToggle from "@/hooks/useToggle";
import { useRouter } from 'next/navigation'
import Paginate from '@/lib/components/ui/Paginate'

  const invoices = [
    {
      invoice: "Dr. Phoenix Baker",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Paid",
      image: image,
    },
    {
      invoice: "Dr. Phoenix Baker",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "Failed",
      image: image,
    },
    {
      invoice: "Dr. Phoenix",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Pending",
      image: image,
    },
    {
      invoice: "Dr.Baker",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "In Progress",
      image: image,
    },
    {
      invoice: "Dr. Phoenix Baker",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "Open",
      image: image,
    },
  ]
  
  export function EarningsTable() {
    const [inputValue, setInputValue] = useState<string>('')
    // const [selectValue, setSelectValue] = useState('')
    // const {isToggle, handleToggle} = useToggle()
    const router = useRouter()

    // const {data, isLoading, error, isError} = useQuery({
    //   queryKey: ['getPayout'],
    //   queryFn: () => Doctor.getPayout()
    // })
 
    // const handleSelect = (option: string) => {
    //     setSelectValue((prev) => (prev === option ? '' : option ))
    //     // handleToggle
    // }

    // const dataStatus = {
    //     status:{
    //         label: 'Status',
    //         options: [
    //             'Paid',
    //             'Failed',
    //             'Pending'
    //         ]
    //     },
    //     specialty:{
    //         label: 'Specialty',
    //         options: [
    //             'Active',
    //             'In Active',
    //             'Open'
    //         ]
    //     }
    // }

    const handleNext = (id: string) => {
      router.push(`/earnings/${id}`)
    }
    // const {specialty,status } = dataStatus
    return (
        <div className="bg-white rounded-lg w-full border border-borderColor  mt-10">
            <div className='border-b border-borderColor100 p-4'>
                <TableTitle >Payout Records</TableTitle>
            </div>
            <div className="flex space-x-3 my-4 px-4 ">
                <Input 
                    value={inputValue}
                    placeholder='Search by Date'
                    onChange={(e) => setInputValue(e.target.value)}
                    icon={<Search size={17} color="#C11574" />}
                />
            </div>
            <Table>
                <TableHeader className="border-t border-borderColor text-[#535862]">
                    <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {invoices.map((invoice, index) => (
                    <TableRow  key={index} onClick={() => handleNext(invoice.invoice)} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-inter font-normal text-[13px] text-grey-20">12 Aug 2025</TableCell>
                    <TableCell className="font-inter font-normal text-[12px] text-grey-20">₦7,000</TableCell>
                    <TableCell className="font-inter font-normal text-[12px] text-grey-20">₦170,000</TableCell>
                    <TableCell > <p className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-4 text-grey-20 ${invoice.paymentMethod === paidStatus.PAID && 'text-green-800 bg-green-100' || invoice.paymentMethod === paidStatus.PENDING && 'text-grey-600 bg-[#F5F5F5]'|| invoice.paymentMethod === paidStatus.FAILED && 'text-red-10 bg-red-100'  }`}>{invoice.paymentMethod} </p></TableCell>
                    <TableCell className="font-inter font-medium text-[14px] text-red-800 cursor-pointer" onClick={() => handleNext(invoice.invoice)}> View Details</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <Paginate />
        </div>
    )
  }
  