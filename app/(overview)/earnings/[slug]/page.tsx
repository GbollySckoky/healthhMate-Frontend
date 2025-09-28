import React from 'react'
import image from '@/assets/Image.png'
import Image from 'next/image'
import { Card, CardText, CardTitle, Info, PageWrapper } from '@/components/ui/Reusable'
import EarningsTable  from './EarningsTable'
import { paidStatus } from '@/types/status'


const getStatusClasses = (status: string) => {
    switch (status) {
      case paidStatus.PAID:
        return "text-green-800 bg-green-100"
      case paidStatus.PENDING:
        return "text-grey-600 bg-[#F5F5F5]"
      case paidStatus.FAILED:
        return "text-red-800 bg-red-100"
      default:
        return ""
    }
}

const SupportDetails = () => {
  return (
    <PageWrapper>
        <div className="flex justify-between border border-borderColor rounded-lg mb-5 bg-white p-5">
            <div className="flex items-center">
            <Image src={image} alt='Image' className="w-[80px] h-[80px] rounded-full" />
            <div className='ml-2'>
                <CardTitle>Gbolly Sckoky</CardTitle>
                <p className='text-[16px] font-lato font-medium  text-red-800 pb-1'>Patient</p>
                <CardText>170 consultations</CardText>
            </div>
            </div>
            <p className={`rounded-lg px-3  h-fit ${getStatusClasses('Pending')}`} >Pending</p>
        </div>
        {/* Card 2 */}
        <Card>
            <p className='font-semibold text-[18px] font-libre mb-3'>Earnings this Month</p>
            <Info label='Total Earnings' amount='₦1,250,000'/>
            <Info label='Consultation Fee' amount='183'/>
            <Info label='Commission' amount='9'/>
            <Info label='Net Payout' amount='₦285,000'/>
        </Card>
        {/* TABLE */}
        <EarningsTable />
    </PageWrapper>
  )
}

export default SupportDetails