"use client"
import { Search } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import image from '@/assets/Image.png'
import { TableTitle } from "@/components/ui/Reusable"
import { useState } from "react"
import useToggle from "@/hooks/useToggle"
import Paginate from '@/components/ui/Paginate'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Calendar from '@/components/ui/Calendar'
import MinSelectField from '@/components/ui/MinSelectField'


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
    image: any,
    health_concerns: string
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
        health_concerns: "High blood pressure, chest pain"
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
        health_concerns: "High blood pressure, chest pain"
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
        health_concerns: "High blood pressure, chest pain"
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
        health_concerns: "High blood pressure, chest pain"
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
        health_concerns: "High blood pressure, chest pain"
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
        router.push(`/appointments/${appointmentId}`)
    }

    // Get status styling
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-700 bg-green-100'
            case 'upcoming':
                return 'text-gray-700 bg-gray-100'
            case 'cancelled':
                return 'text-red-700 bg-red-100'
            default:
                return ''
        }
    }

    const filterOptions = {
        status: {
            label: 'Type',
            options: ['Completed', 'Pending', 'Cancelled']
        },
        specialty: {
            label: 'Status',
            options: ['Video Call', 'Audio Call']
        }
    }

    return (
        <div className="bg-white rounded-lg w-full border border-borderColor">
            {/* Header */}
            <div className='border-b border-borderColor100 p-4 flex items-center justify-between'>
                <TableTitle>All Appointments</TableTitle>
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
                        <TableHead>Patient</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Consultation Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Health Concern</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { appointments.length > 0 && (
                        appointments.map((appointment: any) => (
                            <TableRow 
                                key={appointment.id}
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleAppointmentClick(appointment.id)}
                            >
                                <TableCell className="font-inter font-normal text-[14px] text-grey-30">
                                    <div>
                                        <p className="font-medium text-[12px]">{appointment.patientName || "N/A"}</p>
                                        <p className="font-inter font-normal text-[12px] text-grey-20">{appointment.patientEmail || "N/A"}</p>
                                    </div>
                                </TableCell>
                                    <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                                   {appointment.doctorName || "N/A"}
                                </TableCell>
                                  <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                                   {appointment.specialty || "N/A"}
                                </TableCell>
                                <TableCell className="font-inter font-normal text-grey-30">
                                    <div>
                                        <p className="font-medium text-[12px]">{appointment.date || "N/A"}</p> 
                                        <p className="font-inter font-normal text-[12px] text-grey-20">{appointment.time || "N/A"}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                                   {appointment.type || "N/A"}
                                </TableCell>
                                <TableCell>
                                    <span className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-3 ${getStatusStyle(appointment.status)}`}>
                                        {appointment.status}
                                    </span>
                                </TableCell>
                                <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                                    {appointment.rating || "N/A"}
                                </TableCell>
                                <TableCell className="font-inter font-normal text-[12px]">
                                   {appointment.health_concerns || "N/A"}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <Paginate />
        </div>
    )
}

export default AllAppointmentTable