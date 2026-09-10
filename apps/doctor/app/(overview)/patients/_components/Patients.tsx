"use client"
import { FlexWrapper, PageWrapper } from '@/lib/components/ui/Reusable'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/lib/components/ui/table"
import {Search } from 'lucide-react'
import { TableTitle } from "@/lib/components/ui/Reusable";
import Input from "@/lib/components/ui/Input";
// import MinSelectField from "@/lib/components/ui/MinSelectField";
import { useEffect, useState } from "react";
// import useToggle from "@/lib/hooks/useToggle";
import Paginate from '@/lib/components/ui/Paginate'
import { useRouter } from 'next/navigation'
import { Doctor } from '@/lib/constant/service';
import { useQuery } from '@tanstack/react-query';
import { Pagination } from '@/lib/interface/pagination.interfac';
import { Appointment } from '@/lib/interface/doctor-apppointment.interface';
import PatientTableSkeleton from "@/lib/components/ui/PatientTableSkeleton";
import { getStatusStyle } from '@/lib/constant/status';

const Patients = () => {
    const [inputValue, setInputValue] = useState<string>('')
    // const [selectValue, setSelectValue] = useState('')
    const [debounceSearchQuery, setDebounceSearchQuery] = useState("")
    // const {isToggle, handleToggle} = useToggle()
    const router = useRouter()
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 10,
        totalPages: 0,
        total: 0,
    });
    const [activeStatus, setActiveStatus] = useState<string | undefined>();

    // const handleSelect = (option: string) => {
    //     setActiveStatus((prev) => (prev === option ? '' : option ))
    //     // handleToggle
    // }

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
    // const status = {
    //     label: 'Status',
    //     options: [
    //         'Paid',
    //         'Failed',
    //         'Pending'
    //     ]
    // }

    const { data, isLoading, error, isError } = useQuery({
        queryKey: [
          "getApprovedAppointment",
          pagination.page,
          pagination.limit,
          activeStatus,
          debounceSearchQuery
        ],
        queryFn: () =>
          Doctor.getApprovedAppointment(
            pagination.page,
            pagination.limit,
            activeStatus,
            debounceSearchQuery
          ),
    });
    
    const patients = data?.data || []
     useEffect(() => {
        if (data?.meta) {
          setPagination((prev) => ({
            ...prev,
            total: data.meta.total,
            totalPages: data.meta.totalPages,
          }));
        }
      }, [data]);


    const handleNext = (id: string) => {
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
                        placeholder='Search by Name, Consultation'
                        onChange={(e) => setInputValue(e.target.value)}
                        icon={<Search size={17} color="#C11574" />}
                    />
                    {/* <MinSelectField 
                        {...status}
                        value={activeStatus}
                        show={isToggle}
                        onSelect={handleSelect}
                        onClick={handleToggle}
                        className='w-fit'
                    /> */}
                </div>
                <Table>
                    <TableHeader className="border-t border-borderColor ">
                        <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium text-grey-20">
                            <TableHead >Patient </TableHead>
                             <TableHead>Hospital Name</TableHead>
                            <TableHead>Doctor Name</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Consultation Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Health Concern</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='cursor-pointer'>
                    {isLoading ? (
                       <PatientTableSkeleton />
                    ) : isError ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                {error.message}
                            </TableCell>
                        </TableRow>
                    ) : patients.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                No active patients found
                            </TableCell>
                        </TableRow>
                    ) :patients.map((data: Appointment) => (
                        <TableRow  key={data.id} onClick={() => handleNext(data.id)} className="border-t border-borderColor hover:bg-[#FAFBFF]">
                        <TableCell className="font-inter font-medium text-[12px] text-grey-20">
                        <p> {data.user.firstName || "N/A"}  {data.user.lastName || "N/A"}</p> 
                            <p className="text-grey-20 text-[12px] font-normal">{data.user.email || 'N/A'}</p>
                        </TableCell>
                         <TableCell className="text-[12px] text-grey-20">
                            {data.hospital.hospitalName || "N/A"}
                        </TableCell>
                            <TableCell className="text-[12px] text-grey-20">
                            {data.doctor?.firstName.charAt(0).toUpperCase() + data.doctor?.firstName.slice(1) || "N/A"} {" "}
                            {data.doctor?.lastName.charAt(0).toUpperCase() + data.doctor?.lastName.slice(1) || "N/A"}
                        </TableCell>
                        <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                            <p>{data.date || "N/A"}</p> 	
                            <p className="text-grey-20 text-[12px]">{data.time || "N/A"}</p>
                        </TableCell>
                        <TableCell className="font-inter font-normal text-[12px] text-grey-20"> 
                        {data.consultationType.charAt(0).toUpperCase() + data.consultationType.slice(1).replaceAll("_", " ")  || "N/A"}
                        </TableCell>
                        <TableCell>
                            <span className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-3 ${getStatusStyle(data.status)}`}>
                            {data.status || 'N/A'}
                            </span>
                        </TableCell>
                        <TableCell className="text-[12px] text-grey-20">
                            {data.healthConcern || "N/A"}
                        </TableCell>
                        <TableCell className="font-inter font-medium text-[12px] text-red-800 cursor-pointer" onClick={() => handleNext(data.id)}> View Details</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <Paginate pagination={pagination} setPagination={setPagination}/>
            </div>
        </FlexWrapper>
    </PageWrapper>
  )
}

export default Patients