import { Card, Infos, NoteCard, PageWrapper, StatusInfo } from '@/components/ui/Reusable'
import React from 'react'

const Page = () => {
  return (
    <PageWrapper>
        <Card>
            <StatusInfo label='Status' value='Completed'/>
            <Infos label='Date & Time' value='2025-08-09 at 10:00 AM'/>
            <Infos label='Duration' value='30 minutes'/>
            <Infos label='Type' value='Video Appointment'/>
        </Card>

        {/* Doctor Info */}
        <Card className='mt-5'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Doctor Information</p>
            <Infos label='Name' value='Dr. Sarah Johnson'/>
            <Infos label='Specialty' value='Cardiology'/>
            <Infos label='Email' value='sarah.johnson@hospital.com'/>
        </Card>

        {/* Patient Info */}
        <Card className='mt-5'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Patient Information</p>
            <Infos label='Name' value='Dr. Sarah Johnson'/>
            <Infos label='Email' value='Cardiology'/>
        </Card>
        
        {/* Patient Note */}
        <NoteCard className='mt-5' label='Patient Notes' value="I am have been having pains on my lower abdomen for weeks now, i have taken medications prescribed by a Pharmacist but it has gotten worser. when i try to urinate i feel a sharp pain."/>

        {/* Consultation */}
        <NoteCard className='mt-5' label='Consultation Diagnosis and Next Step' value="Possible Pelvic inflammation. Perform a Abdomino-Pelvic scan to check for any infection,"/>

        {/* Feedback */}
        <div className={`border border-borderColor rounded-lg p-3 bg-white mt-5` }>
            <p className='text-[#535862] text-[16px] font-lato font-normal'>Rating & Feedback</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            className="lucide lucide-star-icon lucide-star mt-2"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
            <p className='font-lato text-[18px] font-medium text-grey-30 mt-2'>The doctor was very professional. He was asking the right questions</p>
        </div>
    </PageWrapper>
  )
}

export default Page