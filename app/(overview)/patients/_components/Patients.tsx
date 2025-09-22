"use client"
import { PageWrapper } from '@/components/reusable/Reusable'
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
import { TableTitle } from "@/components/reusable/Reusable";
import { paidStatus } from "@/types/status";
import Input from "@/components/Inputs/Input";
import MinSelectField from "@/components/Inputs/MinSelectField";
import { useState } from "react";
import useToggle from "@/hooks/useToggle";
import Paginate from '@/components/ui/paginate'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/Routes'


const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Paid",
      image: image,
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "Failed",
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
      paymentStatus: "Paid",
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

const Patients = () => {
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
  return (
    <PageWrapper>
        <div className="bg-white rounded-lg w-full border border-borderColor  mt-10">
            <div className='border-b border-borderColor100 p-4 flex items-center justify-between '>
                <TableTitle >All Patients</TableTitle>
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
                    <TableRow className="bg-[#FAFBFF] font-inter text-[14px] font-medium text-[#535862]">
                        <TableHead >Patient Name</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Total Appointment</TableHead>
                        <TableHead>Last Consultation</TableHead>
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
                    <TableCell className="font-inter text-[13px] text-grey-20">
                        <div>
                            <p className="font-medium">{invoice.paymentMethod}</p> 
                            <p className="font-inter font-normal text-[12px] text-grey-20">{invoice.paymentStatus}</p>
                        </div>
                    </TableCell>
                    <TableCell className="font-inter font-medium text-[12px] text-red-800 cursor-pointer" onClick={handleNext}> View</TableCell>
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