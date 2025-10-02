import DetailsNav from '@/components/ui/DetailsNav'
import { Infos, PageWrapper } from '@/components/ui/Reusable'
import React from 'react'

const Page = () => {
  return (
    <PageWrapper>
        <DetailsNav text='Earnings & Transactions' detailsText='Earnings & Transactions Details'/>
        <div className=' border rounded-lg border-borderColor p-4 space-y-2 mt-7'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Payout Breakdown for August</p>
            <Info label='Status' value='Video Call'/>
            <Infos label='Payment Method' value='Bank Transfer'/>
            <Infos label='Date' value='12 Aug 2025'/>
            <Infos label='Amount' value='₦170,000'/>
            <Infos label='Commission' value='₦12,860'/>
            <Infos label='Net Payout' value='₦55,650'/>
            <Infos label='Transaction ID' value='TXID890'/>
            <Infos label='Patient' value='Phoenix Baker'/>
            <Infos label='Consultation Type' value='Video Call'/>
        </div>
        <div className="flex justify-end mt-5 gap-3">
            <button className='bg-red-800 text-white rounded-lg px-4 py-2 font-inter font-semibold text-[14px]'>Request Payout</button>
            <button className='bg-red-800 text-white rounded-lg px-4 py-2 font-inter font-semibold text-[14px]'>Download Reciept</button>
        </div>
    </PageWrapper>
  )
}

export default Page

const Info = ({label, value}:{label:string, value: string}) => {
    return(
        <div className='flex items-center justify-between space-y-1'>
            <p className='text-grey-20 text-[16px] font-lato font-normal'>{label}</p>
            <p className='font-lato text-[14px] font-medium text-green-900  bg-green-100 px-4 py-1.5 rounded-full '>{value}</p>
        </div>
    )
}