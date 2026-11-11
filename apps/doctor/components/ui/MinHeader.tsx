import Image from 'next/image'
import React from 'react'
import CompanyLogo from '@/assets/Group 19156.svg'
const MinHeader = () => {
  return (
    <div className='mb-2 flex justify-center'>
        <Image src={CompanyLogo} alt='Logo Image' priority />
        {/* <h1 className='font-bold text-[16px] font-lato mt-2'>Healthmate Hospital</h1> */}
    </div>
  )
}

export default MinHeader