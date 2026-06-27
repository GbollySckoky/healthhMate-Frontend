"use client"
import { FlexWrapper, PageWrapper } from '@/components/ui/Reusable'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {Search } from 'lucide-react'
import { TableTitle } from "@/components/ui/Reusable";
import Input from "@/components/ui/Input";
import MinSelectField from "@/components/ui/MinSelectField";
import { useEffect, useState } from "react";
import useToggle from "@/hooks/useToggle";
import Paginate from '@/components/ui/Paginate'
import { useRouter } from 'next/navigation'
import { STATUS } from '@/types/status'
import { Doctor } from '@/lib/constant/service';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Pagination } from '@/interface/pagination.interfac';
import { Appointment } from '@/interface/doctor-apppointment.interface';


const Patients = () => {
    const [inputValue, setInputValue] = useState<string>('')
    // const [selectValue, setSelectValue] = useState('')
    const [debounceSearchQuery, setDebounceSearchQuery] = useState("")
    const {isToggle, handleToggle} = useToggle()
    const router = useRouter()
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 10,
        totalPages: 0,
        total: 0,
    });
    const [activeStatus, setActiveStatus] = useState<string | undefined>();

    const handleSelect = (option: string) => {
        setActiveStatus((prev) => (prev === option ? '' : option ))
        // handleToggle
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceSearchQuery(inputValue);

            setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
    }, 300);

    return () => clearTimeout(timeout);
    }, [inputValue]);
    const status = {
        label: 'Status',
        options: [
            'Paid',
            'Failed',
            'Pending'
        ]
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
                return "text-gray-700 bg-gray-100";
        }
    }

    const { data, isLoading, error, isError } = useQuery({
        queryKey: [
          "getAppointment",
          activeStatus,
          debounceSearchQuery,
          pagination.page,
          pagination.limit,
        ],
        queryFn: () =>
          Doctor.getAppointment(
            pagination.page,
            pagination.limit,
            activeStatus,
            debounceSearchQuery
          ),
    });
    
    const patients = data?.data ?? []
    console.log(patients)

    const activePatients = patients?.filter((patient: Appointment) => patient.status === STATUS.PENDING || patient.status === STATUS.CANCELLED ||  patient.status === STATUS.REJECTED)
    console.log(activePatients)
    const handleNext = (id: number) => {
      router.push(`/patients/${id}`)
    }

  return (
    <PageWrapper>
        <FlexWrapper>
            <div className="bg-white rounded-lg  border border-borderColor">
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
                        value={activeStatus}
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
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={5}>
                                <LoadingSpinner />
                            </TableCell>
                        </TableRow>
                    ) : isError ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                {error.message}
                            </TableCell>
                        </TableRow>
                    ) : activePatients.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                No patients found
                            </TableCell>
                        </TableRow>
                    ) :activePatients.map((data: Appointment) => (
                        <TableRow  key={data.id} onClick={() => handleNext(data.id)} className="border-t border-borderColor hover:bg-[#FAFBFF]">
                        <TableCell className="font-inter font-medium text-[13px] text-grey-30">
                        <p> {data.user.firstName || "N/A"}</p> 
                            <p className="text-grey-20 text-[12px] font-normal">{data.user.email || 'N/A'}</p>
                        </TableCell>
                        <TableCell className="font-inter font-normal text-[13px] text-grey-30">
                            <p>{data.date || "N/A"}</p> 	
                            <p className="text-grey-20 text-[12px]">{data.time || "N/A"}</p>
                        </TableCell>
                        <TableCell className="font-inter font-normal text-[12px] text-grey-20"> 
                        {data.consultationType}
                        </TableCell>
                        <TableCell>
                            <span className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-3 ${getStatusStyle(data.status)} text-grey-20`}>
                            {data.status || 'N/A'}
                            </span>
                        </TableCell>
                        <TableCell className="font-inter font-medium text-[12px] text-red-800 cursor-pointer" onClick={() => handleNext(data.id)}> View Details</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <Paginate />
            </div>
        </FlexWrapper>
    </PageWrapper>
  )
}

export default Patients