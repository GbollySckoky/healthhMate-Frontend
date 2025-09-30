import { MediumTitle, Text } from '@/components/ui/Reusable'
import React from 'react'
import { recentActivities } from '@/components/ui/data'
const RecentActivities = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 w-full h-[400px] flex flex-col">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
            <div className="flex items-center justify-between">
                <MediumTitle>Recent Activity</MediumTitle>
            </div>
        </div>
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 pt-0">
            {recentActivities.map((recent,id) => {
                const {title, info, time} = recent
                return(
                    <div key={id} className='flex items-center justify-between p-3'>
                        <div className='flex items-center'>
                            <p className='h-10 w-[6px] bg-red-200 rounded-lg' />
                            <div className='ml-3'>
                                <p className='font-libre text-[14px] font-medium text-grey-50'>{title}</p>
                                <p className="font-libre text-grey-600 font-normal text-[14px]">{info}</p>
                            </div>
                        </div>
                        <p className="font-libre text-red-900 font-normal text-[12px]">{time}</p>
                    </div>
                )
            })}
        </div>
        
    </div>
  )
}

export default RecentActivities