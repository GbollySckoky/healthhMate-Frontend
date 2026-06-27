"use client"
import React from 'react'
import SuccessImage from '@/assets/Group 1000006795.png'
import Image from 'next/image'
import { ROUTES } from '@/lib/constant/Routes'
import { useRouter } from 'next/navigation'


const Success = ({handleNextStep}: {handleNextStep: () => void}) => {
    const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-fit text-center">
      <div className=" mb-3">
        <Image 
          src={SuccessImage} 
          alt="Success" 
          width={300} 
          height={300} 
        />
      </div>

      <div className="mb-4">
        <h1 className="font-semibold text-2xl text-[#1B1818] mb-2 font-lato">
        Hospital Onboarding Complete!
        </h1>
        <p className="text-sm text-[#645D5D] font-normal font-lato">
        Your hospital has been successfully created. You can now add more doctors and manage appointments.
        </p>
      </div>

      <button
        type="button"
        className="w-full bg-pink-600 hover:bg-pink-500 disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-4 font-inter max-w-sm"
        onClick={() => router.push(ROUTES.dashboard)}
      >
        Go to Dashboard
      </button>
    </div>
  )
}

export default Success
