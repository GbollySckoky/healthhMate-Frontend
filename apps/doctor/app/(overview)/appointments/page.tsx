"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageWrapper, TableTitle } from '@/components/ui/Reusable'
import { useQuery } from '@tanstack/react-query'
import { Doctor } from '@/lib/constant/service'
import Input from '@/components/ui/Input'
import { Search } from 'lucide-react'
import MinSelectField from '@/components/ui/MinSelectField'
import Calendar from '@/components/ui/Calendar'
import useToggle from '@/hooks/useToggle'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GetAllAppointment } from '@/interface/get-all-appointment'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useRouter } from 'next/navigation'

const filterOptions = {

  specialty: {
      label: 'Status',
      options: ['Video Call', 'Audio Call', "In-Person"]
  }
}

const Page = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const router = useRouter()
  const { isToggle: showSpecialtyDropdown, handleToggle: toggleSpecialtyDropdown } = useToggle()
  const [debounceSearchQuery, setDebounceSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [activeStatus, setActiveStatus] = useState<string | undefined>();


  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearchQuery(searchInput)
    },300);
   return () => clearTimeout(timeout)
  },[searchInput])

  const handleTabChange = (status: string) => {
      const statusMap: Record<string, string | undefined> = {
        all: undefined,
        waitingForApproval: 'Waiting For Approval',
        upComing: 'upcoming',
        startIn15Mins: 'Start in 15 mins',
        completed:'completed',
        cancelled: "cancelled",
        missed: 'missed',
        inProgress: 'In Progress'
      } 
      setActiveStatus(statusMap[status])
  }

  const handleSelectConsultationType = (type: string) => {
    setStatusFilter(prev => prev === type ? '' : type)
  }

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
            return 'text-red-800 bg-red-100'
        default:
            return ''
    }
}
  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['getAppointment'],
    queryFn: () => Doctor.getAppointment(
      activeStatus,
      statusFilter,
      debounceSearchQuery,
      debounceSearchQuery
    )
  })

//   console.log("OMO!!", data)
//   console.log("Error",error)

  const renderTable = () => {
    return(
      <Table>
          <TableHeader className="border-t border-borderColor text-grey-20">
              <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium">
                  <TableHead>Patient</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Consultation Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Health Concern</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
              {isLoading ? (
                  <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-red-800">
                      <LoadingSpinner />
                  </TableCell>
              </TableRow>
              ) : data?.results?.length > 0 ? (
                  data?.results.map((appointment: GetAllAppointment) => (
                      <TableRow 
                          key={appointment.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleAppointmentClick(appointment.id)}
                      >
                          <TableCell className="font-inter font-normal text-[14px] text-grey-30">
                              <div>
                                  <p className="font-medium text-[12px]">{appointment.patient || "N/A"}</p>
                                  <p className="font-inter font-normal text-[12px] text-grey-20">{"N/A"}</p>
                              </div>
                          </TableCell>
                          <TableCell className="font-inter font-normal text-grey-30">
                              <div>
                                  <p className="font-medium text-[12px]">{appointment.appointment_date || "N/A"}</p> 
                                  <p className="font-inter font-normal text-[12px] text-grey-20">{appointment.appointment_time || "N/A"}</p>
                              </div>
                          </TableCell>
                          <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                            {appointment.consultation_type || "N/A"}
                          </TableCell>
                          <TableCell>
                              <span className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-3 ${getStatusStyle(appointment.status)}`}>
                                  {appointment.status}
                              </span>
                          </TableCell>
                          <TableCell className="font-inter font-normal text-[12px]">
                            {appointment.health_concerns || "N/A"}
                          </TableCell>
                      </TableRow>
                  ))
              ) : (
                  <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-red-800">
                          No appointments found matching your criteria
                      </TableCell>
                  </TableRow>
              )}
          </TableBody>
      </Table>
    )
  }
  console.log("Search!", searchInput)
  console.log("Searcssh!", debounceSearchQuery)
  return (
    <PageWrapper>
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
                    value={statusFilter}
                    show={showSpecialtyDropdown}
                    onSelect={handleSelectConsultationType}
                    onClick={toggleSpecialtyDropdown}
                    className='w-fit'
                />
                {/* <MinSelectField 
                    {...filterOptions.status}
                    value={statusFilter}
                    show={showStatusDropdown}
                    onSelect={handleStatusSelect}
                    onClick={toggleStatusDropdown}
                    className='w-fit'
                /> */}
                <Calendar />
            </div>
        <Tabs defaultValue="all" onValueChange={handleTabChange}>
            <TabsList>
                <TabsTrigger value="all">All Appointment</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="all">{renderTable()} </TabsContent>
            <TabsContent value="completed">{renderTable()}  </TabsContent>
            <TabsContent value="pending">{renderTable()} </TabsContent>
            <TabsContent value="cancelled"> {renderTable()} </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  )
}

export default Page