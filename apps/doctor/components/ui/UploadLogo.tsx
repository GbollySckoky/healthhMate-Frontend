import React from 'react'
import Image from 'next/image'
import image from '@/assets/cloud-upload.png'


const UploadLogo = () => {
  return (
    <div className="border border-borderColor flex items-center justify-between p-3 rounded-lg">
        <Image src={image} alt='Upload Image' className='bg-red-50 rounded-full p-2 w-[40px]' />
        <div>
            <p className='text-[#414651] font-lato font-medium text-[14px]'>Click to upload a pdf file of medical license </p>
            <p className='font-normal text-[#98A2B3] font-inter text-[14px] mt-1'>Pdf/jpeg format . Max. 15MB</p>
        </div>
        <button className=' text-[#414651] font-semibold text-[14px] border border-borderColor px-3 py-1 rounded-lg'>
            Upload 
        </button>
    </div>
  )
}

export default UploadLogo