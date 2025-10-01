import { Infos } from '@/components/ui/Reusable'
import React from 'react'

const Overview = () => {
  return (
    <div className='mt-5 border border-borderColor p-4 rounded-lg space-y-2'>
        <Infos label='Last Consultation ' value='05 Sept 2025'/>
        <Infos label='Type' value='Video'/>
        <Infos label='Primary Health Concern' value='Hypertension'/>
        <Infos label='Upcoming Appointment' value='None'/>
    </div>
  )
}

export default Overview