"use client"
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageWrapper, TableTitle } from '@/components/ui/Reusable'
import Input from '@/components/ui/Input'
import { Search } from 'lucide-react'
// import MinSelectField from '@/components/ui/MinSelectField'
import Calendar from '@/components/ui/Calendar'
// import useToggle from '@/hooks/useToggle'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Doctor } from '@/lib/constant/service'
import { useQuery } from '@tanstack/react-query'

import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useRouter } from 'next/navigation'

// const filterOptions = {

//   specialty: {
//       label: 'Status',
//       options: ['Video Call', 'Audio Call', "In-Person"]
//   }
// }

const Page = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const router = useRouter()
  // const { isToggle: showSpecialtyDropdown, handleToggle: toggleSpecialtyDropdown } = useToggle()
  // const [debounceSearchQuery, setDebounceSearchQuery] = useState("")
  // const [statusFilter, setStatusFilter] = useState("")
  const [activeStatus, setActiveStatus] = useState<string | undefined>();

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setDebounceSearchQuery(searchInput)
  //   },300);
  //  return () => clearTimeout(timeout)
  // },[searchInput])

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

  // const handleSelectConsultationType = (type: string) => {
  //   setStatusFilter(prev => prev === type ? '' : type)
  // }

  const handleAppointmentClick = (appointmentId: number) => {
    router.push(`/appointments/${appointmentId}`)
}

// Get status styling
const getStatusStyle = (status: string) => {
    switch (status) {
        case 'Completed':
            return 'text-green-700 bg-green-100'
        case 'Pending':
            return 'text-gray-700 bg-gray-100'
        case 'Cancelled':
            return 'text-red-800 bg-red-100'
        default:
            return ''
    }
}
  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['getAppointment'],
    queryFn: () => Doctor.getAppointment()
  })

if (isLoading) {
  return (
    <div className="flex justify-center items-center py-10">
      <LoadingSpinner />
    </div>
  );
}

if (isError) {
  return (
    <div className="text-center py-10 text-red-600 text-sm">
      Failed to load appointments. Please try again. {" "} {error.message}
    </div>
  );
}

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
          {data.data.length > 0 ? (
            data.data.map((appointment: any) => (
              <TableRow
                key={appointment.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleAppointmentClick(appointment.id)}
              >
                <TableCell>
                  <p className="font-medium text-[12px]">
                    {appointment.user?.firstName || 'N/A'} {appointment.user?.lastName || 'N/A'}
                  </p>
                  <p className="text-[12px] text-grey-20">
                    {appointment.user?.email || 'N/A'}
                  </p>
                </TableCell>

                <TableCell>
                  <p className="font-medium text-[12px]">{appointment.date || 'N/A'}</p>
                  <p className="text-[12px] text-grey-20">{appointment.time || 'N/A'}</p>
                </TableCell>

                <TableCell className="text-[12px] text-grey-20">
                  {appointment.consultationType || 'N/A'}
                </TableCell>

                <TableCell>
                  <span className={`rounded-full text-[12px] py-1 px-3 ${getStatusStyle(appointment.status)}`}>
                    {appointment.status || 'N/A'}
                  </span>
                </TableCell>

                <TableCell className="text-[12px]">
                  {appointment.healthConcern || 'N/A'}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                No appointments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
//   console.log("Search!", searchInput)
//   console.log("Searcssh!", debounceSearchQuery)
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
                {/* <MinSelectField
                    {...filterOptions.specialty}
                    // value={statusFilter}
                    show={showSpecialtyDropdown}
                    // onSelect={handleSelectConsultationType}
                    onClick={toggleSpecialtyDropdown}
                    className='w-fit'
                /> */}
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