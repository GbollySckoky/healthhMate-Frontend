"use client"
import { CloudUpload, Search } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import image from '@/assets/Image.png'
// import Image from "next/image"
import { TableTitle } from "@/components/ui/Reusable"
import Input from "@/components/Inputs/Input"
import MinSelectField from "@/components/Inputs/MinSelectField"
import { useState } from "react"
import useToggle from "@/hooks/useToggle"
import Paginate from '@/components/ui/paginate'
import { useRouter } from 'next/navigation'
import Calendar from '@/components/calendar/Calendar'
import { useQuery } from '@tanstack/react-query';
import { Hospital_Admin } from '@/lib/service/service';
import { GET_ALL_APPOINTMENTS } from '@/lib/interface/get_all_appointyment'
import { STATUS } from '@/types/status'


const AllAppointmentTable = () => {
    const [searchInput, setSearchInput] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState('')
    const [specialtyFilter, setSpecialtyFilter] = useState('')
    const { isToggle: showStatusDropdown, handleToggle: toggleStatusDropdown } = useToggle()
    const { isToggle: showSpecialtyDropdown, handleToggle: toggleSpecialtyDropdown } = useToggle()
    const router = useRouter()

     const { data, isLoading, isError, error } = useQuery({
        queryKey: ['appointment'],
        queryFn: () => Hospital_Admin.getAllAppointments(),
    })
    console.log('DATA!!', data?.data)
    const appointments = data?.data || []
    // Filter data based on search and filters
    // const filteredAppointments = appointments.filter((appointment) => {
    //     const matchesSearch = 
    //         appointment.doctorName.toLowerCase().includes(searchInput.toLowerCase()) ||
    //         appointment.specialty.toLowerCase().includes(searchInput.toLowerCase()) ||
    //         appointment.patientName.toLowerCase().includes(searchInput.toLowerCase())
        
    //     const matchesStatus = !statusFilter || appointment.status === statusFilter
    //     const matchesSpecialty = !specialtyFilter || appointment.specialty === specialtyFilter

    //     return matchesSearch && matchesStatus && matchesSpecialty
    // })

    const handleStatusSelect = (option: string) => {
        setStatusFilter(prev => prev === option ? '' : option)
        toggleStatusDropdown()
    }

    const handleSpecialtySelect = (option: string) => {
        setSpecialtyFilter(prev => prev === option ? '' : option)
        toggleSpecialtyDropdown()
    }

    // const handleExport = () => {
    //     // Export functionality
    //     console.log('Exporting data...', filteredAppointments)
    // }

    const handleAppointmentClick = (appointmentId: number) => {
        router.push(`/appointment/${appointmentId}`)
    }

    // Get status styling
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

    const filterOptions = {
        status: {
            label: 'Status',
            options: [STATUS.COMPLETED, STATUS.PENDING, STATUS.CANCELLED, 'In Progress', 'Open', 'Closed']
        },
        specialty: {
            label: 'Specialty',
            options: ['Cardiologist', 'Neurologist', 'Dermatologist', 'Orthopedic', 'Pediatrics']
        }
    }

    return (
        <div className="bg-white rounded-lg w-full border border-borderColor">
            {/* Header */}
            <div className='border-b border-borderColor100 p-4 flex items-center justify-between'>
                <TableTitle>All Appointments</TableTitle>
                <button 
                    // onClick={handleExport}
                    className='border border-borderColor100 rounded-lg flex items-center px-3 cursor-pointer py-2 gap-2 hover:bg-gray-50 transition-colors'
                >
                    <CloudUpload size={15} />
                    <p className='font-medium text-[14px] font-inter text-[#414651]'>Export</p>
                </button>
            </div>

            {/* Filters */}
            <div className="flex space-x-3 my-4 px-4">
                <Input 
                    value={searchInput}
                    placeholder='Search by name, specialty'
                    onChange={(e) => setSearchInput(e.target.value)}
                    icon={<Search size={17} color="#C11574" />}
                />
                <MinSelectField 
                    {...filterOptions.specialty}
                    value={specialtyFilter}
                    show={showSpecialtyDropdown}
                    onSelect={handleSpecialtySelect}
                    onClick={toggleSpecialtyDropdown}
                    className='w-fit'
                />
                <MinSelectField 
                    {...filterOptions.status}
                    value={statusFilter}
                    show={showStatusDropdown}
                    onSelect={handleStatusSelect}
                    onClick={toggleStatusDropdown}
                    className='w-fit'
                />
                <Calendar />
            </div>

            {/* Table */}
            <Table>
                <TableHeader className="border-t border-borderColor text-grey-20">
                    <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium">
                        <TableHead>Doctor Name</TableHead>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Health Concern</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.length > 0 ? (
                        appointments.map((appointment:  GET_ALL_APPOINTMENTS) => (
                            <TableRow 
                                key={appointment.id}
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleAppointmentClick(appointment.id)}
                            >
                                <TableCell className="font-inter font-normal text-[14px] text-grey-30">
                                    <div className="flex items-center">
                                        {/* <Image src={appointment.image} alt='Doctor' width={40} height={40} className="rounded-full" /> */}
                                        <div className="ml-2">
                                            <p className="font-medium">{appointment.doctor.firstName} {appointment.doctor.lastName}</p>  
                                            <p className='text-red-800 font-inter font-normal text-[12px]'>{appointment.doctor.email || '-'}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-inter font-normal text-[14px] text-grey-30">
                                    <div>
                                        <p className="font-medium">{appointment.user.firstName} {appointment.user.lastName}</p>
                                        <p className="font-inter font-normal text-[12px] text-grey-20">{appointment.user.email || '-'}</p>
                                    </div>
                                </TableCell>
                                 <TableCell className="font-inter font-normal text-[14px] text-grey-20">
                                    {appointment.healthConcern || "-"}
                                </TableCell>
                                <TableCell className="font-inter font-normal text-[14px] text-grey-30">
                                    <div>
                                        <p className="font-medium">{appointment.date || '-'}</p> 
                                        <p className="font-inter font-normal text-[12px] text-grey-20">{appointment.time || '-'}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="font-inter font-normal text-[14px] text-grey-20">
                                    {appointment.consultationType || "-"}
                                </TableCell>
                                <TableCell className="font-inter font-normal text-[14px] text-grey-20">
                                    {appointment.amount.toLocaleString() || "-"}
                                </TableCell>
                                <TableCell>
                                    <span className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-3 ${getStatusStyle(appointment.status)}`}>
                                        {appointment.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                No appointments found matching your criteria
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Paginate />
        </div>
    )
}

export default AllAppointmentTable