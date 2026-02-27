"use client"
import { CloudUpload } from 'lucide-react'
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
import { TableTitle } from "@/components/ui/Reusable";
import { paidStatus } from "@/types/status";
import Input from "@/components/Inputs/Input";
import MinSelectField from "@/components/Inputs/MinSelectField";
import { useState } from "react";
import useToggle from "@/hooks/useToggle";
import Paginate from '@/components/ui/paginate'
import { useRouter } from 'next/navigation'

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
    const [selectValue, setSelectValue] = useState('')
    const {isToggle, handleToggle} = useToggle()
    const router = useRouter()
 
    const handleSelect = (option: string) => {
        setSelectValue((prev) => (prev === option ? '' : option ))
        handleToggle()
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
        specialty:{
            label: 'Specialty',
            options: [
                'Active',
                'In Active',
                'Open'
            ]
        }
    }

    const handleNext = () => {
      router.push(`/earnings/1`)
    }
    const {specialty,status } = data
    return (
        <div className="bg-white rounded-lg w-full border border-borderColor  mt-10">
            <div className='border-b border-borderColor100 p-4 flex items-center justify-between '>
                <TableTitle >Doctor Earnings Breakdown</TableTitle>
                <div className='border border-borderColor100 rounded-lg flex items-center px-3 cursor-pointer py-2 gap-2'>
                <span> <CloudUpload size={15} /></span>
                <p className='font-medium text-[14px] font-inter text-[#414651]'>Export</p>
                </div>
            </div>
            <div className="flex space-x-3 my-4 px-4 ">
                <Input 
                    value={inputValue}
                    placeholder='Search by Name, Specialty'
                    onChange={(e) => setInputValue(e.target.value)}
                    icon={<Search size={17} color="#C11574" />}
                />
                 <MinSelectField 
                {...specialty}
                value={selectValue}
                show={isToggle}
                onSelect={handleSelect}
                onClick={handleToggle}
                className='w-fit'
            />
            <MinSelectField 
                {...status}
                value={selectValue}
                show={isToggle}
                onSelect={handleSelect}
                onClick={handleToggle}
                className='w-fit'
            />
            </div>
            <Table>
                <TableHeader className="border-t border-borderColor text-[#535862]">
                    <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                        <TableHead >Full Name</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Consultation Fee</TableHead>
                        <TableHead>Earnings</TableHead>
                        <TableHead>Commission</TableHead>
                        <TableHead>Net Payout</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {invoices.map((invoice, index) => (
                    <TableRow  key={index}>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-30 flex items-center">
                        <Image src={invoice.image} alt='Image' width={40} />
                        <div className="ml-2">
                            {invoice.invoice}
                        </div>
                    </TableCell>
                    <TableCell className="font-inter font-normal text-[13px] text-grey-20">General Practitioner</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">₦7,000</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">₦170,000</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">₦1,860</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">₦28,475</TableCell>
                    <TableCell > <p className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-4 text-grey-20 ${invoice.paymentMethod === paidStatus.PAID && 'text-green-800 bg-green-100' || invoice.paymentMethod === paidStatus.PENDING && 'text-grey-600 bg-[#F5F5F5]'|| invoice.paymentMethod === paidStatus.FAILED && 'text-red-10 bg-red-100'  }`}>{invoice.paymentMethod} </p></TableCell>
                    <TableCell className="font-inter font-medium text-[14px] text-red-800 cursor-pointer" onClick={handleNext}> View</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <Paginate />
        </div>
    )
  }
  