"use client"
import { MediumTitle } from '@/components/ui/Reusable'
import React from 'react'
import { Hospital_Admin } from '@/lib/service/service'
import { adminQueryKeys } from '@/lib/constant/query-keys'
import { useQuery } from '@tanstack/react-query'
import { GET_ALL_APPOINTMENTS } from '@/lib/interface/get_all_appointyment'
import { RecentActivitySkeleton } from '@/components/ui/DashboardSkeleton'


const RecentActivities = () => {
    const {data, isLoading, error, isError} = useQuery({
        queryKey: adminQueryKeys.appointments(1, 10),
        queryFn: () => Hospital_Admin.getAllAppointments(1, 10)
    })

    const recentActivities: GET_ALL_APPOINTMENTS[] = data?.data ?? []    
  return (
    <div className="bg-white rounded-lg border border-gray-200 w-full h-[400px] flex flex-col">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
            <div className="flex items-center justify-between">
                <MediumTitle>Recent Activity</MediumTitle>
            </div>
        </div>
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 pt-0">
          {isLoading ? (
            <RecentActivitySkeleton />
            ) : isError ? (
              <p className="text-center text-sm text-gray-500 py-20">
                {error instanceof Error ? error.message : "Failed to load recent activities. Please try again."}
              </p>
            ) : recentActivities.length === 0 ? (
              <p className="text-center py-8 text-gray-500 text-sm">
                No recent activities found
              </p>
            ) : recentActivities?.map((recent: GET_ALL_APPOINTMENTS) => {
            return(
                <div key={recent.id} className='flex items-center justify-between p-3'>
                    <div className='flex items-center'>
                        <p className='h-10 w-[6px] bg-red-200 rounded-lg' />
                        <div className='ml-3'>
                            <p className='font-libre text-[14px] font-medium text-grey-50'>New consultation booked</p>
                            <p className="font-libre text-grey-600 font-normal text-[14px]">Patient: {recent.user.firstName}{" "}{recent.user.lastName}</p>
                        </div>
                    </div>
                    <p className="font-libre text-red-900 font-normal text-[12px]">{recent.time}</p>
                </div>
            )
        })}
        </div>
        
    </div>
  )
}

export default RecentActivities