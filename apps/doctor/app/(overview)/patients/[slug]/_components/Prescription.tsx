"use client"
import React, { useState } from 'react'
import { recentActivities } from '@/components/ui/data'
import TextArea from '@/components/ui/TextArea'


const Prescription = () => {
    const [inputValue, setInputValue] = useState('')
  return (
    <div>
        <div className="flex-1 overflow-y-auto p-4 pt-0 border border-borderColor mb-5">
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
        <TextArea 
            placeholder='Issue a prescription'
            label='Prescription'
            value={inputValue}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        />
        <div className="flex justify-end mt-3">
            <button className='bg-red-800 text-white font-medium rounded-lg px-5 py-2'>Add Prescription</button>
        </div>
    </div>
  )
}

export default Prescription