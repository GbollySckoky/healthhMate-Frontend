import React from 'react'
import image from '@/assets/Upload icon.png'
import Image from 'next/image'
const UploadLogo = () => {
  return (
    <div className='mb-5'>
        <p className='font-inter font-normal text-[16px] text-[#212121] mb-2'>Upload Logo</p>
        <div className="bg-[#FAFAFAFA] rounded-lg p-10">
            <div className="flex justify-center mb-3 cursor-pointer">
                <Image src={image} alt="Image"/>
            </div>
            <p className="font-inter text-[13px] font-normal text-center text-[#212121]">
                Drag and Drop File  or 
                <span className="text-blue-200"> Browse </span>
            </p>
            <p className='text-center text-[#B8BCCA] font-inter text-[10px] font-normal '>Max File size: 2 MB</p>
        </div>
        <p className="font-inter text-[13px] font-normal mt-2 text-[#212121]">Supported file format: PNG, Jpeg</p>
    </div>
  )
}

export default UploadLogo