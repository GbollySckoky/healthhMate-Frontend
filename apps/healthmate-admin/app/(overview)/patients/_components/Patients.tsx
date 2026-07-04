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
import Input from "@/components/Inputs/Input";
import MinSelectField from "@/components/Inputs/MinSelectField";
import { useState } from "react";
import useToggle from "@/hooks/useToggle";
import Paginate from '@/components/ui/paginate'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Hospital_Admin } from '@/lib/service/service'
import { GET_ALL_APPOINTMENTS } from '@/lib/interface/get_all_appointyment'
import { STATUS } from '@/types/status'


const Patients = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [selectValue, setSelectValue] = useState('')
    const {isToggle, handleToggle} = useToggle()
    const router = useRouter()

    const { data: datas, isLoading, isError, error } = useQuery({
        queryKey: ['appointment'],
        queryFn: () => Hospital_Admin.getAllAppointments(),
    })
    console.log('DATA!!', datas?.data)
    const patientData = datas?.data || []
    const patients = patientData?.filter((patient: GET_ALL_APPOINTMENTS) => patient.status !== STATUS.PENDING)
    console.log("PATIENT", patients)
 
    const handleSelect = (option: string) => {
        setSelectValue((prev) => (prev === option ? '' : option ))
        handleToggle
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

    const data = {
        status:{
            label: 'Status',
            options: [
                STATUS.COMPLETED,
                STATUS.PENDING,
                STATUS.CANCELLED
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
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Doctor Name</TableHead>
                        <TableHead>Health Concern</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {patients.map((patient: GET_ALL_APPOINTMENTS) => (
                    <TableRow  key={patient.id}>
                        <TableCell className="font-inter font-normal text-[14px] text-grey-30">
                            <div className="flex items-center">
                                <Image src={image} alt='Doctor' width={40} height={40} className="rounded-full" />
                                <div className="ml-2">
                                    <p className="font-inter font-normal text-[12px] text-grey-20">{patient.user.firstName} {patient.user.lastName}</p>
                                    <p className="font-inter font-normal text-[12px] text-grey-20">{patient.user.email || '-'}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="font-inter font-normal text-[14px] text-grey-30">
                            <div>
                                <p className="font-inter font-normal text-[12px] text-grey-20">{patient.doctor.firstName} {patient.doctor.lastName}</p>  
                                <p className='font-inter font-normal text-[12px] text-grey-20'>{patient.doctor.email || '-'}</p>
                            </div>
                        </TableCell>
                            <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                            {patient.healthConcern || "-"}
                        </TableCell>
                        <TableCell className="font-inter font-normal text-[14px] text-grey-30">
                            <div>
                                <p className="font-inter font-normal text-[12px] text-grey-20">{patient.date || '-'}</p> 
                                <p className="font-inter font-normal text-[12px] text-grey-20">{patient.time || '-'}</p>
                            </div>
                        </TableCell>
                        <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                            {patient.consultationType || "-"}
                        </TableCell>
                        <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                            {patient.amount.toLocaleString() || "-"}
                        </TableCell>
                        <TableCell>
                            <span className={`font-inter font-normal rounded-full text-[12px] w-fit py-1 px-3 ${getStatusStyle(patient.status)}`}>
                                {patient.status}
                            </span>
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