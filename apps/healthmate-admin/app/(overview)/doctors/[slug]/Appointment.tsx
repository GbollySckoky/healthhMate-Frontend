"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
// import {Search } from 'lucide-react'
// import image from '@/assets/Image.png'
// import Image from "next/image";
// import Input from "@/components/Inputs/Input";
// import MinSelectField from "@/components/Inputs/MinSelectField";
// import { useState } from "react";
// import useToggle from "@/hooks/useToggle";
import Paginate from '@/components/ui/paginate'
// import { useRouter } from 'next/navigation'
// import Calendar from '@/components/calendar/Calendar'
import { APPOINTMENT } from "@/lib/interface/appointment";


// const invoices = [
//     {
//       invoice: "INV001",
//       paymentStatus: "Paid",
//       totalAmount: "$250.00",
//       paymentMethod: "Completed",
//       image: image,
//     },
//     {
//       invoice: "INV002",
//       paymentStatus: "Cancelled",
//       totalAmount: "$150.00",
//       paymentMethod: "Cancelled",
//       image: image,
//     },
//     {
//       invoice: "INV003",
//       paymentStatus: "Unpaid",
//       totalAmount: "$350.00",
//       paymentMethod: "Pending",
//       image: image,
//     },
//     {
//       invoice: "INV004",
//       paymentStatus: "Paid",
//       totalAmount: "$450.00",
//       paymentMethod: "In Progress",
//       image: image,
//     },
//     {
//       invoice: "INV005",
//       paymentStatus: "Completed",
//       totalAmount: "$550.00",
//       paymentMethod: "Open",
//       image: image,
//     },
//     {
//       invoice: "INV006",
//       paymentStatus: "Pending",
//       totalAmount: "$200.00",
//       paymentMethod: "Closed",
//       image: image,
//     },
//     {
//       invoice: "INV007",
//       paymentStatus: "Unpaid",
//       totalAmount: "$300.00",
//       paymentMethod: "Closed",
//       image: image,
//     },
// ]

const Appointment = ({ appointments }: { appointments: APPOINTMENT[] }) => {
    // const [inputValue, setInputValue] = useState<string>('')
    // const [selectValue, setSelectValue] = useState('')
    // const {isToggle, handleToggle} = useToggle()
    // const router = useRouter()
 
    // const handleSelect = (option: string) => {
    //     setSelectValue((prev) => (prev === option ? '' : option ))
    //     handleToggle
    // }

    // const data = {
    //     status:{
    //         label: 'Status',
    //         options: [
    //             'Paid',
    //             'Failed',
    //             'Pending'
    //         ]
    //     },
    // }

    // const handleNext = () => {
    //   router.push(`/patients/1`)
    // }
    // const {status } = data

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'text-green-700 bg-green-100'
            case 'PENDING':
                return 'text-gray-700 bg-gray-100'
            case 'CANCELLED':
                return 'text-red-700 bg-red-100'
            default:
                return ''
        }
    }
  return (
    <div className="">
        <Table>
            <TableHeader className="border-t border-borderColor text-grey-20">
                <TableRow className="bg-[#FAFBFF] font-inter text-[14px] font-medium ">
                    <TableHead >Patient</TableHead>
                    <TableHead>Health Concern </TableHead>
                    <TableHead>ConsultationType</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount </TableHead>
                    <TableHead>Date </TableHead>
                    <TableHead>Time </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {appointments?.map((appointment) => (
                <TableRow  key={appointment.id}>
                <TableCell className="font-inter font-normal text-[14px] text-grey-30 flex items-center">
                    {/* <Image src={invoice.image} alt='Patient' width={40} height={40} className="rounded-full" /> */}
                    <div className="ml-2">
                        {/* <p className="font-medium text-[13px]">{appointment.patientName}</p>   */}
                        <p className='text-grey-20 font-inter font-normal text-[12px]'>{appointment.date || '-'}</p>
                    </div>
                </TableCell>
                <TableCell className="font-inter font-normal text-[12px] text-grey-20">{appointment.healthConcern || '-'}</TableCell>
                <TableCell className="font-inter font-normal text-[12px] text-grey-20">{appointment.consultationType || '-'}</TableCell>
                <TableCell className="font-inter font-normal text-[14px] text-grey-20"> {appointment.note || '-'}</TableCell>
                <TableCell >
                    <span className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-3 ${getStatusStyle(appointment.status)}`}>
                        {appointment.status}
                    </span>
                </TableCell>
                <TableCell className="font-inter font-normal text-[14px] text-grey-20"> {appointment.amount.toLocaleString()}</TableCell>
                <TableCell className="font-inter font-normal text-[14px] text-grey-20"> {appointment.date || '-'}</TableCell>
                <TableCell className="font-inter font-normal text-[14px] text-grey-20"> {appointment.time || '-'}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <Paginate />
    </div>
  )
}

export default Appointment