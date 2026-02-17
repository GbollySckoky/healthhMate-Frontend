"use client"
import { PageWrapper } from '@/components/ui/Reusable'
// import { CloudUpload } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {Search } from 'lucide-react'
// import image from '@/assets/Image.png'
// import Image from "next/image";
import { TableTitle } from "@/components/ui/Reusable";
import Input from "@/components/ui/Input";
import MinSelectField from "@/components/ui/MinSelectField";
import { useState } from "react";
import useToggle from "@/hooks/useToggle";
import Paginate from '@/components/ui/Paginate'
import { useRouter } from 'next/navigation'
import { STATUS } from '@/types/status'
// import { useAppointment } from '@/lib/context/GetAppointmentContext'
// import LoadingSpinner from '@/components/ui/LoadingSpinner'


const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "27/10/2026",
      totalAmount: "10:00AM",
      paymentMethod: "Credit Card",
      status: 'Completed',
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    {
      invoice: "INV002",
      paymentStatus: "27/10/2026",
      totalAmount: "11:00AM",
      paymentMethod: "PayPal",
      status: 'Pending',
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    {
      invoice: "INV003",
      paymentStatus: "27/10/2026",
      totalAmount: "12:00PM",
      paymentMethod: "Bank Transfer",
      status: 'Cancelled',
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    {
      invoice: "INV004",
      paymentStatus: "27/10/2026",
      totalAmount: "1:00PM",
      paymentMethod: "Credit Card",
      status: 'Completed',
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    {
      invoice: "INV005",
      paymentStatus: "27/10/2026",
      totalAmount: "2:00PM",
      paymentMethod: "PayPal",
      status: 'Pending',
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    {
      invoice: "INV006",
      paymentStatus: "27/10/2026",
      totalAmount: "3:00PM",
      paymentMethod: "Bank Transfer",
      status: 'Completed',
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    {
      invoice: "INV007",
      paymentStatus: "27/10/2026",
      totalAmount: "4:00PM",
      paymentMethod: "Credit Card",
      status: 'Cancelled',
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
]

const Patients = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [selectValue, setSelectValue] = useState('')
    const {isToggle, handleToggle} = useToggle()
    const router = useRouter()
    // const {datas, isLoading} = useAppointment()
    // console.log('20203', datas)

    const handleSelect = (option: string) => {
        setSelectValue((prev) => (prev === option ? '' : option ))
        // handleToggle
    }

    const status = {
        label: 'Status',
        options: [
            'Paid',
            'Failed',
            'Pending'
        ]
    }

    const handleNext = (id: string) => {
      router.push(`/patients/${id}`)
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
                <TableBody className='cursor-pointer'>
                {invoices?.length > 0 && 
                  invoices?.map((data) => (
                    <TableRow  key={data.invoice} onClick={() => handleNext(data.invoice)} className="border-t border-borderColor hover:bg-[#FAFBFF]">
                    <TableCell className="font-inter font-medium text-[13px] text-grey-30">
                       <p> {data.name}</p> 
                        <p className="text-grey-20 text-[12px] font-normal">{data.email}</p>
                    </TableCell>
                    <TableCell className="font-inter font-normal text-[13px] text-grey-30">
                        <p>{data.paymentStatus || "N/A"}</p> 	
                        <p className="text-grey-20 text-[12px]">{data.totalAmount || "N/A"}</p>
                    </TableCell>
                    <TableCell className="font-inter font-normal text-[12px] text-grey-20"> 
                      {data.paymentMethod}
                    </TableCell>
                    <TableCell>
                        <span className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-3 ${getStatusStyle(data.status)} text-grey-20`}>
                        {data.status || 'N/A'}
                        </span>
                    </TableCell>
                    <TableCell className="font-inter font-medium text-[12px] text-red-800 cursor-pointer" onClick={() => handleNext(data.invoice)}> View Details</TableCell>
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