"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {Search } from 'lucide-react'
import image from '@/assets/Image.png'
import Image from "next/image";
import Input from "@/components/Inputs/Input";
import MinSelectField from "@/components/Inputs/MinSelectField";
import { useState } from "react";
import useToggle from "@/lib/hooks/useToggle";
import Paginate from '@/components/ui/paginate'
import { useRouter } from 'next/navigation'
import Calendar from '@/components/calendar/Calendar'


const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Completed",
      image: image,
    },
    {
      invoice: "INV002",
      paymentStatus: "Cancelled",
      totalAmount: "$150.00",
      paymentMethod: "Cancelled",
      image: image,
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Pending",
      image: image,
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "In Progress",
      image: image,
    },
    {
      invoice: "INV005",
      paymentStatus: "Completed",
      totalAmount: "$550.00",
      paymentMethod: "Open",
      image: image,
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Closed",
      image: image,
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Closed",
      image: image,
    },
]

const Appointments = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [selectValue, setSelectValue] = useState('')
    const {isToggle, handleToggle} = useToggle()
    const router = useRouter()
 
    const handleSelect = (option: string) => {
        setSelectValue((prev) => (prev === option ? '' : option ))
        handleToggle
    }

    const data = {
        status:{
            label: 'Status',
            options: [
                'Paid',
                'Failed',
                'Pending'
            ]
        },
    }

    const handleNext = () => {
      router.push(`/patients/1`)
    }
    const {status } = data

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'text-green-700 bg-green-100'
            case 'Pending':
                return 'text-gray-700 bg-gray-100'
            case 'Cancelled':
                return 'text-red-700 bg-red-100'
            default:
                return ''
        }
    }
  return (
    <div className="">
        <div className="flex space-x-3 mt-7 mb-3 ">
            <Input 
                value={inputValue}
                placeholder='Search by Name, Specialty'
                onChange={(e) => setInputValue(e.target.value)}
                icon={<Search size={17} color="#C11574" />}
            />
            <MinSelectField 
                {...status}
                value={selectValue}
                show={isToggle}
                onSelect={handleSelect}
                onClick={handleToggle}
                className='w-fit'
            />
            <Calendar />
        </div>
        <Table>
            <TableHeader className="border-t border-borderColor text-grey-20">
                <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                    <TableHead >Doctor Name</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {invoices.map((invoice) => (
                <TableRow  key={invoice.invoice}>
                <TableCell className="font-inter font-normal text-[14px] text-grey-30 flex items-center">
                    <Image src={invoice.image} alt='Patient' width={40} height={40} className="rounded-full" />
                    <div className="ml-2">
                        <p className="font-medium">{invoice.invoice}</p>  
                        <p className='text-red-800 font-inter font-normal text-[12px]'>{invoice.totalAmount}</p>
                    </div>
                </TableCell>
                <TableCell className="font-inter font-normal text-[12px] text-grey-20">{invoice.paymentStatus}</TableCell>
                <TableCell className="font-inter font-normal text-[12px] text-grey-20">{invoice.paymentMethod}</TableCell>
                <TableCell >
                    <span className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-3 ${getStatusStyle(invoice.paymentStatus)}`}>
                        {invoice.paymentStatus}
                    </span>
                </TableCell>
                <TableCell className="font-inter font-medium text-[12px] text-red-800 cursor-pointer" onClick={handleNext}> View</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <Paginate />
    </div>
  )
}

export default Appointments