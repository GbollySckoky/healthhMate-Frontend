"use client"
import React from 'react'
import { ChevronDown, Eye,  EyeClosed  } from 'lucide-react';
import { DisplayFlex, MediumText, MediumTitle, SmallestTexts } from '../../../components/ui/Reusable';
import useToggle from '../../../lib/hooks/useToggle';


const Earnings = () => {
    const {isToggle, handleToggle} = useToggle()
  return (
    <div className='bg-white rounded-lg p-7 w-[350px] border border-borderColor'>
       <div className=' border border-borderColor text-grey-300 flex space-x-1 items-center justify-center px-4 py-2 rounded-md w-fit mb-5 cursor-pointer mx-auto'>
            <p className='font-medium text-[12px] font-libre'>This Month</p>
            <span><ChevronDown size={15} /></span>
        </div>
        <DisplayFlex>
            <MediumText>Your Hospital's Earnings</MediumText>
            <span className='text-red-900 cursor-pointer' onClick={handleToggle}> 
               {isToggle ? <Eye  size={18} /> : < EyeClosed  />}  
            </span>
        </DisplayFlex>
        <p className='font-lato text-[24px] font-bold text-red-900 my-3 text-center'> {isToggle ? 'NGN 232,450.00' : '******'}</p>
        <div className="border-t border-borderColor">
            <div className='flex items-center justify-between pt-4'>
                <SmallestTexts>Total Payout</SmallestTexts>
                <MediumTitle>₦55,650</MediumTitle>
            </div>
            <DisplayFlex>
                <SmallestTexts>Payment Due</SmallestTexts>
                <MediumTitle>2</MediumTitle>
            </DisplayFlex>
        </div>
    </div>
  )
}

export default Earnings