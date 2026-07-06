"use client"
import DetailsNav from '@/components/ui/DetailsNav'
import { Card, Infos, NoteCard, PageWrapper, StatusInfo } from '@/components/ui/Reusable'
import { GET_ALL_APPOINTMENTS } from '@/lib/interface/get_all_appointyment'
import { Hospital_Admin } from '@/lib/service/service'
import { useQuery } from '@tanstack/react-query'
// import { useParams } from 'next/dist/client/components/navigation'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const params = useParams()
    const id = Number(params?.slug)
    console.log(id)
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['appointment'],
        queryFn: () => Hospital_Admin.getAllAppointments(),
    })
    console.log('DATA!!', data?.data)
    const appointments = data?.data || []
    const appointment = appointments?.find((appointment: GET_ALL_APPOINTMENTS) => appointment.id === id)
    console.log(appointment)
  return (
    <PageWrapper>
        <DetailsNav text='Appointments' detailsText='Appointment Details'/>
        <Card>
            <StatusInfo label='Status' value={appointment?.status}/>
            <Infos label='Date & Time' value={`${appointment?.date} at ${appointment?.time}`}/>
            <Infos label='Duration' value={appointment?.duration || "-"}/>
            <Infos label='Type' value={appointment?.consultationType || "-"}/>
        </Card>

        {/* Doctor Info */}
        <Card className='mt-5'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Doctor Information</p>
            <Infos label='Name' value={appointment?.doctor?.firstName + " " + appointment?.doctor?.lastName}/>
            <Infos label='Specialty' value={appointment?.doctor?.specialization || "-"}/>
            <Infos label='Email' value={appointment?.doctor?.email || "-"}/>
        </Card>

        {/* Patient Info */}
        <Card className='mt-5'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Patient Information</p>
            <Infos label='Name' value={appointment?.user?.firstName + " " + appointment?.user?.lastName}/>
            <Infos label='Email' value={appointment?.user?.email || "-"}/>
        </Card>
        
        {/* Patient Note */}
        <NoteCard className='mt-5' label='Patient Notes' value={appointment?.healthConcern || "-"}/>

        {/* Consultation */}
        <NoteCard className='mt-5' label='Consultation Diagnosis and Next Step' value={appointment?.consultationDiagnosis}/>

        {/* Feedback */}
        <div className={`border border-borderColor rounded-lg p-3 bg-white mt-5` }>
            <p className='text-[#535862] text-[16px] font-lato font-normal'>Rating & Feedback</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            className="lucide lucide-star-icon lucide-star mt-2"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
            <p className='font-lato text-[18px] font-medium text-grey-30 mt-2'>The doctor was very professional and helpful in addressing my concerns.</p>
        </div>
    </PageWrapper>
  )
}

export default Page