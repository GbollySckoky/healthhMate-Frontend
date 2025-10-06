import Image from 'next/image'
import React from 'react'
import CompanyLogo from '@/assets/Avatar.png'
const MinHeader = () => {
  return (
    <div className='mb-5'>
        <Image src={CompanyLogo} alt='Logo Image' priority className='bg-red-100 rounded-full p-3 mb-2'/>
        <h1 className='font-bold text-[16px] font-lato mt-2'>Ever Care General Hospital</h1>
    </div>
  )
}

export default MinHeader