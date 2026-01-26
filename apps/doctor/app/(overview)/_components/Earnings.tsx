"use client"
import React from 'react'
import { ChevronDown, Eye,  EyeClosed  } from 'lucide-react';
import { DisplayFlex, MediumText, MediumTitle, SmallestTexts } from '@/components/ui/Reusable';
import useToggle from '@/hooks/useToggle';
import { useQuery } from '@tanstack/react-query';
import { Doctor } from '@/lib/constant/service';
import { EarningSummary } from '@/lib/interface/get-earnings-summary';
import LoadingSpinner from '@/components/ui/LoadingSpinner';


const Earnings = () => {
    const {isToggle, handleToggle} = useToggle()
    const {data, isLoading, error, isError} = useQuery({
        queryKey: ['getEarnings'],
        queryFn: () => Doctor.getEarnings()
      })

      const datas = data as EarningSummary
    
  return (
    <div className='bg-white rounded-lg p-4 w-[350px] h-[170px] border border-borderColor '>
        <DisplayFlex>
            <p className="font-libre text-grey-200 font-medium text-[16px]">Available Balance</p>
            <span className='text-red-900 cursor-pointer' onClick={handleToggle}> 
               {isToggle ? <Eye  size={18} /> : < EyeClosed  />}  
            </span>
        </DisplayFlex>
        <p className='font-lato text-[24px] font-bold text-red-900 my-3 text-center'> {isLoading ? (
            <LoadingSpinner />
        ) : (
            isToggle ? `${datas.total_earnings}` : '******'
        )}</p>
        <div className="flex justify-center">
            <button className="border border-borderColor rounded-lg px-3 py-2 text-sm">
                View Details
            </button>
        </div>

    </div>
  )
}

export default Earnings