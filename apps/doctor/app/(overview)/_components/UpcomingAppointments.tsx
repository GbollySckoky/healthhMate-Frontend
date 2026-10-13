"use client"
import { MediumTitle, MinText, SmallestTitle } from '@/lib/components/ui/Reusable'
import React from 'react'
import { ChevronRight } from 'lucide-react';
import Image from 'next/image'
import image from '@/assets/default.jpg';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { AppointmentCardSkeleton } from '@/lib/components/ui/DashboardSkeleton';
import useGetTodayAppointment from '@/lib/hooks/useGetTodayAppointment';
import { Appointment } from '@/lib/interface/doctor-apppointment.interface';

const UpcomingAppointment = () => {
  const router = useRouter()

    const {todayAppointments, isLoading, error, isError} = useGetTodayAppointment()
  return (
    <div className="bg-white rounded-lg border border-gray-200 w-full h-[400px] flex flex-col">
    {/* Fixed header */}
    <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
      <div className="flex items-center justify-between">
        <MediumTitle>Upcoming Appointments</MediumTitle>
        <div className="flex items-center text-red-800 cursor-pointer hover:text-red-600" onClick={() => router.push(ROUTES.patients)}>
          <p className='font-semibold text-[15px]'>See all</p>
          <ChevronRight size={18} />
        </div>
      </div>
      <p className='pt-3 text-gray-500 font-semibold text-[14px]'>
        Today
      </p>
    </div>
    
    {/* Scrollable content */}
    <div className="flex-1 overflow-y-auto p-4 pt-0">
      {isLoading ? (
        <AppointmentCardSkeleton />
        ) : isError ? (
          <p className="text-center py-20 text-sm">
            {error instanceof Error ? error.message : "Failed to load upcoming appointments. Please try again."}
          </p>
        ) : todayAppointments.length === 0 ? (
          <p className="text-center py-8 text-gray-500 text-sm">
            No upcoming appointments found
          </p>
        ) : todayAppointments.slice(0, 10).map((consultation: Appointment) => {
       return(
        <div key={consultation.id} className="flex items-center justify-between py-4 border-t border-gray-200 first:border-t-0">
          <div className="flex">
            <Image 
              src={consultation?.user?.profile?.profilePicture || image} 
              alt={`${consultation.id} profile`} 
              className='w-10 h-10 rounded-full object-cover flex-shrink-0'
            />
            <div className='flex flex-col ml-3 flex-1 min-w-0'>
              <SmallestTitle>Patient: {consultation?.user?.firstName || "N/A"} {consultation?.user?.lastName || "N/A"}</SmallestTitle>
              <div className="flex items-center space-x-2 ">
                <MinText className='text-red-800 font-medium'>{consultation?.time || "N/A"}</MinText>
                <MinText className='text-gray-500'>|</MinText>
                <MinText className='text-gray-500'>{consultation?.date || "N/A"}</MinText>
                <MinText className='text-gray-500'>|</MinText>
                <MinText className='text-gray-500'>{consultation?.consultationType || "N/A"}</MinText>
              </div>
              <MinText className='text-gray-500 truncate'>
                Dr. {consultation?.doctor?.firstName || "N/A"} {" "} {consultation?.doctor?.lastName || "N/A"}
              </MinText>
            </div>
          </div>
          <button 
            className='font-semibold text-[14px] border p-2 rounded-md font-libre text-[#414651] cursor-pointer hover:text-red-800'
            onClick={() => router.push(`${ROUTES.patients}/${consultation.id}`)}>
            View Details
          </button>
          </div>
        )
      })}
    </div>
  </div>
  )
}

export default UpcomingAppointment
