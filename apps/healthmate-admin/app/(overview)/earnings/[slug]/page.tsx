import React from 'react'
import image from '@/assets/Image.png'
import Image from 'next/image'
import { Card, CardText, CardTitle, Info, PageWrapper } from '@/components/ui/Reusable'
import EarningsTable  from './EarningsTable'
// import { getStatusStyle } from "@/lib/constant/status";
import DetailsNav from '@/components/ui/DetailsNav'
import { STATUS } from '@/types/status'


const SupportDetails = () => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case STATUS.COMPLETED:
        return "text-green-700 bg-green-100";
      case STATUS.PENDING:
        return "text-gray-700 bg-gray-100";
      case STATUS.CANCELLED:
      case STATUS.REJECTED:
        return "text-red-800 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };
  return (
    <PageWrapper>
        <DetailsNav text='Earnings & Transactions' detailsText='Earning & Transaction Details'/>
        <div className="flex justify-between border border-borderColor rounded-lg mb-5 bg-white p-5">
            <div className="flex items-center">
            <Image src={image} alt='Image' className="w-[80px] h-[80px] rounded-full" />
            <div className='ml-2'>
                <CardTitle>Gbolly Sckoky</CardTitle>
                <p className='text-[16px] font-lato font-medium  text-red-800 pb-1'>Patient</p>
                <CardText>170 consultations</CardText>
            </div>
            </div>
            <p className={`rounded-lg px-3  h-fit ${getStatusStyle('Pending')}`} >Pending</p>
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