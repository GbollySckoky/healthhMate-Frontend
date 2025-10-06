"use client"
import Image from 'next/image'
import image from '@/assets/Avatar.png'
import { STEP } from '@/lib/step'

const GetStarted = ({handleNextStep}: {handleNextStep: (value: number) => void}) => {
  return (
    <div 
      className="h-screen relative flex items-center justify-center img" 
    >
      {/* Overlay */}
      <div className="bg-[#a3a7ad] opacity-40 absolute inset-0"></div>

      {/* Card */}
      <div className="relative bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center ">
        <div className="flex items-center justify-center mb-3">
            <div className='bg-red-50 w-fit py-2 px-5 rounded-lg  flex items-center space-x-3'>
                <Image src={image} alt="Health-Image"  />
                <p className='text-sm font-lato font-normal'>Ever Care General Hospital</p>
            </div>
        </div>
        <p className="text-[22px] font-lato font-semibold text-[#1B1818]">
            Welcome to Evercare Hospital, Dr. Uche Okoro
        </p>
        <p className="font-lato text-[15px] my-3 mb-5 font-normal text-[#645D5D] ">
            Let’s complete your profile so patients can find and book you.
        </p>
        <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg font-semibold w-full" onClick={() => handleNextStep(STEP.ONE)}>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default GetStarted
