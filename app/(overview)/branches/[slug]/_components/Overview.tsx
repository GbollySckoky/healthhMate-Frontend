import { Card } from '@/components/reusable/Reusable'
import React from 'react'

const Overview = () => {
  return (
    <Card>
        <p className='font-semibold text-[18px] font-libre mb-3'>Branch Information</p>
        <Info label='Total Earnings' amount='₦1,250,000'/>
        <Info label='Total Patients Served' amount='183'/>
        <Info label='Total Doctors' amount='9'/>
        <Info label='Pending Payout' amount='₦285,000'/>
    </Card>
  )
}

export default Overview

const Info = ({label, amount}:{label:string, amount: string}) => {
    return(
        <div className='flex items-center justify-between space-y-1'>
            <p className='text-[#535862] text-[16px] font-lato font-normal'>{label}</p>
            <p className='font-lato text-[18px] font-medium'>{amount}</p>
        </div>
    )
}