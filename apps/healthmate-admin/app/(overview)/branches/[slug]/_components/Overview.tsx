import { Card, Info } from '@/components/ui/Reusable'
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

