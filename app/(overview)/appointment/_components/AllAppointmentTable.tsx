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
import Image from "next/image"
import { TableTitle } from "@/components/ui/Reusable"
import { STATUS } from "@/types/status"
import Input from "@/components/Inputs/Input"
import MinSelectField from "@/components/Inputs/MinSelectField"
import { useState } from "react"
import useToggle from "@/hooks/useToggle"
import Paginate from '@/components/ui/paginate'
import { useRouter } from 'next/navigation'
import Calendar from '@/components/calendar/Calendar'

// Types for better type safety
interface Appointment {
    id: string
    doctorName: string
    specialty: string
    patientName: string
    patientEmail: string
    date: string
    time: string
    type: string
    rating: number
    status: 'Completed' | 'Pending' | 'Cancelled' | 'In Progress' | 'Open' | 'Closed'
    image: any
}

// Mock data with proper structure
const appointments: Appointment[] = [
    {
        id: "APT001",
        doctorName: "Dr. Sarah Wilson",
        specialty: "Cardiologist",
        patientName: "John Doe",
        patientEmail: "john@gmail.com",
        date: "2024-01-15",
        time: "10:00 AM",
        type: "Consultation",
        rating: 4.5,
        status: "Completed",
        image: image,
    },
    {
        id: "APT002",
        doctorName: "Dr. Michael Chen",
        specialty: "Neurologist",
        patientName: "Jane Smith",
        patientEmail: "jane@gmail.com",
        date: "2024-01-16",
        time: "2:30 PM",
        type: "Follow-up",
        rating: 4.8,
        status: "Pending",
        image: image,
    },
    {
        id: "APT003",
        doctorName: "Dr. Emily Johnson",
        specialty: "Dermatologist",
        patientName: "Bob Wilson",
        patientEmail: "bob@gmail.com",
        date: "2024-01-17",
        time: "9:15 AM",
        type: "Check-up",
        rating: 4.2,
        status: "Cancelled",
        image: image,
    },
    {
        id: "APT004",
        doctorName: "Dr. David Brown",
        specialty: "Orthopedic",
        patientName: "Alice Davis",
        patientEmail: "alice@gmail.com",
        date: "2024-01-18",
        time: "11:45 AM",
        type: "Surgery",
        rating: 4.9,
        status: "In Progress",
        image: image,
    },
    {
        id: "APT005",
        doctorName: "Dr. Lisa Garcia",
        specialty: "Pediatrics",
        patientName: "Tommy Lee",
        patientEmail: "tommy@gmail.com",
        date: "2024-01-19",
        time: "3:00 PM",
        type: "Vaccination",
        rating: 4.7,
        status: "Open",
        image: image,
    },
]

const AllAppointmentTable = () => {
    const [searchInput, setSearchInput] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState('')
    const [specialtyFilter, setSpecialtyFilter] = useState('')
    const { isToggle: showStatusDropdown, handleToggle: toggleStatusDropdown } = useToggle()
    const { isToggle: showSpecialtyDropdown, handleToggle: toggleSpecialtyDropdown } = useToggle()
    const router = useRouter()

    // Filter data based on search and filters
    const filteredAppointments = appointments.filter((appointment) => {
        const matchesSearch = 
            appointment.doctorName.toLowerCase().includes(searchInput.toLowerCase()) ||
            appointment.specialty.toLowerCase().includes(searchInput.toLowerCase()) ||
            appointment.patientName.toLowerCase().includes(searchInput.toLowerCase())
        
        const matchesStatus = !statusFilter || appointment.status === statusFilter
        const matchesSpecialty = !specialtyFilter || appointment.specialty === specialtyFilter

        return matchesSearch && matchesStatus && matchesSpecialty
    })

    const handleStatusSelect = (option: string) => {
        setStatusFilter(prev => prev === option ? '' : option)
        toggleStatusDropdown()
    }

    const handleSpecialtySelect = (option: string) => {
        setSpecialtyFilter(prev => prev === option ? '' : option)
        toggleSpecialtyDropdown()
    }

    const handleExport = () => {
        // Export functionality
        console.log('Exporting data...', filteredAppointments)
    }

    const handleAppointmentClick = (appointmentId: string) => {
        router.push(`/appointment/${appointmentId}`)
    }

    // Get status styling
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

    const filterOptions = {
        status: {
            label: 'Status',
            options: ['Completed', 'Pending', 'Cancelled', 'In Progress', 'Open', 'Closed']
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
                    onClick={handleExport}
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
                        <TableHead>Patient</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => (
                            <TableRow 
                                key={appointment.id}
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleAppointmentClick(appointment.id)}
                            >
                                <TableCell className="font-inter font-normal text-[14px] text-grey-30">
                                    <div className="flex items-center">
                                        <Image src={appointment.image} alt='Doctor' width={40} height={40} className="rounded-full" />
                                        <div className="ml-2">
                                            <p className="font-medium">{appointment.doctorName}</p>  
                                            <p className='text-red-800 font-inter font-normal text-[12px]'>{appointment.specialty}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-inter font-normal text-[14px] text-grey-30">
                                    <div>
                                        <p className="font-medium">{appointment.patientName}</p>
                                        <p className="font-inter font-normal text-[12px] text-grey-20">{appointment.patientEmail}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="font-inter font-normal text-[14px] text-grey-30">
                                    <div>
                                        <p className="font-medium">{appointment.date}</p> 
                                        <p className="font-inter font-normal text-[12px] text-grey-20">{appointment.time}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="font-inter font-normal text-[14px] text-grey-20">
                                    {appointment.type}
                                </TableCell>
                                <TableCell className="font-inter font-normal text-[14px] text-grey-20">
                                    ⭐ {appointment.rating}
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