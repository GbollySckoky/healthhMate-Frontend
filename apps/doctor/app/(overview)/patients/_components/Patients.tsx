"use client"
import { PageWrapper } from '@/components/ui/Reusable'
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
import Input from "@/components/ui/Input";
import MinSelectField from "@/components/ui/MinSelectField";
import { useState } from "react";
import useToggle from "@/hooks/useToggle";
import Paginate from '@/components/ui/Paginate'
import { useRouter } from 'next/navigation'
import { STATUS } from '@/types/status'
import { useAppointment } from '@/lib/context/GetAppointmentContext'


const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
      status: 'Completed'
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
      status: 'Pending'
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
      status: 'Cancelled'
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
      status: 'Completed'
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
      status: 'Pending'
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
      status: 'Completed'
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
      status: 'Cancelled'
    },
  ]

const Patients = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [selectValue, setSelectValue] = useState('')
    const {isToggle, handleToggle} = useToggle()
    const router = useRouter()
    const {data, isLoading} = useAppointment()
    console.log(data)
    const handleSelect = (option: string) => {
        setSelectValue((prev) => (prev === option ? '' : option ))
        handleToggle
    }

    const status = {
        label: 'Status',
        options: [
            'Paid',
            'Failed',
            'Pending'
        ]
    }

    const handleNext = () => {
      router.push(`/patients/1`)
    }

    const getStatusStyle = (status: string) => {
        switch (status) {
            case STATUS.COMPLETED:
                return 'text-green-700 bg-green-100'
            case STATUS.PENDING:
                return 'text-gray-700 bg-gray-100'
            case STATUS.CANCELLED:
                return 'text-red-700 bg-red-100'
            default:
                return ''
        }
    }

  return (
    <PageWrapper>
        <div className="bg-white rounded-lg w-full border border-borderColor  mt-10">
            <div className='border-b border-borderColor100 p-4 flex items-center justify-between '>
                <TableTitle >All Patients</TableTitle>
            </div>
            <div className="flex space-x-3 my-4 px-4 ">
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
            </div>
            <Table>
                <TableHeader className="border-t border-borderColor ">
                    <TableRow className="bg-[#FAFBFF] font-inter text-[14px] font-medium text-grey-20">
                        <TableHead >Patient </TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {invoices.map((invoice) => (
                    <TableRow  key={invoice.invoice}>
                    <TableCell className="font-inter font-medium text-[13px] text-grey-30">
                       <p> Phoenix Baker</p> 
                        <p className="text-grey-20 text-[12px] font-normal">olivia@untitledui.com</p>
                    </TableCell>
                    <TableCell className="font-inter font-normal text-[13px] text-grey-30">
                        <p>Jul 2, 2025</p> 	
                        <p className="text-grey-20 text-[12px]">10:00AM</p>
                    </TableCell>
                    <TableCell className="font-inter font-normal text-[12px] text-grey-20">Video Call</TableCell>
                    <TableCell>
                        <span className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-3 ${getStatusStyle(invoice.status)}`}>
                            {invoice.status}
                        </span>
                    </TableCell>
                    <TableCell className="font-inter font-medium text-[12px] text-red-800 cursor-pointer" onClick={handleNext}> View Details</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <Paginate />
        </div>
    </PageWrapper>
  )
}

export default Patients