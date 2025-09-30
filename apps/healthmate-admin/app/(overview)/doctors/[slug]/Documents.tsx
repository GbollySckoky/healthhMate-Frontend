import { MediumText, MediumTitle, TableTitle } from '@/components/ui/Reusable'
import React from 'react'
import { Download } from 'lucide-react';
import certificate from "@/assets/lovely.png"
import Image from 'next/image';
const Documents = () => {
    const datas = [
        {
            title: 'Medical License.pdf',
            date: '11 Sep, 2023',
            size: '13MB'
        },
        {
            title: 'Medical Degree Cert.pdf',
            date: '11 Sep, 2023',
            size: '13MB'
        },
        {
            title: 'Board Certification.pdf',
            date: '11 Sep, 2023',
            size: '13MB'
        },
        {
            title: 'Medical License.pdf',
            date: '11 Sep, 2023',
            size: '13MB'
        },
        {
            title: 'Medical Degree Cert.pdf',
            date: '11 Sep, 2023',
            size: '13MB'
        },
        {
            title: 'Board Certification.pdf',
            date: '11 Sep, 2023',
            size: '13MB'
        },
    ]
  return (
    <div className="bg-white rounded-lg w-full border border-borderColor">
            {/* Header */}
        <div className='border-b border-borderColor100 p-4 flex items-center justify-between'>
            <TableTitle>Approved Documents</TableTitle>
        </div>
        <div className="grid grid-cols-3 my-4 gap-4 p-4">
            {datas.map((data, index) => {
                const {title, date, size} = data;
                return(
                    <div className="bg-[#FAFAFAFA] rounded-lg p-5 border border-borderColor " key={index}>
                        <div className="rounded-lg mb-3">
                            <Image src={certificate} alt='Certificate-Image' className='h-[150px] object-cover' priority  />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <MediumTitle>{title}</MediumTitle>
                                <div className="flex space-x-2 items-center">
                                    <p className="font-lato text-[#98A2B3] font-normal text-[14px] ">{date}</p>
                                    <p className='text-[#98A2B3] font-medium font-inter text-[14px]'>. {size}</p>
                                </div>
                            </div>
                            <span className='text-[#717680]'><Download /> </span>
                        </div>
                    </div>

                )
            })}
        </div>
    </div>

  )
}

export default Documents