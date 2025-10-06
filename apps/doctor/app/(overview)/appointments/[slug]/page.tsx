import { Infos, PageWrapper } from '@/components/ui/Reusable'
import React from 'react'
import Image from 'next/image'
import image from '@/assets/Image.png'



const Page = () => {
  return (
    <PageWrapper>
      <div className='bg-white p-6 border border-borderColor rounded-lg mt-5'>
        <div className="flex justify-between">
            <div className="flex items-center">
              <Image src={image} alt='Image' className="w-[60px] h-[60px] rounded-full" />
              <div className='ml-2'>
                  <p className='font-medium font-libre text-[20px] text-[#211F1F]'>Janet Okeke</p>
                  <p className='text-[14px] font-inter text-grey-20  py-1'>34 y/o — Female</p>
                  <p className='text-[14px] font-inter text-grey-20  py-1'>olivia@untitledui.com</p>
              </div>
            </div>
            <p className='text-[#414651] bg-[#f5f5f5] font-medium font-inter text-[14px] rounded-full px-5 py-1 h-fit '>Pending</p>
        </div>
      </div>
      {/* Type */}
      <div className='mt-5 border border-borderColor p-4 rounded-lg'>
          <Infos label='Type' value='Female'/>
          <Infos label='Date' value='Aug 2, 1985'/>
          <Infos label='Time:' value='Lekki,Lagos'/>
      </div>
      <Info label='Health Concern' value='I am have been having pains on my lower abdomen for weeks now, i have taken medications prescribed by a Pharmacist but it has gotten worser. when i try to urinate i feel a sharp pain.' />
      <Info label='Consultation Notes' value='Possible Pelvic inflammation. Perform a Abdomino-Pelvic scan to check for any infection,' />
      <Info label='Prescription' value='None' />
      <div className="flex justify-between items-center mt-7">
        <button className='text-red-800 border border-red-800 rounded-lg font-inter px-4 py-1 font-medium text-[14px] '>Decline</button>
        <button className='px-4 py-1 bg-red-800 rounded-lg font-inter text-white text-[14px]'>Approve</button>
      </div>
    </PageWrapper>
  )
}

export default Page

const Info = ({label, value}:{label:string, value: string}) => {
  return(
      <div className='flex flex-col space-y-1 border border-borderColor rounded-lg p-3 mt-5'>
          <p className='text-[#535862] text-[16px] font-lato font-normal'>{label}</p>
          <p className='font-lato text-[16px] font-medium text-[#181D27]'>{value}</p>
      </div>
  )
}