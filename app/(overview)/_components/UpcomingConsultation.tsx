import { Card, DisplayFlex, MediumTitle, MinText, SmallestTitle } from '@/components/ui/Reusable'
import React from 'react'
import { ChevronRight } from 'lucide-react';
import { upcomingConsultation } from '@/components/data';
import Image from 'next/image';

const UpcomingConsultation = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 w-full h-[400px] flex flex-col">
    {/* Fixed header */}
    <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
      <div className="flex items-center justify-between">
        <MediumTitle>Upcoming Consultations</MediumTitle>
        <div className="flex items-center text-red-800 cursor-pointer hover:text-red-600">
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
      {upcomingConsultation.map((consultation, index) => {
        const { title, time, date, img, callType, patient} = consultation;
        return(
          <div key={index} className="flex items-center justify-between py-4 border-t border-gray-200 first:border-t-0">
          <div className="flex">
            <Image 
              src={img} 
              alt={`${title} profile`} 
              className='w-10 h-10 rounded-full object-cover flex-shrink-0'
            />
            <div className='flex flex-col ml-3 flex-1 min-w-0'>
              <SmallestTitle>{title}</SmallestTitle>
              <div className="flex items-center space-x-2 ">
                <MinText className='text-red-800 font-medium'>{time}</MinText>
                <MinText className='text-gray-500'>|</MinText>
                <MinText className='text-gray-500'>{date}</MinText>
                <MinText className='text-gray-500'>|</MinText>
                <MinText className='text-gray-500'>{callType}</MinText>
              </div>
              <MinText className='text-gray-500 truncate'>
                Patient: {patient}
              </MinText>
            </div>
          </div>
          <button className='font-semibold text-[14px] border p-2 rounded-md font-libre text-[#414651] cursor-pointer'>
            View Details
          </button>
          </div>
        )
      })}
    </div>
  </div>
  )
}

export default UpcomingConsultation