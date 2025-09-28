import { Card, MediumTitle, MinBar, Text } from '@/components/ui/Reusable'
import React from 'react'
import { doctorPerformannce, recentActivities } from '@/components/data'
import Image from 'next/image'
import { Award,Star } from 'lucide-react';


const DoctorPerformannce = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 w-full h-[400px] flex flex-col">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
            <div className="flex items-center justify-between">
                <MediumTitle>Doctor Performance Leaderboard</MediumTitle>
            </div>
        </div>
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 pt-0">
            {doctorPerformannce.map((doctor,id) => {
                const {title, info, time, image, ratings, position,about,earnings} = doctor
                return(
                    <div key={id} className='flex items-center justify-between p-3'>
                        <div className='flex items-center'>
                            <Image 
                                src={image}
                                alt='Image'
                            />
                            <div className='ml-3'>
                                <div className="flex space-x-3 items-center">
                                    <p className='font-libre text-[16px] font-medium text-grey-50'>{title}</p>
                                    <span><Award size={15}  /></span>
                                    <p> {position} </p>
                                </div>
                                <div className="flex space-x-2 items-center">
                                    <p className="font-libre text-grey-600 font-normal text-[14px]">{info}</p>
                                    <p className='h-4 w-[1px] bg-grey-500'/>
                                    <p><Star  size={15} /></p> 
                                    <p className='text-[#535862] font-inter text-[14px] font-normal'>{ratings}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='font-inter font-medium text-grey-900 text-[14px] text-end'>{earnings}</p>
                            <p className="font-inter text-grey-700 font-normal text-[14px]">{about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
        
    </div>
  )
}

export default DoctorPerformannce